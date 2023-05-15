# Tonutils-JS

`tonutils` is a comprehensive toolkit for working with the TON (The Open Network) protocols. This package provides an easy-to-use, TypeScript-based interface for building and interacting with applications in the TON ecosystem.

## Overview

The TON has its own unique peer-to-peer network protocols, which are utilized for a range of functions, including the propagation of new blocks, the sending and collection of transaction candidates, and more. While the networking demands of single-blockchain projects like Bitcoin or Ethereum can be met with a simple peer-to-peer overlay network, the multi-blockchain nature of TON requires a more sophisticated approach.

In TON, it's possible to subscribe to updates from specific shardchains, rather than having to subscribe to all of them. This offers a level of flexibility and potential that is unique to the TON ecosystem.

Additionally, these protocols are used to power a range of TON Ecosystem services, such as TON Proxy, TON Sites, and TON Storage. Once the more advanced network protocols required to support TON Blockchain are implemented, they can be used for a variety of purposes that go beyond the immediate demands of the blockchain itself.

`tonutils` is a set of tools that make working with these protocols easy and intuitive. It provides a way to interact with the TON network using a TypeScript interface, bringing the power and flexibility of TON's unique network protocols to developers in a user-friendly package.

For more information about TON Networking, please visit the [official TON Networking documentation](https://docs.ton.org/learn/networking/overview). For a deeper understanding of ADNL, you can refer to [the official ADNL documentation](https://docs.ton.org/learn/networking/adnl) and [the advanced ADNL documentation](https://docs.ton.org/develop/network/adnl-udp).

## Installation

Each package can be installed individually via npm:

```shell
npm install tonutils
```

## Packages

- **[tonutils/adnl](./packages/adnl/README.md)**: This package provides the implementation of the Abstract Datagram Network Layer (ADNL), used for peer-to-peer communication in the TON network.

- **[tonutils/config](./packages/config/README.md)**: A Node.js library for loading and parsing the global configuration file from the TON network (https://ton.org/global-config.json). It provides a typed interface for easy access to the configuration properties, simplifying the development of decentralized applications by offering a convenient way to access TON network settings.

- *(not implemented yet)* **tonutils/dht**: This package facilitates interaction with the Distributed Hash Table (DHT) used by the TON network.

- *(not implemented yet)* **tonutils/fec**: The Forward Error Correction (FEC) package provides mechanisms for error detection and correction in the data transmission process.

- *(not implemented yet)* **tonutils/http**: A utility package for HTTP-based communication with the TON network.

- **[tonutils/keyring](./packages/keyring/README.md)**: This package provides functionalities for managing and manipulating keys in the TON network.

- **[tonutils/keys](./packages/keys/README.md)**: A utility package providing mechanisms for key generation and handling in the TON network.

- *(not implemented yet)* **tonutils/overlay**: This package provides functionalities related to the TON's Overlay Network.

- *(not implemented yet)* **tonutils/raptorq**: Implements the RaptorQ error correction code, which is used to ensure reliable data transmission.

- *(not implemented yet)* **tonutils/rldp**: The Reliable Linked Data Protocol (RLDP) package implements the data transfer protocol used in the TON network.

- *(not implemented yet)* **tonutils/rldp2**: An advanced and efficient RLDP2 client for Node.js, designed to provide high-speed data transfer with improved reliability in peer-to-peer networks.

- *(not implemented yet)* **tonutils/storage**: This package provides functionalities for managing TON Storage.

- **[tonutils/tl](./packages/tl/README.md)**: A utility package for working with the Type Language (TL) scheme used by the TON network.

- *(not implemented yet)* **tonutils/tlb**: A utility package for working with the TL-B scheme used by the TON blockchain.

# Examples

This repository includes a couple of examples to help you get started:

- [ADNL Chat Example](./examples/001-adnl-chat-example/): This example demonstrates how to set up a basic chat using the ADNL layer.

- [Lookup DHT Nodes Example](./examples/002-lookup-dht-nodes-example/): This example shows how to lookup DHT nodes.

Feel free to explore these examples to get a better understanding of how to use `tonutils`.

## Usage

> Refer to the documentation of each package for more specific usage details.

### ADNL (Abstract Datagram Network Layer)

The `tonutils/adnl` package provides the implementation of the Abstract Datagram Network Layer (ADNL), used for peer-to-peer communication in the TON network.

Below is an example of connecting to the DHT using the `adnl` package:

```typescript
import {loadConfig} from 'tonutils/config';
import {
  AdnlNode,
  AdnlNodeIdFull,
  AdnlNodeIdShort,
  NewPeerContext,
  NodeOptions,
  QueryConsumingResult,
  QueryConsumingResultType,
  SocketAddrV4,
  SubscriberContext
} from "tonutils/adnl";
import {KeyringDBNoop, KeyringImpl} from "tonutils/keyring";
import {PrivateKey, PublicKey} from "tonutils/keys";

// We use the tonutils/tl package for working with the TL scheme, because the `ton-tl` package is not yet compatible with the `ton-api.tl` scheme.
import {TLWriteBuffer, TLReadBuffer, Codecs, dht_Node, Functions} from "tonutils/tl";

// Node options
const options = NodeOptions.default();

// Keyring for managing keys
const keyring = new KeyringImpl(new KeyringDBNoop());

// Generate a private key
const privateKey = new PrivateKey(PrivateKey.Ed25519.random().tl());

// Compute a short ID for the local node
const localId = new AdnlNodeIdShort(privateKey.computeShortId());

// Add the private key to the keyring
await keyring.addKey(privateKey);

// Create a socket address
const addr = new SocketAddrV4('udp', '0.0.0.0', 0);

// Initialize an ADNL node
const adnlNode = new AdnlNode(addr, keyring, options);

// Load global TON configuration
const TON_CONFIG = 'https://ton.org/global-config.json';
const config = await loadConfig(TON_CONFIG);

// Check if the configuration contains DHT nodes
if (!config?.dht || !config.dht.staticNodes || !config.dht.staticNodes.nodes) {
  throw new Error(`No static nodes found in ${TON_CONFIG}`);
}

// Convert the DHT nodes to a more convenient format
const dhtNodes = config.dht.staticNodes.nodes.map((node: dht_Node) => {
  const addr = SocketAddrV4.createFromAddressList(node.addrList);
  const peerFullId = new AdnlNodeIdFull(new PublicKey(node.id));
  const peerId = peerFullId.computeShortId();

  return {addr, peerId, peerFullId};
});

// Add the DHT nodes to the ADNL node
for (const dhtNode of dhtNodes) {
  adnlNode.addPeer(NewPeerContext.Dht, localId, dhtNode.peerId, dhtNode.addr, dhtNode.peerFullId);
}

// Start the ADNL node
await adnlNode.start();

// Query the DHT nodes
const results = await Promise.all(dhtNodes.map(async (dhtNode) => {
  try {
    // Create a request to get the list of signed addresses
    const request = new TLWriteBuffer();
    Functions.dht_getSignedAddressList.encodeRequest({
      kind: 'dht.getSignedAddressList',
    }, request);

    // Send the request to the DHT node and wait for the response
    const response = await adnlNode.query(localId, dhtNode.peerId, request.build());
    if (!response) {
      throw new Error(`No response from ${dhtNode.addr.toString()}`);
    }

    // Decode the response as a list of signed addresses
    const answer = Functions.dht_getSignedAddressList.decodeResponse(new TLReadBuffer(response));

    return { answer };
  } catch (e) {
    return null;
  }
}));

// Print the results
console.log(`Connected to ${results.filter(p => p).length} DHT nodes`);
```

See the full documentation for the `adnl` package [here](./packages/adnl/README.md).

### tonutils/config

This package provides functions for loading and parsing the global configuration file from the TON network. It provides a typed interface for easy access to the configuration properties.

#### Usage

1. Install the package.

```sh
npm install tonutils
```

2. Use the package in your code.

```typescript
import { loadConfig } from "tonutils/config";

async function main() {
  const TON_CONFIG = "https://ton.org/global-config.json";
  const config = await loadConfig(TON_CONFIG);

  if (!config) {
    throw new Error(`Failed to load configuration from ${TON_CONFIG}`);
  }

  console.log(config);
}

main();
```

See the full documentation for the `config` package [here](./packages/config/README.md).

### tonutils/tl

This package provides utilities for working with the Type Language (TL) scheme used by the TON network.

#### Usage

1. Install the package.

```sh
npm install tonutils
```

2. Use the package in your code.

```typescript
import { TLWriteBuffer, TLReadBuffer, Functions } from "tonutils/tl";

function main() {
  const buffer = new TLWriteBuffer();
  Functions.dht_getSignedAddressList.encodeRequest({
    kind: "dht.getSignedAddressList",
  }, buffer);

  const data = buffer.build();
  const readBuffer = new TLReadBuffer(data);

  const decoded = Functions.dht_getSignedAddressList.decodeResponse(readBuffer);
  console.log(decoded);
}

main();
```

See the full documentation for the `tl` package [here](./packages/tl/README.md).

### tonutils/keys

This package provides utilities for key generation and handling in the TON network.

#### Usage

1. Install the package.

```sh
npm install tonutils
```

2. Use the package in your code.

```typescript
import { PrivateKey } from "tonutils/keys";

function main() {
  const privateKey = PrivateKey.Ed25519.random();
  console.log(privateKey.raw());
}

main();
```

See the full documentation for the `keys` package [here](./packages/keys/README.md).

### tonutils/keyring

This package provides functionalities for managing and manipulating keys in the TON network.

#### Usage

Use the package in your code.

```typescript
import { KeyringImpl, KeyringDBNoop } from "tonutils/keyring";
import { PrivateKey } from "tonutils/adnl";

async function main() {
  const keyring = new KeyringImpl(new KeyringDBNoop());
  const privateKey = new PrivateKey(PrivateKey.Ed25519.random().tl());

  await keyring.addKey(privateKey);
  console.log(`Key added to the keyring: ${privateKey.raw()}`);
}

main();
```

See the full documentation for the `keyring` package [here](./packages/keyring/README.md).

### Other packages

The following packages are still under development and their usage guides will be updated once they are ready:

- **tonutils/dht**
- **tonutils/http**
- **tonutils/overlay**
- **tonutils/storage**
- **tonutils/tlb**

Please refer to the individual package directories for more details on their usage and APIs.

## Contribution

Contributions are always welcome! Please feel free to open issues and create pull requests.

## License

Tonutils is licensed under the [MIT License](./LICENSE).
