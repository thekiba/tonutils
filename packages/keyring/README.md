# tonutils/keyring

A secure and convenient Keyring library for Node.js, designed to efficiently manage and store cryptographic keys in a unified and organized manner. This package offers an easy-to-use API for creating, importing, and exporting keys, as well as performing encryption, decryption, signing, and verification operations, facilitating the development of secure and reliable decentralized applications.

## Installation

```sh
npm install tonutils
```

## Usage

### Creating a Keyring

You can create a keyring with or without a database. Here's how:

```typescript
import { Keyring, KeyringDBNoop } from "tonutils/keyring";

// Create a keyring without a database
const keyring = Keyring.create();

// Create a keyring with a database
const keyringWithDB = Keyring.create(new KeyringDBNoop());
```

### Adding a Key to the Keyring

You can add a key to the keyring and then retrieve the corresponding public key.

```typescript
import { Keyring } from "tonutils/keyring";
import { PrivateKey } from "tonutils/keys";

async function main() {
  const keyring = Keyring.create();
  const key = new PrivateKey(PrivateKey.Ed25519.random().tl());

  await keyring.addKey(key);

  const shortId = key.computePublicKey().computeShortId();

  if (await keyring.checkKey(shortId)) {
    const publicKey = await keyring.getPublicKey(shortId);
    console.log(`Public key: ${publicKey.raw()}`);
  }
}

main();
```

### Signing a Message

You can use the keyring to sign a message.

```typescript
import { Keyring } from "tonutils/keyring";
import { PrivateKey } from "tonutils/keys";

async function main() {
  const keyring = Keyring.create();
  const key = new PrivateKey(PrivateKey.Ed25519.random().tl());

  await keyring.addKey(key);

  const shortId = key.computePublicKey().computeShortId();
  const message = Buffer.from('Hello, world!');

  const signature = await keyring.signMessage(shortId, message);
  console.log(`Signature: ${signature.toString('hex')}`);
}

main();
```

### Decrypting a Message

You can decrypt a message that was encrypted for a particular key.

```typescript
import { Keyring } from "tonutils/keyring";
import { PrivateKey } from "tonutils/keys";

async function main() {
  const keyring = Keyring.create();
  const key = new PrivateKey(PrivateKey.Ed25519.random().tl());

  await keyring.addKey(key);

  // Assume we have an encrypted message and the corresponding public key and digest
  const shortId = key.computePublicKey().computeShortId();
  const publicKey = /* public key of the sender */;
  const digest = /* digest of the original message */;
  const encrypted = /* encrypted message */;

  const decrypted = await keyring.decryptMessage(shortId, publicKey, digest, encrypted);
  console.log(`Decrypted message: ${decrypted.toString()}`);
}

main();
```

Please refer to the tests and the source code for more detailed usage examples and API information.

## Contribution

Contributions are always welcome! Please feel free to open issues and create pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
