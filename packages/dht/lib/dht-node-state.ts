import {
  AdnlNode,
  AdnlNodeIdFull,
  AdnlNodeIdShort,
  HashMap,
  NewPeerContext,
  Peer,
  Peers,
  QueryConsumingResult,
  QueryConsumingResultType,
  QuerySubscriber,
  SocketAddrV4,
  SubscriberContext
} from "@tonutils/adnl";
import {DhtStorage, DhtStorageKeyId} from "./dht-storage";
import {DhtBuckets} from "./dht-buckets";
import {PrivateKey, PublicKey, PublicKeyHash} from "@tonutils/keys";
import * as tonapi from "@tonutils/tl";
import {Codecs, TLReadBuffer, TLWriteBuffer} from "@tonutils/tl";

export class DhtNodeState implements QuerySubscriber {
  /**
   * Local ADNL key
   */
  public readonly key: PrivateKey;

  /**
   * Local ID
   */
  public readonly localId: AdnlNodeIdShort;

  /**
   * Known DHT nodes
   */
  public readonly knownPeers: Peers;

  /**
   * DHT nodes penalty scores table
   */
  public readonly penalties: HashMap<AdnlNodeIdShort, number>;

  /**
   * DHT nodes organized by buckets
   */
  public readonly buckets: DhtBuckets;

  /**
   * Local DHT values storage
   */
  public readonly storage: DhtStorage;

  /**
   * Max allowed `k` value for DHT `FindValue` query.
   */
  public readonly maxAllowedK: number;

  constructor(params: {
    key: PrivateKey,
    knownPeers: Peers,
    penalties: HashMap<AdnlNodeIdShort, number>,
    buckets: DhtBuckets,
    storage: DhtStorage,
    maxAllowedK: number,
  }) {
    this.key = params.key;
    this.localId = new AdnlNodeIdShort(this.key.computeShortId());
    this.knownPeers = params.knownPeers;
    this.penalties = params.penalties;
    this.buckets = params.buckets;
    this.storage = params.storage;
    this.maxAllowedK = params.maxAllowedK;
  }

  /**
   * Return current DHT node metrics
   */
  public metrics(): DhtNodeMetrics {
    return new DhtNodeMetrics({
      knownPeersLen: this.knownPeers.size,
      bucketPeerCount: this.buckets.size,
      storageLen: this.storage.length,
      storageTotalSize: this.storage.totalSize,
    });
  }

  /**
   * Signs local DHT node
   */
  public signLocalNode(addrList: tonapi.adnl_AddressList): tonapi.dht_Node {
    const node: tonapi.dht_Node = {
      kind: 'dht.node',
      id: this.key.computePublicKey().tl(),
      addrList: addrList,
      version: addrList.version,
      signature: Buffer.alloc(0),
    };

    const writer = new TLWriteBuffer();
    Codecs.dht_Node.encode(node, writer);

    // TODO: remove public key from createDecryptor
    const signature = this.key.createDecryptor(this.key.computePublicKey()).sign(writer.build());

    return {
      ...node,
      signature: signature,
    };
  }

  /**
   * Adds new DHT node to the table
   */
  public async addDhtPeer(adnl: AdnlNode, dhtPeer: tonapi.dht_Node): Promise<AdnlNodeIdShort | undefined> {
    const publicKey = new PublicKey(dhtPeer.id);
    const encryptor = publicKey.createEncryptor(this.key);

    const signature = dhtPeer.signature;
    const data = new TLWriteBuffer();
    Codecs.dht_Node.encode({...dhtPeer, signature: Buffer.alloc(0)}, data);
    if (!encryptor.checkSignature(data.build(), signature)) {
      console.warn(`Invalid DHT peer signature for ${publicKey.toString()}`);
      return undefined;
    }

    const peerId = new AdnlNodeIdShort(publicKey.computeShortId());
    const peerFullId = new AdnlNodeIdFull(publicKey);

    const clockToleranceSec = adnl.getOptions().clockToleranceSec;
    const peerAddr: SocketAddrV4 = SocketAddrV4.createFromAddressList(dhtPeer.addrList, clockToleranceSec);

    const isNewPeer = adnl.addPeer(
      NewPeerContext.Dht,
      this.localId,
      peerId,
      peerAddr,
      peerFullId,
    );

    if (!isNewPeer) {
      return undefined;
    }

    const peer = new Peer(adnl.getStartTime(), peerAddr, peerFullId);
    const isKnownPeer = this.knownPeers.has(peerId);
    this.knownPeers.set(peerId, peer);

    if (!isKnownPeer) {
      this.buckets.insert(peerId, dhtPeer);
    } else {
      this.setGoodPeer(peerId);
    }

    return peerId;
  }

  /**
   * Updates DHT node status
   */
  public updatePeerStatus(peer: AdnlNodeIdShort, isGood: boolean): void {
    if (isGood) {
      this.setGoodPeer(peer);
    } else {
      if (this.penalties.has(peer)) {
        this.penalties.set(peer, this.penalties.get(peer)! + 2);
      } else {
        this.penalties.set(peer, 0);
      }
    }
  }

  private setGoodPeer(peer: AdnlNodeIdShort): void {
    if (this.penalties.has(peer)) {
      this.penalties.set(peer, this.penalties.get(peer)! - 1);
    }
  }

  private processFindNode(query: tonapi.dht_findNode): tonapi.dht_Nodes {
    const peerId = new AdnlNodeIdShort(new PublicKeyHash(query.key));
    return this.buckets.find(peerId, query.k);
  }

  private processFindValue(query: tonapi.dht_findValue): tonapi.dht_ValueResult {
    if (query.k === 0 || query.k > this.maxAllowedK) {
      throw new Error(`Invalid node count limit ${query.k} (max ${this.maxAllowedK})`);
    }

    const storageKey = new DhtStorageKeyId(query.key);
    const value = this.storage.get(storageKey);

    if (value) {
      return {
        kind: 'dht.valueFound',
        value: value,
      };
    } else {
      const nodes: tonapi.dht_Node[] = [];
      // TODO: replace buckets with knownPeers
      for (const bucket of this.buckets.values()) {
        for (const peer of bucket.values()) {
          nodes.push(peer);
          if (nodes.length >= query.k) {
            break;
          }
        }
      }
      return {
        kind: 'dht.valueNotFound',
        nodes: {
          kind: 'dht.nodes',
          nodes: nodes,
        }
      };
    }
  }

  private processStore(query: tonapi.dht_store): tonapi.dht_Stored {
    const isStored = this.storage.insert(query.value);

    if (!isStored) {
      throw new Error(`Value ${query.value} is not stored`);
    }

    return {
      kind: 'dht.stored',
    };
  }

  private readonly queryConsumers = {
    dht_ping: -873775336,
    dht_store: 882065938,
    dht_findNode: 1826803307,
    dht_findValue: -1370791919,
    dht_getSignedAddressList: -1451669267,
    dht_registerReverseConnection: 573357153,
    dht_requestReversePing: 194290698,
    dht_query: 2102593385,
  };

  public async tryConsumeQuery(ctx: SubscriberContext, constructor: number, query: Buffer): Promise<QueryConsumingResult> {
    switch (constructor) {

      case this.queryConsumers.dht_ping: {
        const reader = new TLReadBuffer(query);

        // skip constructor
        reader.readInt32();

        const ping = Codecs.dht_ping.decode(reader);
        const response = new TLWriteBuffer();
        Codecs.dht_Pong.encode({
          kind: 'dht.pong',
          randomId: ping.randomId
        }, response);
        return new QueryConsumingResult(QueryConsumingResultType.Consumed, response.build());
      }

      case this.queryConsumers.dht_findNode: {
        const reader = new TLReadBuffer(query);

        // skip constructor
        reader.readInt32();

        const findNode = Codecs.dht_findNode.decode(reader);
        const response = new TLWriteBuffer();
        const nodes = this.processFindNode(findNode);
        Codecs.dht_Nodes.encode(nodes, response);
        return new QueryConsumingResult(QueryConsumingResultType.Consumed, response.build());
      }

      case this.queryConsumers.dht_findValue: {
        const reader = new TLReadBuffer(query);

        // skip constructor
        reader.readInt32();

        const findValue = Codecs.dht_findValue.decode(reader);
        const response = new TLWriteBuffer();
        Codecs.dht_ValueResult.encode(this.processFindValue(findValue), response);
        return new QueryConsumingResult(QueryConsumingResultType.Consumed, response.build());
      }

      case this.queryConsumers.dht_getSignedAddressList: {
        const response = new TLWriteBuffer();
        Codecs.dht_Node.encode(this.signLocalNode(ctx.adnl.buildAddressList()), response);
        return new QueryConsumingResult(QueryConsumingResultType.Consumed, response.build());
      }

      case this.queryConsumers.dht_store: {
        const reader = new TLReadBuffer(query);

        // skip constructor
        reader.readInt32();

        const store = Codecs.dht_store.decode(reader);
        const response = new TLWriteBuffer();
        Codecs.dht_Stored.encode(this.processStore(store), response);
        return new QueryConsumingResult(QueryConsumingResultType.Consumed, response.build());
      }

      case this.queryConsumers.dht_query: {
        const reader = new TLReadBuffer(query);

        // skip constructor
        reader.readInt32();

        const data = Codecs.dht_query.decode(reader);

        await this.addDhtPeer(ctx.adnl, data.node);

        const subQuery = reader.readObject();
        const subConstructor = new TLReadBuffer(subQuery).readInt32();

        return await this.tryConsumeQuery(ctx, subConstructor, subQuery);
      }

      default: {
        return new QueryConsumingResult(QueryConsumingResultType.Rejected);
      }

    }
  }
}

export class DhtNodeMetrics {
  public readonly knownPeersLen: number;
  public readonly bucketPeerCount: number;
  public readonly storageLen: number;
  public readonly storageTotalSize: number;

  constructor(metrics: DhtNodeMetrics) {
    this.knownPeersLen = metrics.knownPeersLen;
    this.bucketPeerCount = metrics.bucketPeerCount;
    this.storageLen = metrics.storageLen;
    this.storageTotalSize = metrics.storageTotalSize;
  }
}
