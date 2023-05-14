import {PrivateKey, PublicKey, PublicKeyHash} from '../lib/keys';
import nacl from 'tweetnacl';
import {Decryptor, Encryptor} from "../lib/encryptor";

describe('PublicKeyHash', () => {
  it('constructor', () => {
    const hash = new PublicKeyHash();
    expect(hash.raw()).toEqual(Buffer.alloc(32));

    const hash2 = new PublicKeyHash(Buffer.from('12345678901234567890123456789012', 'ascii'));
    expect(hash2.raw()).toEqual(Buffer.from('12345678901234567890123456789012', 'ascii'));
  });
  it('zero', () => {
    const zero = PublicKeyHash.zero();
    expect(zero.isZero()).toBe(true);

    const hash = new PublicKeyHash(Buffer.from('12345678901234567890123456789012', 'ascii'));
    expect(hash.isZero()).toBe(false);
  });
  it('raw', () => {
    const hash = new PublicKeyHash(Buffer.from('12345678901234567890123456789012', 'ascii'));
    expect(hash.raw()).toEqual(Buffer.from('12345678901234567890123456789012', 'ascii'));
  });
  it('lessThan', () => {
    const hash = new PublicKeyHash(Buffer.from('12345678901234567890123456789012', 'ascii'));
    const other = new PublicKeyHash(Buffer.from('12345678901234567890123456789013', 'ascii'));

    expect(hash.lessThan(other)).toBe(true);
    expect(other.lessThan(hash)).toBe(false);
  });
  it('equalTo', () => {
    const hash = new PublicKeyHash(Buffer.from('12345678901234567890123456789012', 'ascii'));
    expect(hash.equals(hash)).toBe(true);

    const other = new PublicKeyHash(Buffer.from('12345678901234567890123456789013', 'ascii'));
    expect(hash.equals(other)).toBe(false);
  });
  it('notEqualTo', () => {
    const hash = new PublicKeyHash(Buffer.from('12345678901234567890123456789012', 'ascii'));
    expect(hash.notEquals(hash)).toBe(false);

    const other = new PublicKeyHash(Buffer.from('12345678901234567890123456789013', 'ascii'));
    expect(hash.notEquals(other)).toBe(true);
  });
  it('isZero', () => {
    const hash = new PublicKeyHash(Buffer.from('12345678901234567890123456789012', 'ascii'));
    expect(hash.isZero()).toBe(false);

    const zero = PublicKeyHash.zero();
    expect(zero.isZero()).toBe(true);
  });
});

describe('PublicKey', () => {

  describe('Ed25519', () => {
    it('constructor', () => {
      const ed25519 = new PublicKey.Ed25519({kind: 'pub.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.raw()).toEqual(Buffer.alloc(32));

      expect(() => new PublicKey.Ed25519({
        kind: 'pub.ed25519',
        key: Buffer.alloc(31)
      })).toThrow(new Error('Invalid Ed25519 public key length: 31, expected 32'));

      expect(() => new PublicKey.Ed25519({
        kind: 'pub.ed25519',
        key: Buffer.alloc(33)
      })).toThrow(new Error('Invalid Ed25519 public key length: 33, expected 32'));
    });
    it('raw', () => {
      const publicKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const ed25519 = new PublicKey.Ed25519({kind: 'pub.ed25519', key: publicKey});
      expect(ed25519.raw()).toEqual(publicKey);
    });
    it('kind', () => {
      const ed25519 = new PublicKey.Ed25519({kind: 'pub.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.kind()).toEqual('pub.ed25519');
    });
    it('tl', () => {
      const publicKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const ed25519 = new PublicKey.Ed25519({kind: 'pub.ed25519', key: publicKey});
      expect(ed25519.tl()).toEqual({kind: 'pub.ed25519', key: publicKey});
    });
    it('equals', () => {
      const publicKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const ed25519 = new PublicKey.Ed25519({kind: 'pub.ed25519', key: publicKey});
      expect(ed25519.equals(ed25519)).toBe(true);

      const otherKey = Buffer.from('12345678901234567890123456789013', 'ascii');
      const otherEd25519 = new PublicKey.Ed25519({kind: 'pub.ed25519', key: otherKey});
      expect(ed25519.equals(otherEd25519)).toBe(false);
    });
  });

  describe('AES', () => {
    it('constructor', () => {
      const aes = new PublicKey.AES({kind: 'pub.aes', key: Buffer.alloc(32)});
      expect(aes.raw()).toEqual(Buffer.alloc(32));

      expect(() => new PublicKey.AES({
        kind: 'pub.aes',
        key: Buffer.alloc(31)
      })).toThrow(new Error('Invalid AES public key length: 31, expected 32'));

      expect(() => new PublicKey.AES({
        kind: 'pub.aes',
        key: Buffer.alloc(33)
      })).toThrow(new Error('Invalid AES public key length: 33, expected 32'));
    });
    it('raw', () => {
      const publicKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const aes = new PublicKey.AES({kind: 'pub.aes', key: publicKey});
      expect(aes.raw()).toEqual(publicKey);
    });
    it('kind', () => {
      const aes = new PublicKey.AES({kind: 'pub.aes', key: Buffer.alloc(32)});
      expect(aes.kind()).toEqual('pub.aes');
    });
    it('tl', () => {
      const publicKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const aes = new PublicKey.AES({kind: 'pub.aes', key: publicKey});
      expect(aes.tl()).toEqual({kind: 'pub.aes', key: publicKey});
    });
    it('equals', () => {
      const publicKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const aes = new PublicKey.AES({kind: 'pub.aes', key: publicKey});
      expect(aes.equals(aes)).toBe(true);

      const otherKey = Buffer.from('12345678901234567890123456789013', 'ascii');
      const otherAes = new PublicKey.AES({kind: 'pub.aes', key: otherKey});
      expect(aes.equals(otherAes)).toBe(false);
    });
  });

  describe('Unenc', () => {
    it('constructor', () => {
      const unenc = new PublicKey.Unenc({kind: 'pub.unenc', data: Buffer.alloc(32)});
      expect(unenc.raw()).toEqual(Buffer.alloc(32));
    });
    it('raw', () => {
      const data = Buffer.from('12345678901234567890123456789012', 'ascii');
      const unenc = new PublicKey.Unenc({kind: 'pub.unenc', data});
      expect(unenc.raw()).toEqual(data);
    });
    it('kind', () => {
      const unenc = new PublicKey.Unenc({kind: 'pub.unenc', data: Buffer.alloc(32)});
      expect(unenc.kind()).toEqual('pub.unenc');
    });
    it('tl', () => {
      const data = Buffer.from('12345678901234567890123456789012', 'ascii');
      const unenc = new PublicKey.Unenc({kind: 'pub.unenc', data});
      expect(unenc.tl()).toEqual({kind: 'pub.unenc', data});
    });
    it('equals', () => {
      const data = Buffer.from('12345678901234567890123456789012', 'ascii');
      const unenc = new PublicKey.Unenc({kind: 'pub.unenc', data});
      expect(unenc.equals(unenc)).toBe(true);

      const otherData = Buffer.from('12345678901234567890123456789013', 'ascii');
      const otherUnenc = new PublicKey.Unenc({kind: 'pub.unenc', data: otherData});
      expect(unenc.equals(otherUnenc)).toBe(false);
    });
  });

  describe('Overlay', () => {
    it('constructor', () => {
      const overlay = new PublicKey.Overlay({kind: 'pub.overlay', name: Buffer.alloc(32)});
      expect(overlay.raw()).toEqual(Buffer.alloc(32));
    });
    it('raw', () => {
      const name = Buffer.from('12345678901234567890123456789012', 'ascii');
      const overlay = new PublicKey.Overlay({kind: 'pub.overlay', name});
      expect(overlay.raw()).toEqual(name);
    });
    it('kind', () => {
      const overlay = new PublicKey.Overlay({kind: 'pub.overlay', name: Buffer.alloc(32)});
      expect(overlay.kind()).toEqual('pub.overlay');
    });
    it('tl', () => {
      const name = Buffer.from('12345678901234567890123456789012', 'ascii');
      const overlay = new PublicKey.Overlay({kind: 'pub.overlay', name});
      expect(overlay.tl()).toEqual({kind: 'pub.overlay', name});
    });
    it('equals', () => {
      const name = Buffer.from('12345678901234567890123456789012', 'ascii');
      const overlay = new PublicKey.Overlay({kind: 'pub.overlay', name});
      expect(overlay.equals(overlay)).toBe(true);

      const otherName = Buffer.from('12345678901234567890123456789013', 'ascii');
      const otherOverlay = new PublicKey.Overlay({kind: 'pub.overlay', name: otherName});
      expect(overlay.equals(otherOverlay)).toBe(false);
    });
  });

  describe('PublicKey', () => {
    it('constructor', () => {
      const ed25519 = new PublicKey({kind: 'pub.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.raw()).toEqual(Buffer.alloc(32));
      expect(ed25519.kind()).toEqual('pub.ed25519');

      const aes = new PublicKey({kind: 'pub.aes', key: Buffer.alloc(32)});
      expect(aes.raw()).toEqual(Buffer.alloc(32));
      expect(aes.kind()).toEqual('pub.aes');

      const unenc = new PublicKey({kind: 'pub.unenc', data: Buffer.alloc(32)});
      expect(unenc.raw()).toEqual(Buffer.alloc(32));
      expect(unenc.kind()).toEqual('pub.unenc');

      const overlay = new PublicKey({kind: 'pub.overlay', name: Buffer.alloc(32)});
      expect(overlay.raw()).toEqual(Buffer.alloc(32));
      expect(overlay.kind()).toEqual('pub.overlay');
    });
    it('computeShortId', () => {
      const ed25519 = new PublicKey({kind: 'pub.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.computeShortId()).toEqual(new PublicKeyHash(Buffer.from('XcxWbLmipLlAi3420SJtzrNra+WGolg8rlQJeWOMYA4=', 'base64')));
    });
    it('raw', () => {
      const publicKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const ed25519 = new PublicKey({kind: 'pub.ed25519', key: publicKey});
      expect(ed25519.raw()).toEqual(publicKey);
    });
    it('kind', () => {
      const ed25519 = new PublicKey({kind: 'pub.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.kind()).toEqual('pub.ed25519');

      const aes = new PublicKey({kind: 'pub.aes', key: Buffer.alloc(32)});
      expect(aes.kind()).toEqual('pub.aes');

      const unenc = new PublicKey({kind: 'pub.unenc', data: Buffer.alloc(32)});
      expect(unenc.kind()).toEqual('pub.unenc');

      const overlay = new PublicKey({kind: 'pub.overlay', name: Buffer.alloc(32)});
      expect(overlay.kind()).toEqual('pub.overlay');
    });
    it('tl', () => {
      const publicKeyEd25519 = Buffer.from('12345678901234567890123456789012', 'ascii');
      const ed25519 = new PublicKey({kind: 'pub.ed25519', key: publicKeyEd25519});
      expect(ed25519.tl()).toEqual({kind: 'pub.ed25519', key: publicKeyEd25519});

      const publicKeyAes = Buffer.from('12345678901234567890123456789012', 'ascii');
      const aes = new PublicKey({kind: 'pub.aes', key: publicKeyAes});
      expect(aes.tl()).toEqual({kind: 'pub.aes', key: publicKeyAes});

      const dataUnecr = Buffer.from('12345678901234567890123456789012', 'ascii');
      const unenc = new PublicKey({kind: 'pub.unenc', data: dataUnecr});
      expect(unenc.tl()).toEqual({kind: 'pub.unenc', data: dataUnecr});

      const nameOverlay = Buffer.from('12345678901234567890123456789012', 'ascii');
      const overlay = new PublicKey({kind: 'pub.overlay', name: nameOverlay});
      expect(overlay.tl()).toEqual({kind: 'pub.overlay', name: nameOverlay});
    });
    it('isEd25519', () => {
      const ed25519 = new PublicKey({kind: 'pub.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.isEd25519()).toBe(true);

      const aes = new PublicKey({kind: 'pub.aes', key: Buffer.alloc(32)});
      expect(aes.isEd25519()).toBe(false);

      const unenc = new PublicKey({kind: 'pub.unenc', data: Buffer.alloc(32)});
      expect(unenc.isEd25519()).toBe(false);

      const overlay = new PublicKey({kind: 'pub.overlay', name: Buffer.alloc(32)});
      expect(overlay.isEd25519()).toBe(false);
    });
    it('isAES', () => {
      const ed25519 = new PublicKey({kind: 'pub.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.isAES()).toBe(false);

      const aes = new PublicKey({kind: 'pub.aes', key: Buffer.alloc(32)});
      expect(aes.isAES()).toBe(true);

      const unenc = new PublicKey({kind: 'pub.unenc', data: Buffer.alloc(32)});
      expect(unenc.isAES()).toBe(false);

      const overlay = new PublicKey({kind: 'pub.overlay', name: Buffer.alloc(32)});
      expect(overlay.isAES()).toBe(false);
    });
    it('isUnenc', () => {
      const ed25519 = new PublicKey({kind: 'pub.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.isUnenc()).toBe(false);

      const aes = new PublicKey({kind: 'pub.aes', key: Buffer.alloc(32)});
      expect(aes.isUnenc()).toBe(false);

      const unenc = new PublicKey({kind: 'pub.unenc', data: Buffer.alloc(32)});
      expect(unenc.isUnenc()).toBe(true);

      const overlay = new PublicKey({kind: 'pub.overlay', name: Buffer.alloc(32)});
      expect(overlay.isUnenc()).toBe(false);
    });
    it('isOverlay', () => {
      const ed25519 = new PublicKey({kind: 'pub.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.isOverlay()).toBe(false);

      const aes = new PublicKey({kind: 'pub.aes', key: Buffer.alloc(32)});
      expect(aes.isOverlay()).toBe(false);

      const unenc = new PublicKey({kind: 'pub.unenc', data: Buffer.alloc(32)});
      expect(unenc.isOverlay()).toBe(false);

      const overlay = new PublicKey({kind: 'pub.overlay', name: Buffer.alloc(32)});
      expect(overlay.isOverlay()).toBe(true);
    });
    it('equals', () => {
      const publicKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const ed25519 = new PublicKey({kind: 'pub.ed25519', key: publicKey});
      expect(ed25519.equals(ed25519)).toBe(true);

      const otherPublicKey = Buffer.from('12345678901234567890123456789013', 'ascii');
      const otherEd25519 = new PublicKey({kind: 'pub.ed25519', key: otherPublicKey});
      expect(ed25519.equals(otherEd25519)).toBe(false);
    });
    it('createEncryptor', () => {
      const ed25519 = new PublicKey({kind: 'pub.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.createEncryptor(new PrivateKey(PrivateKey.Ed25519.random().tl()))).toBeInstanceOf(Encryptor);

      const aes = new PublicKey({kind: 'pub.aes', key: Buffer.alloc(32)});
      expect(aes.createEncryptor(new PrivateKey(PrivateKey.Ed25519.random().tl()))).toBeInstanceOf(Encryptor);

      const unenc = new PublicKey({kind: 'pub.unenc', data: Buffer.alloc(32)});
      expect(unenc.createEncryptor(new PrivateKey(PrivateKey.Ed25519.random().tl()))).toBeInstanceOf(Encryptor);

      const overlay = new PublicKey({kind: 'pub.overlay', name: Buffer.alloc(32)});
      expect(overlay.createEncryptor(new PrivateKey(PrivateKey.Ed25519.random().tl()))).toBeInstanceOf(Encryptor);
    });
  });

});

describe('PrivateKey', () => {

  describe('Ed25519', () => {
    it('constructor', () => {
      const ed25519 = new PrivateKey.Ed25519({kind: 'pk.ed25519', key: Buffer.alloc(32)});
      expect(ed25519).toBeInstanceOf(PrivateKey.Ed25519);

      expect(() => new PrivateKey.Ed25519({
        kind: 'pk.ed25519',
        key: Buffer.alloc(31)
      })).toThrowError('Invalid Ed25519 private key length: 31, expected 32');

      expect(() => new PrivateKey.Ed25519({
        kind: 'pk.ed25519',
        key: Buffer.alloc(33)
      })).toThrowError('Invalid Ed25519 private key length: 33, expected 32');
    });
    it('random', () => {
      const ed25519 = PrivateKey.Ed25519.random();
      expect(ed25519).toBeInstanceOf(PrivateKey.Ed25519);
      expect(ed25519.raw().length).toEqual(32);
      expect(ed25519.raw()).not.toEqual(PrivateKey.Ed25519.random().raw());
    });
    it('fromSeed', () => {
      const seed = Buffer.from('12345678901234567890123456789012', 'ascii');
      const ed25519 = PrivateKey.Ed25519.fromSeed(seed);
      expect(ed25519).toBeInstanceOf(PrivateKey.Ed25519);
      expect(ed25519.raw()).toEqual(Buffer.from('MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=', 'base64'));
    });
    it('raw', () => {
      const privateKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const ed25519 = new PrivateKey.Ed25519({kind: 'pk.ed25519', key: privateKey});
      expect(ed25519.raw()).toEqual(privateKey);
    });
    it('kind', () => {
      const ed25519 = new PrivateKey.Ed25519({kind: 'pk.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.kind()).toEqual('pk.ed25519');
    });
    it('publicKey', () => {
      const privateKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const ed25519 = new PrivateKey.Ed25519({kind: 'pk.ed25519', key: privateKey});
      const publicKey = ed25519.publicKey();
      expect(publicKey).toBeInstanceOf(PublicKey.Ed25519);
      expect(publicKey.raw()).toEqual(Buffer.from('L4xhKdgWz1HDdLx/CMPmPtFWz3iu+0plUNl7h5l5d+4=', 'base64'));
    });
    it('tl', () => {
      const privateKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const ed25519 = new PrivateKey.Ed25519({kind: 'pk.ed25519', key: privateKey});
      expect(ed25519.tl()).toEqual({
        kind: 'pk.ed25519',
        key: privateKey
      });
    });
    it('tlPublic', () => {
      const privateKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const ed25519 = new PrivateKey.Ed25519({kind: 'pk.ed25519', key: privateKey});
      expect(ed25519.tlPublic()).toEqual({
        kind: 'pub.ed25519',
        key: Buffer.from('L4xhKdgWz1HDdLx/CMPmPtFWz3iu+0plUNl7h5l5d+4=', 'base64')
      });
    });
  });

  describe('AES', () => {
    it('constructor', () => {
      const aes = new PrivateKey.AES({kind: 'pk.aes', key: Buffer.alloc(32)});
      expect(aes).toBeInstanceOf(PrivateKey.AES);

      expect(() => new PrivateKey.AES({
        kind: 'pk.aes',
        key: Buffer.alloc(31)
      })).toThrowError('Invalid AES private key length: 31, expected 32');

      expect(() => new PrivateKey.AES({
        kind: 'pk.aes',
        key: Buffer.alloc(33)
      })).toThrowError('Invalid AES private key length: 33, expected 32');
    });
    it('random', () => {
      const aes = PrivateKey.AES.random();
      expect(aes).toBeInstanceOf(PrivateKey.AES);
      expect(aes.raw().length).toEqual(32);
      expect(aes.raw()).not.toEqual(PrivateKey.AES.random().raw());
    });

    it('fromSeed', () => {
      const privateKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const aes = PrivateKey.AES.fromSeed(privateKey);
      expect(aes).toBeInstanceOf(PrivateKey.AES);
      expect(aes.raw()).toEqual(Buffer.from('MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=', 'base64'));
    });
    it('raw', () => {
      const privateKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const aes = new PrivateKey.AES({kind: 'pk.aes', key: privateKey});
      expect(aes.raw()).toEqual(privateKey);
    });
    it('kind', () => {
      const aes = new PrivateKey.AES({kind: 'pk.aes', key: Buffer.alloc(32)});
      expect(aes.kind()).toEqual('pk.aes');
    });
    it('publicKey', () => {
      const privateKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const aes = new PrivateKey.AES({kind: 'pk.aes', key: privateKey});
      const publicKey = aes.publicKey();
      expect(publicKey).toBeInstanceOf(PublicKey.AES);
      expect(publicKey.raw()).toEqual(privateKey);
    });
    it('tl', () => {
      const privateKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const aes = new PrivateKey.AES({kind: 'pk.aes', key: privateKey});
      expect(aes.tl()).toEqual({
        kind: 'pk.aes',
        key: privateKey
      });
    });
    it('tlPublic', () => {
      const privateKey = Buffer.from('12345678901234567890123456789012', 'ascii');
      const aes = new PrivateKey.AES({kind: 'pk.aes', key: privateKey});
      expect(aes.tlPublic()).toEqual({
        kind: 'pub.aes',
        key: privateKey
      });
    });
  });

  describe('Unenc', () => {
    it('constructor', () => {
      const data = Buffer.from(nacl.randomBytes(128));
      const unenc = new PrivateKey.Unenc({kind: 'pk.unenc', data: data});
      expect(unenc).toBeInstanceOf(PrivateKey.Unenc);
    });
    it('raw', () => {
      const data = Buffer.from(nacl.randomBytes(128));
      const unenc = new PrivateKey.Unenc({kind: 'pk.unenc', data: data});
      expect(unenc.raw()).toEqual(data);
    });
    it('kind', () => {
      const unenc = new PrivateKey.Unenc({kind: 'pk.unenc', data: Buffer.alloc(32)});
      expect(unenc.kind()).toEqual('pk.unenc');
    });
    it('publicKey', () => {
      const data = Buffer.from(nacl.randomBytes(128));
      const unenc = new PrivateKey.Unenc({kind: 'pk.unenc', data: data});
      const publicKey = unenc.publicKey();
      expect(publicKey).toBeInstanceOf(PublicKey.Unenc);
      expect(publicKey.raw()).toEqual(data);
    });
    it('tl', () => {
      const data = Buffer.from(nacl.randomBytes(128));
      const unenc = new PrivateKey.Unenc({kind: 'pk.unenc', data: data});
      expect(unenc.tl()).toEqual({
        kind: 'pk.unenc',
        data: data
      });
    });
    it('tlPublic', () => {
      const data = Buffer.from(nacl.randomBytes(128));
      const unenc = new PrivateKey.Unenc({kind: 'pk.unenc', data: data});
      expect(unenc.tlPublic()).toEqual({
        kind: 'pub.unenc',
        data: data
      });
    });
  });

  describe('Overlay', () => {
    it('constructor', () => {
      const overlay = new PrivateKey.Overlay({kind: 'pk.overlay', name: Buffer.alloc(32)});
      expect(overlay).toBeInstanceOf(PrivateKey.Overlay);
    });
    it('raw', () => {
      const name = Buffer.from('12345678901234567890123456789012', 'ascii');
      const overlay = new PrivateKey.Overlay({kind: 'pk.overlay', name: name});
      expect(overlay.raw()).toEqual(name);
    });
    it('kind', () => {
      const overlay = new PrivateKey.Overlay({kind: 'pk.overlay', name: Buffer.alloc(32)});
      expect(overlay.kind()).toEqual('pk.overlay');
    });
    it('publicKey', () => {
      const name = Buffer.from('12345678901234567890123456789012', 'ascii');
      const overlay = new PrivateKey.Overlay({kind: 'pk.overlay', name: name});
      const publicKey = overlay.publicKey();
      expect(publicKey).toBeInstanceOf(PublicKey.Overlay);
      expect(publicKey.raw()).toEqual(name);
    });
    it('tl', () => {
      const name = Buffer.from('12345678901234567890123456789012', 'ascii');
      const overlay = new PrivateKey.Overlay({kind: 'pk.overlay', name: name});
      expect(overlay.tl()).toEqual({
        kind: 'pk.overlay',
        name: name
      });
    });
    it('tlPublic', () => {
      const name = Buffer.from('12345678901234567890123456789012', 'ascii');
      const overlay = new PrivateKey.Overlay({kind: 'pk.overlay', name: name});
      expect(overlay.tlPublic()).toEqual({
        kind: 'pub.overlay',
        name: name
      });
    });
  });

  describe('PrivateKey', () => {
    it('constructor', () => {
      const ed25519 = new PrivateKey({kind: 'pk.ed25519', key: Buffer.alloc(32)});
      expect(ed25519).toBeInstanceOf(PrivateKey);

      const aes = new PrivateKey({kind: 'pk.aes', key: Buffer.alloc(32)});
      expect(aes).toBeInstanceOf(PrivateKey);

      const unenc = new PrivateKey({kind: 'pk.unenc', data: Buffer.alloc(32)});
      expect(unenc).toBeInstanceOf(PrivateKey);

      const overlay = new PrivateKey({kind: 'pk.overlay', name: Buffer.alloc(32)});
      expect(overlay).toBeInstanceOf(PrivateKey);
    });
    it('computePublicKey', () => {
      const ed25519 = new PrivateKey({kind: 'pk.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.computePublicKey()).toBeInstanceOf(PublicKey);

      const aes = new PrivateKey({kind: 'pk.aes', key: Buffer.alloc(32)});
      expect(aes.computePublicKey()).toBeInstanceOf(PublicKey);

      const unenc = new PrivateKey({kind: 'pk.unenc', data: Buffer.alloc(32)});
      expect(unenc.computePublicKey()).toBeInstanceOf(PublicKey);

      const overlay = new PrivateKey({kind: 'pk.overlay', name: Buffer.alloc(32)});
      expect(overlay.computePublicKey()).toBeInstanceOf(PublicKey);
    });
    it('computeShortId', () => {
      const privateKey = Buffer.from(nacl.randomBytes(32));

      const ed25519 = new PrivateKey({kind: 'pk.ed25519', key: privateKey});
      const ed25519ShortId = ed25519.computeShortId();
      expect(ed25519ShortId).toEqual(ed25519.computePublicKey().computeShortId());

      const aes = new PrivateKey({kind: 'pk.aes', key: privateKey});
      const aesShortId = aes.computeShortId();
      expect(aesShortId).toEqual(aes.computePublicKey().computeShortId());

      const unenc = new PrivateKey({kind: 'pk.unenc', data: privateKey});
      const unencShortId = unenc.computeShortId();
      expect(unencShortId).toEqual(unenc.computePublicKey().computeShortId());

      const overlay = new PrivateKey({kind: 'pk.overlay', name: privateKey});
      const overlayShortId = overlay.computeShortId();
      expect(overlayShortId).toEqual(overlay.computePublicKey().computeShortId());
    });
    it('raw', () => {
      const privateKey = Buffer.from(nacl.randomBytes(32));

      const ed25519 = new PrivateKey({kind: 'pk.ed25519', key: privateKey});
      expect(ed25519.raw()).toEqual(privateKey);

      const aes = new PrivateKey({kind: 'pk.aes', key: privateKey});
      expect(aes.raw()).toEqual(privateKey);

      const unenc = new PrivateKey({kind: 'pk.unenc', data: privateKey});
      expect(unenc.raw()).toEqual(privateKey);

      const overlay = new PrivateKey({kind: 'pk.overlay', name: privateKey});
      expect(overlay.raw()).toEqual(privateKey);
    });
    it('kind', () => {
      const ed25519 = new PrivateKey({kind: 'pk.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.kind()).toEqual('pk.ed25519');

      const aes = new PrivateKey({kind: 'pk.aes', key: Buffer.alloc(32)});
      expect(aes.kind()).toEqual('pk.aes');

      const unenc = new PrivateKey({kind: 'pk.unenc', data: Buffer.alloc(32)});
      expect(unenc.kind()).toEqual('pk.unenc');

      const overlay = new PrivateKey({kind: 'pk.overlay', name: Buffer.alloc(32)});
      expect(overlay.kind()).toEqual('pk.overlay');
    });
    it('tl', () => {
      const privateKey = Buffer.from('12345678901234567890123456789012', 'ascii');

      const ed25519 = new PrivateKey({kind: 'pk.ed25519', key: privateKey});
      expect(ed25519.tl()).toEqual({
        kind: 'pk.ed25519',
        key: privateKey
      });

      const aes = new PrivateKey({kind: 'pk.aes', key: privateKey});
      expect(aes.tl()).toEqual({
        kind: 'pk.aes',
        key: privateKey
      });

      const unenc = new PrivateKey({kind: 'pk.unenc', data: privateKey});
      expect(unenc.tl()).toEqual({
        kind: 'pk.unenc',
        data: privateKey
      });

      const overlay = new PrivateKey({kind: 'pk.overlay', name: privateKey});
      expect(overlay.tl()).toEqual({
        kind: 'pk.overlay',
        name: privateKey
      });
    });
    it('tlPublic', () => {
      const privateKey = Buffer.from('12345678901234567890123456789012', 'ascii');

      const ed25519 = new PrivateKey({kind: 'pk.ed25519', key: privateKey});
      expect(ed25519.tlPublic()).toEqual({
        kind: 'pub.ed25519',
        key: Buffer.from('L4xhKdgWz1HDdLx/CMPmPtFWz3iu+0plUNl7h5l5d+4=', 'base64')
      });

      const aes = new PrivateKey({kind: 'pk.aes', key: privateKey});
      expect(aes.tlPublic()).toEqual({
        kind: 'pub.aes',
        key: privateKey
      });

      const unenc = new PrivateKey({kind: 'pk.unenc', data: privateKey});
      expect(unenc.tlPublic()).toEqual({
        kind: 'pub.unenc',
        data: privateKey
      });

      const overlay = new PrivateKey({kind: 'pk.overlay', name: privateKey});
      expect(overlay.tlPublic()).toEqual({
        kind: 'pub.overlay',
        name: privateKey
      });
    });
    it('createDecryptor', () => {
      const publicKey = new PrivateKey(PrivateKey.Ed25519.random().tl()).computePublicKey();

      const ed25519 = new PrivateKey({kind: 'pk.ed25519', key: Buffer.alloc(32)});
      expect(ed25519.createDecryptor(publicKey)).toBeInstanceOf(Decryptor);

      const aes = new PrivateKey({kind: 'pk.aes', key: Buffer.alloc(32)});
      expect(aes.createDecryptor(publicKey)).toBeInstanceOf(Decryptor);

      const unenc = new PrivateKey({kind: 'pk.unenc', data: Buffer.alloc(32)});
      expect(unenc.createDecryptor(publicKey)).toBeInstanceOf(Decryptor);

      const overlay = new PrivateKey({kind: 'pk.overlay', name: Buffer.alloc(32)});
      expect(overlay.createDecryptor(publicKey)).toBeInstanceOf(Decryptor);
    });
  });

});
