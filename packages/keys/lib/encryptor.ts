import {PrivateKey, PublicKey, SharedSecret} from "./keys";
import nacl from 'tweetnacl';
import ed2curve from 'ed2curve';
import {sign, signVerify} from "ton-crypto";
import crypto from "crypto";
import sodium from 'sodium-native';

/**
 * Encryptor is a base class for encryptors of different types of keys (Ed25519, AES, Unenc, Overlay)
 */
export abstract class Encryptor {
  protected constructor(protected readonly publicKey: PublicKey,
                        protected readonly privateKey: PrivateKey) {
  }

  /**
   * Encrypts data with the public key
   */
  abstract encrypt(data: Buffer): { publicKey: Buffer, digest: Buffer, encrypted: Buffer };

  /**
   * Checks if the signature is valid for the data
   */
  abstract checkSignature(data: Buffer, signature: Buffer): boolean;

  static create(publicKey: PublicKey, privateKey: PrivateKey): Encryptor {
    switch (publicKey.kind()) {
      case "pub.ed25519":
        return new EncryptorEd25519(publicKey, privateKey);
        break;
      case "pub.aes":
        return new EncryptorAES(publicKey, privateKey);
        break;
      case "pub.unenc":
      case "pub.overlay":
      default:
        return new EncryptorFail(publicKey, privateKey);
    }
  }

  static createFromSharedSecret(sharedSecret: SharedSecret): EncryptorSharedSecret {
    return new EncryptorSharedSecret(sharedSecret);
  }
}

/**
 * Decryptor is a base class for decryptors of different types of keys (Ed25519, AES, Unenc, Overlay)
 */
export abstract class Decryptor {
  /**
   * @protected
   */
  protected constructor(protected readonly privateKey: PrivateKey,
                        protected readonly publicKey: PublicKey) {
  }

  /**
   * Decrypts data with the private key
   */
  abstract decrypt(publicKey: Buffer, digest: Buffer, encrypted: Buffer): Buffer;

  /**
   * Signs data with the private key
   */
  abstract sign(data: Buffer): Buffer;

  /**
   * Signs data with the private key
   */
  signBatch(data: Buffer[]): Buffer[] {
    return data.map((d) => this.sign(d));
  }

  /**
   * Creates an instance of Decryptor using private and public keys
   */
  static create(privateKey: PrivateKey, publicKey: PublicKey): Decryptor {
    switch (privateKey.kind()) {
      case "pk.ed25519":
        return new DecryptorEd25519(privateKey, publicKey);
        break;
      case "pk.aes":
        return new DecryptorAES(privateKey, publicKey);
        break;
      case "pk.unenc":
      case "pk.overlay":
      default:
        return new DecryptorFail(privateKey, publicKey);
    }
  }

  /**
   * Creates an instance of Decryptor using shared secret
   */
  static createFromSharedSecret(sharedSecret: SharedSecret): DecryptorSharedSecret {
    return new DecryptorSharedSecret(sharedSecret);
  }
}

/**
 * EncryptorFail is a class for encryptors of keys that do not support encryption
 */
export class EncryptorFail extends Encryptor {

  /**
   * Creates an instance of EncryptorFail
   */
  constructor(publicKey: PublicKey, privateKey: PrivateKey) {
    super(publicKey, privateKey);
  }

  /**
   * Encrypts data with the public key
   * @throws {Error} Throws an error if the key does not support encryption
   */
  encrypt(data: Buffer): { publicKey: Buffer, digest: Buffer, encrypted: Buffer } {
    throw new Error(`Encryption is not supported for key ${this.publicKey.kind()}`);
  }

  /**
   * Checks if the signature is valid for the data
   * @throws {Error} Throws an error if the key does not support signature check
   */
  checkSignature(data: Buffer, signature: Buffer): boolean {
    throw new Error(`Signature check is not supported for key ${this.publicKey.kind()}`);
  }
}

/**
 * DecryptorFail is a class for decryptors of keys that do not support decryption
 */
export class DecryptorFail extends Decryptor {
  /**
   * Creates an instance of DecryptorFail
   */
  constructor(privateKey: PrivateKey, publicKey: PublicKey) {
    super(privateKey, publicKey);
  }

  /**
   * Decrypts data with the private key
   * @throws {Error} Throws an error if the key does not support decryption
   */
  decrypt(publicKey: Buffer, digest: Buffer, encrypted: Buffer): Buffer {
    throw new Error(`Decryption is not supported for key ${this.privateKey.kind()}`);
  }

  /**
   * Signs data with the private key
   * @throws {Error} Throws an error if the key does not support signing
   */
  sign(data: Buffer): Buffer {
    throw new Error(`Signing is not supported for key ${this.privateKey.kind()}`);
  }

  /**
   * Signs data with the private key
   * @throws {Error} Throws an error if the key does not support batch signing
   */
  signBatch(data: Buffer[]): Buffer[] {
    throw new Error(`Batch signing is not supported for key ${this.privateKey.kind()}`);
  }
}

/**
 * EncryptorEd25519 is a class for encryptors of Ed25519 keys
 */
export class EncryptorEd25519 extends Encryptor {
  private _sharedSecret: SharedSecret | null = null;

  private get sharedSecret(): SharedSecret {
    return this._sharedSecret ??= this.privateKey.computeSharedSecret(this.publicKey);
  }

  /**
   * Creates an instance of EncryptorEd25519
   */
  constructor(publicKey: PublicKey, privateKey: PrivateKey) {
    super(publicKey, privateKey);

    // const curveSecretKey = this.privateKey.computeCurve();
    // const curvePublicKey = this.publicKey.computeCurve();
    //
    // this.sharedSecret = Buffer.from(nacl.scalarMult(curveSecretKey, curvePublicKey));
  }

  /**
   * Encrypts data with the public key
   */
  encrypt(data: Buffer): { publicKey: Buffer, digest: Buffer, encrypted: Buffer } {
    const sharedSecret = this.sharedSecret.raw();
    const digest = crypto.createHash('sha256').update(data).digest();
    const k = Buffer.concat([sharedSecret.subarray(0, 16), digest.subarray(16, 32)]);
    const iv = Buffer.concat([digest.subarray(0, 4), sharedSecret.subarray(20, 32)]);

    const cipher = crypto.createCipheriv('aes-256-ctr', k, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

    return {
      publicKey: this.privateKey.computePublicKey().raw(),
      digest: digest,
      encrypted: encrypted
    }
  }

  /**
   * Checks if the signature is valid for the data
   */
  checkSignature(data: Buffer, signature: Buffer): boolean {
    const publicKey = this.publicKey.raw();
    return sodium.crypto_sign_verify_detached(signature, data, publicKey);
  }
}

/**
 * DecryptorEd25519 is a class for decryptors of Ed25519 keys
 */
export class DecryptorEd25519 extends Decryptor {
  private readonly sharedSecret: SharedSecret;

  /**
   * Creates an instance of DecryptorEd25519
   */
  constructor(privateKey: PrivateKey, publicKey: PublicKey) {
    super(privateKey, publicKey);

    // const curveSecretKey = this.privateKey.computeCurve();
    // const curvePublicKey = this.publicKey.computeCurve();
    //
    // this.sharedSecret = Buffer.from(nacl.scalarMult(curveSecretKey, curvePublicKey));
    this.sharedSecret = this.privateKey.computeSharedSecret(this.publicKey);
  }

  /**
   * Decrypts data with the private key
   * @throws {Error} Throws an error if the message is too short
   * @throws {Error} Throws an error if the digest is invalid
   */
  decrypt(publicKey: Buffer, digest: Buffer, encrypted: Buffer): Buffer {
    // if (data.length < 32 + 32) {
    //   throw new Error(`Message is too short`);
    // }
    //
    // const publicKey = data.subarray(0, 32);
    if (!publicKey.equals(this.publicKey.raw())) {
      throw new Error(`Public key mismatch during decryption`);
    }
    //
    // const digest = data.subarray(32, 32 + 32);
    // const encryptedData = data.subarray(32 + 32);

    const sharedSecret = this.sharedSecret.raw();
    const k = Buffer.concat([sharedSecret.subarray(0, 16), digest.subarray(16, 32)]);
    const iv = Buffer.concat([digest.subarray(0, 4), sharedSecret.subarray(20, 32)]);
    const decipher = crypto.createDecipheriv('aes-256-ctr', k, iv);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const realDigest = crypto.createHash('sha256').update(decrypted).digest();

    if (!realDigest.equals(digest)) {
      throw new Error(`sha256 mismatch during decryption`);
    }

    return decrypted;
  }

  /**
   * Signs data with the private key
   */
  sign(data: Buffer): Buffer {
    const privateKey = this.privateKey.raw();
    const publicKey = this.privateKey.computePublicKey().raw();
    const signature = Buffer.alloc(sodium.crypto_sign_BYTES);
    sodium.crypto_sign_detached(signature, data, Buffer.concat([privateKey, publicKey]));
    return signature;
  }
}

/**
 * EncryptorAES is a class for encryptors of AES keys
 */
export class EncryptorAES extends Encryptor {
  /**
   * Creates an instance of EncryptorAES
   */
  constructor(publicKey: PublicKey, privateKey: PrivateKey) {
    super(publicKey, privateKey);
  }

  /**
   * Encrypts data with the private key
   */
  encrypt(data: Buffer): { publicKey: Buffer, digest: Buffer, encrypted: Buffer } {
    const sharedSecret = this.privateKey.raw();

    const digest = crypto.createHash('sha256').update(data).digest();
    const k = Buffer.concat([sharedSecret.subarray(0, 16), digest.subarray(16, 32)]);
    const iv = Buffer.concat([digest.subarray(0, 4), sharedSecret.subarray(20, 32)]);
    const cipher = crypto.createCipheriv('aes-256-ctr', k, iv);

    const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);

    return {
      publicKey: this.privateKey.computePublicKey().raw(),
      digest: digest,
      encrypted: encryptedData
    };
  }

  /**
   * Checks if the signature is valid for the data
   * @throws {Error} Throws an error if the signature check is not supported
   */
  checkSignature(data: Buffer, signature: Buffer): boolean {
    throw new Error(`Signature check is not supported for key ${this.publicKey.kind()}`);
  }
}

/**
 * DecryptorAES is a class for decryptors of AES keys
 */
export class DecryptorAES extends Decryptor {
  /**
   * Creates an instance of DecryptorAES
   */
  constructor(privateKey: PrivateKey, publicKey: PublicKey) {
    super(privateKey, publicKey);
  }

  /**
   * Decrypts data with the private key
   * @throws {Error} Throws an error if the message is too short
   * @throws {Error} Throws an error if the digest is invalid
   */
  decrypt(publicKey: Buffer, digest: Buffer, encrypted: Buffer): Buffer {
    const sharedSecret = publicKey;

    const k = Buffer.concat([sharedSecret.subarray(0, 16), digest.subarray(16, 32)]);
    const iv = Buffer.concat([digest.subarray(0, 4), sharedSecret.subarray(20, 32)]);
    const decipher = crypto.createDecipheriv('aes-256-ctr', k, iv);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const realDigest = crypto.createHash('sha256').update(decrypted).digest();

    if (!realDigest.equals(digest)) {
      throw new Error(`sha256 mismatch during decryption`);
    }

    return decrypted;
  }

  /**
   * Signs data with the private key
   * @throws {Error} Throws an error if the signing is not supported
   */
  sign(data: Buffer): Buffer {
    throw new Error(`Signing is not supported for key ${this.privateKey.kind()}`);
  }
}


/**
 * EncryptorSharedSecret is a class for encryptors of AES keys
 */
export class EncryptorSharedSecret {
  private readonly privateKey: SharedSecret;

  /**
   * Creates an instance of EncryptorSharedSecret
   */
  constructor(sharedSecret: SharedSecret) {
    this.privateKey = sharedSecret;
  }

  /**
   * Encrypts data with the private key
   */
  encrypt(data: Buffer): { digest: Buffer, encrypted: Buffer } {
    const sharedSecret = this.privateKey.raw();

    const digest = crypto.createHash('sha256').update(data).digest();
    const k = Buffer.concat([sharedSecret.subarray(0, 16), digest.subarray(16, 32)]);
    const iv = Buffer.concat([digest.subarray(0, 4), sharedSecret.subarray(20, 32)]);
    const cipher = crypto.createCipheriv('aes-256-ctr', k, iv);

    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

    return { digest, encrypted }
  }

  /**
   * Checks if the signature is valid for the data
   * @throws {Error} Throws an error if the signature check is not supported
   */
  checkSignature(data: Buffer, signature: Buffer): boolean {
    throw new Error(`Signature check is not supported for key ${this.privateKey.computePublicKey().kind()}`);
  }
}

/**
 * DecryptorSharedSecret is a class for decryptors of AES keys
 */
export class DecryptorSharedSecret {
  private readonly privateKey: SharedSecret;

  /**
   * Creates an instance of DecryptorSharedSecret
   */
  constructor(sharedSecret: SharedSecret) {
    this.privateKey = sharedSecret;
  }

  /**
   * Decrypts data with the private key
   * @throws {Error} Throws an error if the message is too short
   * @throws {Error} Throws an error if the digest is invalid
   */
  decrypt(digest: Buffer, encrypted: Buffer): Buffer {
    // if (data.length < 32 + 32) {
    //   throw new Error(`Message is too short`);
    // }
    //
    // const publicKey = data.subarray(0, 32);
    //
    // if (!publicKey.equals(this.privateKey.computePublicKey().raw())) {
    //   throw new Error(`Invalid public key`);
    // }
    //
    // const digest = data.subarray(32, 32 + 32);
    // const encrypted = data.subarray(32 + 32);

    const sharedSecret = this.privateKey.raw();

    const k = Buffer.concat([sharedSecret.subarray(0, 16), digest.subarray(16, 32)]);
    const iv = Buffer.concat([digest.subarray(0, 4), sharedSecret.subarray(20, 32)]);
    const decipher = crypto.createDecipheriv('aes-256-ctr', k, iv);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const realDigest = crypto.createHash('sha256').update(decrypted).digest();

    if (!realDigest.equals(digest)) {
      throw new Error(`sha256 mismatch during decryption`);
    }

    return decrypted;
  }

  /**
   * Signs data with the private key
   * @throws {Error} Throws an error if the signing is not supported
   */
  sign(data: Buffer): Buffer {
    throw new Error(`Signing is not supported for key ${this.privateKey.computePublicKey().kind()}`);
  }
}
