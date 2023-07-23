import {Peer} from "@tonutils/adnl";

export type NodePriority = {
  id: string;
  peer: Peer;
  priority: number;
  next: NodePriority | null;
  used: boolean;
}

export class PriorityList {
  public maxLen: number;
  public targetId: Buffer;
  public list: NodePriority | null;

  constructor(maxLen: number, targetId: Buffer) {
    this.maxLen = maxLen;
    this.targetId = targetId;
    this.list = null;
  }

  public addPeer(peer: Peer): boolean {
    const id = peer.getId().serialize().toString("hex");

    const item: NodePriority = {
      id,
      peer: peer,
      priority: this.weight(peer.getId().serialize(), this.targetId),
      next: null,
      used: false,
    };

    if (this.list == null) {
      this.list = item;
      return true;
    }

    let prev: NodePriority | null = null;
    let cur: NodePriority | null = this.list;

    let i = 0;
    while (cur != null) {
      if (i > this.maxLen) {
        return false;
      }
      i++;

      if (cur.id === item.id) {
        return false;
      }

      if (item.priority > cur.priority) {
        item.next = cur;
        if (prev != null) {
          prev.next = item;
        } else {
          this.list = item;
        }
        break;
      }

      if (cur.next == null) {
        cur.next = item;
        break;
      }

      prev = cur;
      cur = cur.next;
    }

    // check all nodes again to find if we already have it in list,
    // if yes, we need to leave only the most prioritized
    let saw = false;
    prev = null;
    cur = this.list;
    while (cur != null) {
      if (cur.id === id) {
        if (saw && prev) {
          // remove it from the list
          prev.next = cur.next;
        } else {
          saw = true;
        }
      }
      prev = cur;
      cur = cur.next;
    }

    return true;
  }

  public getNode(): [Peer | null, number] {
    let res = this.list;
    while (res != null && res.used) {
      res = res.next;
    }

    if (res == null) {
      return [null, 0];
    }
    res.used = true;

    return [res.peer, res.priority];
  }

  public markNotUsed(peer: Peer) {
    const id = peer.getId().serialize().toString("hex");

    let curNode = this.list;
    while (curNode != null) {
      if (curNode.id === id) {
        curNode.used = false;
        break;
      }
      curNode = curNode.next;
    }
  }

  private weight(peerId: Buffer, targetId: Buffer): number {
    const w = leadingZeroBits(xor(targetId, peerId));
    return (w << 20);
  }
}

export class PriorityListBuilder {
  private readonly K;
  private readonly plist: PriorityList;
  private readonly id: Buffer;

  constructor(id: Buffer, k: number = 10) {
    this.id = id;
    this.K = k;
    this.plist = new PriorityList(this.K, id);
  }

  public addPeer(peer: Peer) {
    this.plist.addPeer(peer);
  }

  public build(): PriorityList {
    return this.plist;
  }
}

export function xor(a: Buffer, b: Buffer): Buffer {
  const result = Buffer.alloc(a.length);
  let n = a.copy(result);

  for (let i = 0; i < n; i++) {
    result[i] ^= b[i];
  }

  return result;
}

export function leadingZeroBits(data: Buffer): number {
  for (let i = 0; i < data.length; i++) {
    const b = data[i];
    if (b & 0b10000000) {
      return i * 8 + 0;
    } else if (b & 0b1000000) {
      return i * 8 + 1;
    } else if (b & 0b100000) {
      return i * 8 + 2;
    } else if (b & 0b10000) {
      return i * 8 + 3;
    } else if (b & 0b1000) {
      return i * 8 + 4;
    } else if (b & 0b100) {
      return i * 8 + 5;
    } else if (b & 0b10) {
      return i * 8 + 6;
    } else if (b & 0b1) {
      return i * 8 + 7;
    }
  }
  return data.length * 8;
}
