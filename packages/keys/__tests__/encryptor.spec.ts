import {PrivateKey} from "../lib/keys";
import nacl from "tweetnacl";

describe('Ed25519', () => {
  describe('encrypt and decrypt', () => {
    it('should encrypt and decrypt', () => {
      const message = Buffer.from('Hello, world!');

      const localKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
      const peerKey = new PrivateKey(PrivateKey.Ed25519.random().tl());

      const sender = peerKey.computePublicKey().createEncryptor(localKey);
      const {publicKey, digest, encrypted} = sender.encrypt(message);

      const receiver = peerKey.createDecryptor(localKey.computePublicKey());
      const decrypted = receiver.decrypt(publicKey, digest, encrypted);

      expect(decrypted).toEqual(message);
    });
    it('should encrypt and decrypt several times', () => {
      const localKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
      const peerKey = new PrivateKey(PrivateKey.Ed25519.random().tl());

      const sender = peerKey.computePublicKey().createEncryptor(localKey);
      const receiver = peerKey.createDecryptor(localKey.computePublicKey());

      for (let i = 0; i < 5; i++) {
        const message = Buffer.from(nacl.randomBytes(1024));
        const { publicKey, digest, encrypted } = sender.encrypt(message);
        const decrypted = receiver.decrypt(publicKey, digest, encrypted);
        expect(decrypted).toEqual(message);
      }
    });
    it('test throughput encryption and decryption', () => {
      const batch = 1000;
      const sizes = [
        1024 * 1, // 1KB
        1024 * 10, // 10KB
        1024 * 100, // 100KB
        1024 * 1024 // 1MB
      ];

      const results = [];

      for (const size of sizes) {
        const humanSize: string = (size / 1024).toFixed(2) + 'KB';
        const buffer = Buffer.from(nacl.randomBytes(size));

        const localKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
        const peerKey = new PrivateKey(PrivateKey.Ed25519.random().tl());

        const sender = peerKey.computePublicKey().createEncryptor(localKey);
        const receiver = peerKey.createDecryptor(localKey.computePublicKey());


        // Шифрование
        let encryptedBuffers = [];
        let encryptionElapsed = 0;
        for (let i = 0; i < batch; i++) {
          const encryptionStart = performance.now();
          const encrypted = sender.encrypt(buffer);
          encryptionElapsed += performance.now() - encryptionStart;
          encryptedBuffers.push(encrypted);
        }
        const encryptionThroughput = batch * size / (encryptionElapsed / 1000) / 1024 / 1024;

        // Дешифрование
        let decryptionElapsed = 0;
        for (let i = 0; i < batch; i++) {
          const { publicKey, digest, encrypted } = encryptedBuffers[i];
          const decryptionStart = performance.now();
          receiver.decrypt(publicKey, digest, encrypted);
          decryptionElapsed += performance.now() - decryptionStart;
        }
        const decryptionThroughput = batch * size / (decryptionElapsed / 1000) / 1024 / 1024;

        // Результаты
        const totalElapsed = encryptionElapsed + decryptionElapsed;
        const totalThroughput = batch * size / (totalElapsed / 1000) / 1024 / 1024;

        results.push(`Encryption throughput of ${humanSize}: ${encryptionThroughput.toFixed(2)} MB/s\r\n` +
          `Decryption throughput of ${humanSize}: ${decryptionThroughput.toFixed(2)} MB/s\r\n` +
          `Total throughput of ${humanSize}: ${totalThroughput.toFixed(2)} MB/s`);
      }

      console.log(results.join('\r\n\r\n'));
    });
  });

  describe('sign and verify', () => {
    it('should sign and verify', () => {
      const message = Buffer.from('Hello, world!');

      const localKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
      const peerKey = new PrivateKey(PrivateKey.Ed25519.random().tl());

      const sender = peerKey.createDecryptor(localKey.computePublicKey());
      const receiver = peerKey.computePublicKey().createEncryptor(localKey);

      const signature = sender.sign(message);

      expect(receiver.checkSignature(message, signature)).toBeTruthy();
    });
    it('should batch sign and verify', () => {
      const messages = [
        Buffer.from('Hello, world!'),
        Buffer.from('Hello, world!'),
        Buffer.from('Hello, world!'),
      ];

      const localKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
      const peerKey = new PrivateKey(PrivateKey.Ed25519.random().tl());

      const sender = peerKey.createDecryptor(localKey.computePublicKey());
      const receiver = peerKey.computePublicKey().createEncryptor(localKey);

      const signatures = sender.signBatch(messages);

      for (let i = 0; i < messages.length; i++) {
        expect(receiver.checkSignature(messages[i], signatures[i])).toBeTruthy();
      }
    });
  });
  it('test throughput signing and verifying', () => {
    const batch = 100;
    const sizes = [
      1024 * 1, // 1KB
      1024 * 10, // 10KB
      1024 * 100, // 100KB
      1024 * 1024 // 1MB
    ];

    const results = [];

    for (const size of sizes) {
      const humanSize: string = (size / 1024).toFixed(2) + 'KB';
      const buffer = Buffer.from(nacl.randomBytes(size));

      const localKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
      const peerKey = new PrivateKey(PrivateKey.Ed25519.random().tl());

      const receiver = peerKey.computePublicKey().createEncryptor(localKey);
      const sender = peerKey.createDecryptor(localKey.computePublicKey());


      // Подпись
      let signatures = [];
      let signingElapsed = 0;
      for (let i = 0; i < batch; i++) {
        const signingStart = performance.now();
        const signature = sender.sign(buffer)
        signingElapsed += performance.now() - signingStart;
        signatures.push(signature);
      }
      const signingThroughput = batch * size / (signingElapsed / 1000) / 1024 / 1024;

      // Верификация
      let verifyingElapsed = 0;
      for (let i = 0; i < batch; i++) {
        const signature = signatures[i];
        const verifyingStart = performance.now();
        receiver.checkSignature(buffer, signature);
        verifyingElapsed += performance.now() - verifyingStart;
      }
      const verifyingThroughput = batch * size / (verifyingElapsed / 1000) / 1024 / 1024;

      // Результаты
      const totalElapsed = signingElapsed + verifyingElapsed;
      const totalThroughput = batch * size / (totalElapsed / 1000) / 1024 / 1024;

      results.push(`Signing throughput of ${humanSize}: ${signingThroughput.toFixed(2)} MB/s\r\n` +
        `Verifying throughput of ${humanSize}: ${verifyingThroughput.toFixed(2)} MB/s\r\n` +
        `Total throughput of ${humanSize}: ${totalThroughput.toFixed(2)} MB/s`);
    }

    console.log(results.join('\r\n\r\n'));
  });
});

describe('AES', () => {
  describe('encrypt and decrypt', () => {
    it('should encrypt and decrypt', () => {
      const message = Buffer.from('Hello, world!');

      const localKey = new PrivateKey(PrivateKey.AES.random().tl());
      const peerKey = new PrivateKey(PrivateKey.AES.random().tl());

      const receiver = peerKey.createDecryptor(localKey.computePublicKey());
      const sender = peerKey.computePublicKey().createEncryptor(localKey);

      const { publicKey, digest, encrypted } = sender.encrypt(message);
      const decrypted = receiver.decrypt(publicKey, digest, encrypted);

      expect(decrypted).toEqual(message);
    });
  });
  describe('sign and verify', () => {
    it('should throw on sign and verify', () => {
      const localKey = new PrivateKey(PrivateKey.AES.random().tl());
      const peerKey = new PrivateKey(PrivateKey.AES.random().tl());

      const sender = peerKey.createDecryptor(localKey.computePublicKey());
      const receiver = peerKey.computePublicKey().createEncryptor(localKey);

      expect(() =>
        sender.sign(Buffer.alloc(32))
      ).toThrow('Signing is not supported for key pk.aes');

      expect(() =>
        receiver.checkSignature(Buffer.alloc(32), Buffer.alloc(32))
      ).toThrow('Signature check is not supported for key pub.aes');
    });
    it('should throw on batch sign', () => {
      const sender = new PrivateKey(PrivateKey.AES.random().tl()).createDecryptor(new PrivateKey(PrivateKey.AES.random().tl()).computePublicKey());

      expect(() =>
        sender.signBatch([Buffer.alloc(32), Buffer.alloc(32)])
      ).toThrow('Signing is not supported for key pk.aes');
    });
  });
});

describe('Unenc', () => {
  describe('encrypt and decrypt', () => {
    it('should throw on encrypt and decrypt', () => {
      const receiver = new PrivateKey({kind: 'pk.unenc', data: Buffer.alloc(32)});
      const sender = receiver.computePublicKey();

      const encryptor = sender.createEncryptor(receiver);
      expect(() =>
        encryptor.encrypt(Buffer.alloc(32))
      ).toThrow('Encryption is not supported for key pub.unenc');

      const decryptor = receiver.createDecryptor(receiver.computePublicKey());
      expect(() =>
        decryptor.decrypt(Buffer.alloc(32), Buffer.alloc(32), Buffer.alloc(32))
      ).toThrow('Decryption is not supported for key pk.unenc');
    });
  });
  describe('sign and verify', () => {
    it('should throw on sign and verify', () => {
      const sender = new PrivateKey({kind: 'pk.unenc', data: Buffer.alloc(32)});
      const receiver = sender.computePublicKey();

      const decryptor = sender.createDecryptor(sender.computePublicKey());
      expect(() =>
        decryptor.sign(Buffer.alloc(32))
      ).toThrow('Signing is not supported for key pk.unenc');

      const encryptor = receiver.createEncryptor(sender);
      expect(() =>
        encryptor.checkSignature(Buffer.alloc(32), Buffer.alloc(32))
      ).toThrow('Signature check is not supported for key pub.unenc');
    });
    it('should throw on batch sign', () => {
      const sender = new PrivateKey({kind: 'pk.unenc', data: Buffer.alloc(32)});

      const decryptor = sender.createDecryptor(sender.computePublicKey());
      expect(() =>
        decryptor.signBatch([Buffer.alloc(32), Buffer.alloc(32)])
      ).toThrow('Batch signing is not supported for key pk.unenc');
    });
  });
});

describe('Overlay', () => {
  describe('encrypt and decrypt', () => {
    it('should throw on encrypt and decrypt', () => {
      const receiver = new PrivateKey({kind: 'pk.overlay', name: Buffer.alloc(32)});
      const sender = receiver.computePublicKey();

      const encryptor = sender.createEncryptor(receiver);
      expect(() =>
        encryptor.encrypt(Buffer.alloc(32))
      ).toThrow('Encryption is not supported for key pub.overlay');

      const decryptor = receiver.createDecryptor(receiver.computePublicKey());
      expect(() =>
        decryptor.decrypt(Buffer.alloc(32), Buffer.alloc(32), Buffer.alloc(32))
      ).toThrow('Decryption is not supported for key pk.overlay');
    });
  });
  describe('sign and verify', () => {
    it('should throw on sign and verify', () => {
      const sender = new PrivateKey({kind: 'pk.overlay', name: Buffer.alloc(32)});
      const receiver = sender.computePublicKey();

      const decryptor = sender.createDecryptor(sender.computePublicKey());
      expect(() =>
        decryptor.sign(Buffer.alloc(32))
      ).toThrow('Signing is not supported for key pk.overlay');

      const encryptor = receiver.createEncryptor(sender);
      expect(() =>
        encryptor.checkSignature(Buffer.alloc(32), Buffer.alloc(32))
      ).toThrow('Signature check is not supported for key pub.overlay');
    });
    it('should throw on batch sign', () => {
      const sender = new PrivateKey({kind: 'pk.overlay', name: Buffer.alloc(32)});

      const decryptor = sender.createDecryptor(sender.computePublicKey());
      expect(() =>
        decryptor.signBatch([Buffer.alloc(32), Buffer.alloc(32)])
      ).toThrow('Batch signing is not supported for key pk.overlay');
    });
  });
});
