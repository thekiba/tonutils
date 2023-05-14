import {SocketAddrV4} from "./socket";
import {EventEmitter} from "events";
import {AdnlNode} from "./adnl-node";
import {AdnlNodeIdShort} from "./adnl-node-id";

export class PacketToSend {
  constructor(
    public readonly destination: SocketAddrV4,
    public readonly data: Buffer,
  ) {
  }
}

export interface SenderQueue {
  emit(event: 'send', packet: PacketToSend): boolean;
  on(event: 'send', listener: (packet: PacketToSend) => void): this;
  once(event: 'send', listener: (packet: PacketToSend) => void): this;
  off(event: 'send', listener: (packet: PacketToSend) => void): this;
}

export class SenderQueue extends EventEmitter {}

export interface MessageSubscriber {
  tryConsumeCustom(
    ctx: SubscriberContext,
    constructor: number,
    data: Buffer,
  ): Promise<boolean>;
}

export interface QuerySubscriber {
  tryConsumeQuery(
    ctx: SubscriberContext,
    constructor: number,
    query: Buffer,
  ): Promise<QueryConsumingResult>;
}

export interface SubscriberContext {
  adnl: AdnlNode;
  localId: AdnlNodeIdShort;
  peerId: AdnlNodeIdShort;
}

export enum QueryConsumingResultType {
  Consumed,
  Rejected,
}

export class QueryConsumingResult {
  constructor(
    public readonly type: QueryConsumingResultType,
    public readonly answer?: Buffer,
  ) {
  }
}
