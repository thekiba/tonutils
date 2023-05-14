# tonutils/keys

> A comprehensive and user-friendly Keys library for Node.js, designed to simplify the process of key transformation, encryption, and decryption. This package provides a unified API for creating and managing ciphers and decipher objects, enabling developers to easily integrate secure and reliable cryptography features in their decentralized applications.

This TypeScript library provides a set of classes and methods for working with different types of cryptographic keys, such as Ed25519 and AES. It provides an easy and secure way to handle encryption, decryption, signing, and verification operations.

## Installation

```sh
npm install tonutils
```

## Usage

This library offers a `PrivateKey` class that represents a private key of various kinds, such as Ed25519, AES, Unenc, and Overlay.

Here is a basic example of creating a new Ed25519 key, encrypting a message, and then decrypting it.

```typescript
import { PrivateKey } from "tonutils/keys";

const message = Buffer.from('Hello, world!');
const localKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
const peerKey = new PrivateKey(PrivateKey.Ed25519.random().tl());

const sender = peerKey.computePublicKey().createEncryptor(localKey);
const { publicKey, digest, encrypted } = sender.encrypt(message);

const receiver = peerKey.createDecryptor(localKey.computePublicKey());
const decrypted = receiver.decrypt(publicKey, digest, encrypted);

console.log(decrypted.toString()); // outputs: 'Hello, world!'
```

Please refer to the tests and the source code for more detailed usage examples and API information.

## Note

This library handles encryption and decryption for Ed25519 and AES keys, but not for Unenc and Overlay keys. An attempt to encrypt or decrypt using these types of keys will result in an error.

Similarly, the library handles signing and signature checking for Ed25519 keys but not for AES, Unenc, and Overlay keys. An attempt to sign or verify a signature using these types of keys will result in an error.

## Contribution

Contributions are always welcome! Please feel free to open issues and create pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
