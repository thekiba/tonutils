import {HashMap, Serializable} from "@tonutils/adnl";
import * as tonapi from '@tonutils/tl';
import {Codecs, TLReadBuffer, TLWriteBuffer} from '@tonutils/tl';
import {PrivateKey, PublicKey, PublicKeyHash} from "@tonutils/keys";
import * as crypto from "crypto";

export class DhtStorageOptions {

  /**
   * The maximum length of the key name
   */
  public readonly maxKeyNameLen: number;

  /**
   * The maximum key index
   */
  public readonly maxKeyIndex: number;

  constructor(options: { maxKeyNameLen: number, maxKeyIndex: number }) {
    this.maxKeyNameLen = options.maxKeyNameLen;
    this.maxKeyIndex = options.maxKeyIndex;
  }
}

/**
 * Local DHT data storage
 */
export class DhtStorage {

  /**
   * The storage of DHT data
   */
  private readonly storage: HashMap<DhtStorageKeyId, tonapi.dht_Value>;

  /**
   * The storage options
   */
  private readonly options: DhtStorageOptions;

  constructor(options: DhtStorageOptions) {
    this.storage = new HashMap<DhtStorageKeyId, tonapi.dht_Value>();
    this.options = options;
  }


  /**
   * Returns the number of stored values
   */
  public get length(): number {
    return this.storage.size;
  }

  /**
   * Returns the total size of stored values in bytes
   */
  public get totalSize(): number {
    let totalSize = 0;
    for (const value of this.storage.values()) {
      totalSize += value.value.length;
    }
    return totalSize;
  }

  /**
   * Returns the value reference by key
   */
  public get(key: DhtStorageKeyId): tonapi.dht_Value | undefined {
    const value = this.storage.get(key);
    if (value && value.ttl > Math.round(Date.now() / 1000)) {
      return value;
    }
    return void 0;
  }

  /**
   * Inserts the value into the local storage, values with `dht.updateRule.anybody` can't be inserted
   */
  public insert(value: tonapi.dht_Value): boolean {
    const storageValue = DhtStorageValue.createFromTl(value);

    const isValueValid = this.validate(value);

    if (!isValueValid) {
      throw new Error('Invalid value');
    }

    switch (value.key.updateRule.kind) {
      case 'dht.updateRule.signature':
        return this.insertSignedValue(storageValue);
      case 'dht.updateRule.overlayNodes':
        return this.insertOverlayNodes(storageValue);
      case 'dht.updateRule.anybody':
      default:
        throw new Error('Unsupported update rule');
    }
  }

  public validate(value: tonapi.dht_Value): boolean {
    const storageValue = DhtStorageValue.createFromTl(value);

    if (storageValue.isExpired()) {
      throw new Error(`Value expired, ttl: ${storageValue.value.ttl}, now: ${Date.now()}`);
    }

    if (!(0 <= value.key.key.name.length && value.key.key.name.length <= this.options.maxKeyNameLen)
      || value.key.key.idx > this.options.maxKeyIndex) {
      throw new Error('Invalid key');
    }

    const equals = new PublicKey(value.key.id).computeShortId().equals(new PublicKeyHash(value.key.key.id));
    if (!equals) {
      throw new Error('Invalid key');
    }

    let isValueValid = false;
    switch (value.key.updateRule.kind) {
      case 'dht.updateRule.signature':
        isValueValid = this.validateSignedValue(storageValue);
        break;
      case 'dht.updateRule.overlayNodes':
        isValueValid = this.validateOverlayNodes(storageValue);
        break;
      case 'dht.updateRule.anybody':
      default:
        throw new Error('Unsupported update rule');
    }

    if (!isValueValid) {
      throw new Error('Invalid value');
    }

    return true;
  }

  /**
   * Removes all outdated values
   */
  public gc(): void {
    const now = Date.now();
    for (const [key, value] of this.storage.entries()) {
      if (value.ttl <= now) {
        const dhtStorageKeyId = new DhtStorageKeyId(Buffer.from(key, 'hex'));
        this.storage.delete(dhtStorageKeyId);
      }
    }
  }

  private validateSignedValue(value: DhtStorageValue): boolean {
    const publicKey = new PublicKey(value.value.key.id);
    const encryptor = publicKey.createEncryptor(new PrivateKey(PrivateKey.Ed25519.random().tl()));

    const key = DhtStorageKey.createFromTl(value.value.key);
    const keySignature = value.value.key.signature;

    if (!encryptor.checkSignature(key.serialize(), keySignature)) {
      throw new Error('Invalid key signature');
    }

    const valueSignature = value.value.signature;
    if (!encryptor.checkSignature(value.serialize(), valueSignature)) {
      throw new Error('Invalid value signature');
    }

    return true;
  }

  /**
   * Inserts signed value into the storage
   */
  private insertSignedValue(value: DhtStorageValue): boolean {
    const key = DhtStorageKey.createFromTl(value.value.key);
    const storageKey = key.toStorageKey();

    const existingValue = this.storage.get(storageKey);
    if (existingValue && existingValue.ttl < value.value.ttl) {
      this.storage.set(storageKey, value.value);
      return true;
    } else if (!existingValue) {
      this.storage.set(storageKey, value.value);
      return true;
    }
    return false;
  }

  private validateOverlayNodes(value: DhtStorageValue): boolean {
    if (value.value.signature.length || value.value.key.signature.length) {
      throw new Error('Invalid signature value');
    }

    const overlay = new PublicKey(value.value.key.id);
    if (!overlay.isOverlay()) {
      throw new Error('Invalid key description');
    }

    const overlayId = overlay.computeShortId();

    const requiredKey = DhtStorageKey.createFromTl({
      kind: 'dht.keyDescription',
      key: {
        kind: 'dht.key',
        name: Buffer.from('nodes', 'ascii'),
        id: overlayId.raw(),
        idx: 0,
      },
      id: overlay.tl(),
      updateRule: {
        kind: 'dht.updateRule.overlayNodes',
      },
      signature: value.value.key.signature,
    });
    const receivedKey = DhtStorageKey.createFromTl(value.value.key)

    if (!receivedKey.equals(requiredKey)) {
      throw new Error('Invalid DHT key');
    }

    const newNodes = deserializeOverlayNodes(value.value.value);
    const validNodes = newNodes.nodes.filter((node) => {
      if (!node.overlay.equals(overlayId.raw())) {
        console.warn(`Overlay ID mismatch: ${node.overlay.toString('hex')} !== ${overlayId.raw().toString('hex')}`);
        return false;
      }

      const publicKey = new PublicKey(node.id);
      const peerId = publicKey.computeShortId();

      const nodeToSign = new TLWriteBuffer();
      Codecs.overlay_node_ToSign.encode({
        kind: 'overlay.node.toSign',
        id: {
          kind: 'adnl.id.short',
          id: peerId.raw(),
        },
        overlay: node.overlay,
        version: node.version,
      }, nodeToSign);

      const signature = node.signature;
      const encryptor = publicKey.createEncryptor(new PrivateKey(PrivateKey.Ed25519.random().tl()));

      if (!encryptor.checkSignature(nodeToSign.build(), signature)) {
        console.warn(`Invalid signature for node: ${new PublicKey(node.id).computeShortId().serialize()}`);
        return false;
      }

      return true;
    });

    if (!validNodes.length) {
      throw new Error('Empty overlay nodes');
    }

    return true;
  }

  /**
   * Special case of inserting overlay nodes value.
   *
   * It requires empty signatures and special update rule
   */
  private insertOverlayNodes(value: DhtStorageValue): boolean {
    const key = DhtStorageKey.createFromTl(value.value.key);
    const storageKey = key.toStorageKey();

    // TODO: implement making overlay nodes value logic, for now just insert
    const existingValue = this.storage.get(storageKey);
    if (existingValue && existingValue.ttl < value.value.ttl) {
      this.storage.set(storageKey, value.value);
      return true;
    }

    if (!existingValue) {
      this.storage.set(storageKey, value.value);
      return true;
    }

    return false;
  }

}

function deserializeOverlayNodes(data: Buffer): tonapi.overlay_Nodes {
  return Codecs.overlay_Nodes.decode(new TLReadBuffer(data));
}

export class DhtStorageKeyId implements Serializable {
  public readonly key: Buffer;

  constructor(key: Buffer) {
    this.key = key;
  }

  serialize(): Buffer {
    return this.key;
  }

  equals(other: DhtStorageKeyId): boolean {
    return this.key.equals(other.key);
  }
}

export class DhtStorageKey implements Serializable {
  public readonly keyDescription: tonapi.dht_KeyDescription;

  private readonly rawKeyDescription: Buffer;

  constructor(rawKeyDescription: Buffer) {
    this.rawKeyDescription = rawKeyDescription;
    this.keyDescription = Codecs.dht_KeyDescription.decode(new TLReadBuffer(rawKeyDescription));
  }

  static createFromTl(key: tonapi.dht_KeyDescription): DhtStorageKey {
    const writer = new TLWriteBuffer();
    Codecs.dht_KeyDescription.encode(key, writer);
    return new DhtStorageKey(writer.build());
  }

  serialize(): Buffer {
    const writer = new TLWriteBuffer();
    Codecs.dht_KeyDescription.encode({
      ...this.keyDescription,
      signature: Buffer.alloc(0)
    }, writer);
    return writer.build();
  }

  equals(other: DhtStorageKey): boolean {
    return this.rawKeyDescription.equals(other.rawKeyDescription);
  }

  toStorageKey(): DhtStorageKeyId {
    const writer = new TLWriteBuffer();
    Codecs.dht_Key.encode(this.keyDescription.key, writer);

    const digest = crypto.createHash('sha256').update(writer.build()).digest();
    return new DhtStorageKeyId(digest);
  }
}

export class DhtStorageValue implements Serializable {
  public readonly value: tonapi.dht_Value;

  private readonly rawValue: Buffer;

  constructor(value: Buffer) {
    this.rawValue = value;
    this.value = Codecs.dht_Value.decode(new TLReadBuffer(value));
  }

  static createFromTl(value: tonapi.dht_Value): DhtStorageValue {
    const writer = new TLWriteBuffer();
    Codecs.dht_Value.encode(value, writer);
    return new DhtStorageValue(writer.build());
  }

  serialize(): Buffer {
    const writer = new TLWriteBuffer();
    Codecs.dht_Value.encode({
      ...this.value,
      signature: Buffer.alloc(0)
    }, writer);
    return writer.build();
  }

  isExpired(): boolean {
    if (this.value.ttl === 0) {
      return false;
    }

    return this.value.ttl <= Math.round(Date.now() / 1000);
  }
}
