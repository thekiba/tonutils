import {AdnlNodeIdShort} from "./adnl-node-id";
import {PrivateKey, PublicKey, SharedSecret} from "@tonutils/keys";
import {AdnlChannelId} from "./adnl-channel-id";

export enum ChannelCreationContext {
  CreateChannel,
  ConfirmChannel,
}

export enum ChannelReceiver {
  Ordinary,
  Priority,
}

export class Channel {
  private readonly channelKey: PrivateKey;
  private readonly channelOut: ChannelSide;
  private readonly channelIn: ChannelSide;
  private readonly localId: AdnlNodeIdShort;
  private readonly peerId: AdnlNodeIdShort;
  public readonly peerChannelPublicKey: PublicKey;
  public readonly peerChannelDate: number;
  public type: ChannelReceiver;
  public drop: number;
  public ready: boolean;

  constructor(localId: AdnlNodeIdShort,
              peerId: AdnlNodeIdShort,
              channelKey: PrivateKey,
              peerChannelPublicKey: PublicKey,
              peerChannelDate: number,
              context: ChannelCreationContext) {
    const sharedSecret = channelKey.computeSharedSecret(peerChannelPublicKey);
    const reversedSecret = sharedSecret.reverse();

    let inSecret;
    let outSecret;

    switch (localId.compare(peerId)) {
      case -1:
        inSecret = sharedSecret;
        outSecret = reversedSecret;
        break;
      case 0:
        inSecret = sharedSecret;
        outSecret = sharedSecret;
        break;
      case 1:
        inSecret = reversedSecret;
        outSecret = sharedSecret;
        break;
    }

    this.channelKey = channelKey;
    this.type = ChannelReceiver.Priority;
    this.ready = context === ChannelCreationContext.ConfirmChannel;
    this.channelOut = ChannelSide.fromSecret(outSecret);
    this.channelIn = ChannelSide.fromSecret(inSecret);
    this.localId = localId;
    this.peerId = peerId;
    this.peerChannelPublicKey = peerChannelPublicKey;
    this.peerChannelDate = peerChannelDate;
    this.drop = 0;
  }

  public isStillValid(peerChannelPublicKey: PublicKey, peerChannelDate: number): boolean {
    return this.peerChannelPublicKey.equals(peerChannelPublicKey) || this.peerChannelDate >= peerChannelDate;
  }

  public isReady(): boolean {
    return this.ready;
  }

  public setReady(): void {
    this.ready = true;
  }

  public setNotReady() {
    this.ready = false;
  }

  public getPeerChannelPublicKey(): PublicKey {
    return this.peerChannelPublicKey;
  }

  public getPeerChannelDate(): number {
    return this.peerChannelDate;
  }

  public getPriorityChannelInId(): AdnlChannelId {
    return this.channelIn.priority.id;
  }

  public getOrdinaryChannelInId(): AdnlChannelId {
    return this.channelIn.ordinary.id;
  }

  public getLocalId(): AdnlNodeIdShort {
    return this.localId;
  }

  public getPeerId(): AdnlNodeIdShort {
    return this.peerId;
  }

  public updateDropTimeout(now: number, timeout: number): boolean {
    if (this.drop === 0) {
      this.drop = now + timeout;
      return true;
    }
    return this.drop > 0 && this.drop < now;
  }

  public resetDropTimeout(): void {
    this.drop = 0;
  }

  public decrypt(buffer: Buffer, priority: boolean): Buffer {
    const channelIn = priority ? this.channelIn.priority : this.channelIn.ordinary;

    const decryptor = channelIn.secret.createDecryptor();

    const digest = buffer.subarray(32, 64);
    const encrypted = buffer.subarray(64);

    return decryptor.decrypt(digest, encrypted);
  }

  public encrypt(buffer: Buffer, priority: boolean): Buffer {
    const channelOut = priority ? this.channelOut.priority : this.channelOut.ordinary;

    const encryptor = channelOut.secret.createEncryptor();

    const { digest, encrypted } = encryptor.encrypt(buffer);

    return Buffer.concat([ channelOut.id.id.raw(), digest, encrypted ]);
  }

  public sign(buffer: Buffer): Buffer {
    return this.channelKey.createDecryptor(this.peerChannelPublicKey).sign(buffer);
  }
}

export class ChannelSide {
  public readonly ordinary: SubChannelSide;
  public readonly priority: SubChannelSide;

  constructor(ordinary: SubChannelSide, priority: SubChannelSide) {
    this.ordinary = ordinary;
    this.priority = priority;
  }

  static fromSecret(secret: SharedSecret): ChannelSide {
    const prioritySecret = secret.buildPrioritySecret();
    return new ChannelSide(
      new SubChannelSide(AdnlChannelId.computeChannelId(secret), secret),
      new SubChannelSide(AdnlChannelId.computeChannelId(prioritySecret), prioritySecret)
    );
  }
}

export class SubChannelSide {
  public readonly id: AdnlChannelId;
  public readonly secret: SharedSecret;

  constructor(id: AdnlChannelId, secret: SharedSecret) {
    this.id = id;
    this.secret = secret;
  }
}
