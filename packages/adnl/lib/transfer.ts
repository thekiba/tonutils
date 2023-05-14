import * as crypto from 'crypto';
import {Serializable} from "./adnl-node-id";

export class TransferId implements Serializable {
  public readonly hash: Buffer;

  constructor(hash: Buffer) {
    this.hash = hash;
  }

  serialize(): Buffer {
    return this.hash;
  }
}

/**
 * Multipart transfer, used to collect multiple values of ADNL `Part` messages.
 */
export class Transfer {
  public readonly transferId: TransferId;
  private readonly parts: Map<number, Buffer>;
  private readonly totalLen: number;
  private receivedLen: number;
  private timings: number;

  constructor(transferId: TransferId, totalLen: number) {
    this.transferId = transferId;
    this.parts = new Map();
    this.receivedLen = 0;
    this.totalLen = totalLen;
    this.timings = Date.now();
  }

  public getTimings(): number {
    return this.timings;
  }

  /**
   * Tries to add new part to the transfer at given offset, will return false if part at given offset already exists
   */
  public addPart(offset: number, data: Buffer, transferId: TransferId): Buffer | false {
    // check if it is the same transfer
    if (!this.transferId.hash.equals(transferId.hash)) {
      return false;
    }

    const len = data.length;

    // check if it the part is already received, if so, do nothing
    if (this.parts.has(offset)) {
      return false;
    }

    this.parts.set(offset, data);

    // increase received length.
    // this part heavily relies on ordering, so hope that it works as expected
    this.receivedLen += len;

    // check if it is equal to the total length and make sure it will be big enough to fail next check on success
    if (this.receivedLen !== this.totalLen) {
      return false;
    }

    // combine all parts
    let received = 0;
    const buffer = Buffer.alloc(this.totalLen);
    while (received < this.totalLen) {
      const data = this.parts.get(received);
      if (data) {
        data.copy(buffer, received);
        received += data.length;
      } else {
        console.warn(`Part at offset ${received} not found`);

        return false;
      }
    }

    // get sha265 of the data and compare it with the hash
    const digest = crypto.createHash('sha256').update(buffer).digest();
    if (!digest.equals(transferId.hash)) {
      console.trace(`Hash mismatch: ${digest.toString('hex')} != ${transferId.hash.toString('hex')}`);
      return false;
    }

    return buffer;
  }

  isExpired(transferTimeoutSec: number): boolean {
    return Date.now() - this.timings > transferTimeoutSec * 1000;
  }

  refresh() {
    this.timings = Date.now();
  }
}
