import {AdnlNode, AdnlNodeIdFull, AdnlNodeIdShort, NewPeerContext, AdnlNodeOptions, SocketAddrV4} from 'tonutils/adnl';
import {KeyringDBNoop, KeyringImpl} from 'tonutils/keyring';
import {PrivateKey, PublicKey} from 'tonutils/keys';
import {TLWriteBuffer, TLReadBuffer, dht_Node, dht_Nodes, Functions} from "tonutils/tl";
import {loadConfig} from "tonutils/config";

(async () => {
  // initialize ADNL node
  const adnlNodeOptions = AdnlNodeOptions.default();
  const keyring = new KeyringImpl(new KeyringDBNoop());
  const privateKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
  const localId = new AdnlNodeIdShort(privateKey.computeShortId());
  await keyring.addKey(privateKey);
  // replace '0.0.0.0' with your external IP address, if you want to receive packets from other nodes in the network
  const addr = new SocketAddrV4('udp', '0.0.0.0', 0);
  const adnlNode = new AdnlNode(addr, keyring, adnlNodeOptions);

  // start ADNL node
  await adnlNode.start();

  // loading ton-global.config.json
  const TON_CONFIG = 'https://ton.org/global-config.json';
  const config = await loadConfig(TON_CONFIG);

  if (!config?.dht || !config.dht.staticNodes || !config.dht.staticNodes.nodes) {
    throw new Error(`No static nodes found in ${TON_CONFIG}`);
  }

  // getting dht nodes
  const dhtNodes = config.dht.staticNodes.nodes.map((node: dht_Node) => {
    const addr = SocketAddrV4.createFromAddressList(node.addrList);
    const peerFullId = new AdnlNodeIdFull(new PublicKey(node.id));
    const peerId = peerFullId.computeShortId();

    return {addr, peerId, peerFullId};
  });

  // peering with dht nodes
  for (const dhtNode of dhtNodes) {
    adnlNode.addPeer(NewPeerContext.Dht, localId, dhtNode.peerId, dhtNode.addr, dhtNode.peerFullId);
  }

  // send get signed address list query to all dht nodes
  // for (let i = 0; i < dhtNodes.length; i++) {
  //   const dhtNode = dhtNodes[i];
  //
  //   // create query
  //   const query = new TLWriteBuffer();
  //   Functions.dht_getSignedAddressList.encodeRequest({
  //     kind: 'dht.getSignedAddressList',
  //   }, query);
  //
  //   // send query
  //   const responseBuffer = await adnlNode.query(localId, dhtNode.peerId, query.build());
  //
  //   if (!responseBuffer) {
  //     console.info(`[${i + 1}] No response from ${dhtNode.addr.ip}:${dhtNode.addr.port}`);
  //     continue;
  //   }
  //
  //   // decode response
  //   const response = Functions.dht_getSignedAddressList.decodeResponse(new TLReadBuffer(responseBuffer));
  //
  //   // handle response
  //   switch (response.kind) {
  //     case "dht.node":
  //       console.info(`[${i + 1}] Node found at ${dhtNode.addr.ip}:${dhtNode.addr.port}`);
  //       break;
  //     default:
  //       console.error(`[${i + 1}] Unknown response from ${dhtNode.addr.ip}:${dhtNode.addr.port}`);
  //   }
  // }

  // other showcase, how to use dht nodes
  // send find value query to all dht nodes
  for (let i = 0; i < dhtNodes.length; i++) {
    const dhtNode = dhtNodes[i];

    // create query
    const query = new TLWriteBuffer();
    Functions.dht_findValue.encodeRequest({
      kind: 'dht.findValue',
      key: Buffer.alloc(32),
      k: 6,
    }, query);

    // send query
    const responseBuffer = await adnlNode.query(localId, dhtNode.peerId, query.build());

    if (!responseBuffer) {
      console.info(`[${i + 1}] No response from ${dhtNode.addr.ip}:${dhtNode.addr.port}`);
      continue;
    }

    // decode response
    const response = Functions.dht_findValue.decodeResponse(new TLReadBuffer(responseBuffer));

    // handle response
    switch (response.kind) {
      case "dht.valueNotFound":
        console.info(`[${i + 1}] No value found at ${dhtNode.addr.ip}:${dhtNode.addr.port}`);
        for (const newNode of response.nodes.nodes) {
          const addr = SocketAddrV4.createFromAddressList(newNode.addrList);
          console.info(`[${i + 1}] Found new node ${addr.ip}:${addr.port}`);
        }
        break;
      case "dht.valueFound":
        console.info(`[${i + 1}] Value found at ${dhtNode.addr.ip}:${dhtNode.addr.port}`);
        console.info(`[${i + 1}] Value: ${response.value}`);
        break;
      default:
        console.error(`[${i + 1}] Unknown response from ${dhtNode.addr.ip}:${dhtNode.addr.port}`);
    }
  }

  console.log(`Shutdown ADNL node`);
  await adnlNode.shutdown();

  console.log(`Showcase finished`);
})();
