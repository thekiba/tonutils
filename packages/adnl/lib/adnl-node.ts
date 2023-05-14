import {AdnlNodeIdFull, AdnlNodeIdShort, Serializable} from "./adnl-node-id";
import {Channel, ChannelCreationContext, ChannelReceiver} from "./adnl-channel";
import {AdnlChannelId} from "./adnl-channel-id";
import {genFastBytes, HashMap} from "./utils";
import {NewPeerContext, Peer, PeerFilter, Peers} from "./peers";
import {SocketAddrV4} from "./socket";
import {Keyring} from "@tonutils/keyring";
import {Transfer, TransferId} from "./transfer";
import {QueriesCache, QueryId} from "./queries-cache";
import {
  MessageSubscriber,
  PacketToSend,
  QueryConsumingResultType,
  QuerySubscriber,
  SenderQueue,
  SubscriberContext
} from "./sender-queue";
import * as dgram from "dgram";
import {Socket} from "dgram";
import * as tonapi from '@tonutils/tl';
import {TLWriteBuffer, TLReadBuffer, adnl_AddressList, adnl_Message, adnl_message_part, adnl_PacketContents, Codecs} from '@tonutils/tl';
import {PrivateKey, PublicKey, PublicKeyHash} from "@tonutils/keys";
import * as crypto from 'crypto';
import {AdnlPacketContents} from "./packet";
import {AddressInfo} from "net";

export class NodeOptions {
  /**
   * Minimal ADNL query timeout. Will override the used timeout if it is less.
   * Default: `500` ms
   */
  public readonly queryMinTimeoutMs: number = 500;

  /**
   * Default ADNL query timeout. Will be used if no timeout is specified.
   * Default: `5000` ms
   */
  public readonly queryDefaultTimeoutMs: number = 5000;

  /**
   * ADNL multipart transfer timeout. It will drop the transfer if it is not completed within this timeout.
   * Default: `3` seconds
   */
  public readonly transferTimeoutSec: number = 3;

  /**
   * Permissible time difference between remote and local clocks.
   * Default: `60` seconds
   */
  public readonly clockToleranceSec: number = 60;

  /**
   * Drop channels which had no response for this amount of time.
   * Default: `30` seconds
   */
  public readonly channelResetTimeoutSec: number = 30;

  /**
   * How much time address lists from packets should be valid.
   * Default: `1000` seconds
   */
  public readonly addressListTimeoutSec: number = 1000;

  /**
   * Whether to add additional duplicated packets check.
   * Default: `false`
   */
  public readonly packetHistoryEnabled: boolean = false;

  /**
   * Whether handshake packets signature is mandatory.
   * Default: `true`
   */
  public readonly packetSignatureRequired: boolean = true;

  /**
   * Whether to use priority channels for queries.
   * Default: `true`
   */
  public readonly forceUsePriorityChannels: boolean = true;

  /**
   * Whether to use loopback ip to communicate with nodes on the same ip
   * Default: `false`
   */
  public readonly useLoopbackForNeighbours: boolean = false;

  constructor(partial: {
    queryMinTimeoutMs: number,
    queryDefaultTimeoutMs: number,
    transferTimeoutSec: number,
    clockToleranceSec: number,
    channelResetTimeoutSec: number,
    addressListTimeoutSec: number,
    packetHistoryEnabled: boolean,
    packetSignatureRequired: boolean,
    forceUsePriorityChannels: boolean,
    useLoopbackForNeighbours: boolean,
  }) {
  }

  static default(): NodeOptions {
    return new NodeOptions({
      queryMinTimeoutMs: 500,
      queryDefaultTimeoutMs: 5000,
      transferTimeoutSec: 3,
      clockToleranceSec: 60,
      channelResetTimeoutSec: 30,
      addressListTimeoutSec: 1000,
      packetHistoryEnabled: false,
      packetSignatureRequired: true,
      forceUsePriorityChannels: true,
      useLoopbackForNeighbours: false,
    });
  }
}

export class AdnlNode {
  /**
   * Socket address of the node
   * @internal
   */
  private readonly socketAddr: SocketAddrV4;

  /**
   * Immutable keystore
   * @internal
   */
  private readonly keystore: Keyring;

  /**
   * AdnlNode configuration, see `NodeOptions` for details
   * @internal
   */
  private readonly options: NodeOptions;

  /**
   * If specified, peers are only accepted if they match the filter
   * @internal
   */
  private readonly peerFilter: PeerFilter | undefined;

  /**
   * Known peers for each local node id
   * @internal
   */
  private readonly peers: HashMap<AdnlNodeIdShort, Peers>;

  /**
   * Channels table used to fast search on incoming packets
   * @internal
   */
  private readonly channelsById: HashMap<AdnlChannelId, Channel>;

  /**
   * Channels table used to fast search when sending messages
   * @internal
   */
  private readonly channelsByPeers: HashMap<AdnlNodeIdShort, Channel>;

  /**
   * Pending transfers of large messages that were split
   * @internal
   */
  private readonly incomingTransfers: HashMap<TransferId, Transfer>;

  /**
   * Pending queries
   * @internal
   */
  private readonly queries: QueriesCache;

  /**
   * Outgoing packets queue
   * @internal
   */
  private readonly senderQueue: SenderQueue;

  /**
   * Node start timestamp. Used as reinit date for connections
   * @internal
   */
  private readonly startTime: number;

  /**
   * Token, used to cancel all spawned tasks
   * @internal
   */
  private readonly cancellationToken: AbortController;

  /**
   * State used during initialization, see `InitializationState` for details
   * @internal
   */
  private readonly initState: InitializationState;

  /**
   * Creates new `Node` instance
   *
   * const socketAddr = new SocketAddrV4('0.0.0.0', 0);
   * const keystore = new Keyring(new KeyStore());
   * const options = NodeOptions.default();
   * const peerFilter = undefined;
   *
   * // fill keystore with keys
   * const key = await keystore.generateKey();
   *
   * const node = new AdnlNode(socketAddr, keystore, options, peerFilter);
   */
  constructor(
    socketAddr: SocketAddrV4,
    keystore: Keyring,
    options: NodeOptions,
    peerFilter?: PeerFilter | undefined,
  ) {
    const peers = new HashMap<AdnlNodeIdShort, Peers>();
    for (const key of keystore.getKeys()) {
      peers.set(new AdnlNodeIdShort(key), new Peers());
    }

    this.socketAddr = socketAddr;
    this.keystore = keystore;
    this.options = options;
    this.peerFilter = peerFilter;
    this.peers = peers;
    this.channelsById = new HashMap<AdnlChannelId, Channel>();
    this.channelsByPeers = new HashMap<AdnlNodeIdShort, Channel>();
    this.incomingTransfers = new HashMap<TransferId, Transfer>();
    this.queries = new QueriesCache();
    this.senderQueue = new SenderQueue();
    this.startTime = Math.floor(Date.now() / 1000);
    this.cancellationToken = new AbortController();
    this.initState = new InitializationState({
      senderQueue: this.senderQueue,
      messageSubscribers: [],
      querySubscribers: [],
    });
  }

  /**
   * ADNL node options
   */
  getOptions(): NodeOptions {
    return this.options;
  }

  /**
   * Instant metrics
   */
  getMetrics(): NodeMetrics {
    return new NodeMetrics({
      peerCount: this.peers.values().map((peers) => peers.size).reduce((a, b) => a + b, 0),
      channelsByIdLen: this.channelsById.size,
      channelsByPeersLen: this.channelsByPeers.size,
      incomingTransfersLen: this.incomingTransfers.size,
      queryCount: this.queries.size,
    });
  }

  /**
   * Adds a new message subscriber before the node was started
   *
   * node.addMessageSubscriber(new MessageSubscriber({
   *   tryConsumeCustom: async (
   *     ctx: SubscriberContext,
   *     constructor: number,
   *     data: Buffer,
   *   ): Promise<boolean> => {
   *     ... // return true if message was consumed
   *   }
   * });
   */
  public addMessageSubscriber(messageSubscriber: MessageSubscriber): void {
    this.initState.messageSubscribers.push(messageSubscriber);
  }

  /**
   * Adds a new query subscriber before the node was started
   *
   * node.addQuerySubscriber(new QuerySubscriber({
   *   tryConsumeCustom: async (
   *     ctx: SubscriberContext,
   *     constructor: number,
   *     data: Buffer
   *   ): Promise<QueryConsumingResult> => {
   *     ... // return answer if is needed
   *   }
   * });
   */
  public addQuerySubscriber(querySubscriber: QuerySubscriber): void {
    this.initState.querySubscribers.push(querySubscriber);
  }

  /**
   * Starts listening for incoming packets
   */
  public async start(): Promise<void> {
    const socket = dgram.createSocket('udp4');

    await new Promise<void>((resolve, reject) => {
      if (this.socketAddr.port === 0) {
        socket.bind();
        socket.once('listening', () => {
          this.socketAddr.setPort(socket.address().port);
          resolve();
        });
      } else {
        socket.bind(this.socketAddr.port);
      }
    });

    // Consume receiver
    const init = this.initState;

    // Start background logic
    this.startSender(socket, init.senderQueue);
    this.startReceiver(socket, init.messageSubscribers, init.querySubscribers);
  }

  /**
   * Stops all spawned listeners
   */
  public shutdown(): void {
    // TODO: implement cancellation token logic, now it's just a stub
    this.cancellationToken.abort();
  }

  /**
   * Computes ADNL query timeout, based on the roundtrip and the configured options
   */
  public computeQueryTimeout(roundtrip?: number): number {
    const timeout = roundtrip ?? this.options.queryDefaultTimeoutMs;
    return Math.max(this.options.queryMinTimeoutMs, timeout);
  }

  /**
   * Socket address of the node
   */
  public getSocketAddr(): SocketAddrV4 {
    return this.socketAddr;
  }

  /**
   * Node start timestamp
   */
  public getStartTime(): number {
    return this.startTime;
  }

  /**
   * Builds a new address list for the current ADNL node with no expiration date
   */
  public buildAddressList(): tonapi.adnl_AddressList {
    return {
      kind: 'adnl.addressList',
      addrs: [this.socketAddr.tl()],
      version: Math.floor(Date.now() / 1000),
      reinitDate: this.startTime,
      priority: 0,
      expireAt: 0,
    };
  }

  /**
   * Searches for the stored ADNL key by it's short id
   */
  public async keyById(id: AdnlNodeIdShort): Promise<PublicKey> {
    return await this.keystore.getPublicKey(id.hash);
  }

  /**
   * Adds new remote peer. Returns whether the peer was added
   */
  public addPeer(ctx: NewPeerContext, localId: AdnlNodeIdShort, peerId: AdnlNodeIdShort, addr: SocketAddrV4, peerIdFull: AdnlNodeIdFull): boolean {
    // Ignore ourself
    if (peerId.equals(localId) || addr.equals(this.socketAddr)) {
      return false;
    }

    // Check peer with peer filter (if specified)
    if (this.peerFilter && !this.peerFilter(ctx, addr, peerId)) {
      return false;
    }

    // Search remove peer in known peers
    const peers = this.getPeers(localId);
    const peer = peers.get(peerId);
    if (peer) {
      peer.setAddr(addr);
    } else {
      peers.set(peerId, new Peer(this.startTime, addr, peerIdFull));
      console.log(`added ADNL peer ${localId.hash.raw().toString('hex')} ${peerId.hash.raw().toString('hex')} ${addr.ip}:${addr.port}`);
    }

    return true;
  }

  /**
   * Removes remote peer
   */
  public removePeer(localId: AdnlNodeIdShort, peerId: AdnlNodeIdShort): boolean {
    const peers = this.getPeers(localId);

    const removed = this.channelsByPeers.get(peerId);
    if (removed) {
      this.channelsById.delete(removed.getOrdinaryChannelInId());
      this.channelsById.delete(removed.getPriorityChannelInId());
    }

    return peers.delete(peerId);
  }

  /**
   * Searches for remote peer socket address in the known peers
   */
  public getPeerAddress(localId: AdnlNodeIdShort, peerId: AdnlNodeIdShort): SocketAddrV4 | undefined {
    const peers = this.getPeers(localId);
    const peer = peers.get(peerId);
    return peer && peer.getAddr();
  }

  /**
   * Matches entries with peer id by socket address
   */
  public matchPeerAddresses<T extends Serializable>(localId: AdnlNodeIdShort, entries: HashMap<SocketAddrV4, T>): HashMap<T, AdnlNodeIdShort> | undefined {
    const peers = this.getPeers(localId);
    const result = new HashMap<T, AdnlNodeIdShort>();
    for (const peer of peers.values()) {
      const key = entries.get(peer.getAddr());
      if (key) {
        result.set(key, peer.getId());
      }
    }
    return result;
  }

  /**
   * ADNL query to the remote peer
   */
  public async query(localId: AdnlNodeIdShort, peerId: AdnlNodeIdShort, query: Buffer, timeout?: number): Promise<Buffer | undefined> {
    return await this.queryRaw(localId, peerId, query, timeout);
  }

  /**
   * ADNL query to the remote peer, use `query` method instead
   */
  public async queryRaw(localId: AdnlNodeIdShort, peerId: AdnlNodeIdShort, query: Buffer, timeout?: number): Promise<Buffer | undefined> {
    const queryId = genFastBytes(32);
    const pendingQuery = this.queries.addQuery(new QueryId(queryId));
    await this.sendMessage(localId, peerId, {
      kind: 'adnl.message.query',
      queryId: queryId,
      query: query,
    }, true);
    const channel = this.channelsByPeers.get(peerId);
    const answer = await pendingQuery.wait(timeout || this.options.queryDefaultTimeoutMs);
    if (!answer && channel) {
      if (channel.updateDropTimeout(Math.round(Date.now() / 1000), this.options.channelResetTimeoutSec)) {
        this.resetPeer(localId, peerId);
      }
    }
    return answer;
  }

  /**
   * Sends a one-way ADNL message
   */
  public async sendCustomMessage(localId: AdnlNodeIdShort, peerId: AdnlNodeIdShort, data: Buffer): Promise<void> {
    await this.sendMessage(localId, peerId, {
      kind: 'adnl.message.custom',
      data: data,
    }, this.options.forceUsePriorityChannels);
  }

  /**
   * Returns all known peers for the specified local id
   */
  public getPeers(localId: AdnlNodeIdShort): Peers {
    const peers = this.peers.get(localId);
    if (!peers) {
      throw new Error('Peers not found');
    }
    return peers;
  }

  /**
   * Resets the specified peer, i.e. removes all channels and queries
   */
  public resetPeer(localId: AdnlNodeIdShort, peerId: AdnlNodeIdShort): void {
    const peers = this.getPeers(localId);
    const peer = peers.get(peerId);
    if (!peer) {
      throw new Error('Unknown peer');
    }
    const channel = this.channelsByPeers.get(peerId);
    this.channelsByPeers.delete(peerId);

    console.log(`Resetting peer ${peerId.serialize().toString('hex')}`);
    console.log(`Checking is really deleted: ${this.channelsByPeers.get(peerId) ? 'no' : 'yes'}`);

    if (channel) {
      this.channelsById.delete(channel.getOrdinaryChannelInId());
      this.channelsById.delete(channel.getPriorityChannelInId());
    }
  }

  /**
   * Starts ADNL sender
   * @internal
   */
  private startSender(socket: dgram.Socket, senderQueue: SenderQueue): void {
    senderQueue.on('send', (packet: PacketToSend) => {
      socket.send(packet.data, packet.destination.port, packet.destination.ip);
    });
  }

  /**
   * Sends ADNL message to the remote peer
   * @internal
   */
  private async sendMessage(localId: AdnlNodeIdShort, peerId: AdnlNodeIdShort, message: adnl_Message, priority: boolean): Promise<void> {
    const MAX_ADNL_MESSAGE_SIZE = 1024;

    const MSG_ANSWER_SIZE = 44;
    const MSG_CONFIRM_CHANNEL_SIZE = 72;
    const MSG_CREATE_CHANNEL_SIZE = 40;
    const MSG_CUSTOM_SIZE = 12;
    const MSG_NOP_SIZE = 4;
    const MSG_QUERY_SIZE = 44;
    const MSG_PART_PREFIX_SIZE = 40;

    const peers = this.getPeers(localId);
    const peer = peers.get(peerId);
    if (!peer) {
      throw new Error(`Unknown peer ${peerId.hash.raw().toString('hex')}`);
    }

    const localKey = await this.keystore.getPublicKey(localId.hash);
    const channel = this.channelsByPeers.get(peerId);

    let forceHandshake = false;
    let additionalSize = 0;
    let additionalMessage: adnl_Message | null = null;
    if (channel) {
      if (channel.ready) {
        additionalSize = 0;
        additionalMessage = null;
      } else {
        forceHandshake = true;
        additionalSize = MSG_CONFIRM_CHANNEL_SIZE;
        additionalMessage = {
          kind: 'adnl.message.confirmChannel',
          key: peer.channelKey.computePublicKey().raw(),
          peerKey: channel.peerChannelPublicKey.raw(),
          date: channel.peerChannelDate,
        };
      }
    } else {
      additionalSize = MSG_CREATE_CHANNEL_SIZE;
      additionalMessage = {
        kind: 'adnl.message.createChannel',
        key: peer.channelKey.computePublicKey().raw(),
        date: Math.floor(Date.now() / 1000),
      };
    }

    let size = additionalSize;

    switch (message.kind) {
      case 'adnl.message.answer':
        size += message.answer.length + MSG_ANSWER_SIZE;
        break;
      case 'adnl.message.confirmChannel':
        size += MSG_CONFIRM_CHANNEL_SIZE;
        break;
      case 'adnl.message.createChannel':
        size += MSG_CREATE_CHANNEL_SIZE;
        break;
      case 'adnl.message.custom':
        size += message.data.length + MSG_CUSTOM_SIZE;
        break;
      case 'adnl.message.nop':
        size += MSG_NOP_SIZE;
        break;
      case 'adnl.message.query':
        size += message.query.length + MSG_QUERY_SIZE;
        break;
      default:
        throw new Error('Unexpected message to send');
    }

    let signer: MessageSigner;
    if (channel && !forceHandshake) {
      signer = {
        kind: 'messageSigner.channel',
        channel: channel,
        priority: priority,
        sign: (packet) => channel.sign(packet.build())
      };
    } else {
      const privateKey = await this.keystore.getPrivateKey(localId.hash);
      const decryptor = privateKey.createDecryptor(privateKey.computePublicKey());
      signer = {
        kind: 'messageSigner.random',
        localKey: localKey,
        priority: priority,
        sign: (packet) => decryptor.sign(packet.build())
      };
    }

    if (size <= MAX_ADNL_MESSAGE_SIZE) {
      let messages: adnl_Message[];
      if (additionalMessage) {
        messages = [
          additionalMessage,
          message,
        ];
      } else {
        messages = [
          message,
        ];
      }

      await this.sendPacket(localId, peerId, peer, signer, messages);
    } else {
      const buildPartMessage = (data: Buffer, hash: Buffer, maxSize: number, offset: number): [number, adnl_message_part] => {
        const len = Math.min(data.length, offset + maxSize);

        const result: adnl_message_part = {
          kind: 'adnl.message.part',
          hash: hash,
          totalSize: data.length,
          offset: offset,
          data: data.subarray(offset, len),
        };

        offset += len - offset;
        return [offset, result];
      }

      const dataTl = new TLWriteBuffer();
      Codecs.adnl_Message.encode(message, dataTl);
      const data = dataTl.build();
      const hash = crypto.createHash('sha256').update(data).digest();
      let offset = 0;

      if (additionalMessage) {
        [offset, message] = buildPartMessage(data, hash, MAX_ADNL_MESSAGE_SIZE - MSG_PART_PREFIX_SIZE - additionalSize, offset);
        await this.sendPacket(localId, peerId, peer, signer, [
          additionalMessage,
          message,
        ]);
      }

      while (offset < data.length) {
        [offset, message] = buildPartMessage(data, hash, MAX_ADNL_MESSAGE_SIZE, offset);
        await this.sendPacket(localId, peerId, peer, signer, [
          message,
        ]);
      }
    }
  }

  /**
   * Sends ADNL packet to the remote peer
   * @internal
   */
  private async sendPacket(localId: AdnlNodeIdShort, peerId: AdnlNodeIdShort, peer: Peer, signer: MessageSigner, messages: adnl_Message[]) {
    const MAX_PRIORITY_ATTEMPTS = 10;
    let priority: boolean = signer.priority;
    if (priority && peer.receiverState.history(signer.priority).seqno === 0 && peer.senderState.history(true).seqno > MAX_PRIORITY_ATTEMPTS) {
      signer.priority = false;
    } else {
      signer.priority = true;
    }

    const localAddr = this.socketAddr;
    const peerAddr = peer.addr;

    if (this.options.useLoopbackForNeighbours && localAddr.equals(peerAddr) && !peerAddr.isLoopback()) {
      localAddr.setIp('127.0.0.1');
      peerAddr.setIp('127.0.0.1');
    }

    const randBytes = genFastBytes(15);
    const now = Math.floor(Date.now() / 1000);

    const address: adnl_AddressList = {
      kind: 'adnl.addressList',
      // TODO: fix addrs, now is not working with 0.0.0.0 address, but it may work with real addresses
      // addrs: [localAddr.tl()],
      addrs: [],
      version: now,
      reinitDate: now,
      expireAt: now + this.options.addressListTimeoutSec,
      priority: priority ? 1 : 0,
    };

    const packet = AdnlPacketContents.createPacket({
      kind: 'adnl.packetContents',
      rand1: randBytes,
      from: signer.kind === 'messageSigner.channel' ? void 0 : signer.localKey.tl(),
      message: messages.length === 1 ? messages[0] : void 0,
      messages: messages.length > 1 ? messages : void 0,
      address: signer.kind === 'messageSigner.channel' ? void 0 : address,
      seqno: peer.senderState.history(priority).bumpSeqno().toString(),
      confirmSeqno: peer.receiverState.history(priority).seqno.toString(),
      reinitDate: signer.kind === 'messageSigner.channel' ? void 0 : void 0,
      dstReinitDate: signer.kind === 'messageSigner.channel' ? void 0 : void 0,
      recvAddrListVersion: signer.kind === 'messageSigner.channel' ? void 0 : now,
      signature: void 0,
      rand2: randBytes,
    });

    // TODO: we need to sign packet only if we are not using channel, check it
    const signature = signer.kind === 'messageSigner.random' ? signer.sign(packet) : void 0;
    // const signature = signer.sign(packet);

    let data: Buffer;
    if (signature) {
      data = packet.sign(signature).build();
    } else {
      data = packet.build();
    }

    let encrypted: Buffer;
    switch (signer.kind) {
      case 'messageSigner.channel':
        encrypted = await signer.channel.encrypt(data, priority);
        break;
      case 'messageSigner.random':
        encrypted = await this.buildHandshakePacket(localId, peerId, peer.id, data);
        break;
      default:
        throw new Error(`Unsupported signer kind: ${signer['kind']}`);
    }

    this.senderQueue.emit('send', new PacketToSend(peerAddr, encrypted));
  }

  /**
   * Builds handshake packet for the remote peer
   * @internal
   */
  private async buildHandshakePacket(localId: AdnlNodeIdShort, peerId: AdnlNodeIdShort, peerIdFull: AdnlNodeIdFull, data: Buffer): Promise<Buffer> {
    const privateKey = await this.keystore.getPrivateKey(localId.hash);
    const publicKey = privateKey.computePublicKey();
    const sharedSecret = privateKey.computeSharedSecret(peerIdFull.pub);

    const {digest, encrypted} = sharedSecret.createEncryptor().encrypt(data);

    return Buffer.concat([peerId.hash.raw(), publicKey.raw(), digest, encrypted]);
  }

  /**
   * Starts receiver for the socket
   */
  public startReceiver(socket: Socket, messageSubscribers: MessageSubscriber[], querySubscribers: QuerySubscriber[]): void {
    socket.on('message', async (data: Buffer, rinfo: AddressInfo) => {
      try {
        await this.handleReceivedData(data, rinfo, messageSubscribers, querySubscribers);
      } catch (e) {
        console.error(e);
      }
    });
  }

  /**
   * Handles received data from the socket
   * @internal
   */
  private async handleReceivedData(data: Buffer, rinfo: AddressInfo, messageSubscribers: MessageSubscriber[], querySubscribers: QuerySubscriber[]): Promise<void> {
    let priority: boolean;
    let localId: AdnlNodeIdShort;
    let peerId: AdnlNodeIdShort | null;
    let decrypted: Buffer;

    const parsedHandshake = await this.parseHandshakePacket(data);
    if (parsedHandshake) {
      let [parsedLocalId, parsedDecrypted] = parsedHandshake;
      priority = false;
      localId = parsedLocalId;
      decrypted = parsedDecrypted;
      peerId = null;
    } else {
      const channelKey = data.subarray(0, 32);
      const channel = this.channelsById.get(new AdnlChannelId(new PublicKeyHash(channelKey)));

      if (channel) {
        switch (channel.type) {
          case ChannelReceiver.Priority:
            priority = true;
            break;
          case ChannelReceiver.Ordinary:
            priority = false;
            break;
          default:
            throw new Error(`Unsupported channel type: ${channel['type']}`);
        }

        decrypted = channel.decrypt(data, priority);
        channel.setReady();
        channel.resetDropTimeout();
        localId = channel.getLocalId();
        peerId = channel.getPeerId();
      } else {
        console.trace(`Received message to unknown key ID: ${channelKey.toString('hex')}`);
        return;
      }
    }

    const packet = Codecs.adnl_PacketContents.decode(new TLReadBuffer(decrypted));

    peerId = await this.checkPacket(rinfo, packet, localId, peerId, priority);

    if (!peerId) {
      return;
    }

    const messages = Array.from(packet.messages ?? []);

    if (packet.message) {
      messages.push(packet.message);
    }

    for (const message of messages) {
      await this.processMessage(localId, peerId, message, messageSubscribers, querySubscribers, priority);
    }
  }

  /**
   * Parse handshake packet, returns local ID and decrypted data or undefined if packet is not handshake
   * @internal
   */
  private async parseHandshakePacket(buffer: Buffer): Promise<[AdnlNodeIdShort, Buffer] | undefined> {
    const localId = buffer.subarray(0, 32);

    if (!await this.keystore.checkKey(new PublicKeyHash(localId))) {
      return;
    }

    const localKey = await this.keystore.getPrivateKey(new PublicKeyHash(localId));

    const publicKey = buffer.subarray(32, 64);
    const checksum = buffer.subarray(64, 96);
    const data = buffer.subarray(96);

    const sharedSecret = localKey.computeSharedSecret(new PublicKey({kind: 'pub.ed25519', key: publicKey}));

    const decrypted = sharedSecret.createDecryptor().decrypt(checksum, data);

    return [new AdnlNodeIdShort(new PublicKeyHash(localId)), decrypted];
  }

  /**
   * Process received packet
   * TODO: should be internal in future
   */
  public async processMessage(
    localId: AdnlNodeIdShort,
    peerId: AdnlNodeIdShort,
    message: adnl_Message,
    messageSubscribers: MessageSubscriber[],
    querySubscribers: QuerySubscriber[],
    priority: boolean,
  ): Promise<void> {
    let transferBuffer: Buffer | false = false;
    if (message.kind === 'adnl.message.part') {
      for (const transfer of this.incomingTransfers.values()) {
        if (transfer.isExpired(this.options.transferTimeoutSec)) {
          this.incomingTransfers.delete(transfer.transferId);
          console.debug(`ADNL transfer ${transfer.transferId.serialize().toString('hex')} timed out`);
          continue;
        }
      }

      const {hash, totalSize, offset, data} = message;
      const transferId = new TransferId(hash);
      let transfer = this.incomingTransfers.get(transferId);

      if (!transfer) {
        const newTransfer = new Transfer(transferId, totalSize);
        this.incomingTransfers.set(transferId, newTransfer);
        console.debug(`Started ADNL transfer ${transferId.serialize().toString('hex')}`);
      }

      transfer = this.incomingTransfers.get(transferId);
      if (!transfer) {
        throw new Error(`Transfer ${transferId.serialize().toString('hex')} not found`);
      }

      transferBuffer = transfer.addPart(offset, data, transferId);
      transfer.refresh();
    }

    if (transferBuffer) {
      message = Codecs.adnl_Message.decode(new TLReadBuffer(transferBuffer));
    }

    switch (message.kind) {

      case 'adnl.message.answer': {
        const {queryId, answer} = message;
        await this.processMessageAnswer(queryId, answer);
        break;
      }

      case 'adnl.message.confirmChannel': {
        const {key, date} = message;
        await this.processMessageConfirmChannel(localId, peerId, new PublicKey({kind: 'pub.ed25519', key: key}), date);
        break;
      }

      case 'adnl.message.createChannel': {
        const {key, date} = message;
        await this.processMessageCreateChannel(localId, peerId, new PublicKey({kind: 'pub.ed25519', key: key}), date);
        break;
      }

      case 'adnl.message.custom': {
        const {data} = message;
        await this.processMessageCustom(localId, peerId, messageSubscribers, data);
        break;
      }

      case 'adnl.message.nop': {
        break;
      }

      case 'adnl.message.query': {
        const {queryId, query} = message;
        const answer: Buffer | undefined = await this.processMessageQuery(localId, peerId, querySubscribers, query);
        if (answer) {
          await this.sendMessage(localId, peerId, {kind: 'adnl.message.answer', queryId, answer}, priority);
        }
        break;
      }

      case "adnl.message.part": {
        // skip part messages, they are processed in the beginning of the function
        break;
      }

      case "adnl.message.reinit": {
        // TODO: implement reinit later, it is not used now
        break;
      }

      default: {
        throw new Error(`Unknown ADNL message kind: ${message['kind']}`);
      }
    }
  }

  /**
   * Process message answer
   * TODO: should be internal in future
   */
  public async processMessageAnswer(queryId: Buffer, answer: Buffer): Promise<void> {
    this.queries.updateQuery(new QueryId(queryId), answer);
  }

  /**
   * Process message confirm channel
   * TODO: should be internal in future
   */
  public async processMessageConfirmChannel(
    localId: AdnlNodeIdShort,
    peerId: AdnlNodeIdShort,
    peerChannelPublicKey: PublicKey,
    peerChannelDate: number,
  ): Promise<void> {
    await this.createChannel(localId, peerId, peerChannelPublicKey, peerChannelDate, ChannelCreationContext.ConfirmChannel);
  }

  /**
   * Process message create channel
   * TODO: should be internal in future
   */
  public async processMessageCreateChannel(
    localId: AdnlNodeIdShort,
    peerId: AdnlNodeIdShort,
    peerChannelPublicKey: PublicKey,
    peerChannelDate: number,
  ): Promise<void> {
    await this.createChannel(localId, peerId, peerChannelPublicKey, peerChannelDate, ChannelCreationContext.CreateChannel);
  }

  /**
   * Process message custom
   * TODO: should be internal in future
   */
  private async processMessageCustom(
    localId: AdnlNodeIdShort,
    peerId: AdnlNodeIdShort,
    subscribers: MessageSubscriber[],
    data: Buffer,
  ): Promise<void> {
    const ctx: SubscriberContext = {
      adnl: this,
      localId,
      peerId,
    };

    const constructor = data.readUInt32BE(0);
    for (const subscriber of subscribers) {
      if (await subscriber.tryConsumeCustom(ctx, constructor, data)) {
        return;
      }
    }
  }

  /**
   * Process message query
   * @internal
   */
  private async processMessageQuery(
    localId: AdnlNodeIdShort,
    peerId: AdnlNodeIdShort,
    subscribers: QuerySubscriber[],
    query: Buffer,
  ): Promise<Buffer | undefined> {
    const ctx: SubscriberContext = {
      adnl: this,
      localId,
      peerId,
    };

    const constructor = query.readInt32LE(0);

    for (const subscriber of subscribers) {
      const result = await subscriber.tryConsumeQuery(ctx, constructor, query);
      if (result?.type === QueryConsumingResultType.Consumed) {
        return result.answer;
      }
    }
  }

  /**
   * Check packet signature, returns peer id if signature is valid and update peer id in routing table
   * @internal
   */
  private async checkPacket(
    rinfo: AddressInfo,
    packet: adnl_PacketContents,
    localId: AdnlNodeIdShort,
    peerId: AdnlNodeIdShort | null,
    priority: boolean,
  ): Promise<AdnlNodeIdShort | null> {
    const fromChannel = peerId !== null;

    let checkSignature = false;
    if (fromChannel) {
      if (packet.from || packet.fromShort) {
        throw new Error('Explicit source for channel');
      }
      checkSignature = true;
    } else if (packet.from) {
      const fullId = new AdnlNodeIdFull(new PublicKey(packet.from));
      peerId = fullId.computeShortId();
      if (packet.fromShort && !peerId.equals(new AdnlNodeIdShort(new PublicKeyHash(packet.fromShort.id)))) {
        throw new Error('Invalid peer id');
      }
      this.verify(packet, packet.signature!, fullId.pub, this.options.packetSignatureRequired);
      if (packet.address) {
        const version = Math.floor(Date.now() / 1000);
        if (packet.address.reinitDate > version + this.options.clockToleranceSec) {
          throw new Error('Too new version');
        }

        if (packet.address.expireAt !== 0 && packet.address.expireAt < version) {
          throw new Error('Expired');
        }

        let addr: SocketAddrV4;
        try {
          addr = SocketAddrV4.createFromAddressList(packet.address);
        } catch (e) {
          addr = SocketAddrV4.createFromAddressInfo(rinfo);
        }

        this.addPeer(NewPeerContext.AdnlPacket, localId, peerId, addr, fullId);
      }
      checkSignature = false;
    } else if (packet.fromShort) {
      peerId = new AdnlNodeIdShort(new PublicKeyHash(packet.fromShort.id));
      checkSignature = true;
    } else {
      throw new Error('No key data in packet');
    }

    const peers = this.getPeers(localId);
    const peer = peers.get(peerId!);
    if (!peer) {
      throw new Error('Unknown peer');
    } else if (fromChannel && !this.channelsByPeers.has(peerId!)) {
      throw new Error('Unknown channel');
    }

    if (checkSignature) {
      this.verify(packet, packet.signature!, peer.id.pub, false);
    }

    if (packet.reinitDate) {
      const local = packet.reinitDate;
      const target = packet.dstReinitDate!;
      const expectedLocalReinitDate = target - this.startTime;
      // TODO: fix this later
      // if (expectedLocalReinitDate > 0) {
      //   throw new Error('Dst reinit date too new');
      // }
      if (local > Date.now() + this.options.clockToleranceSec) {
        throw new Error('Src reinit date too new');
      }
      // TODO: fix this later
      // if (!peer.tryReinitSender(local)) {
      //   throw new Error('Src reinit date too old');
      // }
      if (target !== 0 && expectedLocalReinitDate < 0) {
        await this.sendMessage(localId, peerId!, {
          kind: 'adnl.message.nop'
        }, false);
        throw new Error('Dst reinit date too old');
      }
    }

    if (this.options.packetHistoryEnabled) {
      if (packet.seqno) {
        if (!peer.receiverState.history(priority).deliverPacket(parseInt(packet.seqno))) {
          return null;
        }
      }
    }

    if (packet.confirmSeqno) {
      const senderSeqno = peer.senderState.history(priority).seqno;
      if (parseInt(packet.confirmSeqno) > senderSeqno) {
        throw new Error(`Received confirmation seqno ${packet.confirmSeqno} is too new, expected ${senderSeqno}`);
      }
    }

    return peerId;
  }

  /**
   * Verify packet signature, throws error if signature is invalid
   * @internal
   */
  private verify(packet: adnl_PacketContents, signature: Buffer, publicKey: PublicKey, mandatory: boolean): void {
    if (signature) {
      const packetNoSigned = AdnlPacketContents.createPacket({
        ...packet,
        signature: void 0
      } as Exclude<Partial<adnl_PacketContents>, "flags" | "kind">);
      const packetNoSignedBuffer = packetNoSigned.build();
      if (!publicKey.createEncryptor(new PrivateKey({
        kind: 'pk.ed25519',
        key: Buffer.alloc(32)
      })).checkSignature(packetNoSignedBuffer, signature)) {
        throw new Error('Invalid signature');
      }
    } else if (mandatory) {
      throw new Error('Signature not found');
    }
  }

  /**
   * Create channel to peer
   * TODO: should be internal in future
   */
  public async createChannel(
    localId: AdnlNodeIdShort,
    peerId: AdnlNodeIdShort,
    peerChannelPublicKey: PublicKey,
    peerChannelDate: number,
    context: ChannelCreationContext,
  ): Promise<void> {
    const peers = this.getPeers(localId);
    const peer = peers.get(peerId);
    if (!peer) {
      throw new Error('Unknown peer in channel');
    }

    const channel = this.channelsByPeers.get(peerId);
    if (channel) {
      if (channel.isStillValid(peerChannelPublicKey, peerChannelDate)) {
        if (context === ChannelCreationContext.ConfirmChannel) {
          channel.setReady();
        }
        if (context === ChannelCreationContext.CreateChannel) {
          channel.setNotReady();
        }
        return;
      }

      const newChannel = new Channel(
        localId,
        peerId,
        peer.channelKey,
        peerChannelPublicKey,
        peerChannelDate,
        context,
      );

      // replace old channel with new one
      this.channelsByPeers.set(peerId, newChannel);
      this.channelsById.set(newChannel.getOrdinaryChannelInId(), newChannel);
      this.channelsById.set(newChannel.getPriorityChannelInId(), newChannel);
    } else {
      const newChannel = new Channel(
        localId,
        peerId,
        peer.channelKey,
        peerChannelPublicKey,
        peerChannelDate,
        context,
      );

      this.channelsByPeers.set(peerId, newChannel);
      this.channelsById.set(newChannel.getOrdinaryChannelInId(), newChannel);
      this.channelsById.set(newChannel.getPriorityChannelInId(), newChannel);
    }
  }
}

/**
 * Initialization state for ADNL node
 */
export class InitializationState {
  /**
   * Queue for sending messages
   */
  public readonly senderQueue: SenderQueue;

  /**
   * List of message subscribers, which will be used for processing messages
   */
  public readonly messageSubscribers: MessageSubscriber[];

  /**
   * List of query subscribers, which will be used for processing queries
   */
  public readonly querySubscribers: QuerySubscriber[];

  constructor({
                senderQueue,
                messageSubscribers = [],
                querySubscribers = [],
              }: InitializationState) {
    this.senderQueue = senderQueue;
    this.messageSubscribers = messageSubscribers;
    this.querySubscribers = querySubscribers;
  }
}

/**
 * ADNL node metrics, mainly for debugging purposes and monitoring, e.g. Prometheus, Grafana
 */
export class NodeMetrics {
  /**
   * Number of peers
   */
  public readonly peerCount: number;

  /**
   * Number of channels by id
   */
  public readonly channelsByIdLen: number;

  /**
   * Number of channels by peers
   */
  public readonly channelsByPeersLen: number;

  /**
   * Number of incoming transfers
   */
  public readonly incomingTransfersLen: number;

  /**
   * Number of queries
   */
  public readonly queryCount: number;

  constructor(partial: Partial<NodeMetrics>) {
    this.peerCount = partial.peerCount ?? 0;
    this.channelsByIdLen = partial.channelsByIdLen ?? 0;
    this.channelsByPeersLen = partial.channelsByPeersLen ?? 0;
    this.incomingTransfersLen = partial.incomingTransfersLen ?? 0;
    this.queryCount = partial.queryCount ?? 0;
  }
}

/**
 * Packet signer for channel and handshake packets
 * TODO: should be implemented in channel class
 */
export type MessageSigner = {
  kind: 'messageSigner.channel',
  channel: Channel;
  priority: boolean;
  sign: (packet: AdnlPacketContents) => Buffer;
} | {
  kind: 'messageSigner.random';
  localKey: PublicKey;
  priority: boolean;
  sign: (packet: AdnlPacketContents) => Buffer;
};

