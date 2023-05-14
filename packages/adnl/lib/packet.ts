import {TLWriteBuffer, TLReadBuffer, adnl_PacketContents, Codecs} from "@tonutils/tl";

export enum AdnlPacketFlags {
  from = 1 << 0,
  fromShort = 1 << 1,
  message = 1 << 2,
  messages = 1 << 3,
  address = 1 << 4,
  priorityAddress = 1 << 5,
  seqno = 1 << 6,
  confirmSeqno = 1 << 7,
  recvAddrListVersion = 1 << 8,
  recvPriorityAddrListVersion = 1 << 9,
  reinitDate = 1 << 10,
  signature = 1 << 11,
}

export class AdnlPacketContents {
  public packet: adnl_PacketContents;

  private constructor(packet: adnl_PacketContents) {
    this.packet = packet;
  }

  static createPacket(src: Exclude<Partial<adnl_PacketContents>, 'flags' | 'kind'>): AdnlPacketContents {
    const flags = AdnlPacketContents.getFlags(src);
    const packet: adnl_PacketContents = Object.assign({
      kind: 'adnl.packetContents',
      rand1: void 0,
      flags: void 0,
      from: void 0,
      fromShort: void 0,
      message: void 0,
      messages: void 0,
      address: void 0,
      priorityAddress: void 0,
      seqno: void 0,
      confirmSeqno: void 0,
      recvAddrListVersion: void 0,
      recvPriorityAddrListVersion: void 0,
      reinitDate: void 0,
      dstReinitDate: void 0,
      signature: void 0,
      rand2: void 0
    }, src, {
      flags,
    });

    return new AdnlPacketContents(packet);
  }

  sign(signature: Buffer): this {
    this.packet = Object.assign(this.packet, {
      signature,
    });

    this.packet = Object.assign(this.packet, {
      flags: AdnlPacketContents.getFlags(this.packet as Exclude<Partial<adnl_PacketContents>, "flags" | "kind">),
    });

    return this;
  }

  build(): Buffer {
    const buffer = new TLWriteBuffer();
    Codecs.adnl_PacketContents.encode(this.packet, buffer);
    return buffer.build();
  }

  private static getFlags(src: Exclude<Partial<adnl_PacketContents>, 'flags' | 'kind'>) {
    let flags = 0;
    if (src.from) {
      flags |= AdnlPacketFlags.from;
    }
    if (src.fromShort) {
      flags |= AdnlPacketFlags.fromShort;
    }
    if (src.message) {
      flags |= AdnlPacketFlags.message;
    }
    if (src.messages) {
      flags |= AdnlPacketFlags.messages;
    }
    if (src.address) {
      flags |= AdnlPacketFlags.address;
    }
    if (src.priorityAddress) {
      flags |= AdnlPacketFlags.priorityAddress;
    }
    if (src.seqno) {
      flags |= AdnlPacketFlags.seqno;
    }
    if (src.confirmSeqno) {
      flags |= AdnlPacketFlags.confirmSeqno;
    }
    if (src.recvAddrListVersion) {
      flags |= AdnlPacketFlags.recvAddrListVersion;
    }
    if (src.recvPriorityAddrListVersion) {
      flags |= AdnlPacketFlags.recvPriorityAddrListVersion;
    }
    if (src.reinitDate || src.dstReinitDate) {
      if (!src.reinitDate || !src.dstReinitDate) {
        throw new Error('Both reinitDate and dstReinitDate must be set');
      }
      flags |= AdnlPacketFlags.reinitDate;
    }
    if (src.signature) {
      flags |= AdnlPacketFlags.signature;
    }

    return flags;
  }
}
