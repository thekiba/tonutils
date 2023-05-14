import {PrivateKey, PublicKey, PublicKeyHash, SharedSecret} from "@tonutils/keys";
import {Serializable} from "./adnl-node-id";

export class AdnlChannelId implements Serializable {
  public readonly id: PublicKeyHash;

  constructor(id: PublicKeyHash) {
    this.id = id;
  }

  static computeChannelId(privateKey: SharedSecret): AdnlChannelId {
    return new AdnlChannelId(privateKey.computeShortId());
  }

  public serialize(): Buffer {
    return this.id.raw();
  }
}
