import {Keyring, KeyringDBNoop} from "../lib";
import {PrivateKey} from "@tonutils/keys";

describe('Keyring', () => {
  it('should create a keyring', () => {
    const keyring = Keyring.create();
    expect(keyring).toBeInstanceOf(Keyring);
  });
  it('should create a keyring with a db', () => {
    const keyring = Keyring.create(new KeyringDBNoop());
    expect(keyring).toBeInstanceOf(Keyring);
  });
  it('should add a key and get a public key', async () => {
    const keyring = Keyring.create();
    const key = new PrivateKey(PrivateKey.Ed25519.random().tl());
    await keyring.addKey(key);
    const shortId = key.computePublicKey().computeShortId();
    expect(await keyring.checkKey(shortId)).toBe(true);
    expect(await keyring.getPublicKey(shortId)).toEqual(key.computePublicKey());
  });
  it('should add a key short and get a public key', async () => {
    const keyring = Keyring.create();
    const key = new PrivateKey(PrivateKey.Ed25519.random().tl());
    const shortId = key.computePublicKey().computeShortId();
    expect(await keyring.checkKey(shortId)).toBe(false);
    await keyring.addKey(key);
    expect(await keyring.checkKey(shortId)).toBe(true);
    expect(await keyring.addKeyShort(shortId)).toEqual(key.computePublicKey());
  });
  it('should add a key and sign a message', async () => {
    const keyring = Keyring.create();
    const key = new PrivateKey(PrivateKey.Ed25519.random().tl());
    await keyring.addKey(key);
    const shortId = key.computePublicKey().computeShortId();
    const signature = await keyring.signMessage(shortId, Buffer.from('test'));
    expect(signature).toBeInstanceOf(Buffer);
    expect(signature.length).toBe(64);
  });
  it('should add a key and sign a message and get a public key', async () => {
    const keyring = Keyring.create();
    const key = new PrivateKey(PrivateKey.Ed25519.random().tl());
    await keyring.addKey(key);
    const shortId = key.computePublicKey().computeShortId();
    const [signature, publicKey] = await keyring.signAddGetPublicKey(shortId, Buffer.from('test'));
    expect(signature).toBeInstanceOf(Buffer);
    expect(signature.length).toBe(64);
    expect(publicKey).toEqual(key.computePublicKey());
  });
  it('should add a key and sign messages', async () => {
    const keyring = Keyring.create();
    const key = new PrivateKey(PrivateKey.Ed25519.random().tl());
    await keyring.addKey(key);
    const shortId = key.computePublicKey().computeShortId();
    const signatures = await keyring.signMessages(shortId, [Buffer.from('test'), Buffer.from('test2')]);
    expect(signatures).toBeInstanceOf(Array);
    expect(signatures.length).toBe(2);
    expect(signatures[0]).toBeInstanceOf(Buffer);
    expect(signatures[0].length).toBe(64);
    expect(signatures[1]).toBeInstanceOf(Buffer);
    expect(signatures[1].length).toBe(64);
  });
  it('should add a key and decrypt a message', async () => {
    const keyring = Keyring.create();
    const key = new PrivateKey(PrivateKey.Ed25519.random().tl());
    await keyring.addKey(key);
    const shortId = key.computePublicKey().computeShortId();
    const encryptor = key.computePublicKey().createEncryptor(new PrivateKey(PrivateKey.Ed25519.random().tl()));
    const { publicKey, digest, encrypted } = await encryptor.encrypt(Buffer.from('test'));
    const decrypted = await keyring.decryptMessage(shortId, publicKey, digest, encrypted);
    expect(decrypted).toBeInstanceOf(Buffer);
    expect(decrypted.toString()).toBe('test');
  });
});
