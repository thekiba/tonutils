import {AdnlNode, AdnlNodeIdFull, AdnlNodeIdShort, AdnlNodeOptions, SocketAddrV4} from "@tonutils/adnl";
import {KeyringDBNoop, KeyringImpl} from "@tonutils/keyring";
import {PrivateKey} from "@tonutils/keys";
import {DhtNode, DhtNodeOptions} from "../lib";
import * as tonapi from '@tonutils/tl';
import {TLWriteBuffer, Codecs} from "@tonutils/tl";
import {loadConfig} from "@tonutils/config";

describe('dht', () => {
  let server: DhtNode;
  let client: DhtNode;

  beforeAll(async () => {
    server = await createDhtNode();
    client = await createDhtNode();
  });

  afterAll(async () => {
    await server.shutdown();
    await client.shutdown();
  });

  describe('connecting nodes', () => {
    it('should add peer', async () => {
      const serverDhtNode = server.getSignedLocalNode();

      const serverPeerId = await client.addDhtPeer(serverDhtNode);

      expect(serverPeerId?.serialize()).toEqual(server.localId.serialize());
    });

    it('should ping peer', async () => {
      const serverPeerId = server.localId;

      const pingResult = await client.ping(serverPeerId);

      expect(pingResult).toEqual(true);
    });
  });

  describe('checking node', () => {
    it('should check is bad peer',  () => {
      const isBad = client.isBadPeer(server.localId);

      expect(isBad).toEqual(false);
    });
  });

  describe('local methods', () => {
    it('should return local address list', () => {
      const addressList = client.getLocalAddressList();

      expect(addressList).toEqual(client.adnl.buildAddressList());
    });

    it('should return signed node', async () => {
      const signedNode = client.getSignedLocalNode();
      const addressList = client.getLocalAddressList();

      expect(signedNode).toEqual({
        kind: 'dht.node',
        id: client.state.key.computePublicKey().tl(),
        addrList: addressList,
        version: addressList.version,
        signature: signedNode.signature,
      });

      const writer = new TLWriteBuffer();
      Codecs.dht_Node.encode({
        ...signedNode,
        signature: Buffer.alloc(0)
      }, writer);

      const encryptor = client.state.key.computePublicKey().createEncryptor(client.state.key);
      const isValid = encryptor.checkSignature(writer.build(), signedNode.signature);

      expect(isValid).toEqual(true);
    });

    it('should return socket address', () => {
      const address = client.getSocketAddr();

      expect(address).toEqual(client.adnl.getSocketAddr());
    });

    it('should return known peer ids', () => {
      const peerIds = client.getKnownPeerIds();

      expect(peerIds).toEqual([
        new AdnlNodeIdFull(server.state.key.computePublicKey())
      ]);
    });
  });

  describe('lookup nodes', () => {
    it('should execute find more nodes without errors', async () => {
      const newNodes = await client.findMoreDhtNodes();

      // the method will return 0 because we have only one node in the network
      expect(newNodes).toEqual(0);
    });

    it('should find node by id', async () => {
      const nodes  = await client.findNode(server.localId, client.localId);
      expect(nodes.nodes.length).toEqual(1);
    });

    it('should returns signed address list of remote node', async () => {
      const node = await client.getSignedAddressList(server.localId);

      expect(node).toEqual(server.getSignedLocalNode());
    });
  });

  describe('storing and finding values from all nodes', () => {
    let clientAddressList: tonapi.adnl_AddressList;
    let serverAddressList: tonapi.adnl_AddressList;

    beforeAll(() => {
      clientAddressList = client.getLocalAddressList();
      serverAddressList = server.getLocalAddressList();
    });

    it('client should be able to store server address list on all known peers', async () => {
      const isStored = await client.storeAddressList(clientAddressList);

      expect(isStored).toEqual(true);
    });

    it('server should be able to store client address list on all known peers', async () => {
      const serverAddressList = server.getLocalAddressList();
      const isStored = await server.storeAddressList(serverAddressList);

      expect(isStored).toEqual(true);
    });

    it('should find both address list from client', async () => {
      expect(await client.findAddressList(client.localId)).toEqual(clientAddressList);

      const serverAddressList = await client.findAddressList(server.localId);
      expect(serverAddressList).toEqual({
        ...server.getLocalAddressList(),
        version: serverAddressList!.version,
      });
    });

    it('should find both address list from server', async () => {
      expect(await server.findAddressList(client.localId)).toEqual(clientAddressList);

      const serverAddressList = await server.findAddressList(server.localId);
      expect(serverAddressList).toEqual({
        ...server.getLocalAddressList(),
        version: serverAddressList!.version,
      });
    });
  });

  describe('share connections between nodes', () => {

    const TON_CONFIG = 'https://ton.org/global-config.json';
    let config: tonapi.config_Global | undefined;

    beforeAll(async () => {
      config = await loadConfig(TON_CONFIG);
    });

    it('should add static nodes', async () => {
      if (!config?.dht || !config.dht.staticNodes || !config.dht.staticNodes.nodes) {
        throw new Error(`No static nodes found in ${TON_CONFIG}`);
      }

      const staticNodes = config.dht.staticNodes.nodes;

      expect(staticNodes.length).toBeGreaterThan(5);

      const tasks = staticNodes.map(async (node) => {
        return await server.addDhtPeer(node);
      });

      const result = await Promise.all(tasks);

      expect(result.filter(Boolean).length).toBeGreaterThan(5);
    });

    it('should connect to real network', async () => {
      const foundNodes = await server.findMoreDhtNodes();

      expect(foundNodes).toBeGreaterThan(50);
    });

    it('client should be able to connect to real network using connected node', async () => {
      expect(await client.findMoreDhtNodes()).toBeGreaterThan(5);
    });

    it('client should find more nodes on second iteration', async () => {
      expect(await client.findMoreDhtNodes()).toBeGreaterThan(25);
    });

  });

  describe('real network', () => {

    let dhtNode: DhtNode;

    beforeAll(async () => {
      dhtNode = await createDhtNode();
    });

    afterAll(async () => {
      await dhtNode.shutdown();
    });

    it('should connect to real network using static nodes', async () => {
      const TON_CONFIG = 'https://ton.org/global-config.json';
      const config: tonapi.config_Global | undefined = await loadConfig(TON_CONFIG);

      if (!config?.dht || !config.dht.staticNodes || !config.dht.staticNodes.nodes) {
        throw new Error(`No static nodes found in ${TON_CONFIG}`);
      }

      const staticNodes = config.dht.staticNodes.nodes;

      expect(staticNodes.length).toBeGreaterThan(5);

      const tasks = staticNodes.map(async (node) => {
        return await dhtNode.addDhtPeer(node);
      });

      const result = await Promise.all(tasks);

      expect(result.filter(Boolean).length).toBeGreaterThan(5);
    });

    it('should find more nodes', async () => {
      expect(await dhtNode.findMoreDhtNodes()).toBeGreaterThan(25);
    });

    it('client should be able to store and find address list on all known peers', async () => {
      const addressList = dhtNode.getLocalAddressList();
      const isStored = await dhtNode.storeAddressList(addressList);

      expect(isStored).toEqual(true);

      const foundAddressList = await dhtNode.findAddressList(dhtNode.localId);
      expect(foundAddressList).toEqual(addressList);
    });

  });


});

async function createDhtNode(): Promise<DhtNode> {
  const keyring = new KeyringImpl(new KeyringDBNoop());

  const privateKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
  const localId = new AdnlNodeIdShort(privateKey.computeShortId());
  await keyring.addKey(privateKey);
  const addr = new SocketAddrV4('udp', '0.0.0.0', 0);

  // const adnlNodeOptions = AdnlNodeOptions.default();
  const adnlNodeOptions = new AdnlNodeOptions({
    queryMinTimeoutMs: 3500,
    queryDefaultTimeoutMs: 3500,
    transferTimeoutSec: 3.5
  });
  const adnlNode = await AdnlNode.create(addr, keyring, adnlNodeOptions);

  const dhtNodeOptions = new DhtNodeOptions({
    queryTimeoutMs: 3500,
  });
  return await DhtNode.create(adnlNode, localId, dhtNodeOptions);
}
