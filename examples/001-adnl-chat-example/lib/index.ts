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
} from 'tonutils/adnl';
import readline from "readline";
import {KeyringDBNoop, KeyringImpl} from "tonutils/keyring";
import {PrivateKey, PublicKey} from "tonutils/keys";

type Command = CommandConnect | CommandSend;

type CommandConnect = {
  type: 'connect';
  ip: string;
  port: number;
  publicKey: Buffer;
}

type CommandSend = {
  type: 'send';
  message: string;
}

function generateRandomNickname(): string {
  const adjectives = ['red', 'green', 'blue', 'yellow', 'white', 'black', 'pink', 'purple', 'orange', 'brown', 'gray', 'silver', 'gold', 'violet', 'indigo', 'azure', 'cyan', 'magenta', 'rose', 'lime', 'olive', 'navy', 'maroon', 'plum', 'teal'];
  const nouns = ['apple', 'banana', 'cherry', 'strawberry', 'lemon', 'orange', 'peach', 'pear', 'grape', 'pineapple', 'mango', 'melon', 'watermelon', 'blueberry', 'raspberry', 'kiwi', 'apricot', 'avocado', 'coconut', 'fig', 'grapefruit', 'guava', 'papaya', 'pomegranate', 'lime', 'lychee', 'plum', 'prune', 'raisin', 'tangerine', 'tomato', 'cucumber', 'eggplant', 'pepper', 'potato', 'pumpkin', 'carrot', 'onion', 'garlic', 'ginger', 'pea', 'corn', 'lettuce', 'spinach', 'cabbage', 'broccoli', 'mushroom', 'olive', 'bean', 'rice', 'wheat', 'barley', 'oat', 'rye', 'soybean', 'sunflower', 'cotton', 'tobacco', 'coffee', 'tea', 'cocoa', 'honey', 'sugar', 'salt', 'pepper', 'vinegar', 'oil', 'butter', 'cheese', 'yogurt', 'milk', 'cream', 'bread', 'biscuit', 'cake', 'cookie', 'pie', 'pizza', 'pasta', 'noodle', 'rice', 'soup', 'stew', 'salad', 'sauce', 'jam', 'jelly', 'candy', 'chocolate', 'ice cream', 'pudding', 'popcorn', 'cereal', 'pancake', 'waffle', 'hamburger', 'sandwich', 'hot dog', 'bacon', 'sausage', 'egg', 'steak', 'chicken'];

  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${nouns[Math.floor(Math.random() * nouns.length)]}`;
}

let node: AdnlNode | undefined;
let localId: AdnlNodeIdShort | undefined;
let localKey: PrivateKey;
let peerId: AdnlNodeIdShort | undefined;
let name: string = generateRandomNickname();

(async () => {
  const options: NodeOptions = NodeOptions.default();
  const socketAddr = new SocketAddrV4('udp', '0.0.0.0', 0);
  const keystore = new KeyringImpl(new KeyringDBNoop());

  localKey = new PrivateKey(PrivateKey.Ed25519.random().tl());
  await keystore.addKey(localKey);
  localId = new AdnlNodeIdShort(localKey.computeShortId());

  node = new AdnlNode(socketAddr, keystore, options);

  await node.start();

  node.addMessageSubscriber({
    tryConsumeCustom(ctx: SubscriberContext, constructor: number, data: Buffer): Promise<boolean> {
      console.log('tryConsumeCustom', ctx, constructor, data);
      return Promise.resolve(true);
    }
  });

  node.addQuerySubscriber({
    tryConsumeQuery(ctx: SubscriberContext, constructor: number, query: Buffer): Promise<QueryConsumingResult> {
      // console.log('tryConsumeQuery', ctx, constructor, query);
      process.stdout.write('\x1b[1G\x1b[2K');
      console.log(query.toString('utf-8'));
      rl.prompt(true);
      return Promise.resolve(new QueryConsumingResult(QueryConsumingResultType.Consumed, Buffer.alloc(32)));
    }
  });

  console.log(`Node started on ${node.getSocketAddr().ip}:${node.getSocketAddr().port}`);
  console.log(` put "connect ${node.getSocketAddr().ip} ${node.getSocketAddr().port} ${localKey.computePublicKey().raw().toString('hex')}" to connect to this node`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `[${name}] > `
  });

  // create rapid console interface to start node, connect to other nodes and send messages
  rl.on('line', async (input: string) => {
    try {
      const command = parse(input);

      switch (command.type) {

        // TODO: if node is started, connect to other node, example `connect 0.0.0.0:30304`
        case 'connect': {
          if (!node || !localId) {
            console.log('Node is not started');
            break;
          }

          const peerIdFull = new AdnlNodeIdFull(new PublicKey({kind: 'pub.ed25519', key: command.publicKey}));
          peerId = peerIdFull.computeShortId();
          const addr = new SocketAddrV4('udp', command.ip, command.port);

          node.addPeer(NewPeerContext.AdnlPacket, localId, peerId, addr, peerIdFull);

          break;
        }

        case 'send': {
          if (!node || !localId) {
            console.log('Node is not started');
            break;
          }

          if (!peerId) {
            console.log('Node is not connected');
            break;
          }

          const message = Buffer.from(`[${name}]: ${command.message}`, 'utf-8');

          await node.query(localId, peerId, message);

          break;
        }

      }

      rl.prompt();

    } catch (e) {
      console.error(e);
    }
  });
})();

function parse(input: string): Command {
  if (input.startsWith('connect')) {
    const [ip, port, publicKey] = input.split(' ').slice(1);
    return {
      type: 'connect',
      ip,
      port: parseInt(port),
      publicKey: Buffer.from(publicKey, 'hex')
    };
  }

  return {
    type: 'send',
    message: input
  };
}
