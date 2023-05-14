import {Serializable} from "./adnl-node-id";

export class HashMap<T extends Serializable, V> {

  private readonly map: Map<string, V> = new Map<string, V>();

  public get size(): number {
    return this.map.size;
  }

  public delete(key: T): boolean {
    const index = key.serialize().toString('hex');
    return this.map.delete(index);
  }

  public get(key: T): V | undefined {
    const index = key.serialize().toString('hex');
    return this.map.get(index);
  }

  public has(key: T): boolean {
    const index = key.serialize().toString('hex');
    return this.map.has(index);
  }

  public set(key: T, value: V): this {
    const index = key.serialize().toString('hex');
    this.map.set(index, value);
    return this;
  }

  public values(): ReadonlyArray<V> {
    return Array.from(this.map.values());
  }

  public keys(): ReadonlyArray<string> {
    return Array.from(this.map.keys());
  }

  public entries(): ReadonlyArray<[string, V]> {
    return Array.from(this.map.entries());
  }
}

export type DataTx = (data: Buffer) => void;
export type DataRx = Promise<Buffer>;

export function createDataPromise(): [DataTx, DataRx] {
  let resolve: (data: Buffer) => void;
  let reject: (err: Error) => void;
  const promise = new Promise<Buffer>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return [(data: Buffer) => resolve(data), promise];
}

export function genFastBytes(size: number): Buffer {
  const buf = Buffer.alloc(size);
  for (let i = 0; i < size; i++) {
    buf[i] = Math.floor(Math.random() * 256);
  }
  return buf;
}
