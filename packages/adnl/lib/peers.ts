import {AdnlNodeIdFull, AdnlNodeIdShort} from "./adnl-node-id";
import {HashMap} from "./utils";
import {PrivateKey} from "@tonutils/keys";
import {PacketsHistory} from "./packets-history";
import {SocketAddrV4} from "./socket";

export class Peers extends HashMap<AdnlNodeIdShort, Peer> {

}

export enum NewPeerContext {
  AdnlPacket,
  Dht,
  PublicOverlay,
}

export type PeerFilter = (ctx: NewPeerContext, addr: SocketAddrV4, peerId: AdnlNodeIdShort) => boolean;

export class Peer {
  public readonly id: AdnlNodeIdFull;
  public addr: SocketAddrV4;
  public channelKey: PrivateKey;
  public receiverState: PeerState;
  public senderState: PeerState;

  constructor(localReinitDate: number, addr: SocketAddrV4, id: AdnlNodeIdFull) {
    this.id = id;
    this.addr = addr;
    this.channelKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
    this.receiverState = PeerState.forReceiveWithReinitDate(localReinitDate);
    this.senderState = PeerState.forSend();
  }

  tryReinitSender(reinitDate: number): boolean {
    const senderReinitDate = this.senderState.getReinitDate();
    if (reinitDate <= senderReinitDate) {
      return false;
    }
    this.senderState.setReinitDate(reinitDate);
    if (senderReinitDate !== 0) {
      this.senderState.history(false).reset();
      this.senderState.history(true).reset();
      this.receiverState.history(false).reset();
      this.receiverState.history(true).reset();
    }
    return true;
  }

  getId(): AdnlNodeIdShort {
    return this.id;
  }

  getAddr(): SocketAddrV4 {
    return this.addr;
  }

  setAddr(addr: SocketAddrV4): void {
    this.addr = addr;
  }

  getChannelKey(): PrivateKey {
    return this.channelKey;
  }

  getReceiverState(): PeerState {
    return this.receiverState;
  }

  getSenderState(): PeerState {
    return this.senderState;
  }

  reset(): void {
    const reinitDate = this.receiverState.getReinitDate();
    this.channelKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
    this.receiverState = PeerState.forReceiveWithReinitDate(reinitDate + 1);
    this.senderState = PeerState.forSend();
  }
}

export class PeerState {
  constructor(
    private readonly ordinaryHistory: PacketsHistory,
    private readonly priorityHistory: PacketsHistory,
    public reinitDate: number,
  ) {
  }

  public static forReceiveWithReinitDate(reinitDate: number): PeerState {
    return new PeerState(
      PacketsHistory.forReceive(),
      PacketsHistory.forReceive(),
      reinitDate,
    );
  }

  public static forSend(): PeerState {
    return new PeerState(
      PacketsHistory.forSend(),
      PacketsHistory.forSend(),
      0,
    );
  }

  public history(priority: boolean): PacketsHistory {
    // TODO: fix priority logic
    priority = false;
    return priority ? this.priorityHistory : this.ordinaryHistory;
  }

  public getReinitDate(): number {
    return this.reinitDate;
  }

  public setReinitDate(reinitDate: number): void {
    this.reinitDate = reinitDate;
  }
}
