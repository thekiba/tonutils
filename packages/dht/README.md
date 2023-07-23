# `tonutils/dht`

A high-performance, easy-to-use DHT client for Node.js, designed to enable efficient, distributed storage and retrieval of key-value pairs in a peer-to-peer network. This package provides a robust and flexible solution for building scalable and decentralized applications.

## Installation

```sh
npm install tonutils
```

## Usage

This package allows you to create a DHT node, connect it to the DHT, and communicate between nodes.

```typescript
import {AdnlNode, AdnlNodeIdShort, AdnlNodeOptions, SocketAddrV4} from 'tonutils/adnl';
import {DhtNode, DhtNodeOptions} from 'tonutils/dht';
import {KeyringDBNoop, KeyringImpl} from 'tonutils/keyring';
import {PrivateKey} from 'tonutils/keys';
import {loadConfig} from "tonutils/config";
import {Peer} from "@tonutils/adnl";

// initialize ADNL node
const adnlOptions = new AdnlNodeOptions({
  queryMinTimeoutMs: 1000,
  queryDefaultTimeoutMs: 1000,
  transferTimeoutSec: 1,
});
const keyring = new KeyringImpl(new KeyringDBNoop());
const privateKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
const localId = new AdnlNodeIdShort(privateKey.computeShortId());
await keyring.addKey(privateKey);
// replace '0.0.0.0' with your external IP address, if you want to receive packets from other nodes in the network
const addr = new SocketAddrV4('udp', '0.0.0.0', 0);
const adnlNode = new AdnlNode(addr, keyring, adnlOptions);

// start ADNL node
await adnlNode.start();

// initialize DHT node
const dhtOptions = new DhtNodeOptions({
  queryTimeoutMs: 1000,
});
const dhtNode = await DhtNode.create(adnlNode, localId, dhtOptions);

// loading ton-global.config.json
const TON_CONFIG = 'https://ton.org/global-config.json';
const config = await loadConfig(TON_CONFIG);

if (!config?.dht || !config.dht.staticNodes || !config.dht.staticNodes.nodes) {
  throw new Error(`No static nodes found in ${TON_CONFIG}`);
}

const staticNodes = config.dht.staticNodes.nodes;

for (const node of staticNodes) {
  const peerId = await dhtNode.addDhtPeer(node);


  if (!peerId) {
    const addr = SocketAddrV4.createFromAddressList(node.addrList);
    console.warn(`Failed to add peer ${addr.ip}:${addr.port}`);
    continue;
  }

  const addr = SocketAddrV4.createFromAddressList(node.addrList);
  console.info(`Added peer ${addr.ip}:${addr.port} with id ${peerId.serialize().toString('hex')}`);
}

await dhtNode.findMoreDhtNodes();

const knownNodes = dhtNode.state.knownPeers.size;
console.log(`Known ${knownNodes} nodes`);

// ping all known nodes
const tasks = [];
for (const peer of dhtNode.state.knownPeers.values()) {
  tasks.push(dhtNode.ping(peer.id).then((result): [boolean, Peer] => [result, peer]));
}

for (const [result, peer] of await Promise.all(tasks)) {
  if (result) {
    console.info(`Ping to ${peer.addr.ip}:${peer.addr.port} success`);
  } else {
    console.warn(`Ping to ${peer.addr.ip}:${peer.addr.port} failed`);
  }
}

console.log(`Shutdown DHT node`);
await dhtNode.shutdown();

console.log(`Shutdown ADNL node`);
await adnlNode.shutdown();

console.log(`Showcase finished`);
```

In this example, we added a query subscriber to handle incoming `dht.ping` queries and respond with a `dht.pong` message. Then we create and send a `dht.ping` query to a DHT node and print out the random ID from the response, which should be equal to the random ID we sent.

Please refer to the tests and the source code for more detailed usage examples and API information.

## Contribution

Contributions are always welcome! Please feel free to open issues and create pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
