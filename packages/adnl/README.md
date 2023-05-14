# tonutils/adnl

An efficient and lightweight ADNL (Advanced Distributed Network Layer) over UDP client implementation for Node.JS, designed to facilitate seamless communication and interaction with the TON (The Open Network) ecosystem. This package enables developers to easily build and integrate TON-based applications, ensuring high performance, reliability, and scalability.

## Installation

```sh
npm install tonutils
```

## Usage

This package allows you to create an ADNL node, connect it to the DHT, and communicate between nodes.

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
import {TLWriteBuffer, TLReadBuffer, Codecs, dht_Node, Functions} from "tonutils/tl";

// create an ADNL node
const options = NodeOptions.default();
const keyring = new KeyringImpl(new KeyringDBNoop());
const privateKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
const localId = new AdnlNodeIdShort(privateKey.computeShortId());
await keyring.addKey(privateKey);
const addr = new SocketAddrV4('udp', '0.0.0.0', 0);
const adnlNode = new AdnlNode(addr, keyring, options);

// start the ADNL node
await adnlNode.start();
```

In this example, the ADNL node is started with default options, a new key is generated and added to the keyring, and then the node is started.

You can connect to the DHT using the following code:

```typescript
const TON_CONFIG = 'https://ton.org/global-config.json';
const config = await loadConfig(TON_CONFIG);

if (!config?.dht || !config.dht.staticNodes || !config.dht.staticNodes.nodes) {
  throw new Error(`No static nodes found in ${TON_CONFIG}`);
}

const dhtNodes = config.dht.staticNodes.nodes.map((node: dht_Node) => {
  const addr = SocketAddrV4.createFromAddressList(node.addrList);
  const peerFullId = new AdnlNodeIdFull(new PublicKey(node.id));
  const peerId = peerFullId.computeShortId();

  return {addr, peerId, peerFullId};
});

for (const dhtNode of dhtNodes) {
  adnlNode.addPeer(NewPeerContext.Dht, localId, dhtNode.peerId, dhtNode.addr, dhtNode.peerFullId);
}
```

In this example, the code fetches the global configuration from TON, extracts the DHT nodes, and adds them as peers to the ADNL node.

This package also allows you to add subscribers to consume incoming queries and to send queries to the peers:

```typescript
adnlNode.addQuerySubscriber({
  async tryConsumeQuery(ctx: SubscriberContext, constructor: number, query: Buffer): Promise<QueryConsumingResult> {
    switch (constructor) {
      case -873775336: {
        const reader = new TLReadBuffer(query);
        reader.readInt32();
        const request = Codecs.dht_ping.decode(reader);
        const response = new TLWriteBuffer();
        Codecs.dht_Pong.encode({
          kind: 'dht.pong',
          randomId: request.randomId
        }, response);
        return new QueryConsumingResult(QueryConsumingResultType.Consumed, response.build());
      }
      default: {
        return new QueryConsumingResult(QueryConsumingResultType.Rejected);
      }
    }
  }
});

// send query
const randomid = Math.floor(Math.random() * 0xFFFFFFFF).toString(10);
const request = new TLWriteBuffer();
Functions.dht_ping.encodeRequest({
  kind: 'dht.ping',
  randomId: randomid
}, request);

const response = await adnlNode.query(localId, dhtNode.peerId, request.build());

if (!response) {
  throw new Error(`No response from ${dhtNode.addr.toString()}`);
}

const answer = Functions.dht_ping.decodeResponse(new TLReadBuffer(response));

console.log(answer.randomId); // should be equal to randomid
```

In this example, we added a query subscriber to handle incoming `dht.ping` queries and respond with a `dht.pong` message. Then we create and send a `dht.ping` query to a DHT node and print out the random ID from the response, which should be equal to the random ID we sent.

Please refer to the tests and the source code for more detailed usage examples and API information.

## Contribution

Contributions are always welcome! Please feel free to open issues and create pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
