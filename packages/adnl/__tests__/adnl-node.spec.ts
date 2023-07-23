import {loadConfig} from '@tonutils/config';
import {
  AdnlNode,
  AdnlNodeIdFull,
  AdnlNodeIdShort,
  NewPeerContext,
  AdnlNodeOptions,
  QueryConsumingResult,
  QueryConsumingResultType,
  SocketAddrV4,
  SubscriberContext
} from "../lib";
import {KeyringDBNoop, KeyringImpl} from "@tonutils/keyring";
import {PrivateKey, PublicKey} from "@tonutils/keys";
import {TLWriteBuffer, TLReadBuffer, Codecs, dht_Node, Functions} from "@tonutils/tl";

describe('ADNL node', () => {
  describe('Connect to DHT', () => {
    it('should connect to DHT', async () => {
      const options = AdnlNodeOptions.default();
      const keyring = new KeyringImpl(new KeyringDBNoop());
      const privateKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
      const localId = new AdnlNodeIdShort(privateKey.computeShortId());
      await keyring.addKey(privateKey);
      const addr = new SocketAddrV4('udp', '0.0.0.0', 0);
      const adnlNode = new AdnlNode(addr, keyring, options);

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

      await adnlNode.start();

      const results = await Promise.all(dhtNodes.map(async (dhtNode) => {
        try {
          const request = new TLWriteBuffer();
          Functions.dht_getSignedAddressList.encodeRequest({
            kind: 'dht.getSignedAddressList',
          }, request);

          // make first query to DHT and ignore the result, because we want to test the channel
          if (!(await adnlNode.query(localId, dhtNode.peerId, request.build()))) {
            throw new Error(`No response from ${dhtNode.addr.toString()}`);
          }

          const response = await adnlNode.query(localId, dhtNode.peerId, request.build());
          if (!response) {
            throw new Error(`No response from ${dhtNode.addr.toString()}`);
          }

          const answer = Functions.dht_getSignedAddressList.decodeResponse(new TLReadBuffer(response));

          return { answer, dhtNode };
        } catch (e) {
          return null;
        }
      }));

      expect(results.filter(p => p).length).toBeGreaterThan(0);

      for (const result of results) {
        if (!result) {
          continue;
        }

        const { answer, dhtNode } = result;
        const addr = SocketAddrV4.createFromAddressList(answer.addrList);

        expect(addr).toEqual(dhtNode.addr);

        const peerFullId = new AdnlNodeIdFull(new PublicKey(answer.id));
        const peerId = peerFullId.computeShortId();

        expect(peerId).toEqual(dhtNode.peerId);
      }

    }, 10_000);
  })

  describe('Connect between nodes', () => {
    it('should connect between nodes', async () => {
      // create first node
      const options = AdnlNodeOptions.default();

      const keyring1 = new KeyringImpl(new KeyringDBNoop());
      const privateKey1 = new PrivateKey(PrivateKey.Ed25519.random().tl());
      const localIdFull1 = new AdnlNodeIdFull(new PublicKey(privateKey1.computePublicKey().tl()));
      const localId1 = new AdnlNodeIdShort(privateKey1.computeShortId());
      await keyring1.addKey(privateKey1);
      const adnlNode1 = new AdnlNode(new SocketAddrV4('udp', '0.0.0.0', 0), keyring1, options);

      // start node 1
      await adnlNode1.start();
      const addr1 = adnlNode1.getSocketAddr();

      // create second node
      const keyring2 = new KeyringImpl(new KeyringDBNoop());
      const privateKey2 = new PrivateKey(PrivateKey.Ed25519.random().tl());
      const localIdFull2 = new AdnlNodeIdFull(new PublicKey(privateKey2.computePublicKey().tl()));
      const localId2 = new AdnlNodeIdShort(privateKey2.computeShortId());
      await keyring2.addKey(privateKey2);
      const adnlNode2 = new AdnlNode(new SocketAddrV4('udp', '0.0.0.0', 0), keyring2, options);

      // start node 2
      await adnlNode2.start();
      const addr2 = adnlNode2.getSocketAddr();

      // connect nodes
      adnlNode1.addPeer(NewPeerContext.AdnlPacket, localId1, localId2, addr2, localIdFull2);
      adnlNode2.addPeer(NewPeerContext.AdnlPacket, localId2, localId1, addr1, localIdFull1);

      // create query handlers
      adnlNode2.addQuerySubscriber({
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

      const response = await adnlNode1.query(localId1, localId2, request.build());

      if (!response) {
        throw new Error(`No response from ${addr2.toString()}`);
      }

      const answer = Functions.dht_ping.decodeResponse(new TLReadBuffer(response));

      expect(answer.randomId).toEqual(randomid);
    });
  });
});
