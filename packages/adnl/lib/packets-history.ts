const HISTORY_BITS = 512;
const HISTORY_SIZE = HISTORY_BITS / 64;

const INDEX_MASK = HISTORY_BITS / 2 - 1;
const IN_TRANSIT = 0xFFFFFFFFFFFFFFFF;

export class HistoryBits {
  public index: number = 0;
  public readonly bits: number[] = [];
  constructor() {
  }
}

export class PacketsHistory {
  constructor(
    public readonly mask: HistoryBits | null,
    public seqno: number,
  ) {
  }

  public static forSend(): PacketsHistory {
    return new PacketsHistory(null, 0);
  }

  public static forReceive(): PacketsHistory {
    return new PacketsHistory(new HistoryBits(), 0);
  }

  public reset(): void {
    if (this.mask !== null) {
      while (true) {
        const index = this.mask.index;
        if (index === IN_TRANSIT) {
          continue;
        }

        if (this.mask.index !== index) {
          continue;
        }
        break;
      }

      for (let i = 0; i < HISTORY_SIZE; i++) {
        this.mask.bits[i] = i === HISTORY_SIZE / 2 ? 1 : 0;
      }
    }

    this.seqno = 0;

    if (this.mask !== null) {
      this.mask.index = 0;
    }
  }

  public getSeqno(): number {
    return this.seqno;
  }

  public bumpSeqno(): number {
    return ++this.seqno;
  }

  public deliverPacket(seqno: number): boolean {
    if (this.mask === null) {
      if (this.seqno < seqno) {
        this.seqno = seqno;
      }
      return true;
    }

    const seqnoMasked = seqno & INDEX_MASK;
    const seqnoNormalized = seqno & ~INDEX_MASK;


    while (true) {
      const index = this.mask.index;
      if (index === IN_TRANSIT) {
        continue;
      }

      const indexMasked = index & INDEX_MASK;
      const indexNormalized = index & ~INDEX_MASK;

      if (indexNormalized > seqnoNormalized + INDEX_MASK + 1) {
        return false;
      }

      const maskBit = 1 << (seqnoMasked % 64);
      let maskOffset: number | null = null;
      if (indexNormalized > seqnoNormalized) {
        maskOffset = 0;
      } else if (indexNormalized === seqnoNormalized) {
        maskOffset = HISTORY_SIZE / 2;
      } else {
        maskOffset = null;
      }

      let nextIndex: number = 0;
      if (maskOffset !== null) {
        const maskOffsetAsNumber = maskOffset as number;
        const alreadyDelivered =
          this.mask.bits[maskOffsetAsNumber] & maskBit;
        if (this.mask.index !== index) {
          continue;
        }
        if (alreadyDelivered !== 0) {
          return false;
        }
        this.mask.index = IN_TRANSIT;
        this.mask.bits[maskOffsetAsNumber] = this.mask.bits[maskOffsetAsNumber] | maskBit;
        nextIndex = index;
      }

      const lastIndex = this.seqno;
      if (lastIndex < seqno) {
        this.seqno = seqno;
      }

      const indexMaskedIncremented = (indexMasked + 1) & ~INDEX_MASK;
      this.mask.index = nextIndex | indexMaskedIncremented;
      break;
    }
    return true;
  }
}

