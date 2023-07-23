import * as tonapi from "@tonutils/tl";
import {Serializable} from "./adnl-node-id";
import {AddressInfo} from "net";

export class SocketAddrV4 implements Serializable {
  constructor(
    public protocol: 'udp',
    public ip: string,
    public port: number,
  ) {
  }

  public static createFromAddressList(addressList: tonapi.adnl_AddressList, clockToleranceSec?: number) {
    if (addressList.addrs.length === 0) {
      throw new Error("Empty address list");
    }

    // ignore check expiration if expireAt is 0
    if (clockToleranceSec && addressList.expireAt > 0) {
      const now = Math.floor(Date.now() / 1000);

      if (addressList.expireAt < now - clockToleranceSec || addressList.expireAt > now + clockToleranceSec) {
        throw new Error(`Address list expired: ${addressList.expireAt} (now: ${now}, clockToleranceSec: ${clockToleranceSec})`);
      }
    }

    const addr = addressList.addrs.find(addr => addr.kind === "adnl.address.udp");

    if (!addr) {
      throw new Error("No UDP address found");
    }

    return SocketAddrV4.createFromTl(addr);
  }

  public static createFromAddressInfo(rinfo: AddressInfo) {
    return new SocketAddrV4('udp', rinfo.address, rinfo.port);
  }

  public static createFromTl(tl: tonapi.adnl_Address) {
    if (tl.kind !== "adnl.address.udp") {
      throw new Error("Unsupported address type: " + tl.kind);
    }

    const ip = SocketAddrV4.intToIP(tl.ip);
    const port = tl.port;
    return new SocketAddrV4('udp', ip, port);
  }

  private static intToIP(int: number): string {
    const part1 = int & 255;
    const part2 = ((int >> 8) & 255);
    const part3 = ((int >> 16) & 255);
    const part4 = ((int >> 24) & 255);

    return part4 + "." + part3 + "." + part2 + "." + part1;
  }

  public static ipToInt(ip: string): number {
    const parts = ip.split(".");
    return (parseInt(parts[0]) << 24) + (parseInt(parts[1]) << 16) + (parseInt(parts[2]) << 8) + parseInt(parts[3]);
  }

  setIp(ip: string): void {
    this.ip = ip;
  }

  setPort(port: number): void {
    this.port = port;
  }

  tl(): tonapi.adnl_Address {
    return {
      kind: 'adnl.address.udp',
      ip: SocketAddrV4.ipToInt(this.ip),
      port: this.port
    };
  }

  equals(socketAddr: SocketAddrV4) {
    return this.ip === socketAddr.ip && this.port === socketAddr.port;
  }

  isLoopback() {
    return this.ip === '127.0.0.1';
  }

  serialize(): Buffer {
    return Buffer.concat([
      Buffer.from(this.protocol),
      Buffer.from(this.ip),
      Buffer.from(this.port.toString())
    ]);
  }
}
