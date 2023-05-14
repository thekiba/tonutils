import * as tonapi from '@tonutils/tl';
import {TLWriteBuffer, TLReadBuffer, Codecs} from '@tonutils/tl';
import crypto from "crypto";
import nacl from 'tweetnacl';
import ed2curve from "ed2curve";
import {Decryptor, DecryptorAES, DecryptorSharedSecret, Encryptor, EncryptorSharedSecret} from "./encryptor";

/**
 * This class represents a public key hash.
 */
export class PublicKeyHash {
  private readonly hash: Buffer;

  /**
   * Creates a new instance of PublicKeyHash. If no value is provided, the hash is initialized to zero.
   * @throws {Error} - If the value is not a buffer of length 32.
   * @example
   * const hash = new PublicKeyHash();
   * const hash = new PublicKeyHash(Buffer.alloc(32));
   */
  constructor(value?: Buffer) {
    if (value instanceof Buffer) {
      if (value.length === 32) {
        this.hash = value;
      } else {
        throw new Error(`Invalid public key hash length: ${value.length}, expected 32`);
      }
    } else {
      this.hash = Buffer.alloc(32);
    }
  }

  /**
   * Returns a new instance of PublicKeyHash with a value of zero.
   * @example
   * const zero = PublicKeyHash.zero();
   */
  static zero(): PublicKeyHash {
    return new PublicKeyHash();
  }

  /**
   * Returns the raw public key hash.
   */
  public raw(): Buffer {
    return this.hash;
  }

  /**
   * Returns the public key hash as a hex string. This is the same as calling hash.toString('hex').
   */
  public serialize(): string {
    return this.hash.toString('hex');
  }

  /**
   * Returns 0 if the hashes are equal, -1 if this hash is less than the other hash, or 1 if this hash is greater than the other hash.
   */
  public compare(other: PublicKeyHash): -1 | 0 | 1 {
    return this.hash.compare(other.hash);
  }

  /**
   * Returns true if the hash is less than the other hash.
   * @example
   * const lessThan = hash.lessThan(other); // true or false
   */
  public lessThan(other: PublicKeyHash): boolean {
    return this.hash.compare(other.hash) < 0;
  }

  /**
   * Returns true if the hash is equal to the other hash.
   * @example
   * const equals = hash.equals(other); // true or false
   */
  public equals(other: PublicKeyHash): boolean {
    return this.hash.compare(other.hash) === 0;
  }

  /**
   * Returns true if the hash is not equal to the other hash.
   * @example
   * const notEquals = hash.notEquals(other); // true or false
   */
  public notEquals(other: PublicKeyHash): boolean {
    return this.hash.compare(other.hash) !== 0;
  }

  /**
   * Returns true if the hash is zero.
   * @example
   * const isZero = hash.isZero(); // true or false
   */
  public isZero(): boolean {
    return this.hash.equals(Buffer.alloc(32));
  }
}

/**
 * This class represents a public key.
 */
export class PublicKey {
  private readonly publicKey: PublicKey.Ed25519 | PublicKey.AES | PublicKey.Unenc | PublicKey.Overlay;

  /**
   * Creates a new instance of PublicKey.
   * @throws {Error} - If the public key is not a buffer of length 32.
   * @throws {Error} - If the public key kind is invalid.
   * @example
   * const publicKey = new PublicKey({ kind: 'pub.ed25519', key: Buffer.alloc(32) });
   * const publicKey = new PublicKey({ kind: 'pub.aes', key: Buffer.alloc(32) });
   * const publicKey = new PublicKey({ kind: 'pub.unenc', data: Buffer.alloc(32) });
   * const publicKey = new PublicKey({ kind: 'pub.overlay', name: Buffer.alloc(32) });
   */
  constructor(publicKey: tonapi.PublicKey) {
    switch (publicKey.kind) {
      case 'pub.ed25519':
        this.publicKey = new PublicKey.Ed25519(publicKey);
        break;
      case 'pub.aes':
        this.publicKey = new PublicKey.AES(publicKey);
        break;
      case 'pub.unenc':
        this.publicKey = new PublicKey.Unenc(publicKey);
        break;
      case 'pub.overlay':
        this.publicKey = new PublicKey.Overlay(publicKey);
        break;
      default:
        throw new Error(`Invalid public key kind: ${publicKey['kind']}`);
    }
  }

  /**
   * Computes the short id of the public key.
   * @example
   * const shortId = publicKey.computeShortId();
   */
  public computeShortId(): PublicKeyHash {
    const pub = new TLWriteBuffer();
    Codecs.PublicKey.encode(this.publicKey.tl(), pub);
    const digest = crypto.createHash('sha256').update(pub.build()).digest();
    return new PublicKeyHash(digest);
  }

  /**
   * Returns the raw public key.
   * @example
   * const raw = publicKey.raw();
   */
  public raw(): Buffer {
    return this.publicKey.raw();
  }

  /**
   * Computes the E2E curve of the public key.
   */
  public computeCurve(): Uint8Array {
    return this.publicKey.computeCurve();
  }

  /**
   * Returns the kind of the public key.
   * @example
   * const kind = publicKey.kind();
   */
  public kind(): tonapi.PublicKey['kind'] {
    return this.publicKey.kind();
  }

  /**
   * Returns the TL object of the public key.
   * @example
   * const tl = publicKey.tl();
   */
  public tl(): tonapi.PublicKey {
    return this.publicKey.tl();
  }

  /**
   * Returns true if the public key is an Ed25519 public key.
   * @example
   * const isEd25519 = publicKey.isEd25519();
   */
  public isEd25519(): boolean {
    return this.publicKey.kind() === 'pub.ed25519';
  }

  /**
   * Returns true if the public key is an AES public key.
   * @example
   * const isAES = publicKey.isAES();
   */
  public isAES(): boolean {
    return this.publicKey.kind() === 'pub.aes';
  }

  /**
   * Returns true if the public key is an unencrypted public key.
   * @example
   * const isUnenc = publicKey.isUnenc();
   */
  public isUnenc(): boolean {
    return this.publicKey.kind() === 'pub.unenc';
  }

  /**
   * Returns true if the public key is an overlay public key.
   * @example
   * const isOverlay = publicKey.isOverlay();
   */
  public isOverlay(): boolean {
    return this.publicKey.kind() === 'pub.overlay';
  }

  /**
   * Returns true if the public key is equal to the other public key.
   * @example
   * const equals = publicKey.equals(other); // true or false
   */
  public equals(other: PublicKey): boolean {
    const otherPublicKey = other.publicKey as PublicKey.Ed25519 & PublicKey.AES & PublicKey.Unenc & PublicKey.Overlay;
    return this.publicKey.equals(otherPublicKey);
  }

  /**
   * Creates an encryptor for the private key.
   * @throws {Error} If the private key kind is not supported.
   * @example
   * const encryptor = privateKey.createEncryptor();
   * const encrypted = encryptor.encrypt(plain);
   */
  public createEncryptor(privateKey: PrivateKey): Encryptor {
    return Encryptor.create(this, privateKey);
  }

}

export namespace PublicKey {

  /**
   * This class represents an Ed25519 public key. It is a wrapper around the buffer that contains the public key.
   */
  export class Ed25519 {
    private readonly publicKey: Buffer;
    private readonly publicKeyKind: 'pub.ed25519' = 'pub.ed25519';
    private e2curve: Uint8Array | undefined = undefined;

    /**
     * Creates a new instance of PublicKey.Ed25519.
     * @throws {Error} - If the public key is not a buffer of length 32.
     * @example
     * import nacl from 'tweetnacl';
     *
     * const keyPair = nacl.box.keyPair();
     * const publicKey = Buffer.from(keyPair.publicKey);
     *
     * const ed25519 = new PublicKey.Ed25519({ kind: 'pub.ed25519', key: publicKey });
     */
    constructor(publicKey: tonapi.pub_ed25519) {
      if (publicKey.key.length !== 32) {
        throw new Error(`Invalid Ed25519 public key length: ${publicKey.key.length}, expected 32`);
      }

      this.publicKey = publicKey.key;
    }

    /**
     * Returns the raw public key.
     * @example
     * const raw = ed25519.raw();
     */
    public raw(): Buffer {
      return this.publicKey;
    }

    /**
     * Returns a new instance of PublicKey with the bytes reversed.
     */
    public reverse(): PublicKey.Ed25519 {
      return new PublicKey.Ed25519({
        kind: this.publicKeyKind,
        key: Buffer.from(this.publicKey).reverse(),
      });
    }

    /**
     * Computes the E2E curve of the public key.
     */
    public computeCurve(): Uint8Array {
      if (this.e2curve === undefined) {
        this.e2curve = ed2curve.convertPublicKey(this.publicKey) !;
      }

      return this.e2curve !;
    }

    /**
     * Returns the kind of the public key.
     * @example
     * const kind = ed25519.kind();
     */
    public kind(): 'pub.ed25519' {
      return this.publicKeyKind;
    }

    /**
     * Returns the TL object representation of the public key.
     * @example
     * const tl = ed25519.tl();
     */
    public tl(): tonapi.pub_ed25519 {
      return {
        'kind': this.publicKeyKind,
        key: this.publicKey,
      };
    }

    /**
     * Returns true if the public key is equal to the other public key.
     * @example
     * const equals = ed25519.equals(other); // true or false
     */
    public equals(other: Ed25519): boolean {
      return this.kind() === other.kind() && this.publicKey.equals(other.publicKey);
    }
  }

  /**
   * This class represents an AES public key. It is a wrapper around the buffer that contains the public key.
   */
  export class AES {
    private readonly publicKey: Buffer;
    private readonly publicKeyKind: 'pub.aes' = 'pub.aes';

    /**
     * Creates a new instance of PublicKey.AES.
     * @throws {Error} - If the public key is not a buffer of length 32.
     * @example
     * import nacl from 'tweetnacl';
     *
     * const keyPair = nacl.box.keyPair();
     * const publicKey = Buffer.from(keyPair.publicKey);
     *
     * const aes = new PublicKey.AES({ kind: 'pub.aes', key: publicKey });
     */
    constructor(publicKey: tonapi.pub_aes) {
      if (publicKey.key.length !== 32) {
        throw new Error(`Invalid AES public key length: ${publicKey.key.length}, expected 32`);
      }

      this.publicKey = publicKey.key;
    }

    /**
     * Returns the raw public key.
     * @example
     * const raw = aes.raw();
     */
    public raw(): Buffer {
      return this.publicKey;
    }

    /**
     * Returns a new instance of PublicKey with the bytes reversed.
     */
    public reverse(): PublicKey.AES {
      return new PublicKey.AES({
        kind: this.publicKeyKind,
        key: Buffer.from(this.publicKey).reverse(),
      });
    }

    /**
     * Computes the E2E curve of the public key.
     */
    public computeCurve(): Uint8Array {
      throw new Error('AES public key does not support E2E curve');
    }

    /**
     * Returns the kind of the public key.
     * @example
     * const kind = aes.kind();
     */
    public kind(): 'pub.aes' {
      return this.publicKeyKind;
    }

    /**
     * Returns the TL object representation of the public key.
     * @example
     * const tl = aes.tl();
     */
    public tl(): tonapi.pub_aes {
      return {
        'kind': this.publicKeyKind,
        key: this.publicKey,
      };
    }

    /**
     * Returns true if the public key is equal to the other public key.
     * @example
     * const equals = aes.equals(other); // true or false
     */
    public equals(other: AES): boolean {
      return this.kind() === other.kind() && this.publicKey.equals(other.publicKey);
    }
  }

  /**
   * This class represents an unencrypted public key. It is a wrapper around the buffer that contains the public key.
   */
  export class Unenc {
    public readonly data: Buffer;
    private readonly publicKeyKind: 'pub.unenc' = 'pub.unenc';

    /**
     * Creates a new instance of PublicKey.Unenc.
     * @example
     * const unenc = new PublicKey.Unenc({ kind: 'pub.unenc', data: Buffer.alloc(32) });
     */
    constructor(data: tonapi.pub_unenc) {
      this.data = data.data;
    }

    /**
     * Returns the raw public key.
     * @example
     * const raw = unenc.raw();
     */
    public raw(): Buffer {
      return this.data;
    }

    /**
     * Returns a new instance of PublicKey with the bytes reversed.
     */
    public reverse(): PublicKey.Unenc {
      return new PublicKey.Unenc({
        kind: this.publicKeyKind,
        data: Buffer.from(this.data).reverse(),
      });
    }

    /**
     * Computes the E2E curve of the public key.
     */
    public computeCurve(): Uint8Array {
      throw new Error('Unenc public key does not support E2E curve');
    }

    /**
     * Returns the kind of the public key.
     * @example
     * const kind = unenc.kind();
     */
    public kind(): 'pub.unenc' {
      return this.publicKeyKind;
    }

    /**
     * Returns the TL object representation of the public key.
     * @example
     * const tl = unenc.tl();
     */
    public tl(): tonapi.pub_unenc {
      return {
        'kind': this.publicKeyKind,
        data: this.data,
      };
    }

    /**
     * Returns true if the public key is equal to the other public key.
     */
    public equals(other: Unenc): boolean {
      return this.kind() === other.kind() && this.data.equals(other.data);
    }
  }

  /**
   * This class represents an overlay name. It is a wrapper around the buffer that contains the overlay name.
   */
  export class Overlay {
    private readonly name: Buffer;
    private readonly publicKeyKind: 'pub.overlay' = 'pub.overlay';

    /**
     * Creates a new instance of PublicKey.Overlay.
     * @example
     * import { TLWriteBuffer } from '@tonutils/tl';
     *
     * const overlayBuffer = new TLWriteBuffer();
     * Codecs.tonNode_ShardPublicOverlayId.encode({
     *   kind: 'tonNode.shardPublicOverlayId',
     *   workchain: globalConfig.validator.zeroState.workchain,
     *   shard: globalConfig.validator.zeroState.shard,
     *   zeroStateFileHash: globalConfig.validator.zeroState.fileHash
     * }, overlayBuffer);
     * const overlayBytes = overlayBuffer.build();
     *
     * const overlay = new PrivateKey.Overlay({ kind: 'pk.overlay', key: overlayBytes });
     */
    constructor(overlay: tonapi.pub_overlay) {
      this.name = overlay.name;
    }

    /**
     * Returns the raw overlay name.
     * @example
     * const raw = overlay.raw();
     */
    public raw(): Buffer {
      return this.name;
    }

    /**
     * Computes the E2E curve of the public key.
     */
    public computeCurve(): Uint8Array {
      throw new Error('Overlay public key does not support E2E curve');
    }

    /**
     * Returns the kind of the public key.
     * @example
     * const kind = overlay.kind();
     */
    public kind(): 'pub.overlay' {
      return this.publicKeyKind;
    }

    /**
     * Returns the TL object representation of the public key.
     * @example
     * const tl = overlay.tl();
     */
    public tl(): tonapi.pub_overlay {
      return {
        'kind': this.publicKeyKind,
        name: this.name,
      };
    }

    /**
     * Returns true if the public key is equal to the other public key.
     * @example
     * const equals = overlay.equals(other); // true or false
     */
    public equals(other: Overlay): boolean {
      return this.kind() === other.kind() && this.name.equals(other.name);
    }
  }

}

/**
 * This class represents a private key. It is a wrapper around the buffer that contains the private key.
 */
export class PrivateKey {
  private readonly privateKey: PrivateKey.Ed25519 | PrivateKey.AES | PrivateKey.Unenc | PrivateKey.Overlay;
  private publicKey: PublicKey | undefined = undefined;

  /**
   * Creates a new instance of PrivateKey.
   * @throws {Error} If the private key kind is not supported.
   * @example
   * import nacl from 'tweetnacl';
   *
   * const keyPair = nacl.sign.keyPair();
   * const secretKey = Buffer.from(keyPair.secretKey);
   * const privateKey = secretKey.subarray(0, 32); // we only need the first 32 bytes, because the second 32 bytes are the public key
   *
   * const privateKey = new PrivateKey({ kind: 'pk.ed25519', key: privateKey });
   */
  constructor(privateKey: tonapi.PrivateKey) {
    switch (privateKey.kind) {
      case 'pk.ed25519':
        this.privateKey = new PrivateKey.Ed25519(privateKey);
        break;
      case 'pk.aes':
        this.privateKey = new PrivateKey.AES(privateKey);
        break;
      case 'pk.unenc':
        this.privateKey = new PrivateKey.Unenc(privateKey);
        break;
      case 'pk.overlay':
        this.privateKey = new PrivateKey.Overlay(privateKey);
        break;
      default:
        throw new Error(`Unsupported private key kind: ${privateKey['kind']}`);
    }
  }

  static import(exportedKey: Buffer): PrivateKey {
    const privateKey = Codecs.PrivateKey.decode(new TLReadBuffer(exportedKey));
    return new PrivateKey(privateKey);
  }

  /**
   * Computes the E2E curve of the private key.
   */
  public computeCurve(): Uint8Array {
    return this.privateKey.computeCurve();
  }

  /**
   * Returns a new instance of PublicKey with the bytes reversed.
   */
  public reverse(): PrivateKey {
    return new PrivateKey(this.privateKey.reverse().tl());
  }

  /**
   * Returns a new instance of PrivateKey with the bytes reversed.
   */
  public buildPrioritySecret(): PrivateKey {
    return new PrivateKey(this.privateKey.buildPrioritySecret().tl());
  }

  /**
   * Computes the shared secret between the private key and the public key.
   */
  public computeSharedSecret(publicKey: PublicKey): SharedSecret {
    return this.privateKey.computeSharedSecret(publicKey);
  }

  /**
   * Computes the public key from the private key.
   * @example
   * const publicKey = privateKey.computePublicKey();
   */
  public computePublicKey(): PublicKey {
    if (!this.publicKey) {
      const publicKey = this.privateKey.publicKey();
      this.publicKey = new PublicKey(publicKey.tl());
    }

    return this.publicKey;
  }

  /**
   * Computes the short id from the private key.
   * @example
   * const shortId = privateKey.computeShortId();
   */
  public computeShortId(): PublicKeyHash {
    const publicKey = this.computePublicKey();
    return publicKey.computeShortId();
  }

  /**
   * Returns the raw private key.
   * @example
   * const raw = privateKey.raw();
   */
  public raw(): Buffer {
    return this.privateKey.raw();
  }

  /**
   * Returns the kind of the private key.
   * @example
   * const kind = privateKey.kind();
   */
  public kind(): tonapi.PrivateKey['kind'] {
    return this.privateKey.kind();
  }

  /**
   * Returns the TL object representation of the private key.
   * @example
   * const tl = privateKey.tl();
   */
  public tl(): tonapi.PrivateKey {
    return this.privateKey.tl();
  }

  /**
   * Returns the TL object representation of the public key.
   * @example
   * const tlPublic = privateKey.tlPublic();
   */
  public tlPublic(): tonapi.PublicKey {
    return this.privateKey.tlPublic();
  }

  /**
   * Returns true if the private key is exportable.
   */
  exportable(): boolean {
    return this.privateKey.exportable();
  }

  /**
   * Exports the private key.
   */
  export(): Buffer {
    const exportedKey = new TLWriteBuffer();
    Codecs.PrivateKey.encode(this.tl(), exportedKey);
    return exportedKey.build();
  }

  /**
   * Creates a decryptor for the private key.
   * @throws {Error} If the private key kind is not supported.
   * @example
   * const decryptor = privateKey.createDecryptor();
   * const decrypted = decryptor.decrypt(encrypted);
   */
  public createDecryptor(publicKey: PublicKey): Decryptor {
    return Decryptor.create(this, publicKey);
  }
}

export namespace PrivateKey {

  /**
   * This class represents an Ed25519 private key. It is a wrapper around the buffer that contains the private key.
   */
  export class Ed25519 {
    private readonly privateKey: Buffer;
    private readonly privateKeyKind: 'pk.ed25519' = 'pk.ed25519';
    private ed2Curve: Uint8Array | undefined;

    /**
     * Creates a new instance of PrivateKey.Ed25519.
     * @throws {Error} If the private key length is not 32 bytes.
     * @example
     * import nacl from 'tweetnacl';
     *
     * const keyPair = nacl.sign.keyPair();
     * const secretKey = Buffer.from(keyPair.secretKey);
     * const privateKey = secretKey.subarray(0, 32); // we only need the first 32 bytes, because the second 32 bytes are the public key
     *
     * const ed25519 = new PrivateKey.Ed25519({ kind: 'pk.ed25519', key: privateKey });
     */
    constructor(privateKey: tonapi.pk_ed25519) {
      if (privateKey.key.length !== 32) {
        throw new Error(`Invalid Ed25519 private key length: ${privateKey.key.length}, expected 32`);
      }

      this.privateKey = privateKey.key;
    }

    /**
     * Generates a random Ed25519 private key.
     * @example
     * const ed25519 = PrivateKey.Ed25519.random();
     */
    static random(): Ed25519 {
      while (true) {
        const keyPair = nacl.sign.keyPair();
        const secretKey = Buffer.from(keyPair.secretKey);
        const privateKey = secretKey.subarray(0, 32);

        if (!ed2curve.convertPublicKey(secretKey.subarray(32, 64))) {
          continue;
        }

        return new PrivateKey.Ed25519({kind: 'pk.ed25519', key: privateKey});
      }
    }

    /**
     * Generates an Ed25519 private key from the seed.
     * @example
     * import nacl from 'tweetnacl';
     *
     * const seed = nacl.randomBytes(32);
     *
     * const ed25519 = PrivateKey.Ed25519.fromSeed(seed);
     */
    static fromSeed(seed: Buffer): Ed25519 {
      const keyPair = nacl.sign.keyPair.fromSeed(seed);
      const secretKey = Buffer.from(keyPair.secretKey);
      const privateKey = secretKey.subarray(0, 32);
      return new PrivateKey.Ed25519({kind: 'pk.ed25519', key: privateKey});
    }

    /**
     * Returns true if the private key is exportable.
     */
    public exportable(): boolean {
      return true;
    }

    /**
     * Returns the raw private key.
     * @example
     * const raw = ed25519.raw();
     */
    public raw(): Buffer {
      return this.privateKey;
    }

    /**
     * Returns a new instance of PrivateKey with the bytes reversed.
     */
    public reverse(): PrivateKey.Ed25519 {
      return new PrivateKey.Ed25519({
        kind: this.privateKeyKind,
        key: Buffer.from(this.privateKey).reverse(),
      });
    }

    /**
     * Builds the priority secret.
     */
    public buildPrioritySecret(): PrivateKey.Ed25519 {
      throw new Error(`Ed25519 public key does not support priority secret`);
    }

    /**
     * Computes the Ed25519 curve.
     */
    public computeCurve(): Uint8Array {
      if (!this.ed2Curve) {
        this.ed2Curve = ed2curve.convertSecretKey(this.privateKey);
      }
      return this.ed2Curve;
    }

    /**
     * Computes the shared secret.
     */
    private cacheSharedKey: Map<string, { lastUsed: number, sharedSecret: SharedSecret }> = new Map();

    public computeSharedSecret(publicKey: PublicKey): SharedSecret {
      // we need to cache the shared secret, because it is expensive to compute it
      const key = publicKey.raw().toString('hex');

      // if the shared secret is not in the cache, compute it
      if (!this.cacheSharedKey.has(key)) {
        const curveSecretKey = this.computeCurve();
        const curvePublicKey = publicKey.computeCurve();
        const secretKey = nacl.scalarMult(curveSecretKey, curvePublicKey);
        const sharedSecret = new SharedSecret(new PrivateKey(new PrivateKey.AES({ kind: 'pk.aes', key: Buffer.from(secretKey) }).tl()));

        this.cacheSharedKey.set(key, { lastUsed: Date.now(), sharedSecret });
      }

      const { sharedSecret } = this.cacheSharedKey.get(key)!;

      // update the last used time
      this.cacheSharedKey.set(key, { lastUsed: Date.now(), sharedSecret });

      // clean up the cache
      const threshold = Date.now() - 1000 * 60 * 5; // 5 minutes
      this.cacheSharedKey.forEach((value, key) => {
        if (value.lastUsed < threshold) {
          this.cacheSharedKey.delete(key);
        }
      });

      return sharedSecret;
    }

    /**
     * Returns the kind of the private key.
     * @example
     * const kind = ed25519.kind();
     */
    public kind(): 'pk.ed25519' {
      return this.privateKeyKind;
    }

    /**
     * Returns the public key.
     * @example
     * const publicKey = ed25519.publicKey();
     */
    public publicKey(): PublicKey.Ed25519 {
      return new PublicKey.Ed25519(this.tlPublic());
    }

    /**
     * Returns the TL object representation of the private key.
     * @example
     * const tl = ed25519.tl();
     */
    public tl(): tonapi.pk_ed25519 {
      return {
        'kind': this.privateKeyKind,
        key: this.privateKey,
      };
    }

    /**
     * Returns the TL object representation of the public key.
     * @example
     * const tl = ed25519.tlPublic();
     */
    public tlPublic(): tonapi.pub_ed25519 {
      const keyPair = nacl.sign.keyPair.fromSeed(this.privateKey);
      const publicKey = Buffer.from(keyPair.publicKey);
      return {
        'kind': 'pub.ed25519',
        key: publicKey,
      };
    }
  }

  /**
   * This class represents an AES private key. It is a wrapper around the buffer that contains the private key.
   */
  export class AES {
    private readonly privateKey: Buffer;
    private readonly privateKeyKind: 'pk.aes' = 'pk.aes';

    /**
     * Creates a new instance of PrivateKey.AES.
     * @throws {Error} If the private key length is not 32 bytes.
     * @example
     * import nacl from 'tweetnacl';
     *
     * const keyPair = nacl.box.keyPair();
     * const secretKey = Buffer.from(keyPair.secretKey);
     * const privateKey = secretKey.subarray(0, 32); // we only need the first 32 bytes, because the second 32 bytes are the public key
     *
     * const aes = new PrivateKey.AES({ kind: 'pk.aes', key: privateKey });
     */
    constructor(privateKey: tonapi.pk_aes) {
      if (privateKey.key.length !== 32) {
        throw new Error(`Invalid AES private key length: ${privateKey.key.length}, expected 32`);
      }

      this.privateKey = privateKey.key;
    }

    /**
     * Generates a random AES private key.
     * @example
     * const aes = PrivateKey.AES.random();
     */
    static random(): AES {
      const keyPair = nacl.box.keyPair();
      const secretKey = Buffer.from(keyPair.secretKey);
      const privateKey = secretKey.subarray(0, 32);
      return new PrivateKey.AES({kind: 'pk.aes', key: privateKey});
    }

    /**
     * Generates an AES private key from the seed.
     * @example
     * import nacl from 'tweetnacl';
     *
     * const seed = nacl.randomBytes(32);
     *
     * const aes = PrivateKey.AES.fromSeed(seed);
     */
    static fromSeed(seed: Buffer): AES {
      const keyPair = nacl.box.keyPair.fromSecretKey(seed);
      const secretKey = Buffer.from(keyPair.secretKey);
      const privateKey = secretKey.subarray(0, 32);
      return new PrivateKey.AES({kind: 'pk.aes', key: privateKey});
    }

    /**
     * Returns true if the private key is exportable.
     */
    public exportable(): boolean {
      return true;
    }

    /**
     * Returns the raw private key.
     * @example
     * const raw = aes.raw();
     */
    public raw(): Buffer {
      return this.privateKey;
    }

    /**
     * Returns a new instance of PrivateKey with the bytes reversed.
     */
    public reverse(): PrivateKey.AES {
      return new PrivateKey.AES({
        kind: this.privateKeyKind,
        key: Buffer.from(this.privateKey).reverse(),
      });
    }

    /**
     * Returns a new instance of PrivateKey with the bytes reversed.
     */
    public buildPrioritySecret(): PrivateKey.AES {
      const ordinarySecret = this.privateKey;
      // const prioritySecret = Buffer.concat([
      //   // ordinarySecret[1],
      //   ordinarySecret.subarray(1, 2),
      //   // ordinarySecret[0],
      //   ordinarySecret.subarray(0, 1),
      //   // ordinarySecret[3],
      //   ordinarySecret.subarray(3, 4),
      //   // ordinarySecret[2],
      //   ordinarySecret.subarray(2, 3),
      //   // ordinarySecret[5],
      //   ordinarySecret.subarray(5, 6),
      //   // ordinarySecret[4],
      //   ordinarySecret.subarray(4, 5),
      //   // ordinarySecret[7],
      //   ordinarySecret.subarray(7, 8),
      //   // ordinarySecret[6],
      //   ordinarySecret.subarray(6, 7),
      //   // ordinarySecret[9],
      //   ordinarySecret.subarray(9, 10),
      //   // ordinarySecret[8],
      //   ordinarySecret.subarray(8, 9),
      //   // ordinarySecret[11],
      //   ordinarySecret.subarray(11, 12),
      //   // ordinarySecret[10],
      //   ordinarySecret.subarray(10, 11),
      //   // ordinarySecret[13],
      //   ordinarySecret.subarray(13, 14),
      //   // ordinarySecret[12],
      //   ordinarySecret.subarray(12, 13),
      //   // ordinarySecret[15],
      //   ordinarySecret.subarray(15, 16),
      //   // ordinarySecret[14],
      //   ordinarySecret.subarray(14, 15),
      //   // ordinarySecret[17],
      //   ordinarySecret.subarray(17, 18),
      //   // ordinarySecret[16],
      //   ordinarySecret.subarray(16, 17),
      //   // ordinarySecret[19],
      //   ordinarySecret.subarray(19, 20),
      //   // ordinarySecret[18],
      //   ordinarySecret.subarray(18, 19),
      //   // ordinarySecret[21],
      //   ordinarySecret.subarray(21, 22),
      //   // ordinarySecret[20],
      //   ordinarySecret.subarray(20, 21),
      //   // ordinarySecret[23],
      //   ordinarySecret.subarray(23, 24),
      //   // ordinarySecret[22],
      //   ordinarySecret.subarray(22, 23),
      //   // ordinarySecret[25],
      //   ordinarySecret.subarray(25, 26),
      //   // ordinarySecret[24],
      //   ordinarySecret.subarray(24, 25),
      //   // ordinarySecret[27],
      //   ordinarySecret.subarray(27, 28),
      //   // ordinarySecret[26],
      //   ordinarySecret.subarray(26, 27),
      //   // ordinarySecret[29],
      //   ordinarySecret.subarray(29, 30),
      //   // ordinarySecret[28],
      //   ordinarySecret.subarray(28, 29),
      //   // ordinarySecret[31],
      //   ordinarySecret.subarray(31, 32),
      //   // ordinarySecret[30],
      //   ordinarySecret.subarray(30, 31),
      // ]);

      // // TODO: fix priority logic
      const prioritySecret = ordinarySecret;

      return new PrivateKey.AES({
        kind: this.privateKeyKind,
        key: prioritySecret,
      });
    }

    /**
     * Computes the Ed25519 curve.
     */
    public computeCurve(): Uint8Array {
      throw new Error(`AES private key does not support E2 curve`);
    }

    /**
     * Computes the shared secret.
     */
    public computeSharedSecret(publicKey: PublicKey): SharedSecret {
      throw new Error(`AES private key does not support E2 curve`);
    }

    /**
     * Returns the kind of the private key.
     * @example
     * const kind = aes.kind();
     */
    public kind(): 'pk.aes' {
      return this.privateKeyKind;
    }

    /**
     * Returns the public key.
     * @example
     * const publicKey = aes.publicKey();
     */
    public publicKey(): PublicKey.AES {
      return new PublicKey.AES(this.tlPublic());
    }

    /**
     * Returns the TL object representation of the private key.
     * @example
     * const tl = aes.tl();
     */
    public tl(): tonapi.pk_aes {
      return {
        'kind': this.privateKeyKind,
        key: this.privateKey,
      };
    }

    /**
     * Returns the TL object representation of the public key.
     * @example
     * const tl = aes.tlPublic();
     */
    public tlPublic(): tonapi.pub_aes {
      // TODO: previous implementation was using nacl.box.keyPair.fromSecretKey to get public key, but for aes keys is not needed, because public key is the same as private key
      // const keyPair = nacl.box.keyPair.fromSecretKey(this.privateKey);
      // const publicKey = Buffer.from(keyPair.publicKey);
      return {
        'kind': 'pub.aes',
        key: this.privateKey,
      };
    }
  }

  /**
   * This class represents an unencrypted private key. It is a wrapper around the buffer that contains the private key.
   */
  export class Unenc {
    private readonly data: Buffer;
    private readonly privateKeyKind: 'pk.unenc' = 'pk.unenc';

    /**
     * Creates a new instance of PrivateKey.Unenc.
     * @example
     * import nacl from 'tweetnacl';
     *
     * const keyPair = nacl.box.keyPair();
     * const secretKey = Buffer.from(keyPair.secretKey);
     * const privateKey = secretKey.subarray(0, 32); // we only need the first 32 bytes, because the second 32 bytes are the public key
     *
     * const unenc = new PrivateKey.Unenc({ kind: 'pk.unenc', key: privateKey });
     */
    constructor(privateKey: tonapi.pk_unenc) {
      this.data = privateKey.data;
    }

    /**
     * Returns true if the private key is exportable.
     */
    public exportable(): boolean {
      return false;
    }

    /**
     * Returns the raw private key.
     * @example
     * const raw = unenc.raw();
     */
    public raw(): Buffer {
      return this.data;
    }

    /**
     * Returns a new instance of PrivateKey with the bytes reversed.
     */
    public reverse(): PrivateKey.Unenc {
      return new PrivateKey.Unenc({
        kind: this.privateKeyKind,
        data: Buffer.from(this.data).reverse(),
      });
    }

    /**
     * Returns a new instance of PrivateKey with the bytes reversed.
     */
    public buildPrioritySecret(): PrivateKey.Unenc {
      throw new Error('Unenc public key does not support priority secret');
    }

    /**
     * Computes the Ed25519 curve.
     */
    public computeCurve(): Uint8Array {
      throw new Error(`Unenc private key does not support E2 curve`);
    }

    /**
     * Computes the shared secret.
     */
    public computeSharedSecret(publicKey: PublicKey): SharedSecret {
      throw new Error(`Unenc private key does not support E2 curve`);
    }

    /**
     * Returns the kind of the private key.
     * @example
     * const kind = unenc.kind();
     */
    public kind(): 'pk.unenc' {
      return this.privateKeyKind;
    }

    /**
     * Returns the public key.
     * @example
     * const publicKey = unenc.publicKey();
     */
    public publicKey(): PublicKey.Unenc {
      return new PublicKey.Unenc(this.tlPublic());
    }

    /**
     * Returns the TL object representation of the private key.
     * @example
     * const tl = unenc.tl();
     */
    public tl(): tonapi.pk_unenc {
      return {
        'kind': this.privateKeyKind,
        data: this.data,
      };
    }

    /**
     * Returns the TL object representation of the public key.
     * @example
     * const tl = unenc.tlPublic();
     */
    public tlPublic(): tonapi.pub_unenc {
      return {
        'kind': 'pub.unenc',
        data: this.data,
      };
    }
  }

  /**
   * This class represents an overlay name. It is a wrapper around the buffer that contains the overlay name.
   */
  export class Overlay {
    private readonly name: Buffer;
    private readonly privateKeyKind: 'pk.overlay' = 'pk.overlay';

    /**
     * Creates a new instance of PrivateKey.Overlay.
     * @example
     * import { TLWriteBuffer } from '@tonutils/tl';
     *
     * const overlayBuffer = new TLWriteBuffer();
     * Codecs.tonNode_ShardPublicOverlayId.encode({
     *   kind: 'tonNode.shardPublicOverlayId',
     *   workchain: globalConfig.validator.zeroState.workchain,
     *   shard: globalConfig.validator.zeroState.shard,
     *   zeroStateFileHash: globalConfig.validator.zeroState.fileHash
     * }, overlayBuffer);
     * const overlayBytes = overlayBuffer.build();
     *
     * const overlay = new PrivateKey.Overlay({ kind: 'pk.overlay', key: overlayBytes });
     */
    constructor(privateKey: tonapi.pk_overlay) {
      this.name = privateKey.name;
    }

    /**
     * Returns true if the private key is exportable.
     */
    public exportable(): boolean {
      return false;
    }

    /**
     * Returns the raw overlay name.
     * @example
     * const raw = overlay.raw();
     */
    public raw(): Buffer {
      return this.name;
    }

    /**
     * Returns a new instance of PrivateKey with the bytes reversed.
     */
    public buildPrioritySecret(): PrivateKey.Overlay {
      throw new Error('Overlay public key does not support priority secret');
    }

    /**
     * Returns a new instance of PrivateKey with the bytes reversed.
     */
    public reverse(): PrivateKey.Overlay {
      return new PrivateKey.Overlay({
        kind: this.privateKeyKind,
        name: Buffer.from(this.name).reverse(),
      });
    }

    /**
     * Computes the Ed25519 curve.
     */
    public computeCurve(): Uint8Array {
      throw new Error(`Overlay private key does not support E2 curve`);
    }

    /**
     * Computes the shared secret.
     */
    public computeSharedSecret(publicKey: PublicKey): SharedSecret {
      throw new Error(`Overlay private key does not support E2 curve`);
    }

    /**
     * Returns the kind of the private key.
     * @example
     * const kind = overlay.kind();
     */
    public kind(): 'pk.overlay' {
      return this.privateKeyKind;
    }

    /**
     * Returns the public key.
     * @example
     * const publicKey = overlay.publicKey();
     */
    public publicKey(): PublicKey.Overlay {
      return new PublicKey.Overlay(this.tlPublic());
    }

    /**
     * Returns the TL object representation of the overlay.
     * @example
     * const tl = overlay.tl();
     */
    public tl(): tonapi.pk_overlay {
      return {
        'kind': this.privateKeyKind,
        name: this.name,
      };
    }

    /**
     * Returns the TL object representation of the overlay.
     */
    public tlPublic(): tonapi.pub_overlay {
      return {
        'kind': 'pub.overlay',
        name: this.name,
      };
    }
  }

}

export class SharedSecret {
  private readonly privateKey: PrivateKey;
  private readonly publicKey: PublicKey;

  constructor(privateKey: PrivateKey) {
    this.privateKey = new PrivateKey(privateKey.tl());
    this.publicKey = this.privateKey.computePublicKey();
  }

  public computePublicKey(): PublicKey {
    return this.publicKey;
  }

  public createDecryptor(): DecryptorSharedSecret {
    return Decryptor.createFromSharedSecret(this);
  }

  public createEncryptor(): EncryptorSharedSecret {
    return Encryptor.createFromSharedSecret(this);
  }

  public raw(): Buffer {
    return this.privateKey.raw();
  }

  public reverse(): SharedSecret {
    return new SharedSecret(this.privateKey.reverse());
  }

  public computeShortId() {
    return this.publicKey.computeShortId();
  }

  public buildPrioritySecret(): SharedSecret {
    return new SharedSecret(this.privateKey.buildPrioritySecret());
  }
}
