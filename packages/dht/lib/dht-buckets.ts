import {AdnlNodeIdShort, HashMap} from "@tonutils/adnl";
import {dht_Node, dht_Nodes} from "@tonutils/tl/dist/lib";
import {PublicKey} from "@tonutils/keys";

const BUCKETS_SIZE = 256;

/**
 * DHT nodes, distributed by max equal bits
 */
export class DhtBuckets {
  public readonly localId: AdnlNodeIdShort;

  private readonly buckets: Array<HashMap<AdnlNodeIdShort, dht_Node>>;

  constructor(localId: AdnlNodeIdShort) {
    this.localId = localId;
    this.buckets = new Array(BUCKETS_SIZE).fill(0).map(() => new HashMap<AdnlNodeIdShort, dht_Node>());
  }

  public get size(): number {
    return this.buckets.reduce((sum, bucket) => sum + bucket.size, 0);
  }

  /**
   * Returns iterator over all buckets, starting from the most distant
   */
  public values(): IterableIterator<HashMap<AdnlNodeIdShort, dht_Node>> {
    return this.buckets.values();
  }

  /**
   * Inserts DHT node into the bucket based on its distance
   */
  public insert(peerId: AdnlNodeIdShort, peer: dht_Node): void {
    const affinity = getAffinity(this.localId, peerId);
    const bucket = this.buckets[affinity];
    const existing = bucket.get(peerId);
    if (existing) {
      if (existing.version < peer.version) {
        bucket.set(peerId, peer);
      }
    } else {
      bucket.set(peerId, peer);
    }
  }

  /**
   * Finds `k` closest DHT nodes for the given `peer_id`
   */
  public find(peerId: AdnlNodeIdShort, k: number): dht_Nodes {
    const key1 = this.localId.serialize();
    const key2 = peerId.serialize();

    const nodes: dht_Node[] = [];

    for (let i = 0; i < 32; i++) {
      let distance = i * 8;
      let diff = key1[i] ^ key2[i];

      while (diff !== 0) {
        const equalBits = Math.clz32(diff);

        distance += equalBits;
        distance = distance % BUCKETS_SIZE;

        const bucket = this.buckets[distance];

        for (let item of bucket.values()) {
          nodes.push(item);
          if (nodes.length >= k) {
            // TODO: refactor this, return should be outside of the loop, but we need to break the outer loop
            const uniqueNodes = nodes.filter((node, index) => {
              return nodes.findIndex((innerNode) => {
                return new PublicKey(node.id).equals(new PublicKey(innerNode.id));
              }) === index;
            });

            return {
              kind: 'dht.nodes',
              nodes: uniqueNodes,
            };
          }
        }
        if (equalBits < 7) {
          diff <<= equalBits + 1;
          distance++;
        } else {
          continue;
        }
      }
    }

    return {
      kind: 'dht.nodes',
      nodes: nodes,
    };
  }
}

export function getAffinity(key1: AdnlNodeIdShort, key2: AdnlNodeIdShort): number {
  const key1Serialized = key1.serialize();
  const key2Serialized = key2.serialize();

  for (let i = 0; i < 32; i++) {
    const diff = key1Serialized[i] ^ key2Serialized[i];
    if (diff !== 0) {
      return (i * 8 + Math.clz32(diff)) % BUCKETS_SIZE as number;
    }
  }
  return BUCKETS_SIZE - 1;
}
