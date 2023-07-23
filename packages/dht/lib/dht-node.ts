import {AdnlNode, AdnlNodeIdShort, genFastBytes, HashMap, Peers, SocketAddrV4} from "@tonutils/adnl";
import {PrivateKey, PublicKey} from "@tonutils/keys";
import * as tonapi from "@tonutils/tl";
import {Codecs, TLReadBuffer, TLWriteBuffer} from "@tonutils/tl";
import {DhtNodeState} from "./dht-node-state";
import {DhtStorage, DhtStorageOptions} from "./dht-storage";
import {DhtBuckets} from "./dht-buckets";
import {Functions} from "@tonutils/tl/dist/lib";
import {PriorityList, PriorityListBuilder} from "./dht-priority";
import crypto from "crypto";

export class DhtNodeOptions {
  /**
   * Default stored value timeout used for DhNode.storeOverlayNode and DhNode.storeAddress.
   *
   * Default: 3600 seconds
   */
  public readonly valueTtlSec: number = 3600;

  /**
   * ADNL query timeout
   *
   * Default: 1000 ms
   */
  public readonly queryTimeoutMs: number = 1000;

  /**
   * Amount of DHT peers, used for values search
   *
   * Default: 5
   *
   * // TODO: use this value for storing values and for searching values in DHT, should be set `k` value for `FindValue` query
   */
  public readonly defaultValueBatchLen: number = 5;

  /**
   * Max peer penalty points. On each unsuccessful query every peer gains 2 points,
   * and then they are reduced by one on each good action.
   *
   * Default: 5
   */
  public readonly badPeerThreshold: number = 5;

  /**
   * Max allowed `k` value for DHT `FindValue` query.
   *
   * Default: 10
   */
  public readonly maxAllowedK: number = 10;

  /**
   * Max allowed key name length (in bytes).
   *
   * Default: 127 bytes
   */
  public readonly maxKeyNameLen: number = 127;

  /**
   * Max allowed key index
   *
   * Default: 15
   */
  public readonly maxKeyIndex: number = 15;

  /**
   * Storage GC interval. Will remove all outdated entries
   *
   * Default: 10000 ms
   */
  public readonly storageGcIntervalMs: number = 10000;

  constructor(options?: Partial<DhtNodeOptions>) {
    if (options) {
      Object.assign(this, options);
    }
  }

  public static default(): DhtNodeOptions {
    return new DhtNodeOptions();
  }
}

export class DhtNode {
  /**
   * Underlying ADNL node
   */
  public readonly adnl: AdnlNode;

  /**
   * Local ADNL peer id
   */
  public readonly localId: AdnlNodeIdShort;

  /**
   * Serialized dht query with own DHT node info
   */
  public readonly queryPrefix: Buffer;

  /**
   * Configuration
   */
  public readonly options: DhtNodeOptions;

  /**
   * State
   */
  public readonly state: DhtNodeState;

  private storageGcInterval: ReturnType<typeof setInterval> | null = null;

  private constructor(adnl: AdnlNode, localId: AdnlNodeIdShort, privateKey: PrivateKey, options: DhtNodeOptions) {
    const buckets = new DhtBuckets(localId);
    const storage = new DhtStorage(new DhtStorageOptions({
      maxKeyNameLen: options.maxKeyNameLen,
      maxKeyIndex: options.maxKeyIndex,
    }));

    const state = new DhtNodeState({
      key: privateKey,
      knownPeers: new Peers(),
      penalties: new HashMap<AdnlNodeIdShort, number>(),
      buckets,
      storage,
      maxAllowedK: options.maxAllowedK,
    });

    adnl.addQuerySubscriber(state);

    const localNode = state.signLocalNode(adnl.buildAddressList());
    const queryPrefix: tonapi.dht_query = {
      kind: 'dht.query',
      node: localNode,
    };
    const queryPrefixWriter = new TLWriteBuffer();
    Functions.dht_query.encodeRequest(queryPrefix, queryPrefixWriter);

    this.adnl = adnl;
    this.localId = localId;
    this.queryPrefix = queryPrefixWriter.build();
    this.options = options;
    this.state = state;
  }

  public static async create(adnl: AdnlNode, localId: AdnlNodeIdShort, options?: Partial<DhtNodeOptions>): Promise<DhtNode> {
    const key = await adnl.privateKeyById(localId);
    const dhtNode = new DhtNode(adnl, localId, key, new DhtNodeOptions(options));

    await dhtNode.start();

    return dhtNode;
  }

  /**
   * Starting DHT node with all background tasks
   */
  public async start(): Promise<void> {
    await this.startStorageGc(this.options.storageGcIntervalMs);
  }

  private async startStorageGc(interval: number): Promise<void> {
    this.storageGcInterval = setInterval(() => {
      if (this.state) {
        this.state.storage.gc();
      }
    }, interval);
  }

  /**
   * Stopping DHT node and all background tasks
   */
  public async shutdown(): Promise<void> {
    this.adnl.removeQuerySubscriber(this.state);
    this.stopStorageGc();
  }

  private stopStorageGc(): void {
    if (this.storageGcInterval) {
      clearInterval(this.storageGcInterval);
      this.storageGcInterval = null;
    }
  }

  /**
   * Returns signed local node info
   */
  public getSignedLocalNode(): tonapi.dht_node {
    return this.state.signLocalNode(this.adnl.buildAddressList());
  }

  /**
   * Returns local address list
   */
  public getLocalAddressList(): tonapi.adnl_addressList {
    return this.adnl.buildAddressList();
  }

  /**
   * Returns socket address of local node
   */
  public getSocketAddr(): SocketAddrV4 {
    return this.adnl.getSocketAddr();
  }

  /**
   * Returns known peer ids
   */
  public getKnownPeerIds(): AdnlNodeIdShort[] {
    // TODO: check that we don't return bad peers
    return this.state.knownPeers.values().map((peer) => peer.getId());
  }

  /**
   * Adds new peer to DHT or explicitly marks existing as good. Returns new peer short id
   */
  public async addDhtPeer(peer: tonapi.dht_Node): Promise<AdnlNodeIdShort | undefined> {
    return await this.state.addDhtPeer(this.adnl, peer);
  }

  /**
   * Checks whether the specified peer was marked as bad
   */
  public isBadPeer(peer: AdnlNodeIdShort): boolean {
    return this.state.penalties.has(peer) && this.state.penalties.get(peer)! > this.options.badPeerThreshold;
  }

  /**
   * Asks each known DHT node for other nodes, extending current nodes set
   */
  public async findMoreDhtNodes(): Promise<number> {
    const knownNodes = this.state.knownPeers.clone();
    const tasks = new Array<Promise<[AdnlNodeIdShort, tonapi.dht_Nodes]>>();
    const peers = knownNodes.values();

    console.log(`findMoreDhtNodes: ${peers.length} known peers`);

    for (const peer of peers) {
      const peerId = peer.id;
      tasks.push(this.findNode(peerId, this.localId, 10).then((response) => [peerId, response]));
    }

    // TODO: parallelize adding of new peers
    const nodes: AdnlNodeIdShort[] = [];
    for (const [peerId, response] of await Promise.all(tasks)) {
      if (response.nodes) {
        for (const node of response.nodes) {
          if (await this.addDhtPeer(node)) {
            nodes.push(new AdnlNodeIdShort(new PublicKey(node.id).computeShortId()));
          }
        }
      } else {
        console.warn(`failed to get DHT nodes from ${peerId}`);
      }
    }

    return nodes.length;
  }

  /**
   * Sends ping query to the given peer
   *
   * dht.ping random_id:long = dht.Pong;
   */
  public async ping(peerId: AdnlNodeIdShort): Promise<boolean> {
    const randomId = genFastBytes(8).readBigInt64LE();
    const query: tonapi.dht_ping = {
      kind: 'dht.ping',
      randomId: randomId.toString(10)
    };

    const writer = new TLWriteBuffer();
    Functions.dht_ping.encodeRequest(query, writer);

    const answer = await this.queryWithPrefix(peerId, writer.build());

    if (!answer) {
      return false;
    }

    const reader = new TLReadBuffer(answer);

    const pong = Functions.dht_ping.decodeResponse(reader);

    return pong?.randomId === randomId.toString(10);
  }

  /**
   * Stores value in DHT, returns true if value was stored
   *
   * dht.store value:dht.value = dht.Stored;
   */
  public async store(peerId: AdnlNodeIdShort, value: tonapi.dht_Value): Promise<tonapi.dht_Stored | null> {
    const writer = new TLWriteBuffer();
    Functions.dht_store.encodeRequest({
      kind: 'dht.store',
      value: value
    }, writer);
    const query = writer.build();

    const answer = await this.queryWithPrefix(peerId, query);

    if (!answer) {
      return null;
    }

    const reader = new TLReadBuffer(answer);

    return Functions.dht_store.decodeResponse(reader);
  }

  /**
   * Store value into multiple DHT nodes
   */
  public async storeIntoMultipleDhtNodes(value: tonapi.dht_Value): Promise<boolean> {
    // store value in local storage for future requests from other nodes
    const storage = this.state.storage;
    storage.insert(value);

    // build priority list
    const plist = this.buildPriorityList(value.key.key);

    // TODO: implement update priority list on each response
    const tasks = [];
    let node = plist.list;
    while (node) {
      tasks.push(this.store(node.peer.getId(), value));
      node = node.next;
    }

    if (tasks.length === 0) {
      console.warn(`failed to store value, no candidates`);
      return false;
    }

    const results = await Promise.all(tasks);
    const hasStored = results.some((result) => result?.kind === 'dht.stored');

    if (!hasStored) {
      console.warn(`failed to store value, no responses`);
      return false;
    }

    return true;
  }

  /**
   * Stores given socket address into multiple DHT nodes
   */
  public async storeAddressList(addressList: tonapi.adnl_AddressList): Promise<boolean> {
    const privateKey = this.state.key;
    const decryptor = privateKey.createDecryptor(privateKey.computePublicKey());

    // TODO: we should use clockToleranceSec from options
    const clockToleranceSec = this.adnl.getOptions().clockToleranceSec;

    const addressListWriter = new TLWriteBuffer();
    Codecs.adnl_AddressList.encode(addressList, addressListWriter);

    // TODO: extract creating of dht_Key, dht_keyDescription and dht_value to separate function
    const key: tonapi.dht_Key = {
      kind: 'dht.key',
      id: privateKey.computeShortId().raw(),
      name: Buffer.from('address', 'ascii'),
      idx: 0,
    };

    const keyDescription: tonapi.dht_KeyDescription = {
      kind: 'dht.keyDescription',
      key: key,
      id: privateKey.computePublicKey().tl(),
      updateRule: {
        kind: 'dht.updateRule.signature'
      },
      signature: Buffer.alloc(0)
    };
    const keyDescriptionWriter = new TLWriteBuffer();
    Codecs.dht_KeyDescription.encode(keyDescription, keyDescriptionWriter);

    const keyDescriptionSignature = decryptor.sign(keyDescriptionWriter.build());

    const dhtValue: tonapi.dht_Value = {
      kind: 'dht.value',
      key: {
        ...keyDescription,
        signature: keyDescriptionSignature
      },
      ttl: Math.floor(Date.now() / 1000) + this.options.valueTtlSec,
      value: addressListWriter.build(),
      signature: Buffer.alloc(0)
    };
    const dhtValueWriter = new TLWriteBuffer();
    Codecs.dht_Value.encode(dhtValue, dhtValueWriter);

    const dhtValueSignature = decryptor.sign(dhtValueWriter.build());

    const storeValue = await this.storeIntoMultipleDhtNodes({
      ...dhtValue,
      signature: dhtValueSignature
    });

    if (!storeValue) {
      return false;
    }

    // make sure that we have stored value
    const valueFromStorage = await this.findValueFromMultipleDhtNodes(keyDescription.key, 10);

    if (!valueFromStorage) {
      return false;
    }

    return true;
  }

  /**
   * Stores given overlay node into multiple DHT nodes
   *
   * TODO: implement when OverlayNode is implemented
   *
   * public async storeOverlayNode(overlayIdFull: OverlayIdFull, node: OverlayNode): Promise<boolean> {
   *   throw new Error('Not implemented');
   * }
   */

  /**
   * Builds priority list for given ordered list of nodes
   */
  private buildPriorityList(key: tonapi.dht_Key, k?: number): PriorityList {
    // build key
    const writer = new TLWriteBuffer();
    Codecs.dht_Key.encode(key, writer);

    // build priority list
    const builder = new PriorityListBuilder(writer.build(), k);
    for (const node of this.state.knownPeers.values()) {
      builder.addPeer(node);
    }

    return builder.build();
  }

  /**
   * Find node by key and k, returns list of nodes
   *
   * dht.findNode key:int256 k:int = dht.Nodes;
   */
  public async findNode(peerId: AdnlNodeIdShort, key: AdnlNodeIdShort, k?: number): Promise<tonapi.dht_Nodes> {
    const query: tonapi.dht_findNode = {
      kind: 'dht.findNode',
      key: key.serialize(),
      k: k || this.options.defaultValueBatchLen,
    };
    const writer = new TLWriteBuffer()
    Functions.dht_findNode.encodeRequest(query, writer);

    const response = await this.queryWithPrefix(peerId, writer.build());

    if (!response) {
      return {
        kind: 'dht.nodes',
        nodes: []
      };
    }

    return Functions.dht_findNode.decodeResponse(new TLReadBuffer(response));
  }


  /**
   * Find value by key and k, returns value
   *
   * dht.findValue key:int256 k:int = dht.ValueResult;
   */
  public async findValue(peerId: AdnlNodeIdShort, key: tonapi.dht_Key, k: number): Promise<tonapi.dht_ValueResult> {
    const keyWriter = new TLWriteBuffer();
    Codecs.dht_Key.encode(key, keyWriter);
    const digest = crypto.createHash('sha256').update(keyWriter.build()).digest();

    const query: tonapi.dht_findValue = {
      kind: 'dht.findValue',
      key: digest,
      k,
    };
    const writer = new TLWriteBuffer()
    Functions.dht_findValue.encodeRequest(query, writer);

    const response = await this.queryWithPrefix(peerId, writer.build());

    if (!response) {
      return {
        kind: 'dht.valueNotFound',
        nodes: {
          kind: 'dht.nodes',
          nodes: []
        }
      };
    }

    const valueResult = Functions.dht_findValue.decodeResponse(new TLReadBuffer(response));

    if (valueResult.kind === 'dht.valueNotFound') {
      return valueResult;
    }

    // check value signature
    const isValid = this.state.storage.validate(valueResult.value);

    if (!isValid) {
      return {
        kind: 'dht.valueNotFound',
        nodes: {
          kind: 'dht.nodes',
          nodes: []
        }
      };
    }

    return valueResult;
  }

  /**
   * Find value from multiple DHT nodes
   */
  public async findValueFromMultipleDhtNodes(key: tonapi.dht_Key, k: number): Promise<tonapi.dht_Value | null> {
    const plist = this.buildPriorityList(key, k);

    // TODO: implement update priority list on each response
    const tasks = [];
    let node = plist.list;
    while (node) {
      const task = this.findValue(node.peer.getId(), key, k)
        .then((response) => {
          if (response.kind === 'dht.valueNotFound') {
            throw new Error('Value not found');
          }

          return response;
        })
        .catch((error) => {
          throw error;
        });

      tasks.push(task);
      node = node.next;
    }

    try {
      const response = await Promise.any(tasks);

      return response.value;
    } catch (error) {
      return null;
    }
  }

  /**
   * Searches for the first stored IP address for the given peer id
   */
  public async findAddressList(peerId: AdnlNodeIdShort): Promise<tonapi.adnl_AddressList | null> {
    const key: tonapi.dht_Key = {
      kind: 'dht.key',
      id: peerId.serialize(),
      name: Buffer.from('address', 'ascii'),
      idx: 0
    };

    const K = this.options.defaultValueBatchLen;
    const value = await this.findValueFromMultipleDhtNodes(key, K);

    if (!value) {
      return null;
    }

    return Codecs.adnl_AddressList.decode(new TLReadBuffer(value.value));
  }

  /**
   * Searches overlay nodes and their ip addresses.
   */
  // TODO: should be implemented when overlay is implemented
  // public async findOverlayNodes(overlayId: OverlayIdShort): Promise<OverlayNode[]> {
  //   throw new Error('not implemented');
  // }

  /**
   * Request for signed address list of the given node, returns signed node info
   *
   * dht.getSignedAddressList = dht.Node;
   */
  public async getSignedAddressList(peerId: AdnlNodeIdShort): Promise<tonapi.dht_Node | null> {
    const query: tonapi.dht_getSignedAddressList = {
      kind: 'dht.getSignedAddressList'
    };
    const writer = new TLWriteBuffer()
    Functions.dht_getSignedAddressList.encodeRequest(query, writer);

    const response = await this.queryWithPrefix(peerId, writer.build());

    if (!response) {
      return null;
    }

    return Functions.dht_getSignedAddressList.decodeResponse(new TLReadBuffer(response));
  }

  /**
   * Register reverse connection to the given node, returns true if connection was registered
   *
   * dht.registerReverseConnection node:PublicKey ttl:int signature:bytes = dht.Stored;
   */
  public async registerReverseConnection(peerId: AdnlNodeIdShort, node: PublicKey, ttl: number, signature: Buffer): Promise<tonapi.dht_Stored | null> {
    const query: tonapi.dht_registerReverseConnection = {
      kind: 'dht.registerReverseConnection',
      node: node.tl(),
      ttl,
      signature
    };
    const writer = new TLWriteBuffer()
    Functions.dht_registerReverseConnection.encodeRequest(query, writer);

    const response = await this.queryWithPrefix(peerId, writer.build());

    if (!response) {
      return null;
    }

    return Functions.dht_registerReverseConnection.decodeResponse(new TLReadBuffer(response));
  }

  /**
   * Request for reverse ping to the given node, returns true if ping was successful
   *
   * dht.requestReversePing target:adnl.Node signature:bytes client:int256 k:int = dht.ReversePingResult;
   */
  public async requestReversePing(peerId: AdnlNodeIdShort, target: tonapi.adnl_Node, signature: Buffer, client: Buffer, k: number): Promise<tonapi.dht_ReversePingResult | null> {
    const query: tonapi.dht_requestReversePing = {
      kind: 'dht.requestReversePing',
      target: target,
      signature,
      client,
      k
    };
    const writer = new TLWriteBuffer()
    Functions.dht_requestReversePing.encodeRequest(query, writer);

    const response = await this.queryWithPrefix(peerId, writer.build());

    if (!response) {
      return null;
    }

    return Functions.dht_requestReversePing.decodeResponse(new TLReadBuffer(response));
  }

  /**
   * Queries DHT node with given dht_query prefix, returns result if any or undefined
   */
  public async queryWithPrefix(peerId: AdnlNodeIdShort, query: Buffer): Promise<Buffer | undefined> {
    const result = await this.adnl.queryWithPrefix(this.localId, peerId, this.queryPrefix, query, this.options.queryTimeoutMs);

    this.state.updatePeerStatus(peerId, !!result);

    return result;
  }

}
