import {PublicKey, PublicKeyHash} from "@tonutils/keys";
import {crc16, base32Encode, base32Decode} from "ton-core";

export interface Serializable {
  serialize(): Buffer;
}

export class AdnlNodeIdShort implements Serializable {
  constructor(public readonly hash: PublicKeyHash) {
  }

  public static zero(): AdnlNodeIdShort {
    return new AdnlNodeIdShort(PublicKeyHash.zero());
  }

  public is_zero(): boolean {
    return this.hash.isZero();
  }

  public static parse(key: string): AdnlNodeIdShort {
    const id = adnlIdDecode(key);
    return new AdnlNodeIdShort(new PublicKeyHash(id));
  }

  public serialize(): Buffer {
    return this.hash.raw();
  }

  public compare(other: AdnlNodeIdShort): -1 | 0 | 1 {
    return this.hash.compare(other.hash);
  }

  public equals(other: AdnlNodeIdShort): boolean {
    return this.hash.equals(other.hash);
  }
}

export class AdnlNodeIdFull extends AdnlNodeIdShort implements Serializable {
  constructor(public readonly pub: PublicKey) {
    super(pub.computeShortId());
  }

  public static create(pub: PublicKey): AdnlNodeIdFull {
    return new AdnlNodeIdFull(pub);
  }

  public empty(): boolean {
    return this.pub.raw().equals(Buffer.alloc(32));
  }

  public computeShortId(): AdnlNodeIdShort {
    return new AdnlNodeIdShort(this.pub.computeShortId());
  }

  public serialize(): Buffer {
    return this.computeShortId().serialize();
  }
}

export function adnlIdEncode(id: Buffer, upperCase: boolean): string {
  if (id.length != 32) {
    throw new Error("Wrong andl id size");
  }
  const buf = Buffer.alloc(35);
  buf[0] = 0x2d;
  id.copy(buf, 1);
  const hash = parseInt(crc16(buf.subarray(0, 33)).toString('hex'), 16);
  buf[33] = (hash >> 8) & 255;
  buf[34] = hash & 255;
  const encoded = base32Encode(buf).slice(1);
  return upperCase ? encoded.toUpperCase() : encoded;
}

export function adnlIdDecode(id: string): Buffer {
  if (id.length != 55) {
    throw new Error("Wrong length of adnl id");
  }
  const buf = Buffer.alloc(56);
  buf[0] = 0x66;
  Buffer.from(id).copy(buf, 1);
  const decoded = base32Decode(buf.toString('ascii'));
  if (decoded[0] != 0x2d) {
    throw new Error("Invalid first byte");
  }
  const gotHash = (decoded[33] << 8) | decoded[34];
  const hash = parseInt(crc16(decoded.subarray(0, 33)).toString('hex'), 16);
  if (hash != gotHash) {
    throw new Error("Hash mismatch");
  }
  return decoded.subarray(1, 33);
}
