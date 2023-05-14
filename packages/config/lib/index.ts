import * as t from "io-ts";
import {adnl_Address, adnl_addressList, config_Global, dht_node, PublicKey} from "@tonutils/tl";
import axios from "axios";

const codec = t.type({
  dht: t.type({
    ['@type']: t.literal('dht.config.global'),
    k: t.number,
    a: t.number,
    static_nodes: t.type({
      ['@type']: t.literal('dht.nodes'),
      nodes: t.array(t.type({
        ['@type']: t.literal('dht.node'),
        id: t.type({
          ['@type']: t.literal('pub.ed25519'),
          key: t.string
        }),
        addr_list: t.type({
          addrs: t.array(t.type({
            ['@type']: t.literal('adnl.address.udp'),
            ip: t.number,
            port: t.number
          })),
          version: t.number,
          reinit_date: t.number,
          priority: t.number,
          expire_at: t.number
        }),
        version: t.number,
        signature: t.string
      }))
    })
  }),
  liteservers: t.array(t.type({
    ip: t.number,
    port: t.number,
    id: t.type({
      ['@type']: t.literal('pub.ed25519'),
      key: t.string
    })
  })),
  validator: t.type({
    ['@type']: t.literal('validator.config.global'),
    zero_state: t.type({
      workchain: t.number,
      shard: t.number,
      seqno: t.number,
      root_hash: t.string,
      file_hash: t.string
    }),
    init_block: t.type({
      workchain: t.number,
      shard: t.number,
      seqno: t.number,
      root_hash: t.string,
      file_hash: t.string
    }),
    hardforks: t.array(t.type({
      workchain: t.number,
      shard: t.number,
      seqno: t.number,
      root_hash: t.string,
      file_hash: t.string
    })),
  }),
});

export async function loadConfig(src: string): Promise<config_Global | undefined> {
  const config = (await axios.get(src)).data;
  if (!codec.is(config)) {
    console.trace(`Invalid config: ${JSON.stringify(config)}`);
    return undefined;
  }

  return {
    kind: 'config.global',
    dht: {
      kind: 'dht.config.global',
      k: config.dht.k,
      a: config.dht.a,
      staticNodes: {
        kind: 'dht.nodes',
        nodes: config.dht.static_nodes.nodes.map((node): dht_node => {
          let id: PublicKey;

          switch (node.id['@type']) {
            case 'pub.ed25519':
              id = {
                kind: 'pub.ed25519',
                key: Buffer.from(node.id.key, 'base64'),
              };
              break;
            default:
              throw new Error(`Unknown public key type: ${node.id['@type']}`);
          }

          let addrs: adnl_Address[] = [];

          for (const addr of node.addr_list.addrs) {
            switch (addr['@type']) {
              case 'adnl.address.udp':
                addrs.push({
                  kind: 'adnl.address.udp',
                  ip: addr.ip,
                  port: addr.port,
                });
                break;
              default:
                throw new Error(`Unknown address type: ${addr['@type']}`);
            }
          }

          const addrList: adnl_addressList = {
            kind: 'adnl.addressList',
            addrs: addrs,
            version: node.addr_list.version,
            reinitDate: node.addr_list.reinit_date,
            priority: node.addr_list.priority,
            expireAt: node.addr_list.expire_at
          };

          return {
            kind: 'dht.node',
            id: id,
            addrList: addrList,
            version: node.version,
            signature: Buffer.from(node.signature, 'base64')
          };
        }),
      },
    },
    validator: {
      kind: 'validator.config.global',
      zeroState: {
        kind: 'tonNode.blockIdExt',
        workchain: config.validator.zero_state.workchain,
        shard: config.validator.zero_state.shard.toString(),
        seqno: config.validator.zero_state.seqno,
        rootHash: Buffer.from(config.validator.zero_state.root_hash, 'base64'),
        fileHash: Buffer.from(config.validator.zero_state.file_hash, 'base64'),
      },
      initBlock: {
        kind: 'tonNode.blockIdExt',
        workchain: config.validator.init_block.workchain,
        shard: config.validator.init_block.shard.toString(),
        seqno: config.validator.init_block.seqno,
        rootHash: Buffer.from(config.validator.init_block.root_hash, 'base64'),
        fileHash: Buffer.from(config.validator.init_block.file_hash, 'base64'),
      },
      hardforks: config.validator.hardforks.map((hf) => ({
        kind: 'tonNode.blockIdExt',
        workchain: hf.workchain,
        shard: hf.shard.toString(),
        seqno: hf.seqno,
        rootHash: Buffer.from(hf.root_hash, 'base64'),
        fileHash: Buffer.from(hf.file_hash, 'base64'),
      })),
    },
    adnl: {
      kind: 'adnl.config.global',
      staticNodes: {
        kind: 'adnl.nodes',
        nodes: []
      }
    },
  };
}
