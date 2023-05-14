
// @ts-nocheck

export type TLDouble = TLBytes;
export type double = TLDouble;

export type True = true;

export type int128 = TLInt128;

import { TLWriteBuffer, TLReadBuffer, TLFlag, TLInt, TLString, TLLong, TLInt256, TLInt128, TLBytes, TLBool, TLCodec, TLFunction } from "ton-tl";

//
// Constructors
//

export interface testObject {
    readonly kind: 'testObject';
    readonly value: TLInt;
    readonly o: object;
    readonly f: Function;
}

export interface testString {
    readonly kind: 'testString';
    readonly value: TLString;
}

export interface testInt {
    readonly kind: 'testInt';
    readonly value: TLInt;
}

export interface testVectorBytes {
    readonly kind: 'testVectorBytes';
    readonly value: TLBytes[];
}

export interface tcp_pong {
    readonly kind: 'tcp.pong';
    readonly randomId: TLLong;
}

export interface tcp_authentificate {
    readonly kind: 'tcp.authentificate';
    readonly nonce: TLBytes;
}

export interface tcp_authentificationNonce {
    readonly kind: 'tcp.authentificationNonce';
    readonly nonce: TLBytes;
}

export interface tcp_authentificationComplete {
    readonly kind: 'tcp.authentificationComplete';
    readonly key: PublicKey;
    readonly signature: TLBytes;
}

export interface fec_raptorQ {
    readonly kind: 'fec.raptorQ';
    readonly dataSize: TLInt;
    readonly symbolSize: TLInt;
    readonly symbolsCount: TLInt;
}

export interface fec_roundRobin {
    readonly kind: 'fec.roundRobin';
    readonly dataSize: TLInt;
    readonly symbolSize: TLInt;
    readonly symbolsCount: TLInt;
}

export interface fec_online {
    readonly kind: 'fec.online';
    readonly dataSize: TLInt;
    readonly symbolSize: TLInt;
    readonly symbolsCount: TLInt;
}

export interface pk_unenc {
    readonly kind: 'pk.unenc';
    readonly data: TLBytes;
}

export interface pk_ed25519 {
    readonly kind: 'pk.ed25519';
    readonly key: TLInt256;
}

export interface pk_aes {
    readonly kind: 'pk.aes';
    readonly key: TLInt256;
}

export interface pk_overlay {
    readonly kind: 'pk.overlay';
    readonly name: TLBytes;
}

export interface pub_unenc {
    readonly kind: 'pub.unenc';
    readonly data: TLBytes;
}

export interface pub_ed25519 {
    readonly kind: 'pub.ed25519';
    readonly key: TLInt256;
}

export interface pub_aes {
    readonly kind: 'pub.aes';
    readonly key: TLInt256;
}

export interface pub_overlay {
    readonly kind: 'pub.overlay';
    readonly name: TLBytes;
}

export interface adnl_id_short {
    readonly kind: 'adnl.id.short';
    readonly id: TLInt256;
}

export interface adnl_proxyToFastHash {
    readonly kind: 'adnl.proxyToFastHash';
    readonly ip: TLInt;
    readonly port: TLInt;
    readonly date: TLInt;
    readonly dataHash: TLInt256;
    readonly sharedSecret: TLInt256;
}

export interface adnl_proxyToFast {
    readonly kind: 'adnl.proxyToFast';
    readonly ip: TLInt;
    readonly port: TLInt;
    readonly date: TLInt;
    readonly signature: TLInt256;
}

export interface adnl_proxy_none {
    readonly kind: 'adnl.proxy.none';
    readonly id: TLInt256;
}

export interface adnl_proxy_fast {
    readonly kind: 'adnl.proxy.fast';
    readonly id: TLInt256;
    readonly sharedSecret: TLBytes;
}

export interface adnl_address_udp {
    readonly kind: 'adnl.address.udp';
    readonly ip: TLInt;
    readonly port: TLInt;
}

export interface adnl_address_udp6 {
    readonly kind: 'adnl.address.udp6';
    readonly ip: int128;
    readonly port: TLInt;
}

export interface adnl_address_tunnel {
    readonly kind: 'adnl.address.tunnel';
    readonly to: TLInt256;
    readonly pubkey: PublicKey;
}

export interface adnl_address_reverse {
    readonly kind: 'adnl.address.reverse';
}

export interface adnl_addressList {
    readonly kind: 'adnl.addressList';
    readonly addrs: adnl_Address[];
    readonly version: TLInt;
    readonly reinitDate: TLInt;
    readonly priority: TLInt;
    readonly expireAt: TLInt;
}

export interface adnl_node {
    readonly kind: 'adnl.node';
    readonly id: PublicKey;
    readonly addrList: adnl_addressList;
}

export interface adnl_nodes {
    readonly kind: 'adnl.nodes';
    readonly nodes: adnl_node[];
}

export interface adnl_packetContents {
    readonly kind: 'adnl.packetContents';
    readonly rand1: TLBytes;
    readonly flags: TLFlag;
    readonly from: PublicKey | null;
    readonly fromShort: adnl_id_short | null;
    readonly message: adnl_Message | null;
    readonly messages: adnl_Message[];
    readonly address: adnl_addressList | null;
    readonly priorityAddress: adnl_addressList | null;
    readonly seqno: TLLong | null;
    readonly confirmSeqno: TLLong | null;
    readonly recvAddrListVersion: TLInt | null;
    readonly recvPriorityAddrListVersion: TLInt | null;
    readonly reinitDate: TLInt | null;
    readonly dstReinitDate: TLInt | null;
    readonly signature: TLBytes | null;
    readonly rand2: TLBytes;
}

export interface adnl_tunnelPacketContents {
    readonly kind: 'adnl.tunnelPacketContents';
    readonly rand1: TLBytes;
    readonly flags: TLFlag;
    readonly fromIp: TLInt | null;
    readonly fromPort: TLInt | null;
    readonly message: TLBytes | null;
    readonly statistics: TLBytes | null;
    readonly payment: TLBytes | null;
    readonly rand2: TLBytes;
}

export interface adnl_proxyPacketHeader {
    readonly kind: 'adnl.proxyPacketHeader';
    readonly proxyId: TLInt256;
    readonly flags: TLFlag;
    readonly ip: TLInt | null;
    readonly port: TLInt | null;
    readonly adnlStartTime: TLInt | null;
    readonly seqno: TLLong | null;
    readonly date: TLInt | null;
    readonly signature: TLInt256;
}

export interface adnl_proxyControlPacketPing {
    readonly kind: 'adnl.proxyControlPacketPing';
    readonly id: TLInt256;
}

export interface adnl_proxyControlPacketPong {
    readonly kind: 'adnl.proxyControlPacketPong';
    readonly id: TLInt256;
}

export interface adnl_proxyControlPacketRegister {
    readonly kind: 'adnl.proxyControlPacketRegister';
    readonly ip: TLInt;
    readonly port: TLInt;
}

export interface adnl_message_createChannel {
    readonly kind: 'adnl.message.createChannel';
    readonly key: TLInt256;
    readonly date: TLInt;
}

export interface adnl_message_confirmChannel {
    readonly kind: 'adnl.message.confirmChannel';
    readonly key: TLInt256;
    readonly peerKey: TLInt256;
    readonly date: TLInt;
}

export interface adnl_message_custom {
    readonly kind: 'adnl.message.custom';
    readonly data: TLBytes;
}

export interface adnl_message_nop {
    readonly kind: 'adnl.message.nop';
}

export interface adnl_message_reinit {
    readonly kind: 'adnl.message.reinit';
    readonly date: TLInt;
}

export interface adnl_message_query {
    readonly kind: 'adnl.message.query';
    readonly queryId: TLInt256;
    readonly query: TLBytes;
}

export interface adnl_message_answer {
    readonly kind: 'adnl.message.answer';
    readonly queryId: TLInt256;
    readonly answer: TLBytes;
}

export interface adnl_message_part {
    readonly kind: 'adnl.message.part';
    readonly hash: TLInt256;
    readonly totalSize: TLInt;
    readonly offset: TLInt;
    readonly data: TLBytes;
}

export interface adnl_db_node_key {
    readonly kind: 'adnl.db.node.key';
    readonly localId: TLInt256;
    readonly peerId: TLInt256;
}

export interface adnl_db_node_value {
    readonly kind: 'adnl.db.node.value';
    readonly date: TLInt;
    readonly id: PublicKey;
    readonly addrList: adnl_addressList;
    readonly priorityAddrList: adnl_addressList;
}

export interface rldp2_messagePart {
    readonly kind: 'rldp2.messagePart';
    readonly transferId: TLInt256;
    readonly fecType: fec_Type;
    readonly part: TLInt;
    readonly totalSize: TLLong;
    readonly seqno: TLInt;
    readonly data: TLBytes;
}

export interface rldp2_confirm {
    readonly kind: 'rldp2.confirm';
    readonly transferId: TLInt256;
    readonly part: TLInt;
    readonly maxSeqno: TLInt;
    readonly receivedMask: TLInt;
    readonly receivedCount: TLInt;
}

export interface rldp2_complete {
    readonly kind: 'rldp2.complete';
    readonly transferId: TLInt256;
    readonly part: TLInt;
}

export interface rldp_messagePart {
    readonly kind: 'rldp.messagePart';
    readonly transferId: TLInt256;
    readonly fecType: fec_Type;
    readonly part: TLInt;
    readonly totalSize: TLLong;
    readonly seqno: TLInt;
    readonly data: TLBytes;
}

export interface rldp_confirm {
    readonly kind: 'rldp.confirm';
    readonly transferId: TLInt256;
    readonly part: TLInt;
    readonly seqno: TLInt;
}

export interface rldp_complete {
    readonly kind: 'rldp.complete';
    readonly transferId: TLInt256;
    readonly part: TLInt;
}

export interface rldp_message {
    readonly kind: 'rldp.message';
    readonly id: TLInt256;
    readonly data: TLBytes;
}

export interface rldp_query {
    readonly kind: 'rldp.query';
    readonly queryId: TLInt256;
    readonly maxAnswerSize: TLLong;
    readonly timeout: TLInt;
    readonly data: TLBytes;
}

export interface rldp_answer {
    readonly kind: 'rldp.answer';
    readonly queryId: TLInt256;
    readonly data: TLBytes;
}

export interface dht_node {
    readonly kind: 'dht.node';
    readonly id: PublicKey;
    readonly addrList: adnl_addressList;
    readonly version: TLInt;
    readonly signature: TLBytes;
}

export interface dht_nodes {
    readonly kind: 'dht.nodes';
    readonly nodes: dht_node[];
}

export interface dht_key {
    readonly kind: 'dht.key';
    readonly id: TLInt256;
    readonly name: TLBytes;
    readonly idx: TLInt;
}

export interface dht_updateRule_signature {
    readonly kind: 'dht.updateRule.signature';
}

export interface dht_updateRule_anybody {
    readonly kind: 'dht.updateRule.anybody';
}

export interface dht_updateRule_overlayNodes {
    readonly kind: 'dht.updateRule.overlayNodes';
}

export interface dht_keyDescription {
    readonly kind: 'dht.keyDescription';
    readonly key: dht_key;
    readonly id: PublicKey;
    readonly updateRule: dht_UpdateRule;
    readonly signature: TLBytes;
}

export interface dht_value {
    readonly kind: 'dht.value';
    readonly key: dht_keyDescription;
    readonly value: TLBytes;
    readonly ttl: TLInt;
    readonly signature: TLBytes;
}

export interface dht_pong {
    readonly kind: 'dht.pong';
    readonly randomId: TLLong;
}

export interface dht_valueNotFound {
    readonly kind: 'dht.valueNotFound';
    readonly nodes: dht_nodes;
}

export interface dht_valueFound {
    readonly kind: 'dht.valueFound';
    readonly value: dht_Value;
}

export interface dht_clientNotFound {
    readonly kind: 'dht.clientNotFound';
    readonly nodes: dht_nodes;
}

export interface dht_reversePingOk {
    readonly kind: 'dht.reversePingOk';
}

export interface dht_stored {
    readonly kind: 'dht.stored';
}

export interface dht_message {
    readonly kind: 'dht.message';
    readonly node: dht_node;
}

export interface dht_requestReversePingCont {
    readonly kind: 'dht.requestReversePingCont';
    readonly target: adnl_Node;
    readonly signature: TLBytes;
    readonly client: TLInt256;
}

export interface dht_db_bucket {
    readonly kind: 'dht.db.bucket';
    readonly nodes: dht_nodes;
}

export interface dht_db_key_bucket {
    readonly kind: 'dht.db.key.bucket';
    readonly id: TLInt;
}

export interface overlay_node_toSign {
    readonly kind: 'overlay.node.toSign';
    readonly id: adnl_id_short;
    readonly overlay: TLInt256;
    readonly version: TLInt;
}

export interface overlay_node {
    readonly kind: 'overlay.node';
    readonly id: PublicKey;
    readonly overlay: TLInt256;
    readonly version: TLInt;
    readonly signature: TLBytes;
}

export interface overlay_nodes {
    readonly kind: 'overlay.nodes';
    readonly nodes: overlay_node[];
}

export interface overlay_message {
    readonly kind: 'overlay.message';
    readonly overlay: TLInt256;
}

export interface overlay_broadcastList {
    readonly kind: 'overlay.broadcastList';
    readonly hashes: TLInt256[];
}

export interface overlay_fec_received {
    readonly kind: 'overlay.fec.received';
    readonly hash: TLInt256;
}

export interface overlay_fec_completed {
    readonly kind: 'overlay.fec.completed';
    readonly hash: TLInt256;
}

export interface overlay_broadcast_id {
    readonly kind: 'overlay.broadcast.id';
    readonly src: TLInt256;
    readonly dataHash: TLInt256;
    readonly flags: TLInt;
}

export interface overlay_broadcastFec_id {
    readonly kind: 'overlay.broadcastFec.id';
    readonly src: TLInt256;
    readonly type: TLInt256;
    readonly dataHash: TLInt256;
    readonly size: TLInt;
    readonly flags: TLInt;
}

export interface overlay_broadcastFec_partId {
    readonly kind: 'overlay.broadcastFec.partId';
    readonly broadcastHash: TLInt256;
    readonly dataHash: TLInt256;
    readonly seqno: TLInt;
}

export interface overlay_broadcast_toSign {
    readonly kind: 'overlay.broadcast.toSign';
    readonly hash: TLInt256;
    readonly date: TLInt;
}

export interface overlay_certificate {
    readonly kind: 'overlay.certificate';
    readonly issuedBy: PublicKey;
    readonly expireAt: TLInt;
    readonly maxSize: TLInt;
    readonly signature: TLBytes;
}

export interface overlay_certificateV2 {
    readonly kind: 'overlay.certificateV2';
    readonly issuedBy: PublicKey;
    readonly expireAt: TLInt;
    readonly maxSize: TLInt;
    readonly flags: TLInt;
    readonly signature: TLBytes;
}

export interface overlay_emptyCertificate {
    readonly kind: 'overlay.emptyCertificate';
}

export interface overlay_certificateId {
    readonly kind: 'overlay.certificateId';
    readonly overlayId: TLInt256;
    readonly node: TLInt256;
    readonly expireAt: TLInt;
    readonly maxSize: TLInt;
}

export interface overlay_certificateIdV2 {
    readonly kind: 'overlay.certificateIdV2';
    readonly overlayId: TLInt256;
    readonly node: TLInt256;
    readonly expireAt: TLInt;
    readonly maxSize: TLInt;
    readonly flags: TLInt;
}

export interface overlay_unicast {
    readonly kind: 'overlay.unicast';
    readonly data: TLBytes;
}

export interface overlay_broadcast {
    readonly kind: 'overlay.broadcast';
    readonly src: PublicKey;
    readonly certificate: overlay_Certificate;
    readonly flags: TLInt;
    readonly data: TLBytes;
    readonly date: TLInt;
    readonly signature: TLBytes;
}

export interface overlay_broadcastFec {
    readonly kind: 'overlay.broadcastFec';
    readonly src: PublicKey;
    readonly certificate: overlay_Certificate;
    readonly dataHash: TLInt256;
    readonly dataSize: TLInt;
    readonly flags: TLInt;
    readonly data: TLBytes;
    readonly seqno: TLInt;
    readonly fec: fec_Type;
    readonly date: TLInt;
    readonly signature: TLBytes;
}

export interface overlay_broadcastFecShort {
    readonly kind: 'overlay.broadcastFecShort';
    readonly src: PublicKey;
    readonly certificate: overlay_Certificate;
    readonly broadcastHash: TLInt256;
    readonly partDataHash: TLInt256;
    readonly seqno: TLInt;
    readonly signature: TLBytes;
}

export interface overlay_broadcastNotFound {
    readonly kind: 'overlay.broadcastNotFound';
}

export interface overlay_db_nodes {
    readonly kind: 'overlay.db.nodes';
    readonly nodes: overlay_nodes;
}

export interface overlay_db_key_nodes {
    readonly kind: 'overlay.db.key.nodes';
    readonly localId: TLInt256;
    readonly overlay: TLInt256;
}

export interface catchain_block_id {
    readonly kind: 'catchain.block.id';
    readonly incarnation: TLInt256;
    readonly src: TLInt256;
    readonly height: TLInt;
    readonly dataHash: TLInt256;
}

export interface catchain_block_dep {
    readonly kind: 'catchain.block.dep';
    readonly src: TLInt;
    readonly height: TLInt;
    readonly dataHash: TLInt256;
    readonly signature: TLBytes;
}

export interface catchain_block_data {
    readonly kind: 'catchain.block.data';
    readonly prev: catchain_block_dep;
    readonly deps: catchain_block_dep[];
}

export interface catchain_block {
    readonly kind: 'catchain.block';
    readonly incarnation: TLInt256;
    readonly src: TLInt;
    readonly height: TLInt;
    readonly data: catchain_block_data;
    readonly signature: TLBytes;
}

export interface catchain_blocks {
    readonly kind: 'catchain.blocks';
    readonly blocks: catchain_block[];
}

export interface catchain_blockUpdate {
    readonly kind: 'catchain.blockUpdate';
    readonly block: catchain_block;
}

export interface catchain_block_data_badBlock {
    readonly kind: 'catchain.block.data.badBlock';
    readonly block: catchain_block;
}

export interface catchain_block_data_fork {
    readonly kind: 'catchain.block.data.fork';
    readonly left: catchain_block_Dep;
    readonly right: catchain_block_Dep;
}

export interface catchain_block_data_nop {
    readonly kind: 'catchain.block.data.nop';
}

export interface catchain_firstblock {
    readonly kind: 'catchain.firstblock';
    readonly uniqueHash: TLInt256;
    readonly nodes: TLInt256[];
}

export interface catchain_difference {
    readonly kind: 'catchain.difference';
    readonly sentUpto: TLInt[];
}

export interface catchain_differenceFork {
    readonly kind: 'catchain.differenceFork';
    readonly left: catchain_block_dep;
    readonly right: catchain_block_dep;
}

export interface catchain_blockNotFound {
    readonly kind: 'catchain.blockNotFound';
}

export interface catchain_blockResult {
    readonly kind: 'catchain.blockResult';
    readonly block: catchain_block;
}

export interface catchain_sent {
    readonly kind: 'catchain.sent';
    readonly cnt: TLInt;
}

export interface validatorSession_round_id {
    readonly kind: 'validatorSession.round.id';
    readonly session: TLInt256;
    readonly height: TLLong;
    readonly prevBlock: TLInt256;
    readonly seqno: TLInt;
}

export interface validatorSession_candidate_id {
    readonly kind: 'validatorSession.candidate.id';
    readonly round: TLInt256;
    readonly blockHash: TLInt256;
}

export interface validatorSession_message_startSession {
    readonly kind: 'validatorSession.message.startSession';
}

export interface validatorSession_message_finishSession {
    readonly kind: 'validatorSession.message.finishSession';
}

export interface validatorSession_message_submittedBlock {
    readonly kind: 'validatorSession.message.submittedBlock';
    readonly round: TLInt;
    readonly rootHash: TLInt256;
    readonly fileHash: TLInt256;
    readonly collatedDataFileHash: TLInt256;
}

export interface validatorSession_message_approvedBlock {
    readonly kind: 'validatorSession.message.approvedBlock';
    readonly round: TLInt;
    readonly candidate: TLInt256;
    readonly signature: TLBytes;
}

export interface validatorSession_message_rejectedBlock {
    readonly kind: 'validatorSession.message.rejectedBlock';
    readonly round: TLInt;
    readonly candidate: TLInt256;
    readonly reason: TLBytes;
}

export interface validatorSession_message_commit {
    readonly kind: 'validatorSession.message.commit';
    readonly round: TLInt;
    readonly candidate: TLInt256;
    readonly signature: TLBytes;
}

export interface validatorSession_message_vote {
    readonly kind: 'validatorSession.message.vote';
    readonly round: TLInt;
    readonly attempt: TLInt;
    readonly candidate: TLInt256;
}

export interface validatorSession_message_voteFor {
    readonly kind: 'validatorSession.message.voteFor';
    readonly round: TLInt;
    readonly attempt: TLInt;
    readonly candidate: TLInt256;
}

export interface validatorSession_message_precommit {
    readonly kind: 'validatorSession.message.precommit';
    readonly round: TLInt;
    readonly attempt: TLInt;
    readonly candidate: TLInt256;
}

export interface validatorSession_message_empty {
    readonly kind: 'validatorSession.message.empty';
    readonly round: TLInt;
    readonly attempt: TLInt;
}

export interface validatorSession_pong {
    readonly kind: 'validatorSession.pong';
    readonly hash: TLLong;
}

export interface validatorSession_candidateId {
    readonly kind: 'validatorSession.candidateId';
    readonly src: TLInt256;
    readonly rootHash: TLInt256;
    readonly fileHash: TLInt256;
    readonly collatedDataFileHash: TLInt256;
}

export interface validatorSession_blockUpdate {
    readonly kind: 'validatorSession.blockUpdate';
    readonly ts: TLLong;
    readonly actions: validatorSession_round_Message[];
    readonly state: TLInt;
}

export interface validatorSession_candidate {
    readonly kind: 'validatorSession.candidate';
    readonly src: TLInt256;
    readonly round: TLInt;
    readonly rootHash: TLInt256;
    readonly data: TLBytes;
    readonly collatedData: TLBytes;
}

export interface validatorSession_config {
    readonly kind: 'validatorSession.config';
    readonly catchainIdleTimeout: double;
    readonly catchainMaxDeps: TLInt;
    readonly roundCandidates: TLInt;
    readonly nextCandidateDelay: double;
    readonly roundAttemptDuration: TLInt;
    readonly maxRoundAttempts: TLInt;
    readonly maxBlockSize: TLInt;
    readonly maxCollatedDataSize: TLInt;
}

export interface validatorSession_configNew {
    readonly kind: 'validatorSession.configNew';
    readonly catchainIdleTimeout: double;
    readonly catchainMaxDeps: TLInt;
    readonly roundCandidates: TLInt;
    readonly nextCandidateDelay: double;
    readonly roundAttemptDuration: TLInt;
    readonly maxRoundAttempts: TLInt;
    readonly maxBlockSize: TLInt;
    readonly maxCollatedDataSize: TLInt;
    readonly newCatchainIds: TLBool;
}

export interface validatorSession_configVersioned {
    readonly kind: 'validatorSession.configVersioned';
    readonly catchainIdleTimeout: double;
    readonly catchainMaxDeps: TLInt;
    readonly roundCandidates: TLInt;
    readonly nextCandidateDelay: double;
    readonly roundAttemptDuration: TLInt;
    readonly maxRoundAttempts: TLInt;
    readonly maxBlockSize: TLInt;
    readonly maxCollatedDataSize: TLInt;
    readonly version: TLInt;
}

export interface validatorSession_catchainOptions {
    readonly kind: 'validatorSession.catchainOptions';
    readonly idleTimeout: double;
    readonly maxDeps: TLInt;
    readonly maxBlockSize: TLInt;
    readonly blockHashCoversData: TLBool;
    readonly maxBlockHeightCeoff: TLInt;
    readonly debugDisableDb: TLBool;
}

export interface validatorSession_configVersionedV2 {
    readonly kind: 'validatorSession.configVersionedV2';
    readonly catchainOpts: validatorSession_CatChainOptions;
    readonly roundCandidates: TLInt;
    readonly nextCandidateDelay: double;
    readonly roundAttemptDuration: TLInt;
    readonly maxRoundAttempts: TLInt;
    readonly maxBlockSize: TLInt;
    readonly maxCollatedDataSize: TLInt;
    readonly version: TLInt;
}

export interface hashable_bool {
    readonly kind: 'hashable.bool';
    readonly value: TLBool;
}

export interface hashable_int32 {
    readonly kind: 'hashable.int32';
    readonly value: TLInt;
}

export interface hashable_int64 {
    readonly kind: 'hashable.int64';
    readonly value: TLLong;
}

export interface hashable_int256 {
    readonly kind: 'hashable.int256';
    readonly value: TLInt256;
}

export interface hashable_bytes {
    readonly kind: 'hashable.bytes';
    readonly value: TLBytes;
}

export interface hashable_pair {
    readonly kind: 'hashable.pair';
    readonly left: TLInt;
    readonly right: TLInt;
}

export interface hashable_vector {
    readonly kind: 'hashable.vector';
    readonly value: TLInt[];
}

export interface hashable_validatorSessionOldRound {
    readonly kind: 'hashable.validatorSessionOldRound';
    readonly seqno: TLInt;
    readonly block: TLInt;
    readonly signatures: TLInt;
    readonly approveSignatures: TLInt;
}

export interface hashable_validatorSessionRoundAttempt {
    readonly kind: 'hashable.validatorSessionRoundAttempt';
    readonly seqno: TLInt;
    readonly votes: TLInt;
    readonly precommitted: TLInt;
    readonly voteForInited: TLInt;
    readonly voteFor: TLInt;
}

export interface hashable_validatorSessionRound {
    readonly kind: 'hashable.validatorSessionRound';
    readonly lockedRound: TLInt;
    readonly lockedBlock: TLInt;
    readonly seqno: TLInt;
    readonly precommitted: TLBool;
    readonly firstAttempt: TLInt;
    readonly approvedBlocks: TLInt;
    readonly signatures: TLInt;
    readonly attempts: TLInt;
}

export interface hashable_blockSignature {
    readonly kind: 'hashable.blockSignature';
    readonly signature: TLInt;
}

export interface hashable_sentBlock {
    readonly kind: 'hashable.sentBlock';
    readonly src: TLInt;
    readonly rootHash: TLInt;
    readonly fileHash: TLInt;
    readonly collatedDataFileHash: TLInt;
}

export interface hashable_sentBlockEmpty {
    readonly kind: 'hashable.sentBlockEmpty';
}

export interface hashable_vote {
    readonly kind: 'hashable.vote';
    readonly block: TLInt;
    readonly node: TLInt;
}

export interface hashable_blockCandidate {
    readonly kind: 'hashable.blockCandidate';
    readonly block: TLInt;
    readonly approved: TLInt;
}

export interface hashable_blockVoteCandidate {
    readonly kind: 'hashable.blockVoteCandidate';
    readonly block: TLInt;
    readonly approved: TLInt;
}

export interface hashable_blockCandidateAttempt {
    readonly kind: 'hashable.blockCandidateAttempt';
    readonly block: TLInt;
    readonly votes: TLInt;
}

export interface hashable_cntVector {
    readonly kind: 'hashable.cntVector';
    readonly data: TLInt;
}

export interface hashable_cntSortedVector {
    readonly kind: 'hashable.cntSortedVector';
    readonly data: TLInt;
}

export interface hashable_validatorSession {
    readonly kind: 'hashable.validatorSession';
    readonly ts: TLInt;
    readonly oldRounds: TLInt;
    readonly curRound: TLInt;
}

export interface tonNode_sessionId {
    readonly kind: 'tonNode.sessionId';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly ccSeqno: TLInt;
    readonly optsHash: TLInt256;
}

export interface tonNode_blockSignature {
    readonly kind: 'tonNode.blockSignature';
    readonly who: TLInt256;
    readonly signature: TLBytes;
}

export interface tonNode_blockId {
    readonly kind: 'tonNode.blockId';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly seqno: TLInt;
}

export interface tonNode_blockIdExt {
    readonly kind: 'tonNode.blockIdExt';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly seqno: TLInt;
    readonly rootHash: TLInt256;
    readonly fileHash: TLInt256;
}

export interface tonNode_zeroStateIdExt {
    readonly kind: 'tonNode.zeroStateIdExt';
    readonly workchain: TLInt;
    readonly rootHash: TLInt256;
    readonly fileHash: TLInt256;
}

export interface tonNode_blockDescriptionEmpty {
    readonly kind: 'tonNode.blockDescriptionEmpty';
}

export interface tonNode_blockDescription {
    readonly kind: 'tonNode.blockDescription';
    readonly id: tonNode_blockIdExt;
}

export interface tonNode_blocksDescription {
    readonly kind: 'tonNode.blocksDescription';
    readonly ids: tonNode_blockIdExt[];
    readonly incomplete: TLBool;
}

export interface tonNode_preparedProofEmpty {
    readonly kind: 'tonNode.preparedProofEmpty';
}

export interface tonNode_preparedProof {
    readonly kind: 'tonNode.preparedProof';
}

export interface tonNode_preparedProofLink {
    readonly kind: 'tonNode.preparedProofLink';
}

export interface tonNode_preparedState {
    readonly kind: 'tonNode.preparedState';
}

export interface tonNode_notFoundState {
    readonly kind: 'tonNode.notFoundState';
}

export interface tonNode_prepared {
    readonly kind: 'tonNode.prepared';
}

export interface tonNode_notFound {
    readonly kind: 'tonNode.notFound';
}

export interface tonNode_data {
    readonly kind: 'tonNode.data';
    readonly data: TLBytes;
}

export interface tonNode_ihrMessage {
    readonly kind: 'tonNode.ihrMessage';
    readonly data: TLBytes;
}

export interface tonNode_externalMessage {
    readonly kind: 'tonNode.externalMessage';
    readonly data: TLBytes;
}

export interface tonNode_newShardBlock {
    readonly kind: 'tonNode.newShardBlock';
    readonly block: tonNode_blockIdExt;
    readonly ccSeqno: TLInt;
    readonly data: TLBytes;
}

export interface tonNode_blockBroadcast {
    readonly kind: 'tonNode.blockBroadcast';
    readonly id: tonNode_blockIdExt;
    readonly catchainSeqno: TLInt;
    readonly validatorSetHash: TLInt;
    readonly signatures: tonNode_blockSignature[];
    readonly proof: TLBytes;
    readonly data: TLBytes;
}

export interface tonNode_ihrMessageBroadcast {
    readonly kind: 'tonNode.ihrMessageBroadcast';
    readonly message: tonNode_ihrMessage;
}

export interface tonNode_externalMessageBroadcast {
    readonly kind: 'tonNode.externalMessageBroadcast';
    readonly message: tonNode_externalMessage;
}

export interface tonNode_newShardBlockBroadcast {
    readonly kind: 'tonNode.newShardBlockBroadcast';
    readonly block: tonNode_newShardBlock;
}

export interface tonNode_shardPublicOverlayId {
    readonly kind: 'tonNode.shardPublicOverlayId';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly zeroStateFileHash: TLInt256;
}

export interface tonNode_keyBlocks {
    readonly kind: 'tonNode.keyBlocks';
    readonly blocks: tonNode_blockIdExt[];
    readonly incomplete: TLBool;
    readonly error: TLBool;
}

export interface ton_blockId {
    readonly kind: 'ton.blockId';
    readonly rootCellHash: TLInt256;
    readonly fileHash: TLInt256;
}

export interface ton_blockIdApprove {
    readonly kind: 'ton.blockIdApprove';
    readonly rootCellHash: TLInt256;
    readonly fileHash: TLInt256;
}

export interface tonNode_dataList {
    readonly kind: 'tonNode.dataList';
    readonly data: TLBytes[];
}

export interface tonNode_dataFull {
    readonly kind: 'tonNode.dataFull';
    readonly id: tonNode_blockIdExt;
    readonly proof: TLBytes;
    readonly block: TLBytes;
    readonly isLink: TLBool;
}

export interface tonNode_dataFullEmpty {
    readonly kind: 'tonNode.dataFullEmpty';
}

export interface tonNode_capabilities {
    readonly kind: 'tonNode.capabilities';
    readonly version: TLInt;
    readonly capabilities: TLLong;
}

export interface tonNode_success {
    readonly kind: 'tonNode.success';
}

export interface tonNode_archiveNotFound {
    readonly kind: 'tonNode.archiveNotFound';
}

export interface tonNode_archiveInfo {
    readonly kind: 'tonNode.archiveInfo';
    readonly id: TLLong;
}

export interface db_root_dbDescription {
    readonly kind: 'db.root.dbDescription';
    readonly version: TLInt;
    readonly firstMasterchainBlockId: tonNode_blockIdExt;
    readonly flags: TLInt;
}

export interface db_root_key_cellDb {
    readonly kind: 'db.root.key.cellDb';
    readonly version: TLInt;
}

export interface db_root_key_blockDb {
    readonly kind: 'db.root.key.blockDb';
    readonly version: TLInt;
}

export interface db_root_config {
    readonly kind: 'db.root.config';
    readonly celldbVersion: TLInt;
    readonly blockdbVersion: TLInt;
}

export interface db_root_key_config {
    readonly kind: 'db.root.key.config';
}

export interface db_celldb_value {
    readonly kind: 'db.celldb.value';
    readonly blockId: tonNode_blockIdExt;
    readonly prev: TLInt256;
    readonly next: TLInt256;
    readonly rootHash: TLInt256;
}

export interface db_celldb_key_value {
    readonly kind: 'db.celldb.key.value';
    readonly hash: TLInt256;
}

export interface db_block_info {
    readonly kind: 'db.block.info';
    readonly id: tonNode_blockIdExt;
    readonly flags: TLFlag;
    readonly prevLeft: tonNode_blockIdExt | null;
    readonly prevRight: tonNode_blockIdExt | null;
    readonly nextLeft: tonNode_blockIdExt | null;
    readonly nextRight: tonNode_blockIdExt | null;
    readonly lt: TLLong | null;
    readonly ts: TLInt | null;
    readonly state: TLInt256 | null;
    readonly masterchainRefSeqno: TLInt | null;
}

export interface db_block_packedInfo {
    readonly kind: 'db.block.packedInfo';
    readonly id: tonNode_blockIdExt;
    readonly unixtime: TLInt;
    readonly offset: TLLong;
}

export interface db_block_archivedInfo {
    readonly kind: 'db.block.archivedInfo';
    readonly id: tonNode_blockIdExt;
    readonly flags: TLFlag;
    readonly next: tonNode_blockIdExt | null;
}

export interface db_blockdb_value {
    readonly kind: 'db.blockdb.value';
    readonly next: tonNode_blockIdExt;
    readonly data: TLBytes;
}

export interface db_blockdb_lru {
    readonly kind: 'db.blockdb.lru';
    readonly id: tonNode_blockIdExt;
    readonly prev: TLInt256;
    readonly next: TLInt256;
}

export interface db_blockdb_key_lru {
    readonly kind: 'db.blockdb.key.lru';
    readonly id: tonNode_blockIdExt;
}

export interface db_blockdb_key_value {
    readonly kind: 'db.blockdb.key.value';
    readonly id: tonNode_blockIdExt;
}

export interface db_candidate {
    readonly kind: 'db.candidate';
    readonly source: PublicKey;
    readonly id: tonNode_blockIdExt;
    readonly data: TLBytes;
    readonly collatedData: TLBytes;
}

export interface db_candidate_id {
    readonly kind: 'db.candidate.id';
    readonly source: PublicKey;
    readonly id: tonNode_blockIdExt;
    readonly collatedDataFileHash: TLInt256;
}

export interface db_filedb_key_empty {
    readonly kind: 'db.filedb.key.empty';
}

export interface db_filedb_key_blockFile {
    readonly kind: 'db.filedb.key.blockFile';
    readonly blockId: tonNode_blockIdExt;
}

export interface db_filedb_key_zeroStateFile {
    readonly kind: 'db.filedb.key.zeroStateFile';
    readonly blockId: tonNode_blockIdExt;
}

export interface db_filedb_key_persistentStateFile {
    readonly kind: 'db.filedb.key.persistentStateFile';
    readonly blockId: tonNode_blockIdExt;
    readonly masterchainBlockId: tonNode_blockIdExt;
}

export interface db_filedb_key_proof {
    readonly kind: 'db.filedb.key.proof';
    readonly blockId: tonNode_blockIdExt;
}

export interface db_filedb_key_proofLink {
    readonly kind: 'db.filedb.key.proofLink';
    readonly blockId: tonNode_blockIdExt;
}

export interface db_filedb_key_signatures {
    readonly kind: 'db.filedb.key.signatures';
    readonly blockId: tonNode_blockIdExt;
}

export interface db_filedb_key_candidate {
    readonly kind: 'db.filedb.key.candidate';
    readonly id: db_candidate_id;
}

export interface db_filedb_key_blockInfo {
    readonly kind: 'db.filedb.key.blockInfo';
    readonly blockId: tonNode_blockIdExt;
}

export interface db_filedb_value {
    readonly kind: 'db.filedb.value';
    readonly key: db_filedb_Key;
    readonly prev: TLInt256;
    readonly next: TLInt256;
    readonly fileHash: TLInt256;
}

export interface db_state_destroyedSessions {
    readonly kind: 'db.state.destroyedSessions';
    readonly sessions: TLInt256[];
}

export interface db_state_initBlockId {
    readonly kind: 'db.state.initBlockId';
    readonly block: tonNode_blockIdExt;
}

export interface db_state_gcBlockId {
    readonly kind: 'db.state.gcBlockId';
    readonly block: tonNode_blockIdExt;
}

export interface db_state_shardClient {
    readonly kind: 'db.state.shardClient';
    readonly block: tonNode_blockIdExt;
}

export interface db_state_asyncSerializer {
    readonly kind: 'db.state.asyncSerializer';
    readonly block: tonNode_blockIdExt;
    readonly last: tonNode_blockIdExt;
    readonly lastTs: TLInt;
}

export interface db_state_hardforks {
    readonly kind: 'db.state.hardforks';
    readonly blocks: tonNode_blockIdExt[];
}

export interface db_state_dbVersion {
    readonly kind: 'db.state.dbVersion';
    readonly version: TLInt;
}

export interface db_state_key_destroyedSessions {
    readonly kind: 'db.state.key.destroyedSessions';
}

export interface db_state_key_initBlockId {
    readonly kind: 'db.state.key.initBlockId';
}

export interface db_state_key_gcBlockId {
    readonly kind: 'db.state.key.gcBlockId';
}

export interface db_state_key_shardClient {
    readonly kind: 'db.state.key.shardClient';
}

export interface db_state_key_asyncSerializer {
    readonly kind: 'db.state.key.asyncSerializer';
}

export interface db_state_key_hardforks {
    readonly kind: 'db.state.key.hardforks';
}

export interface db_state_key_dbVersion {
    readonly kind: 'db.state.key.dbVersion';
}

export interface db_lt_el_key {
    readonly kind: 'db.lt.el.key';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly idx: TLInt;
}

export interface db_lt_desc_key {
    readonly kind: 'db.lt.desc.key';
    readonly workchain: TLInt;
    readonly shard: TLLong;
}

export interface db_lt_shard_key {
    readonly kind: 'db.lt.shard.key';
    readonly idx: TLInt;
}

export interface db_lt_status_key {
    readonly kind: 'db.lt.status.key';
}

export interface db_lt_el_value {
    readonly kind: 'db.lt.el.value';
    readonly id: tonNode_blockIdExt;
    readonly lt: TLLong;
    readonly ts: TLInt;
}

export interface db_lt_desc_value {
    readonly kind: 'db.lt.desc.value';
    readonly firstIdx: TLInt;
    readonly lastIdx: TLInt;
    readonly lastSeqno: TLInt;
    readonly lastLt: TLLong;
    readonly lastTs: TLInt;
}

export interface db_lt_shard_value {
    readonly kind: 'db.lt.shard.value';
    readonly workchain: TLInt;
    readonly shard: TLLong;
}

export interface db_lt_status_value {
    readonly kind: 'db.lt.status.value';
    readonly totalShards: TLInt;
}

export interface db_files_index_key {
    readonly kind: 'db.files.index.key';
}

export interface db_files_package_key {
    readonly kind: 'db.files.package.key';
    readonly packageId: TLInt;
    readonly key: TLBool;
    readonly temp: TLBool;
}

export interface db_files_index_value {
    readonly kind: 'db.files.index.value';
    readonly packages: TLInt[];
    readonly keyPackages: TLInt[];
    readonly tempPackages: TLInt[];
}

export interface db_files_package_firstBlock {
    readonly kind: 'db.files.package.firstBlock';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly seqno: TLInt;
    readonly unixtime: TLInt;
    readonly lt: TLLong;
}

export interface db_files_package_value {
    readonly kind: 'db.files.package.value';
    readonly packageId: TLInt;
    readonly key: TLBool;
    readonly temp: TLBool;
    readonly firstblocks: db_files_package_firstBlock[];
    readonly deleted: TLBool;
}

export interface validator_groupMember {
    readonly kind: 'validator.groupMember';
    readonly publicKeyHash: TLInt256;
    readonly adnl: TLInt256;
    readonly weight: TLLong;
}

export interface validator_group {
    readonly kind: 'validator.group';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly catchainSeqno: TLInt;
    readonly configHash: TLInt256;
    readonly members: validator_groupMember[];
}

export interface validator_groupEx {
    readonly kind: 'validator.groupEx';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly verticalSeqno: TLInt;
    readonly catchainSeqno: TLInt;
    readonly configHash: TLInt256;
    readonly members: validator_groupMember[];
}

export interface validator_groupNew {
    readonly kind: 'validator.groupNew';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly verticalSeqno: TLInt;
    readonly lastKeyBlockSeqno: TLInt;
    readonly catchainSeqno: TLInt;
    readonly configHash: TLInt256;
    readonly members: validator_groupMember[];
}

export interface id_config_local {
    readonly kind: 'id.config.local';
    readonly id: PrivateKey;
}

export interface dht_config_local {
    readonly kind: 'dht.config.local';
    readonly id: adnl_id_short;
}

export interface dht_config_random_local {
    readonly kind: 'dht.config.random.local';
    readonly cnt: TLInt;
}

export interface liteserver_config_local {
    readonly kind: 'liteserver.config.local';
    readonly id: PrivateKey;
    readonly port: TLInt;
}

export interface liteserver_config_random_local {
    readonly kind: 'liteserver.config.random.local';
    readonly port: TLInt;
}

export interface validator_config_local {
    readonly kind: 'validator.config.local';
    readonly id: adnl_id_short;
}

export interface validator_config_random_local {
    readonly kind: 'validator.config.random.local';
    readonly addrList: adnl_addressList;
}

export interface control_config_local {
    readonly kind: 'control.config.local';
    readonly priv: PrivateKey;
    readonly pub: TLInt256;
    readonly port: TLInt;
}

export interface config_local {
    readonly kind: 'config.local';
    readonly localIds: id_config_local[];
    readonly dht: dht_config_Local[];
    readonly validators: validator_config_Local[];
    readonly liteservers: liteserver_config_Local[];
    readonly control: control_config_local[];
}

export interface dht_config_global {
    readonly kind: 'dht.config.global';
    readonly staticNodes: dht_nodes;
    readonly k: TLInt;
    readonly a: TLInt;
}

export interface dht_config_global_v2 {
    readonly kind: 'dht.config.global_v2';
    readonly staticNodes: dht_nodes;
    readonly k: TLInt;
    readonly a: TLInt;
    readonly networkId: TLInt;
}

export interface adnl_config_global {
    readonly kind: 'adnl.config.global';
    readonly staticNodes: adnl_nodes;
}

export interface catchain_config_global {
    readonly kind: 'catchain.config.global';
    readonly tag: TLInt256;
    readonly nodes: PublicKey[];
}

export interface dummyworkchain0_config_global {
    readonly kind: 'dummyworkchain0.config.global';
    readonly zeroStateHash: TLInt256;
}

export interface validator_config_global {
    readonly kind: 'validator.config.global';
    readonly zeroState: tonNode_blockIdExt;
    readonly initBlock: tonNode_blockIdExt;
    readonly hardforks: tonNode_blockIdExt[];
}

export interface config_global {
    readonly kind: 'config.global';
    readonly adnl: adnl_config_global;
    readonly dht: dht_config_Global;
    readonly validator: validator_config_global;
}

export interface liteserver_desc {
    readonly kind: 'liteserver.desc';
    readonly id: PublicKey;
    readonly ip: TLInt;
    readonly port: TLInt;
}

export interface liteclient_config_global {
    readonly kind: 'liteclient.config.global';
    readonly liteservers: liteserver_desc[];
    readonly validator: validator_config_global;
}

export interface engine_adnl {
    readonly kind: 'engine.adnl';
    readonly id: TLInt256;
    readonly category: TLInt;
}

export interface engine_addr {
    readonly kind: 'engine.addr';
    readonly ip: TLInt;
    readonly port: TLInt;
    readonly categories: TLInt[];
    readonly priorityCategories: TLInt[];
}

export interface engine_addrProxy {
    readonly kind: 'engine.addrProxy';
    readonly inIp: TLInt;
    readonly inPort: TLInt;
    readonly outIp: TLInt;
    readonly outPort: TLInt;
    readonly proxyType: adnl_Proxy;
    readonly categories: TLInt[];
    readonly priorityCategories: TLInt[];
}

export interface engine_dht {
    readonly kind: 'engine.dht';
    readonly id: TLInt256;
}

export interface engine_validatorTempKey {
    readonly kind: 'engine.validatorTempKey';
    readonly key: TLInt256;
    readonly expireAt: TLInt;
}

export interface engine_validatorAdnlAddress {
    readonly kind: 'engine.validatorAdnlAddress';
    readonly id: TLInt256;
    readonly expireAt: TLInt;
}

export interface engine_validator {
    readonly kind: 'engine.validator';
    readonly id: TLInt256;
    readonly tempKeys: engine_validatorTempKey[];
    readonly adnlAddrs: engine_validatorAdnlAddress[];
    readonly electionDate: TLInt;
    readonly expireAt: TLInt;
}

export interface engine_liteServer {
    readonly kind: 'engine.liteServer';
    readonly id: TLInt256;
    readonly port: TLInt;
}

export interface engine_controlProcess {
    readonly kind: 'engine.controlProcess';
    readonly id: TLInt256;
    readonly permissions: TLInt;
}

export interface engine_controlInterface {
    readonly kind: 'engine.controlInterface';
    readonly id: TLInt256;
    readonly port: TLInt;
    readonly allowed: engine_controlProcess[];
}

export interface engine_gc {
    readonly kind: 'engine.gc';
    readonly ids: TLInt256[];
}

export interface engine_dht_config {
    readonly kind: 'engine.dht.config';
    readonly dht: engine_dht[];
    readonly gc: engine_gc;
}

export interface engine_validator_fullNodeMaster {
    readonly kind: 'engine.validator.fullNodeMaster';
    readonly port: TLInt;
    readonly adnl: TLInt256;
}

export interface engine_validator_fullNodeSlave {
    readonly kind: 'engine.validator.fullNodeSlave';
    readonly ip: TLInt;
    readonly port: TLInt;
    readonly adnl: PublicKey;
}

export interface engine_validator_config {
    readonly kind: 'engine.validator.config';
    readonly outPort: TLInt;
    readonly addrs: engine_Addr[];
    readonly adnl: engine_adnl[];
    readonly dht: engine_dht[];
    readonly validators: engine_validator[];
    readonly fullnode: TLInt256;
    readonly fullnodeslaves: engine_validator_fullNodeSlave[];
    readonly fullnodemasters: engine_validator_fullNodeMaster[];
    readonly liteservers: engine_liteServer[];
    readonly control: engine_controlInterface[];
    readonly gc: engine_gc;
}

export interface engine_adnlProxy_port {
    readonly kind: 'engine.adnlProxy.port';
    readonly inPort: TLInt;
    readonly outPort: TLInt;
    readonly dstIp: TLInt;
    readonly dstPort: TLInt;
    readonly proxyType: adnl_Proxy;
}

export interface engine_adnlProxy_config {
    readonly kind: 'engine.adnlProxy.config';
    readonly ports: engine_adnlProxy_port[];
}

export interface adnl_pong {
    readonly kind: 'adnl.pong';
    readonly value: TLLong;
}

export interface engine_validator_keyHash {
    readonly kind: 'engine.validator.keyHash';
    readonly keyHash: TLInt256;
}

export interface engine_validator_signature {
    readonly kind: 'engine.validator.signature';
    readonly signature: TLBytes;
}

export interface engine_validator_oneStat {
    readonly kind: 'engine.validator.oneStat';
    readonly key: TLString;
    readonly value: TLString;
}

export interface engine_validator_stats {
    readonly kind: 'engine.validator.stats';
    readonly stats: engine_validator_oneStat[];
}

export interface engine_validator_controlQueryError {
    readonly kind: 'engine.validator.controlQueryError';
    readonly code: TLInt;
    readonly message: TLString;
}

export interface engine_validator_time {
    readonly kind: 'engine.validator.time';
    readonly time: TLInt;
}

export interface engine_validator_success {
    readonly kind: 'engine.validator.success';
}

export interface engine_validator_jsonConfig {
    readonly kind: 'engine.validator.jsonConfig';
    readonly data: TLString;
}

export interface engine_validator_electionBid {
    readonly kind: 'engine.validator.electionBid';
    readonly electionDate: TLInt;
    readonly permKey: TLInt256;
    readonly adnlAddr: TLInt256;
    readonly toSendPayload: TLBytes;
}

export interface engine_validator_proposalVote {
    readonly kind: 'engine.validator.proposalVote';
    readonly permKey: TLInt256;
    readonly toSend: TLBytes;
}

export interface engine_validator_dhtServerStatus {
    readonly kind: 'engine.validator.dhtServerStatus';
    readonly id: TLInt256;
    readonly status: TLInt;
}

export interface engine_validator_dhtServersStatus {
    readonly kind: 'engine.validator.dhtServersStatus';
    readonly servers: engine_validator_dhtServerStatus[];
}

export interface engine_validator_overlayStatsNode {
    readonly kind: 'engine.validator.overlayStatsNode';
    readonly adnlId: TLInt256;
    readonly ipAddr: TLString;
    readonly bdcstErrors: TLInt;
    readonly fecBdcstErrors: TLInt;
    readonly lastInQuery: TLInt;
    readonly lastOutQuery: TLInt;
    readonly tOutBytes: TLInt;
    readonly tInBytes: TLInt;
    readonly tOutPckts: TLInt;
    readonly tInPckts: TLInt;
}

export interface engine_validator_overlayStats {
    readonly kind: 'engine.validator.overlayStats';
    readonly overlayId: TLInt256;
    readonly overlayIdFull: PublicKey;
    readonly adnlId: TLInt256;
    readonly scope: TLString;
    readonly nodes: engine_validator_overlayStatsNode[];
    readonly stats: engine_validator_oneStat[];
}

export interface engine_validator_overlaysStats {
    readonly kind: 'engine.validator.overlaysStats';
    readonly overlays: engine_validator_overlayStats[];
}

export interface engine_validator_onePerfTimerStat {
    readonly kind: 'engine.validator.onePerfTimerStat';
    readonly time: TLInt;
    readonly min: double;
    readonly avg: double;
    readonly max: double;
}

export interface engine_validator_perfTimerStatsByName {
    readonly kind: 'engine.validator.perfTimerStatsByName';
    readonly name: TLString;
    readonly stats: engine_validator_OnePerfTimerStat[];
}

export interface engine_validator_perfTimerStats {
    readonly kind: 'engine.validator.perfTimerStats';
    readonly stats: engine_validator_PerfTimerStatsByName[];
}

export interface storage_pong {
    readonly kind: 'storage.pong';
}

export interface storage_ok {
    readonly kind: 'storage.ok';
}

export interface storage_state {
    readonly kind: 'storage.state';
    readonly willUpload: TLBool;
    readonly wantDownload: TLBool;
}

export interface storage_piece {
    readonly kind: 'storage.piece';
    readonly proof: TLBytes;
    readonly data: TLBytes;
}

export interface storage_torrentInfo {
    readonly kind: 'storage.torrentInfo';
    readonly data: TLBytes;
}

export interface storage_updateInit {
    readonly kind: 'storage.updateInit';
    readonly havePieces: TLBytes;
    readonly havePiecesOffset: TLInt;
    readonly state: storage_State;
}

export interface storage_updateHavePieces {
    readonly kind: 'storage.updateHavePieces';
    readonly pieceId: TLInt[];
}

export interface storage_updateState {
    readonly kind: 'storage.updateState';
    readonly state: storage_State;
}

export interface http_header {
    readonly kind: 'http.header';
    readonly name: TLString;
    readonly value: TLString;
}

export interface http_payloadPart {
    readonly kind: 'http.payloadPart';
    readonly data: TLBytes;
    readonly trailer: http_header[];
    readonly last: TLBool;
}

export interface http_response {
    readonly kind: 'http.response';
    readonly httpVersion: TLString;
    readonly statusCode: TLInt;
    readonly reason: TLString;
    readonly headers: http_header[];
    readonly noPayload: TLBool;
}

export interface http_proxy_capabilities {
    readonly kind: 'http.proxy.capabilities';
    readonly capabilities: TLLong;
}

export interface http_server_dnsEntry {
    readonly kind: 'http.server.dnsEntry';
    readonly domain: TLString;
    readonly addr: adnl_id_short;
}

export interface http_server_host {
    readonly kind: 'http.server.host';
    readonly domains: TLString[];
    readonly ip: TLInt;
    readonly port: TLInt;
    readonly adnlId: adnl_id_short;
}

export interface http_server_config {
    readonly kind: 'http.server.config';
    readonly dhs: http_server_dnsEntry[];
    readonly localHosts: http_server_host[];
}

export interface validatorSession_statsProducer {
    readonly kind: 'validatorSession.statsProducer';
    readonly id: TLInt256;
    readonly blockStatus: TLInt;
    readonly blockTimestamp: TLLong;
}

export interface validatorSession_statsRound {
    readonly kind: 'validatorSession.statsRound';
    readonly timestamp: TLLong;
    readonly producers: validatorSession_statsProducer[];
}

export interface validatorSession_stats {
    readonly kind: 'validatorSession.stats';
    readonly id: tonNode_blockId;
    readonly timestamp: TLLong;
    readonly self: TLInt256;
    readonly creator: TLInt256;
    readonly totalValidators: TLInt;
    readonly totalWeight: TLLong;
    readonly signatures: TLInt;
    readonly signaturesWeight: TLLong;
    readonly approveSignatures: TLInt;
    readonly approveSignaturesWeight: TLLong;
    readonly firstRound: TLInt;
    readonly rounds: validatorSession_statsRound[];
}

export interface storage_db_key_torrentList {
    readonly kind: 'storage.db.key.torrentList';
}

export interface storage_db_key_torrent {
    readonly kind: 'storage.db.key.torrent';
    readonly hash: TLInt256;
}

export interface storage_db_key_torrentMeta {
    readonly kind: 'storage.db.key.torrentMeta';
    readonly hash: TLInt256;
}

export interface storage_db_key_priorities {
    readonly kind: 'storage.db.key.priorities';
    readonly hash: TLInt256;
}

export interface storage_db_key_piecesInDb {
    readonly kind: 'storage.db.key.piecesInDb';
    readonly hash: TLInt256;
}

export interface storage_db_key_pieceInDb {
    readonly kind: 'storage.db.key.pieceInDb';
    readonly hash: TLInt256;
    readonly idx: TLLong;
}

export interface storage_db_torrentList {
    readonly kind: 'storage.db.torrentList';
    readonly torrents: TLInt256[];
}

export interface storage_db_torrent {
    readonly kind: 'storage.db.torrent';
    readonly rootDir: TLString;
    readonly activeDownload: TLBool;
    readonly activeUpload: TLBool;
}

export interface storage_db_priorities {
    readonly kind: 'storage.db.priorities';
    readonly actions: storage_PriorityAction[];
}

export interface storage_db_piecesInDb {
    readonly kind: 'storage.db.piecesInDb';
    readonly pieces: TLLong[];
}

export interface storage_priorityAction_all {
    readonly kind: 'storage.priorityAction.all';
    readonly priority: TLInt;
}

export interface storage_priorityAction_idx {
    readonly kind: 'storage.priorityAction.idx';
    readonly idx: TLLong;
    readonly priority: TLInt;
}

export interface storage_priorityAction_name {
    readonly kind: 'storage.priorityAction.name';
    readonly name: TLString;
    readonly priority: TLInt;
}

export interface storage_daemon_config {
    readonly kind: 'storage.daemon.config';
    readonly serverKey: PublicKey;
    readonly cliKeyHash: TLInt256;
    readonly providerAddress: TLString;
    readonly adnlId: PublicKey;
    readonly dhtId: PublicKey;
}

export interface storage_daemon_provider_params {
    readonly kind: 'storage.daemon.provider.params';
    readonly acceptNewContracts: TLBool;
    readonly ratePerMbDay: TLString;
    readonly maxSpan: TLInt;
    readonly minimalFileSize: TLLong;
    readonly maximalFileSize: TLLong;
}

export interface storage_provider_db_key_state {
    readonly kind: 'storage.provider.db.key.state';
}

export interface storage_provider_db_key_contractList {
    readonly kind: 'storage.provider.db.key.contractList';
}

export interface storage_provider_db_key_storageContract {
    readonly kind: 'storage.provider.db.key.storageContract';
    readonly wc: TLInt;
    readonly addr: TLInt256;
}

export interface storage_provider_db_key_microchunkTree {
    readonly kind: 'storage.provider.db.key.microchunkTree';
    readonly wc: TLInt;
    readonly addr: TLInt256;
}

export interface storage_provider_db_key_providerConfig {
    readonly kind: 'storage.provider.db.key.providerConfig';
}

export interface storage_provider_db_state {
    readonly kind: 'storage.provider.db.state';
    readonly lastProcessedLt: TLLong;
}

export interface storage_provider_db_contractAddress {
    readonly kind: 'storage.provider.db.contractAddress';
    readonly wc: TLInt;
    readonly addr: TLInt256;
}

export interface storage_provider_db_contractList {
    readonly kind: 'storage.provider.db.contractList';
    readonly contracts: storage_provider_db_contractAddress[];
}

export interface storage_provider_db_storageContract {
    readonly kind: 'storage.provider.db.storageContract';
    readonly torrentHash: TLInt256;
    readonly microchunkHash: TLInt256;
    readonly createdTime: TLInt;
    readonly state: TLInt;
    readonly fileSize: TLLong;
    readonly rate: TLString;
    readonly maxSpan: TLInt;
}

export interface storage_provider_db_microchunkTree {
    readonly kind: 'storage.provider.db.microchunkTree';
    readonly data: TLBytes;
}

export interface storage_daemon_queryError {
    readonly kind: 'storage.daemon.queryError';
    readonly message: TLString;
}

export interface storage_daemon_success {
    readonly kind: 'storage.daemon.success';
}

export interface storage_daemon_torrent {
    readonly kind: 'storage.daemon.torrent';
    readonly hash: TLInt256;
    readonly flags: TLFlag;
    readonly totalSize: TLLong | null;
    readonly description: TLString | null;
    readonly filesCount: TLLong | null;
    readonly includedSize: TLLong | null;
    readonly dirName: TLString | null;
    readonly downloadedSize: TLLong;
    readonly rootDir: TLString;
    readonly activeDownload: TLBool;
    readonly activeUpload: TLBool;
    readonly completed: TLBool;
    readonly downloadSpeed: double;
    readonly uploadSpeed: double;
    readonly fatalError: TLString | null;
}

export interface storage_daemon_fileInfo {
    readonly kind: 'storage.daemon.fileInfo';
    readonly name: TLString;
    readonly size: TLLong;
    readonly priority: TLInt;
    readonly downloadedSize: TLLong;
}

export interface storage_daemon_torrentFull {
    readonly kind: 'storage.daemon.torrentFull';
    readonly torrent: storage_daemon_torrent;
    readonly files: storage_daemon_fileInfo[];
}

export interface storage_daemon_torrentList {
    readonly kind: 'storage.daemon.torrentList';
    readonly torrents: storage_daemon_torrent[];
}

export interface storage_daemon_torrentMeta {
    readonly kind: 'storage.daemon.torrentMeta';
    readonly meta: TLBytes;
}

export interface storage_daemon_newContractParams {
    readonly kind: 'storage.daemon.newContractParams';
    readonly rate: TLString;
    readonly maxSpan: TLInt;
}

export interface storage_daemon_newContractParamsAuto {
    readonly kind: 'storage.daemon.newContractParamsAuto';
    readonly providerAddress: TLString;
}

export interface storage_daemon_newContractMessage {
    readonly kind: 'storage.daemon.newContractMessage';
    readonly body: TLBytes;
    readonly rate: TLString;
    readonly maxSpan: TLInt;
}

export interface storage_daemon_peer {
    readonly kind: 'storage.daemon.peer';
    readonly adnlId: TLInt256;
    readonly ipStr: TLString;
    readonly downloadSpeed: double;
    readonly uploadSpeed: double;
    readonly readyParts: TLLong;
}

export interface storage_daemon_peerList {
    readonly kind: 'storage.daemon.peerList';
    readonly peers: storage_daemon_peer[];
    readonly downloadSpeed: double;
    readonly uploadSpeed: double;
    readonly totalParts: TLLong;
}

export interface storage_daemon_prioritySet {
    readonly kind: 'storage.daemon.prioritySet';
}

export interface storage_daemon_priorityPending {
    readonly kind: 'storage.daemon.priorityPending';
}

export interface storage_daemon_keyHash {
    readonly kind: 'storage.daemon.keyHash';
    readonly keyHash: TLInt256;
}

export interface storage_daemon_providerConfig {
    readonly kind: 'storage.daemon.providerConfig';
    readonly maxContracts: TLInt;
    readonly maxTotalSize: TLLong;
}

export interface storage_daemon_contractInfo {
    readonly kind: 'storage.daemon.contractInfo';
    readonly address: TLString;
    readonly state: TLInt;
    readonly torrent: TLInt256;
    readonly createdTime: TLInt;
    readonly fileSize: TLLong;
    readonly downloadedSize: TLLong;
    readonly rate: TLString;
    readonly maxSpan: TLInt;
    readonly clientBalance: TLString;
    readonly contractBalance: TLString;
}

export interface storage_daemon_providerInfo {
    readonly kind: 'storage.daemon.providerInfo';
    readonly address: TLString;
    readonly balance: TLString;
    readonly config: storage_daemon_providerConfig;
    readonly contractsCount: TLInt;
    readonly contractsTotalSize: TLLong;
    readonly contracts: storage_daemon_contractInfo[];
}

export interface storage_daemon_providerAddress {
    readonly kind: 'storage.daemon.providerAddress';
    readonly address: TLString;
}

//
// Types
//

export type TestObject = testObject | testString | testInt | testVectorBytes;

export type tcp_Pong = tcp_pong;

export type tcp_Message = tcp_authentificate | tcp_authentificationNonce | tcp_authentificationComplete;

export type fec_Type = fec_raptorQ | fec_roundRobin | fec_online;

export type PrivateKey = pk_unenc | pk_ed25519 | pk_aes | pk_overlay;

export type PublicKey = pub_unenc | pub_ed25519 | pub_aes | pub_overlay;

export type adnl_id_Short = adnl_id_short;

export type adnl_ProxyTo = adnl_proxyToFastHash;

export type adnl_ProxyToSign = adnl_proxyToFast;

export type adnl_Proxy = adnl_proxy_none | adnl_proxy_fast;

export type adnl_Address = adnl_address_udp | adnl_address_udp6 | adnl_address_tunnel | adnl_address_reverse;

export type adnl_AddressList = adnl_addressList;

export type adnl_Node = adnl_node;

export type adnl_Nodes = adnl_nodes;

export type adnl_PacketContents = adnl_packetContents;

export type adnl_TunnelPacketContents = adnl_tunnelPacketContents;

export type adnl_ProxyPacketHeader = adnl_proxyPacketHeader;

export type adnl_ProxyControlPacket = adnl_proxyControlPacketPing | adnl_proxyControlPacketPong | adnl_proxyControlPacketRegister;

export type adnl_Message = adnl_message_createChannel | adnl_message_confirmChannel | adnl_message_custom | adnl_message_nop | adnl_message_reinit | adnl_message_query | adnl_message_answer | adnl_message_part;

export type adnl_db_Key = adnl_db_node_key;

export type adnl_db_node_Value = adnl_db_node_value;

export type rldp2_MessagePart = rldp2_messagePart | rldp2_confirm | rldp2_complete;

export type rldp_MessagePart = rldp_messagePart | rldp_confirm | rldp_complete;

export type rldp_Message = rldp_message | rldp_query | rldp_answer;

export type dht_Node = dht_node;

export type dht_Nodes = dht_nodes;

export type dht_Key = dht_key;

export type dht_UpdateRule = dht_updateRule_signature | dht_updateRule_anybody | dht_updateRule_overlayNodes;

export type dht_KeyDescription = dht_keyDescription;

export type dht_Value = dht_value;

export type dht_Pong = dht_pong;

export type dht_ValueResult = dht_valueNotFound | dht_valueFound;

export type dht_ReversePingResult = dht_clientNotFound | dht_reversePingOk;

export type dht_Stored = dht_stored;

export type dht_Message = dht_message;

export type dht_RequestReversePingCont = dht_requestReversePingCont;

export type dht_db_Bucket = dht_db_bucket;

export type dht_db_Key = dht_db_key_bucket;

export type overlay_node_ToSign = overlay_node_toSign;

export type overlay_Node = overlay_node;

export type overlay_Nodes = overlay_nodes;

export type overlay_Message = overlay_message;

export type overlay_BroadcastList = overlay_broadcastList;

export type overlay_Broadcast = overlay_fec_received | overlay_fec_completed | overlay_unicast | overlay_broadcast | overlay_broadcastFec | overlay_broadcastFecShort | overlay_broadcastNotFound;

export type overlay_broadcast_Id = overlay_broadcast_id;

export type overlay_broadcastFec_Id = overlay_broadcastFec_id;

export type overlay_broadcastFec_PartId = overlay_broadcastFec_partId;

export type overlay_broadcast_ToSign = overlay_broadcast_toSign;

export type overlay_Certificate = overlay_certificate | overlay_certificateV2 | overlay_emptyCertificate;

export type overlay_CertificateId = overlay_certificateId | overlay_certificateIdV2;

export type overlay_db_Nodes = overlay_db_nodes;

export type overlay_db_Key = overlay_db_key_nodes;

export type catchain_block_Id = catchain_block_id;

export type catchain_block_Dep = catchain_block_dep;

export type catchain_block_Data = catchain_block_data;

export type catchain_Block = catchain_block;

export type catchain_Blocks = catchain_blocks;

export type catchain_Update = catchain_blockUpdate;

export type catchain_block_inner_Data = catchain_block_data_badBlock | catchain_block_data_fork | catchain_block_data_nop;

export type catchain_FirstBlock = catchain_firstblock;

export type catchain_Difference = catchain_difference | catchain_differenceFork;

export type catchain_BlockResult = catchain_blockNotFound | catchain_blockResult;

export type catchain_Sent = catchain_sent;

export type validatorSession_round_Id = validatorSession_round_id;

export type validatorSession_tempBlock_Id = validatorSession_candidate_id;

export type validatorSession_Message = validatorSession_message_startSession | validatorSession_message_finishSession;

export type validatorSession_round_Message = validatorSession_message_submittedBlock | validatorSession_message_approvedBlock | validatorSession_message_rejectedBlock | validatorSession_message_commit | validatorSession_message_vote | validatorSession_message_voteFor | validatorSession_message_precommit | validatorSession_message_empty;

export type validatorSession_Pong = validatorSession_pong;

export type validatorSession_CandidateId = validatorSession_candidateId;

export type validatorSession_BlockUpdate = validatorSession_blockUpdate;

export type validatorSession_Candidate = validatorSession_candidate;

export type validatorSession_Config = validatorSession_config | validatorSession_configNew | validatorSession_configVersioned | validatorSession_configVersionedV2;

export type validatorSession_CatChainOptions = validatorSession_catchainOptions;

export type Hashable = hashable_bool | hashable_int32 | hashable_int64 | hashable_int256 | hashable_bytes | hashable_pair | hashable_vector | hashable_validatorSessionOldRound | hashable_validatorSessionRoundAttempt | hashable_validatorSessionRound | hashable_blockSignature | hashable_sentBlock | hashable_sentBlockEmpty | hashable_vote | hashable_blockCandidate | hashable_blockVoteCandidate | hashable_blockCandidateAttempt | hashable_cntVector | hashable_cntSortedVector | hashable_validatorSession;

export type tonNode_SessionId = tonNode_sessionId;

export type tonNode_BlockSignature = tonNode_blockSignature;

export type tonNode_BlockId = tonNode_blockId;

export type tonNode_BlockIdExt = tonNode_blockIdExt;

export type tonNode_ZeroStateIdExt = tonNode_zeroStateIdExt;

export type tonNode_BlockDescription = tonNode_blockDescriptionEmpty | tonNode_blockDescription;

export type tonNode_BlocksDescription = tonNode_blocksDescription;

export type tonNode_PreparedProof = tonNode_preparedProofEmpty | tonNode_preparedProof | tonNode_preparedProofLink;

export type tonNode_PreparedState = tonNode_preparedState | tonNode_notFoundState;

export type tonNode_Prepared = tonNode_prepared | tonNode_notFound;

export type tonNode_Data = tonNode_data;

export type tonNode_IhrMessage = tonNode_ihrMessage;

export type tonNode_ExternalMessage = tonNode_externalMessage;

export type tonNode_NewShardBlock = tonNode_newShardBlock;

export type tonNode_Broadcast = tonNode_blockBroadcast | tonNode_ihrMessageBroadcast | tonNode_externalMessageBroadcast | tonNode_newShardBlockBroadcast;

export type tonNode_ShardPublicOverlayId = tonNode_shardPublicOverlayId;

export type tonNode_KeyBlocks = tonNode_keyBlocks;

export type ton_BlockId = ton_blockId | ton_blockIdApprove;

export type tonNode_DataList = tonNode_dataList;

export type tonNode_DataFull = tonNode_dataFull | tonNode_dataFullEmpty;

export type tonNode_Capabilities = tonNode_capabilities;

export type tonNode_Success = tonNode_success;

export type tonNode_ArchiveInfo = tonNode_archiveNotFound | tonNode_archiveInfo;

export type db_root_DbDescription = db_root_dbDescription;

export type db_root_Key = db_root_key_cellDb | db_root_key_blockDb | db_root_key_config;

export type db_root_Config = db_root_config;

export type db_celldb_Value = db_celldb_value;

export type db_celldb_key_Value = db_celldb_key_value;

export type db_block_Info = db_block_info | db_block_packedInfo | db_block_archivedInfo;

export type db_blockdb_Value = db_blockdb_value;

export type db_blockdb_Lru = db_blockdb_lru;

export type db_blockdb_Key = db_blockdb_key_lru | db_blockdb_key_value;

export type db_Candidate = db_candidate;

export type db_candidate_Id = db_candidate_id;

export type db_filedb_Key = db_filedb_key_empty | db_filedb_key_blockFile | db_filedb_key_zeroStateFile | db_filedb_key_persistentStateFile | db_filedb_key_proof | db_filedb_key_proofLink | db_filedb_key_signatures | db_filedb_key_candidate | db_filedb_key_blockInfo;

export type db_filedb_Value = db_filedb_value;

export type db_state_DestroyedSessions = db_state_destroyedSessions;

export type db_state_InitBlockId = db_state_initBlockId;

export type db_state_GcBlockId = db_state_gcBlockId;

export type db_state_ShardClient = db_state_shardClient;

export type db_state_AsyncSerializer = db_state_asyncSerializer;

export type db_state_Hardforks = db_state_hardforks;

export type db_state_DbVersion = db_state_dbVersion;

export type db_state_Key = db_state_key_destroyedSessions | db_state_key_initBlockId | db_state_key_gcBlockId | db_state_key_shardClient | db_state_key_asyncSerializer | db_state_key_hardforks | db_state_key_dbVersion;

export type db_lt_Key = db_lt_el_key | db_lt_desc_key | db_lt_shard_key | db_lt_status_key;

export type db_lt_el_Value = db_lt_el_value;

export type db_lt_desc_Value = db_lt_desc_value;

export type db_lt_shard_Value = db_lt_shard_value;

export type db_lt_status_Value = db_lt_status_value;

export type db_files_Key = db_files_index_key | db_files_package_key;

export type db_files_index_Value = db_files_index_value;

export type db_files_package_FirstBlock = db_files_package_firstBlock;

export type db_files_package_Value = db_files_package_value;

export type engine_validator_GroupMember = validator_groupMember;

export type validator_Group = validator_group | validator_groupEx | validator_groupNew;

export type id_config_Local = id_config_local;

export type dht_config_Local = dht_config_local | dht_config_random_local;

export type liteserver_config_Local = liteserver_config_local | liteserver_config_random_local;

export type validator_config_Local = validator_config_local | validator_config_random_local;

export type control_config_Local = control_config_local;

export type config_Local = config_local;

export type dht_config_Global = dht_config_global | dht_config_global_v2;

export type adnl_config_Global = adnl_config_global;

export type catchain_config_Global = catchain_config_global;

export type dummyworkchain0_config_Global = dummyworkchain0_config_global;

export type validator_config_Global = validator_config_global;

export type config_Global = config_global;

export type liteserver_Desc = liteserver_desc;

export type liteclient_config_Global = liteclient_config_global;

export type engine_Adnl = engine_adnl;

export type engine_Addr = engine_addr | engine_addrProxy;

export type engine_Dht = engine_dht;

export type engine_ValidatorTempKey = engine_validatorTempKey;

export type engine_ValidatorAdnlAddress = engine_validatorAdnlAddress;

export type engine_Validator = engine_validator;

export type engine_LiteServer = engine_liteServer;

export type engine_ControlProcess = engine_controlProcess;

export type engine_ControlInterface = engine_controlInterface;

export type engine_Gc = engine_gc;

export type engine_dht_Config = engine_dht_config;

export type engine_validator_FullNodeMaster = engine_validator_fullNodeMaster;

export type engine_validator_FullNodeSlave = engine_validator_fullNodeSlave;

export type engine_validator_Config = engine_validator_config;

export type engine_adnlProxy_Port = engine_adnlProxy_port;

export type engine_adnlProxy_Config = engine_adnlProxy_config;

export type adnl_Pong = adnl_pong;

export type engine_validator_KeyHash = engine_validator_keyHash;

export type engine_validator_Signature = engine_validator_signature;

export type engine_validator_OneStat = engine_validator_oneStat;

export type engine_validator_Stats = engine_validator_stats;

export type engine_validator_ControlQueryError = engine_validator_controlQueryError;

export type engine_validator_Time = engine_validator_time;

export type engine_validator_Success = engine_validator_success;

export type engine_validator_JsonConfig = engine_validator_jsonConfig;

export type engine_validator_ElectionBid = engine_validator_electionBid;

export type engine_validator_ProposalVote = engine_validator_proposalVote;

export type engine_validator_DhtServerStatus = engine_validator_dhtServerStatus;

export type engine_validator_DhtServersStatus = engine_validator_dhtServersStatus;

export type engine_validator_OverlayStatsNode = engine_validator_overlayStatsNode;

export type engine_validator_OverlayStats = engine_validator_overlayStats;

export type engine_validator_OverlaysStats = engine_validator_overlaysStats;

export type engine_validator_OnePerfTimerStat = engine_validator_onePerfTimerStat;

export type engine_validator_PerfTimerStatsByName = engine_validator_perfTimerStatsByName;

export type engine_validator_PerfTimerStats = engine_validator_perfTimerStats;

export type storage_Pong = storage_pong;

export type Ok = storage_ok;

export type storage_State = storage_state;

export type storage_Piece = storage_piece;

export type storage_TorrentInfo = storage_torrentInfo;

export type storage_Update = storage_updateInit | storage_updateHavePieces | storage_updateState;

export type http_Header = http_header;

export type http_PayloadPart = http_payloadPart;

export type http_Response = http_response;

export type http_proxy_Capabilities = http_proxy_capabilities;

export type http_server_DnsEntry = http_server_dnsEntry;

export type http_server_Host = http_server_host;

export type http_server_Config = http_server_config;

export type validatorSession_StatsProducer = validatorSession_statsProducer;

export type validatorSession_StatsRound = validatorSession_statsRound;

export type validatorSession_Stats = validatorSession_stats;

export type storage_db_key_TorrentList = storage_db_key_torrentList;

export type storage_db_key_TorrentShort = storage_db_key_torrent;

export type storage_db_key_TorrentMeta = storage_db_key_torrentMeta;

export type storage_db_key_Priorities = storage_db_key_priorities;

export type storage_db_key_PiecesInDb = storage_db_key_piecesInDb;

export type storage_db_key_PieceInDb = storage_db_key_pieceInDb;

export type storage_db_TorrentList = storage_db_torrentList;

export type storage_db_TorrentShort = storage_db_torrent;

export type storage_db_Priorities = storage_db_priorities;

export type storage_db_PiecesInDb = storage_db_piecesInDb;

export type storage_PriorityAction = storage_priorityAction_all | storage_priorityAction_idx | storage_priorityAction_name;

export type storage_daemon_provider_Config = storage_daemon_config;

export type storage_daemon_provider_Params = storage_daemon_provider_params;

export type storage_provider_db_key_State = storage_provider_db_key_state;

export type storage_provider_db_key_ContractList = storage_provider_db_key_contractList;

export type storage_provider_db_key_StorageContract = storage_provider_db_key_storageContract;

export type storage_provider_db_key_MicrochunkTree = storage_provider_db_key_microchunkTree;

export type storage_provider_db_key_ProviderConfig = storage_provider_db_key_providerConfig;

export type storage_provider_db_State = storage_provider_db_state;

export type storage_db_ContractAddress = storage_provider_db_contractAddress;

export type storage_db_ContractList = storage_provider_db_contractList;

export type storage_provider_db_StorageContract = storage_provider_db_storageContract;

export type storage_provider_db_MicrochunkTree = storage_provider_db_microchunkTree;

export type storage_daemon_QueryError = storage_daemon_queryError;

export type storage_daemon_Success = storage_daemon_success;

export type storage_daemon_Torrent = storage_daemon_torrent;

export type storage_daemon_FileInfo = storage_daemon_fileInfo;

export type storage_daemon_TorrentFull = storage_daemon_torrentFull;

export type storage_daemon_TorrentList = storage_daemon_torrentList;

export type storage_daemon_TorrentMeta = storage_daemon_torrentMeta;

export type storage_daemon_NewContractParams = storage_daemon_newContractParams | storage_daemon_newContractParamsAuto;

export type storage_daemon_NewContractMessage = storage_daemon_newContractMessage;

export type storage_daemon_Peer = storage_daemon_peer;

export type storage_daemon_PeerList = storage_daemon_peerList;

export type storage_daemon_SetPriorityStatus = storage_daemon_prioritySet | storage_daemon_priorityPending;

export type storage_daemon_KeyHash = storage_daemon_keyHash;

export type storage_daemon_ProviderConfig = storage_daemon_providerConfig;

export type storage_daemon_ContractInfo = storage_daemon_contractInfo;

export type storage_daemon_ProviderInfo = storage_daemon_providerInfo;

export type storage_daemon_ProviderAddress = storage_daemon_providerAddress;

//
// Functions
//

export interface tcp_ping {
    readonly kind: 'tcp.ping';
    readonly randomId: TLLong;
}

export interface getTestObject {
    readonly kind: 'getTestObject';
}

export interface dht_ping {
    readonly kind: 'dht.ping';
    readonly randomId: TLLong;
}

export interface dht_store {
    readonly kind: 'dht.store';
    readonly value: dht_value;
}

export interface dht_findNode {
    readonly kind: 'dht.findNode';
    readonly key: TLInt256;
    readonly k: TLInt;
}

export interface dht_findValue {
    readonly kind: 'dht.findValue';
    readonly key: TLInt256;
    readonly k: TLInt;
}

export interface dht_getSignedAddressList {
    readonly kind: 'dht.getSignedAddressList';
}

export interface dht_registerReverseConnection {
    readonly kind: 'dht.registerReverseConnection';
    readonly node: PublicKey;
    readonly ttl: TLInt;
    readonly signature: TLBytes;
}

export interface dht_requestReversePing {
    readonly kind: 'dht.requestReversePing';
    readonly target: adnl_Node;
    readonly signature: TLBytes;
    readonly client: TLInt256;
    readonly k: TLInt;
}

export interface dht_query {
    readonly kind: 'dht.query';
    readonly node: dht_node;
}

export interface overlay_getRandomPeers {
    readonly kind: 'overlay.getRandomPeers';
    readonly peers: overlay_nodes;
}

export interface overlay_query {
    readonly kind: 'overlay.query';
    readonly overlay: TLInt256;
}

export interface overlay_getBroadcast {
    readonly kind: 'overlay.getBroadcast';
    readonly hash: TLInt256;
}

export interface overlay_getBroadcastList {
    readonly kind: 'overlay.getBroadcastList';
    readonly list: overlay_broadcastList;
}

export interface catchain_getBlock {
    readonly kind: 'catchain.getBlock';
    readonly block: TLInt256;
}

export interface catchain_getBlocks {
    readonly kind: 'catchain.getBlocks';
    readonly blocks: TLInt256[];
}

export interface catchain_getDifference {
    readonly kind: 'catchain.getDifference';
    readonly rt: TLInt[];
}

export interface catchain_getBlockHistory {
    readonly kind: 'catchain.getBlockHistory';
    readonly block: TLInt256;
    readonly height: TLLong;
    readonly stopIf: TLInt256[];
}

export interface validatorSession_ping {
    readonly kind: 'validatorSession.ping';
    readonly hash: TLLong;
}

export interface validatorSession_downloadCandidate {
    readonly kind: 'validatorSession.downloadCandidate';
    readonly round: TLInt;
    readonly id: validatorSession_candidateId;
}

export interface tonNode_getNextBlockDescription {
    readonly kind: 'tonNode.getNextBlockDescription';
    readonly prevBlock: tonNode_blockIdExt;
}

export interface tonNode_getNextBlocksDescription {
    readonly kind: 'tonNode.getNextBlocksDescription';
    readonly prevBlock: tonNode_blockIdExt;
    readonly limit: TLInt;
}

export interface tonNode_getPrevBlocksDescription {
    readonly kind: 'tonNode.getPrevBlocksDescription';
    readonly nextBlock: tonNode_blockIdExt;
    readonly limit: TLInt;
    readonly cutoffSeqno: TLInt;
}

export interface tonNode_prepareBlockProof {
    readonly kind: 'tonNode.prepareBlockProof';
    readonly block: tonNode_blockIdExt;
    readonly allowPartial: TLBool;
}

export interface tonNode_prepareKeyBlockProof {
    readonly kind: 'tonNode.prepareKeyBlockProof';
    readonly block: tonNode_blockIdExt;
    readonly allowPartial: TLBool;
}

export interface tonNode_prepareBlockProofs {
    readonly kind: 'tonNode.prepareBlockProofs';
    readonly blocks: tonNode_blockIdExt[];
    readonly allowPartial: TLBool;
}

export interface tonNode_prepareKeyBlockProofs {
    readonly kind: 'tonNode.prepareKeyBlockProofs';
    readonly blocks: tonNode_blockIdExt[];
    readonly allowPartial: TLBool;
}

export interface tonNode_prepareBlock {
    readonly kind: 'tonNode.prepareBlock';
    readonly block: tonNode_blockIdExt;
}

export interface tonNode_prepareBlocks {
    readonly kind: 'tonNode.prepareBlocks';
    readonly blocks: tonNode_blockIdExt[];
}

export interface tonNode_preparePersistentState {
    readonly kind: 'tonNode.preparePersistentState';
    readonly block: tonNode_blockIdExt;
    readonly masterchainBlock: tonNode_blockIdExt;
}

export interface tonNode_prepareZeroState {
    readonly kind: 'tonNode.prepareZeroState';
    readonly block: tonNode_blockIdExt;
}

export interface tonNode_getNextKeyBlockIds {
    readonly kind: 'tonNode.getNextKeyBlockIds';
    readonly block: tonNode_blockIdExt;
    readonly maxSize: TLInt;
}

export interface tonNode_downloadNextBlockFull {
    readonly kind: 'tonNode.downloadNextBlockFull';
    readonly prevBlock: tonNode_blockIdExt;
}

export interface tonNode_downloadBlockFull {
    readonly kind: 'tonNode.downloadBlockFull';
    readonly block: tonNode_blockIdExt;
}

export interface tonNode_downloadBlock {
    readonly kind: 'tonNode.downloadBlock';
    readonly block: tonNode_blockIdExt;
}

export interface tonNode_downloadBlocks {
    readonly kind: 'tonNode.downloadBlocks';
    readonly blocks: tonNode_blockIdExt[];
}

export interface tonNode_downloadPersistentState {
    readonly kind: 'tonNode.downloadPersistentState';
    readonly block: tonNode_blockIdExt;
    readonly masterchainBlock: tonNode_blockIdExt;
}

export interface tonNode_downloadPersistentStateSlice {
    readonly kind: 'tonNode.downloadPersistentStateSlice';
    readonly block: tonNode_blockIdExt;
    readonly masterchainBlock: tonNode_blockIdExt;
    readonly offset: TLLong;
    readonly maxSize: TLLong;
}

export interface tonNode_downloadZeroState {
    readonly kind: 'tonNode.downloadZeroState';
    readonly block: tonNode_blockIdExt;
}

export interface tonNode_downloadBlockProof {
    readonly kind: 'tonNode.downloadBlockProof';
    readonly block: tonNode_blockIdExt;
}

export interface tonNode_downloadKeyBlockProof {
    readonly kind: 'tonNode.downloadKeyBlockProof';
    readonly block: tonNode_blockIdExt;
}

export interface tonNode_downloadBlockProofs {
    readonly kind: 'tonNode.downloadBlockProofs';
    readonly blocks: tonNode_blockIdExt[];
}

export interface tonNode_downloadKeyBlockProofs {
    readonly kind: 'tonNode.downloadKeyBlockProofs';
    readonly blocks: tonNode_blockIdExt[];
}

export interface tonNode_downloadBlockProofLink {
    readonly kind: 'tonNode.downloadBlockProofLink';
    readonly block: tonNode_blockIdExt;
}

export interface tonNode_downloadKeyBlockProofLink {
    readonly kind: 'tonNode.downloadKeyBlockProofLink';
    readonly block: tonNode_blockIdExt;
}

export interface tonNode_downloadBlockProofLinks {
    readonly kind: 'tonNode.downloadBlockProofLinks';
    readonly blocks: tonNode_blockIdExt[];
}

export interface tonNode_downloadKeyBlockProofLinks {
    readonly kind: 'tonNode.downloadKeyBlockProofLinks';
    readonly blocks: tonNode_blockIdExt[];
}

export interface tonNode_getArchiveInfo {
    readonly kind: 'tonNode.getArchiveInfo';
    readonly masterchainSeqno: TLInt;
}

export interface tonNode_getArchiveSlice {
    readonly kind: 'tonNode.getArchiveSlice';
    readonly archiveId: TLLong;
    readonly offset: TLLong;
    readonly maxSize: TLInt;
}

export interface tonNode_getCapabilities {
    readonly kind: 'tonNode.getCapabilities';
}

export interface tonNode_slave_sendExtMessage {
    readonly kind: 'tonNode.slave.sendExtMessage';
    readonly message: tonNode_externalMessage;
}

export interface tonNode_query {
    readonly kind: 'tonNode.query';
}

export interface adnl_ping {
    readonly kind: 'adnl.ping';
    readonly value: TLLong;
}

export interface engine_validator_getTime {
    readonly kind: 'engine.validator.getTime';
}

export interface engine_validator_importPrivateKey {
    readonly kind: 'engine.validator.importPrivateKey';
    readonly key: PrivateKey;
}

export interface engine_validator_exportPrivateKey {
    readonly kind: 'engine.validator.exportPrivateKey';
    readonly keyHash: TLInt256;
}

export interface engine_validator_exportPublicKey {
    readonly kind: 'engine.validator.exportPublicKey';
    readonly keyHash: TLInt256;
}

export interface engine_validator_generateKeyPair {
    readonly kind: 'engine.validator.generateKeyPair';
}

export interface engine_validator_addAdnlId {
    readonly kind: 'engine.validator.addAdnlId';
    readonly keyHash: TLInt256;
    readonly category: TLInt;
}

export interface engine_validator_addDhtId {
    readonly kind: 'engine.validator.addDhtId';
    readonly keyHash: TLInt256;
}

export interface engine_validator_addValidatorPermanentKey {
    readonly kind: 'engine.validator.addValidatorPermanentKey';
    readonly keyHash: TLInt256;
    readonly electionDate: TLInt;
    readonly ttl: TLInt;
}

export interface engine_validator_addValidatorTempKey {
    readonly kind: 'engine.validator.addValidatorTempKey';
    readonly permanentKeyHash: TLInt256;
    readonly keyHash: TLInt256;
    readonly ttl: TLInt;
}

export interface engine_validator_addValidatorAdnlAddress {
    readonly kind: 'engine.validator.addValidatorAdnlAddress';
    readonly permanentKeyHash: TLInt256;
    readonly keyHash: TLInt256;
    readonly ttl: TLInt;
}

export interface engine_validator_changeFullNodeAdnlAddress {
    readonly kind: 'engine.validator.changeFullNodeAdnlAddress';
    readonly adnlId: TLInt256;
}

export interface engine_validator_addLiteserver {
    readonly kind: 'engine.validator.addLiteserver';
    readonly keyHash: TLInt256;
    readonly port: TLInt;
}

export interface engine_validator_addControlInterface {
    readonly kind: 'engine.validator.addControlInterface';
    readonly keyHash: TLInt256;
    readonly port: TLInt;
}

export interface engine_validator_addControlProcess {
    readonly kind: 'engine.validator.addControlProcess';
    readonly keyHash: TLInt256;
    readonly port: TLInt;
    readonly peerKey: TLInt256;
    readonly permissions: TLInt;
}

export interface engine_validator_delAdnlId {
    readonly kind: 'engine.validator.delAdnlId';
    readonly keyHash: TLInt256;
}

export interface engine_validator_delDhtId {
    readonly kind: 'engine.validator.delDhtId';
    readonly keyHash: TLInt256;
}

export interface engine_validator_delValidatorPermanentKey {
    readonly kind: 'engine.validator.delValidatorPermanentKey';
    readonly keyHash: TLInt256;
}

export interface engine_validator_delValidatorTempKey {
    readonly kind: 'engine.validator.delValidatorTempKey';
    readonly permanentKeyHash: TLInt256;
    readonly keyHash: TLInt256;
}

export interface engine_validator_delValidatorAdnlAddress {
    readonly kind: 'engine.validator.delValidatorAdnlAddress';
    readonly permanentKeyHash: TLInt256;
    readonly keyHash: TLInt256;
}

export interface engine_validator_addListeningPort {
    readonly kind: 'engine.validator.addListeningPort';
    readonly ip: TLInt;
    readonly port: TLInt;
    readonly categories: TLInt[];
    readonly priorityCategories: TLInt[];
}

export interface engine_validator_addProxy {
    readonly kind: 'engine.validator.addProxy';
    readonly inIp: TLInt;
    readonly inPort: TLInt;
    readonly outIp: TLInt;
    readonly outPort: TLInt;
    readonly proxy: adnl_Proxy;
    readonly categories: TLInt[];
    readonly priorityCategories: TLInt[];
}

export interface engine_validator_delListeningPort {
    readonly kind: 'engine.validator.delListeningPort';
    readonly ip: TLInt;
    readonly port: TLInt;
    readonly categories: TLInt[];
    readonly priorityCategories: TLInt[];
}

export interface engine_validator_delProxy {
    readonly kind: 'engine.validator.delProxy';
    readonly outIp: TLInt;
    readonly outPort: TLInt;
    readonly categories: TLInt[];
    readonly priorityCategories: TLInt[];
}

export interface engine_validator_sign {
    readonly kind: 'engine.validator.sign';
    readonly keyHash: TLInt256;
    readonly data: TLBytes;
}

export interface engine_validator_getStats {
    readonly kind: 'engine.validator.getStats';
}

export interface engine_validator_getConfig {
    readonly kind: 'engine.validator.getConfig';
}

export interface engine_validator_setVerbosity {
    readonly kind: 'engine.validator.setVerbosity';
    readonly verbosity: TLInt;
}

export interface engine_validator_createElectionBid {
    readonly kind: 'engine.validator.createElectionBid';
    readonly electionDate: TLInt;
    readonly electionAddr: TLString;
    readonly wallet: TLString;
}

export interface engine_validator_createProposalVote {
    readonly kind: 'engine.validator.createProposalVote';
    readonly vote: TLBytes;
}

export interface engine_validator_createComplaintVote {
    readonly kind: 'engine.validator.createComplaintVote';
    readonly electionId: TLInt;
    readonly vote: TLBytes;
}

export interface engine_validator_checkDhtServers {
    readonly kind: 'engine.validator.checkDhtServers';
    readonly id: TLInt256;
}

export interface engine_validator_getOverlaysStats {
    readonly kind: 'engine.validator.getOverlaysStats';
}

export interface engine_validator_controlQuery {
    readonly kind: 'engine.validator.controlQuery';
    readonly data: TLBytes;
}

export interface engine_validator_importCertificate {
    readonly kind: 'engine.validator.importCertificate';
    readonly overlayId: TLInt256;
    readonly localId: adnl_id_short;
    readonly signedKey: engine_validator_KeyHash;
    readonly cert: overlay_Certificate;
}

export interface engine_validator_signShardOverlayCertificate {
    readonly kind: 'engine.validator.signShardOverlayCertificate';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly signedKey: engine_validator_KeyHash;
    readonly expireAt: TLInt;
    readonly maxSize: TLInt;
}

export interface engine_validator_importShardOverlayCertificate {
    readonly kind: 'engine.validator.importShardOverlayCertificate';
    readonly workchain: TLInt;
    readonly shard: TLLong;
    readonly signedKey: engine_validator_KeyHash;
    readonly cert: overlay_Certificate;
}

export interface engine_validator_getPerfTimerStats {
    readonly kind: 'engine.validator.getPerfTimerStats';
    readonly name: TLString;
}

export interface storage_ping {
    readonly kind: 'storage.ping';
    readonly sessionId: TLLong;
}

export interface storage_addUpdate {
    readonly kind: 'storage.addUpdate';
    readonly sessionId: TLLong;
    readonly seqno: TLInt;
    readonly update: storage_Update;
}

export interface storage_getTorrentInfo {
    readonly kind: 'storage.getTorrentInfo';
}

export interface storage_getPiece {
    readonly kind: 'storage.getPiece';
    readonly pieceId: TLInt;
}

export interface http_request {
    readonly kind: 'http.request';
    readonly id: TLInt256;
    readonly method: TLString;
    readonly url: TLString;
    readonly httpVersion: TLString;
    readonly headers: http_header[];
}

export interface http_getNextPayloadPart {
    readonly kind: 'http.getNextPayloadPart';
    readonly id: TLInt256;
    readonly seqno: TLInt;
    readonly maxChunkSize: TLInt;
}

export interface http_proxy_getCapabilities {
    readonly kind: 'http.proxy.getCapabilities';
    readonly capabilities: TLLong;
}

export interface storage_daemon_setVerbosity {
    readonly kind: 'storage.daemon.setVerbosity';
    readonly verbosity: TLInt;
}

export interface storage_daemon_createTorrent {
    readonly kind: 'storage.daemon.createTorrent';
    readonly path: TLString;
    readonly description: TLString;
    readonly allowUpload: TLBool;
    readonly copyInside: TLBool;
}

export interface storage_daemon_addByHash {
    readonly kind: 'storage.daemon.addByHash';
    readonly hash: TLInt256;
    readonly rootDir: TLString;
    readonly startDownload: TLBool;
    readonly allowUpload: TLBool;
    readonly priorities: storage_PriorityAction[];
}

export interface storage_daemon_addByMeta {
    readonly kind: 'storage.daemon.addByMeta';
    readonly meta: TLBytes;
    readonly rootDir: TLString;
    readonly startDownload: TLBool;
    readonly allowUpload: TLBool;
    readonly priorities: storage_PriorityAction[];
}

export interface storage_daemon_setActiveDownload {
    readonly kind: 'storage.daemon.setActiveDownload';
    readonly hash: TLInt256;
    readonly active: TLBool;
}

export interface storage_daemon_setActiveUpload {
    readonly kind: 'storage.daemon.setActiveUpload';
    readonly hash: TLInt256;
    readonly active: TLBool;
}

export interface storage_daemon_getTorrents {
    readonly kind: 'storage.daemon.getTorrents';
}

export interface storage_daemon_getTorrentFull {
    readonly kind: 'storage.daemon.getTorrentFull';
    readonly hash: TLInt256;
}

export interface storage_daemon_getTorrentMeta {
    readonly kind: 'storage.daemon.getTorrentMeta';
    readonly hash: TLInt256;
}

export interface storage_daemon_getNewContractMessage {
    readonly kind: 'storage.daemon.getNewContractMessage';
    readonly hash: TLInt256;
    readonly queryId: TLLong;
    readonly params: storage_daemon_NewContractParams;
}

export interface storage_daemon_getTorrentPeers {
    readonly kind: 'storage.daemon.getTorrentPeers';
    readonly hash: TLInt256;
}

export interface storage_daemon_setFilePriorityAll {
    readonly kind: 'storage.daemon.setFilePriorityAll';
    readonly hash: TLInt256;
    readonly priority: TLInt;
}

export interface storage_daemon_setFilePriorityByIdx {
    readonly kind: 'storage.daemon.setFilePriorityByIdx';
    readonly hash: TLInt256;
    readonly idx: TLLong;
    readonly priority: TLInt;
}

export interface storage_daemon_setFilePriorityByName {
    readonly kind: 'storage.daemon.setFilePriorityByName';
    readonly hash: TLInt256;
    readonly name: TLString;
    readonly priority: TLInt;
}

export interface storage_daemon_removeTorrent {
    readonly kind: 'storage.daemon.removeTorrent';
    readonly hash: TLInt256;
    readonly removeFiles: TLBool;
}

export interface storage_daemon_loadFrom {
    readonly kind: 'storage.daemon.loadFrom';
    readonly hash: TLInt256;
    readonly meta: TLBytes;
    readonly path: TLString;
}

export interface storage_daemon_importPrivateKey {
    readonly kind: 'storage.daemon.importPrivateKey';
    readonly key: PrivateKey;
}

export interface storage_daemon_initProvider {
    readonly kind: 'storage.daemon.initProvider';
    readonly accountAddress: TLString;
}

export interface storage_daemon_deployProvider {
    readonly kind: 'storage.daemon.deployProvider';
}

export interface storage_daemon_getProviderParams {
    readonly kind: 'storage.daemon.getProviderParams';
    readonly address: TLString;
}

export interface storage_daemon_setProviderParams {
    readonly kind: 'storage.daemon.setProviderParams';
    readonly params: storage_daemon_provider_params;
}

export interface storage_daemon_getProviderInfo {
    readonly kind: 'storage.daemon.getProviderInfo';
    readonly withBalances: TLBool;
    readonly withContracts: TLBool;
}

export interface storage_daemon_setProviderConfig {
    readonly kind: 'storage.daemon.setProviderConfig';
    readonly config: storage_daemon_providerConfig;
}

export interface storage_daemon_withdraw {
    readonly kind: 'storage.daemon.withdraw';
    readonly contract: TLString;
}

export interface storage_daemon_sendCoins {
    readonly kind: 'storage.daemon.sendCoins';
    readonly address: TLString;
    readonly amount: TLString;
    readonly message: TLString;
}

export interface storage_daemon_closeStorageContract {
    readonly kind: 'storage.daemon.closeStorageContract';
    readonly address: TLString;
}

export interface storage_daemon_removeStorageProvider {
    readonly kind: 'storage.daemon.removeStorageProvider';
}


export const Functions = {
    tcp_ping: {
        encodeRequest: (src: tcp_ping, encoder: TLWriteBuffer) => { encoder.writeInt32(1292381082); Codecs.tcp_ping.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tcp_Pong.decode(decoder)
    } as TLFunction<tcp_ping, tcp_Pong>,

    getTestObject: {
        encodeRequest: (src: getTestObject, encoder: TLWriteBuffer) => { encoder.writeInt32(197109379); Codecs.getTestObject.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.TestObject.decode(decoder)
    } as TLFunction<getTestObject, TestObject>,

    dht_ping: {
        encodeRequest: (src: dht_ping, encoder: TLWriteBuffer) => { encoder.writeInt32(-873775336); Codecs.dht_ping.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.dht_Pong.decode(decoder)
    } as TLFunction<dht_ping, dht_Pong>,

    dht_store: {
        encodeRequest: (src: dht_store, encoder: TLWriteBuffer) => { encoder.writeInt32(882065938); Codecs.dht_store.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.dht_Stored.decode(decoder)
    } as TLFunction<dht_store, dht_Stored>,

    dht_findNode: {
        encodeRequest: (src: dht_findNode, encoder: TLWriteBuffer) => { encoder.writeInt32(1826803307); Codecs.dht_findNode.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.dht_Nodes.decode(decoder)
    } as TLFunction<dht_findNode, dht_Nodes>,

    dht_findValue: {
        encodeRequest: (src: dht_findValue, encoder: TLWriteBuffer) => { encoder.writeInt32(-1370791919); Codecs.dht_findValue.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.dht_ValueResult.decode(decoder)
    } as TLFunction<dht_findValue, dht_ValueResult>,

    dht_getSignedAddressList: {
        encodeRequest: (src: dht_getSignedAddressList, encoder: TLWriteBuffer) => { encoder.writeInt32(-1451669267); Codecs.dht_getSignedAddressList.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.dht_Node.decode(decoder)
    } as TLFunction<dht_getSignedAddressList, dht_Node>,

    dht_registerReverseConnection: {
        encodeRequest: (src: dht_registerReverseConnection, encoder: TLWriteBuffer) => { encoder.writeInt32(573357153); Codecs.dht_registerReverseConnection.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.dht_Stored.decode(decoder)
    } as TLFunction<dht_registerReverseConnection, dht_Stored>,

    dht_requestReversePing: {
        encodeRequest: (src: dht_requestReversePing, encoder: TLWriteBuffer) => { encoder.writeInt32(194290698); Codecs.dht_requestReversePing.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.dht_ReversePingResult.decode(decoder)
    } as TLFunction<dht_requestReversePing, dht_ReversePingResult>,

    dht_query: {
        encodeRequest: (src: dht_query, encoder: TLWriteBuffer) => { encoder.writeInt32(2102593385); Codecs.dht_query.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.True.decode(decoder)
    } as TLFunction<dht_query, True>,

    overlay_getRandomPeers: {
        encodeRequest: (src: overlay_getRandomPeers, encoder: TLWriteBuffer) => { encoder.writeInt32(1223582891); Codecs.overlay_getRandomPeers.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.overlay_Nodes.decode(decoder)
    } as TLFunction<overlay_getRandomPeers, overlay_Nodes>,

    overlay_query: {
        encodeRequest: (src: overlay_query, encoder: TLWriteBuffer) => { encoder.writeInt32(-855800765); Codecs.overlay_query.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.True.decode(decoder)
    } as TLFunction<overlay_query, True>,

    overlay_getBroadcast: {
        encodeRequest: (src: overlay_getBroadcast, encoder: TLWriteBuffer) => { encoder.writeInt32(758510240); Codecs.overlay_getBroadcast.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.overlay_Broadcast.decode(decoder)
    } as TLFunction<overlay_getBroadcast, overlay_Broadcast>,

    overlay_getBroadcastList: {
        encodeRequest: (src: overlay_getBroadcastList, encoder: TLWriteBuffer) => { encoder.writeInt32(1109141562); Codecs.overlay_getBroadcastList.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.overlay_BroadcastList.decode(decoder)
    } as TLFunction<overlay_getBroadcastList, overlay_BroadcastList>,

    catchain_getBlock: {
        encodeRequest: (src: catchain_getBlock, encoder: TLWriteBuffer) => { encoder.writeInt32(155049336); Codecs.catchain_getBlock.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.catchain_BlockResult.decode(decoder)
    } as TLFunction<catchain_getBlock, catchain_BlockResult>,

    catchain_getBlocks: {
        encodeRequest: (src: catchain_getBlocks, encoder: TLWriteBuffer) => { encoder.writeInt32(53062594); Codecs.catchain_getBlocks.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.catchain_Sent.decode(decoder)
    } as TLFunction<catchain_getBlocks, catchain_Sent>,

    catchain_getDifference: {
        encodeRequest: (src: catchain_getDifference, encoder: TLWriteBuffer) => { encoder.writeInt32(-798175528); Codecs.catchain_getDifference.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.catchain_Difference.decode(decoder)
    } as TLFunction<catchain_getDifference, catchain_Difference>,

    catchain_getBlockHistory: {
        encodeRequest: (src: catchain_getBlockHistory, encoder: TLWriteBuffer) => { encoder.writeInt32(-1470730762); Codecs.catchain_getBlockHistory.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.catchain_Sent.decode(decoder)
    } as TLFunction<catchain_getBlockHistory, catchain_Sent>,

    validatorSession_ping: {
        encodeRequest: (src: validatorSession_ping, encoder: TLWriteBuffer) => { encoder.writeInt32(1745111469); Codecs.validatorSession_ping.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.validatorSession_Pong.decode(decoder)
    } as TLFunction<validatorSession_ping, validatorSession_Pong>,

    validatorSession_downloadCandidate: {
        encodeRequest: (src: validatorSession_downloadCandidate, encoder: TLWriteBuffer) => { encoder.writeInt32(-520274443); Codecs.validatorSession_downloadCandidate.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.validatorSession_Candidate.decode(decoder)
    } as TLFunction<validatorSession_downloadCandidate, validatorSession_Candidate>,

    tonNode_getNextBlockDescription: {
        encodeRequest: (src: tonNode_getNextBlockDescription, encoder: TLWriteBuffer) => { encoder.writeInt32(341160179); Codecs.tonNode_getNextBlockDescription.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_BlockDescription.decode(decoder)
    } as TLFunction<tonNode_getNextBlockDescription, tonNode_BlockDescription>,

    tonNode_getNextBlocksDescription: {
        encodeRequest: (src: tonNode_getNextBlocksDescription, encoder: TLWriteBuffer) => { encoder.writeInt32(1059590852); Codecs.tonNode_getNextBlocksDescription.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_BlocksDescription.decode(decoder)
    } as TLFunction<tonNode_getNextBlocksDescription, tonNode_BlocksDescription>,

    tonNode_getPrevBlocksDescription: {
        encodeRequest: (src: tonNode_getPrevBlocksDescription, encoder: TLWriteBuffer) => { encoder.writeInt32(1550675145); Codecs.tonNode_getPrevBlocksDescription.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_BlocksDescription.decode(decoder)
    } as TLFunction<tonNode_getPrevBlocksDescription, tonNode_BlocksDescription>,

    tonNode_prepareBlockProof: {
        encodeRequest: (src: tonNode_prepareBlockProof, encoder: TLWriteBuffer) => { encoder.writeInt32(-2024000760); Codecs.tonNode_prepareBlockProof.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_PreparedProof.decode(decoder)
    } as TLFunction<tonNode_prepareBlockProof, tonNode_PreparedProof>,

    tonNode_prepareKeyBlockProof: {
        encodeRequest: (src: tonNode_prepareKeyBlockProof, encoder: TLWriteBuffer) => { encoder.writeInt32(2000047160); Codecs.tonNode_prepareKeyBlockProof.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_PreparedProof.decode(decoder)
    } as TLFunction<tonNode_prepareKeyBlockProof, tonNode_PreparedProof>,

    tonNode_prepareBlockProofs: {
        encodeRequest: (src: tonNode_prepareBlockProofs, encoder: TLWriteBuffer) => { encoder.writeInt32(-310791496); Codecs.tonNode_prepareBlockProofs.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_PreparedProof.decode(decoder)
    } as TLFunction<tonNode_prepareBlockProofs, tonNode_PreparedProof>,

    tonNode_prepareKeyBlockProofs: {
        encodeRequest: (src: tonNode_prepareKeyBlockProofs, encoder: TLWriteBuffer) => { encoder.writeInt32(-1939014684); Codecs.tonNode_prepareKeyBlockProofs.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_PreparedProof.decode(decoder)
    } as TLFunction<tonNode_prepareKeyBlockProofs, tonNode_PreparedProof>,

    tonNode_prepareBlock: {
        encodeRequest: (src: tonNode_prepareBlock, encoder: TLWriteBuffer) => { encoder.writeInt32(1973649230); Codecs.tonNode_prepareBlock.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Prepared.decode(decoder)
    } as TLFunction<tonNode_prepareBlock, tonNode_Prepared>,

    tonNode_prepareBlocks: {
        encodeRequest: (src: tonNode_prepareBlocks, encoder: TLWriteBuffer) => { encoder.writeInt32(1795140604); Codecs.tonNode_prepareBlocks.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Prepared.decode(decoder)
    } as TLFunction<tonNode_prepareBlocks, tonNode_Prepared>,

    tonNode_preparePersistentState: {
        encodeRequest: (src: tonNode_preparePersistentState, encoder: TLWriteBuffer) => { encoder.writeInt32(-18209122); Codecs.tonNode_preparePersistentState.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_PreparedState.decode(decoder)
    } as TLFunction<tonNode_preparePersistentState, tonNode_PreparedState>,

    tonNode_prepareZeroState: {
        encodeRequest: (src: tonNode_prepareZeroState, encoder: TLWriteBuffer) => { encoder.writeInt32(1104021541); Codecs.tonNode_prepareZeroState.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_PreparedState.decode(decoder)
    } as TLFunction<tonNode_prepareZeroState, tonNode_PreparedState>,

    tonNode_getNextKeyBlockIds: {
        encodeRequest: (src: tonNode_getNextKeyBlockIds, encoder: TLWriteBuffer) => { encoder.writeInt32(-219689029); Codecs.tonNode_getNextKeyBlockIds.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_KeyBlocks.decode(decoder)
    } as TLFunction<tonNode_getNextKeyBlockIds, tonNode_KeyBlocks>,

    tonNode_downloadNextBlockFull: {
        encodeRequest: (src: tonNode_downloadNextBlockFull, encoder: TLWriteBuffer) => { encoder.writeInt32(1855993674); Codecs.tonNode_downloadNextBlockFull.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_DataFull.decode(decoder)
    } as TLFunction<tonNode_downloadNextBlockFull, tonNode_DataFull>,

    tonNode_downloadBlockFull: {
        encodeRequest: (src: tonNode_downloadBlockFull, encoder: TLWriteBuffer) => { encoder.writeInt32(1780991133); Codecs.tonNode_downloadBlockFull.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_DataFull.decode(decoder)
    } as TLFunction<tonNode_downloadBlockFull, tonNode_DataFull>,

    tonNode_downloadBlock: {
        encodeRequest: (src: tonNode_downloadBlock, encoder: TLWriteBuffer) => { encoder.writeInt32(-495814205); Codecs.tonNode_downloadBlock.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Data.decode(decoder)
    } as TLFunction<tonNode_downloadBlock, tonNode_Data>,

    tonNode_downloadBlocks: {
        encodeRequest: (src: tonNode_downloadBlocks, encoder: TLWriteBuffer) => { encoder.writeInt32(1985594749); Codecs.tonNode_downloadBlocks.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_DataList.decode(decoder)
    } as TLFunction<tonNode_downloadBlocks, tonNode_DataList>,

    tonNode_downloadPersistentState: {
        encodeRequest: (src: tonNode_downloadPersistentState, encoder: TLWriteBuffer) => { encoder.writeInt32(2140791736); Codecs.tonNode_downloadPersistentState.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Data.decode(decoder)
    } as TLFunction<tonNode_downloadPersistentState, tonNode_Data>,

    tonNode_downloadPersistentStateSlice: {
        encodeRequest: (src: tonNode_downloadPersistentStateSlice, encoder: TLWriteBuffer) => { encoder.writeInt32(-169220381); Codecs.tonNode_downloadPersistentStateSlice.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Data.decode(decoder)
    } as TLFunction<tonNode_downloadPersistentStateSlice, tonNode_Data>,

    tonNode_downloadZeroState: {
        encodeRequest: (src: tonNode_downloadZeroState, encoder: TLWriteBuffer) => { encoder.writeInt32(-1379131814); Codecs.tonNode_downloadZeroState.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Data.decode(decoder)
    } as TLFunction<tonNode_downloadZeroState, tonNode_Data>,

    tonNode_downloadBlockProof: {
        encodeRequest: (src: tonNode_downloadBlockProof, encoder: TLWriteBuffer) => { encoder.writeInt32(1272334218); Codecs.tonNode_downloadBlockProof.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Data.decode(decoder)
    } as TLFunction<tonNode_downloadBlockProof, tonNode_Data>,

    tonNode_downloadKeyBlockProof: {
        encodeRequest: (src: tonNode_downloadKeyBlockProof, encoder: TLWriteBuffer) => { encoder.writeInt32(-333232070); Codecs.tonNode_downloadKeyBlockProof.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Data.decode(decoder)
    } as TLFunction<tonNode_downloadKeyBlockProof, tonNode_Data>,

    tonNode_downloadBlockProofs: {
        encodeRequest: (src: tonNode_downloadBlockProofs, encoder: TLWriteBuffer) => { encoder.writeInt32(-1515170827); Codecs.tonNode_downloadBlockProofs.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_DataList.decode(decoder)
    } as TLFunction<tonNode_downloadBlockProofs, tonNode_DataList>,

    tonNode_downloadKeyBlockProofs: {
        encodeRequest: (src: tonNode_downloadKeyBlockProofs, encoder: TLWriteBuffer) => { encoder.writeInt32(-1020797382); Codecs.tonNode_downloadKeyBlockProofs.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_DataList.decode(decoder)
    } as TLFunction<tonNode_downloadKeyBlockProofs, tonNode_DataList>,

    tonNode_downloadBlockProofLink: {
        encodeRequest: (src: tonNode_downloadBlockProofLink, encoder: TLWriteBuffer) => { encoder.writeInt32(632488134); Codecs.tonNode_downloadBlockProofLink.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Data.decode(decoder)
    } as TLFunction<tonNode_downloadBlockProofLink, tonNode_Data>,

    tonNode_downloadKeyBlockProofLink: {
        encodeRequest: (src: tonNode_downloadKeyBlockProofLink, encoder: TLWriteBuffer) => { encoder.writeInt32(316943058); Codecs.tonNode_downloadKeyBlockProofLink.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Data.decode(decoder)
    } as TLFunction<tonNode_downloadKeyBlockProofLink, tonNode_Data>,

    tonNode_downloadBlockProofLinks: {
        encodeRequest: (src: tonNode_downloadBlockProofLinks, encoder: TLWriteBuffer) => { encoder.writeInt32(684796771); Codecs.tonNode_downloadBlockProofLinks.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_DataList.decode(decoder)
    } as TLFunction<tonNode_downloadBlockProofLinks, tonNode_DataList>,

    tonNode_downloadKeyBlockProofLinks: {
        encodeRequest: (src: tonNode_downloadKeyBlockProofLinks, encoder: TLWriteBuffer) => { encoder.writeInt32(1975747920); Codecs.tonNode_downloadKeyBlockProofLinks.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_DataList.decode(decoder)
    } as TLFunction<tonNode_downloadKeyBlockProofLinks, tonNode_DataList>,

    tonNode_getArchiveInfo: {
        encodeRequest: (src: tonNode_getArchiveInfo, encoder: TLWriteBuffer) => { encoder.writeInt32(2066602305); Codecs.tonNode_getArchiveInfo.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_ArchiveInfo.decode(decoder)
    } as TLFunction<tonNode_getArchiveInfo, tonNode_ArchiveInfo>,

    tonNode_getArchiveSlice: {
        encodeRequest: (src: tonNode_getArchiveSlice, encoder: TLWriteBuffer) => { encoder.writeInt32(540758376); Codecs.tonNode_getArchiveSlice.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Data.decode(decoder)
    } as TLFunction<tonNode_getArchiveSlice, tonNode_Data>,

    tonNode_getCapabilities: {
        encodeRequest: (src: tonNode_getCapabilities, encoder: TLWriteBuffer) => { encoder.writeInt32(-555345672); Codecs.tonNode_getCapabilities.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Capabilities.decode(decoder)
    } as TLFunction<tonNode_getCapabilities, tonNode_Capabilities>,

    tonNode_slave_sendExtMessage: {
        encodeRequest: (src: tonNode_slave_sendExtMessage, encoder: TLWriteBuffer) => { encoder.writeInt32(58127017); Codecs.tonNode_slave_sendExtMessage.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.tonNode_Success.decode(decoder)
    } as TLFunction<tonNode_slave_sendExtMessage, tonNode_Success>,

    tonNode_query: {
        encodeRequest: (src: tonNode_query, encoder: TLWriteBuffer) => { encoder.writeInt32(1777542355); Codecs.tonNode_query.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => decoder.readObject()
    } as TLFunction<tonNode_query, TLBytes>,

    adnl_ping: {
        encodeRequest: (src: adnl_ping, encoder: TLWriteBuffer) => { encoder.writeInt32(531276223); Codecs.adnl_ping.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.adnl_Pong.decode(decoder)
    } as TLFunction<adnl_ping, adnl_Pong>,

    engine_validator_getTime: {
        encodeRequest: (src: engine_validator_getTime, encoder: TLWriteBuffer) => { encoder.writeInt32(-515850543); Codecs.engine_validator_getTime.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Time.decode(decoder)
    } as TLFunction<engine_validator_getTime, engine_validator_Time>,

    engine_validator_importPrivateKey: {
        encodeRequest: (src: engine_validator_importPrivateKey, encoder: TLWriteBuffer) => { encoder.writeInt32(360741575); Codecs.engine_validator_importPrivateKey.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_KeyHash.decode(decoder)
    } as TLFunction<engine_validator_importPrivateKey, engine_validator_KeyHash>,

    engine_validator_exportPrivateKey: {
        encodeRequest: (src: engine_validator_exportPrivateKey, encoder: TLWriteBuffer) => { encoder.writeInt32(-864911288); Codecs.engine_validator_exportPrivateKey.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.PrivateKey.decode(decoder)
    } as TLFunction<engine_validator_exportPrivateKey, PrivateKey>,

    engine_validator_exportPublicKey: {
        encodeRequest: (src: engine_validator_exportPublicKey, encoder: TLWriteBuffer) => { encoder.writeInt32(1647618233); Codecs.engine_validator_exportPublicKey.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.PublicKey.decode(decoder)
    } as TLFunction<engine_validator_exportPublicKey, PublicKey>,

    engine_validator_generateKeyPair: {
        encodeRequest: (src: engine_validator_generateKeyPair, encoder: TLWriteBuffer) => { encoder.writeInt32(-349872005); Codecs.engine_validator_generateKeyPair.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_KeyHash.decode(decoder)
    } as TLFunction<engine_validator_generateKeyPair, engine_validator_KeyHash>,

    engine_validator_addAdnlId: {
        encodeRequest: (src: engine_validator_addAdnlId, encoder: TLWriteBuffer) => { encoder.writeInt32(-310029141); Codecs.engine_validator_addAdnlId.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_addAdnlId, engine_validator_Success>,

    engine_validator_addDhtId: {
        encodeRequest: (src: engine_validator_addDhtId, encoder: TLWriteBuffer) => { encoder.writeInt32(-183755124); Codecs.engine_validator_addDhtId.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_addDhtId, engine_validator_Success>,

    engine_validator_addValidatorPermanentKey: {
        encodeRequest: (src: engine_validator_addValidatorPermanentKey, encoder: TLWriteBuffer) => { encoder.writeInt32(-1844116104); Codecs.engine_validator_addValidatorPermanentKey.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_addValidatorPermanentKey, engine_validator_Success>,

    engine_validator_addValidatorTempKey: {
        encodeRequest: (src: engine_validator_addValidatorTempKey, encoder: TLWriteBuffer) => { encoder.writeInt32(-1926009038); Codecs.engine_validator_addValidatorTempKey.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_addValidatorTempKey, engine_validator_Success>,

    engine_validator_addValidatorAdnlAddress: {
        encodeRequest: (src: engine_validator_addValidatorAdnlAddress, encoder: TLWriteBuffer) => { encoder.writeInt32(-624187774); Codecs.engine_validator_addValidatorAdnlAddress.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_addValidatorAdnlAddress, engine_validator_Success>,

    engine_validator_changeFullNodeAdnlAddress: {
        encodeRequest: (src: engine_validator_changeFullNodeAdnlAddress, encoder: TLWriteBuffer) => { encoder.writeInt32(-1094268539); Codecs.engine_validator_changeFullNodeAdnlAddress.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_changeFullNodeAdnlAddress, engine_validator_Success>,

    engine_validator_addLiteserver: {
        encodeRequest: (src: engine_validator_addLiteserver, encoder: TLWriteBuffer) => { encoder.writeInt32(-259387577); Codecs.engine_validator_addLiteserver.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_addLiteserver, engine_validator_Success>,

    engine_validator_addControlInterface: {
        encodeRequest: (src: engine_validator_addControlInterface, encoder: TLWriteBuffer) => { encoder.writeInt32(881587196); Codecs.engine_validator_addControlInterface.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_addControlInterface, engine_validator_Success>,

    engine_validator_addControlProcess: {
        encodeRequest: (src: engine_validator_addControlProcess, encoder: TLWriteBuffer) => { encoder.writeInt32(1524692816); Codecs.engine_validator_addControlProcess.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_addControlProcess, engine_validator_Success>,

    engine_validator_delAdnlId: {
        encodeRequest: (src: engine_validator_delAdnlId, encoder: TLWriteBuffer) => { encoder.writeInt32(691696882); Codecs.engine_validator_delAdnlId.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_delAdnlId, engine_validator_Success>,

    engine_validator_delDhtId: {
        encodeRequest: (src: engine_validator_delDhtId, encoder: TLWriteBuffer) => { encoder.writeInt32(-2063770818); Codecs.engine_validator_delDhtId.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_delDhtId, engine_validator_Success>,

    engine_validator_delValidatorPermanentKey: {
        encodeRequest: (src: engine_validator_delValidatorPermanentKey, encoder: TLWriteBuffer) => { encoder.writeInt32(390777082); Codecs.engine_validator_delValidatorPermanentKey.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_delValidatorPermanentKey, engine_validator_Success>,

    engine_validator_delValidatorTempKey: {
        encodeRequest: (src: engine_validator_delValidatorTempKey, encoder: TLWriteBuffer) => { encoder.writeInt32(-1595481903); Codecs.engine_validator_delValidatorTempKey.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_delValidatorTempKey, engine_validator_Success>,

    engine_validator_delValidatorAdnlAddress: {
        encodeRequest: (src: engine_validator_delValidatorAdnlAddress, encoder: TLWriteBuffer) => { encoder.writeInt32(-150453414); Codecs.engine_validator_delValidatorAdnlAddress.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_delValidatorAdnlAddress, engine_validator_Success>,

    engine_validator_addListeningPort: {
        encodeRequest: (src: engine_validator_addListeningPort, encoder: TLWriteBuffer) => { encoder.writeInt32(-362051147); Codecs.engine_validator_addListeningPort.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_addListeningPort, engine_validator_Success>,

    engine_validator_addProxy: {
        encodeRequest: (src: engine_validator_addProxy, encoder: TLWriteBuffer) => { encoder.writeInt32(-151178251); Codecs.engine_validator_addProxy.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_addProxy, engine_validator_Success>,

    engine_validator_delListeningPort: {
        encodeRequest: (src: engine_validator_delListeningPort, encoder: TLWriteBuffer) => { encoder.writeInt32(828094543); Codecs.engine_validator_delListeningPort.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_delListeningPort, engine_validator_Success>,

    engine_validator_delProxy: {
        encodeRequest: (src: engine_validator_delProxy, encoder: TLWriteBuffer) => { encoder.writeInt32(1970850941); Codecs.engine_validator_delProxy.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_delProxy, engine_validator_Success>,

    engine_validator_sign: {
        encodeRequest: (src: engine_validator_sign, encoder: TLWriteBuffer) => { encoder.writeInt32(451549736); Codecs.engine_validator_sign.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Signature.decode(decoder)
    } as TLFunction<engine_validator_sign, engine_validator_Signature>,

    engine_validator_getStats: {
        encodeRequest: (src: engine_validator_getStats, encoder: TLWriteBuffer) => { encoder.writeInt32(1389740817); Codecs.engine_validator_getStats.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Stats.decode(decoder)
    } as TLFunction<engine_validator_getStats, engine_validator_Stats>,

    engine_validator_getConfig: {
        encodeRequest: (src: engine_validator_getConfig, encoder: TLWriteBuffer) => { encoder.writeInt32(1504518693); Codecs.engine_validator_getConfig.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_JsonConfig.decode(decoder)
    } as TLFunction<engine_validator_getConfig, engine_validator_JsonConfig>,

    engine_validator_setVerbosity: {
        encodeRequest: (src: engine_validator_setVerbosity, encoder: TLWriteBuffer) => { encoder.writeInt32(-1316856190); Codecs.engine_validator_setVerbosity.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_setVerbosity, engine_validator_Success>,

    engine_validator_createElectionBid: {
        encodeRequest: (src: engine_validator_createElectionBid, encoder: TLWriteBuffer) => { encoder.writeInt32(-451038907); Codecs.engine_validator_createElectionBid.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_ElectionBid.decode(decoder)
    } as TLFunction<engine_validator_createElectionBid, engine_validator_ElectionBid>,

    engine_validator_createProposalVote: {
        encodeRequest: (src: engine_validator_createProposalVote, encoder: TLWriteBuffer) => { encoder.writeInt32(498278765); Codecs.engine_validator_createProposalVote.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_ProposalVote.decode(decoder)
    } as TLFunction<engine_validator_createProposalVote, engine_validator_ProposalVote>,

    engine_validator_createComplaintVote: {
        encodeRequest: (src: engine_validator_createComplaintVote, encoder: TLWriteBuffer) => { encoder.writeInt32(-1333526742); Codecs.engine_validator_createComplaintVote.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_ProposalVote.decode(decoder)
    } as TLFunction<engine_validator_createComplaintVote, engine_validator_ProposalVote>,

    engine_validator_checkDhtServers: {
        encodeRequest: (src: engine_validator_checkDhtServers, encoder: TLWriteBuffer) => { encoder.writeInt32(-773578550); Codecs.engine_validator_checkDhtServers.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_DhtServersStatus.decode(decoder)
    } as TLFunction<engine_validator_checkDhtServers, engine_validator_DhtServersStatus>,

    engine_validator_getOverlaysStats: {
        encodeRequest: (src: engine_validator_getOverlaysStats, encoder: TLWriteBuffer) => { encoder.writeInt32(-52908850); Codecs.engine_validator_getOverlaysStats.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_OverlaysStats.decode(decoder)
    } as TLFunction<engine_validator_getOverlaysStats, engine_validator_OverlaysStats>,

    engine_validator_controlQuery: {
        encodeRequest: (src: engine_validator_controlQuery, encoder: TLWriteBuffer) => { encoder.writeInt32(-1535722048); Codecs.engine_validator_controlQuery.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => decoder.readObject()
    } as TLFunction<engine_validator_controlQuery, TLBytes>,

    engine_validator_importCertificate: {
        encodeRequest: (src: engine_validator_importCertificate, encoder: TLWriteBuffer) => { encoder.writeInt32(1015201999); Codecs.engine_validator_importCertificate.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_importCertificate, engine_validator_Success>,

    engine_validator_signShardOverlayCertificate: {
        encodeRequest: (src: engine_validator_signShardOverlayCertificate, encoder: TLWriteBuffer) => { encoder.writeInt32(1553415254); Codecs.engine_validator_signShardOverlayCertificate.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.overlay_Certificate.decode(decoder)
    } as TLFunction<engine_validator_signShardOverlayCertificate, overlay_Certificate>,

    engine_validator_importShardOverlayCertificate: {
        encodeRequest: (src: engine_validator_importShardOverlayCertificate, encoder: TLWriteBuffer) => { encoder.writeInt32(448989784); Codecs.engine_validator_importShardOverlayCertificate.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_Success.decode(decoder)
    } as TLFunction<engine_validator_importShardOverlayCertificate, engine_validator_Success>,

    engine_validator_getPerfTimerStats: {
        encodeRequest: (src: engine_validator_getPerfTimerStats, encoder: TLWriteBuffer) => { encoder.writeInt32(-364709649); Codecs.engine_validator_getPerfTimerStats.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.engine_validator_PerfTimerStats.decode(decoder)
    } as TLFunction<engine_validator_getPerfTimerStats, engine_validator_PerfTimerStats>,

    storage_ping: {
        encodeRequest: (src: storage_ping, encoder: TLWriteBuffer) => { encoder.writeInt32(1156837905); Codecs.storage_ping.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_Pong.decode(decoder)
    } as TLFunction<storage_ping, storage_Pong>,

    storage_addUpdate: {
        encodeRequest: (src: storage_addUpdate, encoder: TLWriteBuffer) => { encoder.writeInt32(1295070674); Codecs.storage_addUpdate.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.Ok.decode(decoder)
    } as TLFunction<storage_addUpdate, Ok>,

    storage_getTorrentInfo: {
        encodeRequest: (src: storage_getTorrentInfo, encoder: TLWriteBuffer) => { encoder.writeInt32(-1849387478); Codecs.storage_getTorrentInfo.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_TorrentInfo.decode(decoder)
    } as TLFunction<storage_getTorrentInfo, storage_TorrentInfo>,

    storage_getPiece: {
        encodeRequest: (src: storage_getPiece, encoder: TLWriteBuffer) => { encoder.writeInt32(-2139429280); Codecs.storage_getPiece.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_Piece.decode(decoder)
    } as TLFunction<storage_getPiece, storage_Piece>,

    http_request: {
        encodeRequest: (src: http_request, encoder: TLWriteBuffer) => { encoder.writeInt32(1639027169); Codecs.http_request.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.http_Response.decode(decoder)
    } as TLFunction<http_request, http_Response>,

    http_getNextPayloadPart: {
        encodeRequest: (src: http_getNextPayloadPart, encoder: TLWriteBuffer) => { encoder.writeInt32(-1871422196); Codecs.http_getNextPayloadPart.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.http_PayloadPart.decode(decoder)
    } as TLFunction<http_getNextPayloadPart, http_PayloadPart>,

    http_proxy_getCapabilities: {
        encodeRequest: (src: http_proxy_getCapabilities, encoder: TLWriteBuffer) => { encoder.writeInt32(-613277815); Codecs.http_proxy_getCapabilities.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.http_proxy_Capabilities.decode(decoder)
    } as TLFunction<http_proxy_getCapabilities, http_proxy_Capabilities>,

    storage_daemon_setVerbosity: {
        encodeRequest: (src: storage_daemon_setVerbosity, encoder: TLWriteBuffer) => { encoder.writeInt32(649903000); Codecs.storage_daemon_setVerbosity.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Success.decode(decoder)
    } as TLFunction<storage_daemon_setVerbosity, storage_daemon_Success>,

    storage_daemon_createTorrent: {
        encodeRequest: (src: storage_daemon_createTorrent, encoder: TLWriteBuffer) => { encoder.writeInt32(-1878193046); Codecs.storage_daemon_createTorrent.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_TorrentFull.decode(decoder)
    } as TLFunction<storage_daemon_createTorrent, storage_daemon_TorrentFull>,

    storage_daemon_addByHash: {
        encodeRequest: (src: storage_daemon_addByHash, encoder: TLWriteBuffer) => { encoder.writeInt32(-1979569116); Codecs.storage_daemon_addByHash.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_TorrentFull.decode(decoder)
    } as TLFunction<storage_daemon_addByHash, storage_daemon_TorrentFull>,

    storage_daemon_addByMeta: {
        encodeRequest: (src: storage_daemon_addByMeta, encoder: TLWriteBuffer) => { encoder.writeInt32(1950065644); Codecs.storage_daemon_addByMeta.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_TorrentFull.decode(decoder)
    } as TLFunction<storage_daemon_addByMeta, storage_daemon_TorrentFull>,

    storage_daemon_setActiveDownload: {
        encodeRequest: (src: storage_daemon_setActiveDownload, encoder: TLWriteBuffer) => { encoder.writeInt32(1954176413); Codecs.storage_daemon_setActiveDownload.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Success.decode(decoder)
    } as TLFunction<storage_daemon_setActiveDownload, storage_daemon_Success>,

    storage_daemon_setActiveUpload: {
        encodeRequest: (src: storage_daemon_setActiveUpload, encoder: TLWriteBuffer) => { encoder.writeInt32(1001305755); Codecs.storage_daemon_setActiveUpload.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Success.decode(decoder)
    } as TLFunction<storage_daemon_setActiveUpload, storage_daemon_Success>,

    storage_daemon_getTorrents: {
        encodeRequest: (src: storage_daemon_getTorrents, encoder: TLWriteBuffer) => { encoder.writeInt32(-2051621035); Codecs.storage_daemon_getTorrents.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_TorrentList.decode(decoder)
    } as TLFunction<storage_daemon_getTorrents, storage_daemon_TorrentList>,

    storage_daemon_getTorrentFull: {
        encodeRequest: (src: storage_daemon_getTorrentFull, encoder: TLWriteBuffer) => { encoder.writeInt32(1600365636); Codecs.storage_daemon_getTorrentFull.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_TorrentFull.decode(decoder)
    } as TLFunction<storage_daemon_getTorrentFull, storage_daemon_TorrentFull>,

    storage_daemon_getTorrentMeta: {
        encodeRequest: (src: storage_daemon_getTorrentMeta, encoder: TLWriteBuffer) => { encoder.writeInt32(974235919); Codecs.storage_daemon_getTorrentMeta.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_TorrentMeta.decode(decoder)
    } as TLFunction<storage_daemon_getTorrentMeta, storage_daemon_TorrentMeta>,

    storage_daemon_getNewContractMessage: {
        encodeRequest: (src: storage_daemon_getNewContractMessage, encoder: TLWriteBuffer) => { encoder.writeInt32(-374603884); Codecs.storage_daemon_getNewContractMessage.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_NewContractMessage.decode(decoder)
    } as TLFunction<storage_daemon_getNewContractMessage, storage_daemon_NewContractMessage>,

    storage_daemon_getTorrentPeers: {
        encodeRequest: (src: storage_daemon_getTorrentPeers, encoder: TLWriteBuffer) => { encoder.writeInt32(-923195702); Codecs.storage_daemon_getTorrentPeers.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_PeerList.decode(decoder)
    } as TLFunction<storage_daemon_getTorrentPeers, storage_daemon_PeerList>,

    storage_daemon_setFilePriorityAll: {
        encodeRequest: (src: storage_daemon_setFilePriorityAll, encoder: TLWriteBuffer) => { encoder.writeInt32(-1921342855); Codecs.storage_daemon_setFilePriorityAll.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_SetPriorityStatus.decode(decoder)
    } as TLFunction<storage_daemon_setFilePriorityAll, storage_daemon_SetPriorityStatus>,

    storage_daemon_setFilePriorityByIdx: {
        encodeRequest: (src: storage_daemon_setFilePriorityByIdx, encoder: TLWriteBuffer) => { encoder.writeInt32(1134024347); Codecs.storage_daemon_setFilePriorityByIdx.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_SetPriorityStatus.decode(decoder)
    } as TLFunction<storage_daemon_setFilePriorityByIdx, storage_daemon_SetPriorityStatus>,

    storage_daemon_setFilePriorityByName: {
        encodeRequest: (src: storage_daemon_setFilePriorityByName, encoder: TLWriteBuffer) => { encoder.writeInt32(-567467319); Codecs.storage_daemon_setFilePriorityByName.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_SetPriorityStatus.decode(decoder)
    } as TLFunction<storage_daemon_setFilePriorityByName, storage_daemon_SetPriorityStatus>,

    storage_daemon_removeTorrent: {
        encodeRequest: (src: storage_daemon_removeTorrent, encoder: TLWriteBuffer) => { encoder.writeInt32(175789147); Codecs.storage_daemon_removeTorrent.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Success.decode(decoder)
    } as TLFunction<storage_daemon_removeTorrent, storage_daemon_Success>,

    storage_daemon_loadFrom: {
        encodeRequest: (src: storage_daemon_loadFrom, encoder: TLWriteBuffer) => { encoder.writeInt32(-1970900276); Codecs.storage_daemon_loadFrom.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Torrent.decode(decoder)
    } as TLFunction<storage_daemon_loadFrom, storage_daemon_Torrent>,

    storage_daemon_importPrivateKey: {
        encodeRequest: (src: storage_daemon_importPrivateKey, encoder: TLWriteBuffer) => { encoder.writeInt32(2147449850); Codecs.storage_daemon_importPrivateKey.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_KeyHash.decode(decoder)
    } as TLFunction<storage_daemon_importPrivateKey, storage_daemon_KeyHash>,

    storage_daemon_initProvider: {
        encodeRequest: (src: storage_daemon_initProvider, encoder: TLWriteBuffer) => { encoder.writeInt32(673143500); Codecs.storage_daemon_initProvider.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Success.decode(decoder)
    } as TLFunction<storage_daemon_initProvider, storage_daemon_Success>,

    storage_daemon_deployProvider: {
        encodeRequest: (src: storage_daemon_deployProvider, encoder: TLWriteBuffer) => { encoder.writeInt32(2108811237); Codecs.storage_daemon_deployProvider.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_ProviderAddress.decode(decoder)
    } as TLFunction<storage_daemon_deployProvider, storage_daemon_ProviderAddress>,

    storage_daemon_getProviderParams: {
        encodeRequest: (src: storage_daemon_getProviderParams, encoder: TLWriteBuffer) => { encoder.writeInt32(-1832020367); Codecs.storage_daemon_getProviderParams.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_provider_Params.decode(decoder)
    } as TLFunction<storage_daemon_getProviderParams, storage_daemon_provider_Params>,

    storage_daemon_setProviderParams: {
        encodeRequest: (src: storage_daemon_setProviderParams, encoder: TLWriteBuffer) => { encoder.writeInt32(1615801628); Codecs.storage_daemon_setProviderParams.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Success.decode(decoder)
    } as TLFunction<storage_daemon_setProviderParams, storage_daemon_Success>,

    storage_daemon_getProviderInfo: {
        encodeRequest: (src: storage_daemon_getProviderInfo, encoder: TLWriteBuffer) => { encoder.writeInt32(859666907); Codecs.storage_daemon_getProviderInfo.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_ProviderInfo.decode(decoder)
    } as TLFunction<storage_daemon_getProviderInfo, storage_daemon_ProviderInfo>,

    storage_daemon_setProviderConfig: {
        encodeRequest: (src: storage_daemon_setProviderConfig, encoder: TLWriteBuffer) => { encoder.writeInt32(-1918060660); Codecs.storage_daemon_setProviderConfig.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Success.decode(decoder)
    } as TLFunction<storage_daemon_setProviderConfig, storage_daemon_Success>,

    storage_daemon_withdraw: {
        encodeRequest: (src: storage_daemon_withdraw, encoder: TLWriteBuffer) => { encoder.writeInt32(-37961743); Codecs.storage_daemon_withdraw.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Success.decode(decoder)
    } as TLFunction<storage_daemon_withdraw, storage_daemon_Success>,

    storage_daemon_sendCoins: {
        encodeRequest: (src: storage_daemon_sendCoins, encoder: TLWriteBuffer) => { encoder.writeInt32(21329702); Codecs.storage_daemon_sendCoins.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Success.decode(decoder)
    } as TLFunction<storage_daemon_sendCoins, storage_daemon_Success>,

    storage_daemon_closeStorageContract: {
        encodeRequest: (src: storage_daemon_closeStorageContract, encoder: TLWriteBuffer) => { encoder.writeInt32(-159929584); Codecs.storage_daemon_closeStorageContract.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Success.decode(decoder)
    } as TLFunction<storage_daemon_closeStorageContract, storage_daemon_Success>,

    storage_daemon_removeStorageProvider: {
        encodeRequest: (src: storage_daemon_removeStorageProvider, encoder: TLWriteBuffer) => { encoder.writeInt32(1121689494); Codecs.storage_daemon_removeStorageProvider.encode(src, encoder); },
        decodeResponse: (decoder: TLReadBuffer) => Codecs.storage_daemon_Success.decode(decoder)
    } as TLFunction<storage_daemon_removeStorageProvider, storage_daemon_Success>,

};
//
// Codecs
//

export const Codecs = {
    object: {
        encode: (src: object, encoder: TLWriteBuffer) => {
            throw new Error('Not implemented');
        },
        decode: (decoder: TLReadBuffer): object => {
            throw new Error('Not implemented');
        }
    },
    
    function: {
        encode: (src: Function, encoder: TLWriteBuffer) => {
            throw new Error('Not implemented');
        },
        decode: (decoder: TLReadBuffer): Function => {
            throw new Error('Not implemented');
        }
    },
    
    True: {
        encode: (src: True, encoder: TLWriteBuffer) => {
            encoder.writeBool(src);
        },
        decode: (decoder: TLReadBuffer): True => {
            return decoder.readBool() as True;
        }
    },
    
    int128: {
      encode: (src: int128, encoder: TLWriteBuffer) => {
        if (src.byteLength !== 128 / 8) {
            throw new Error('Invalid int128 length');
        }
        for (let byte of src) {
            encoder.writeUInt8(byte);
        }
      },
      decode: (decoder: TLReadBuffer): int128 => {
        const val = Buffer.alloc(128 / 8);
        for (let i = 0; i < val.byteLength; i++) {
            val[i] = decoder.readUInt8();
        }
        return val;
      }
    },
    
    TLBytes: {
      encode: (src: TLBytes, encoder: TLWriteBuffer) => {
        encoder.writeBuffer(src);
      },
      decode: (decoder: TLReadBuffer): TLBytes => {
        return decoder.readBuffer();
      }
    },
    
    double: {
      encode: (src: double, encoder: TLWriteBuffer) => {
        if (src.byteLength !== 64 / 8) {
            throw new Error('Invalid double length');
        }
        for (let byte of src) {
            encoder.writeUInt8(byte);
        }
      },
      decode: (decoder: TLReadBuffer): double => {
        const val = Buffer.alloc(64 / 8);
        for (let i = 0; i < val.byteLength; i++) {
            val[i] = decoder.readUInt8();
        }
        return val;
      }
    },
    
    TLString: {
      encode: (src: TLString, encoder: TLWriteBuffer) => {
        encoder.writeString(src);
      },
      decode: (decoder: TLReadBuffer): TLString => {
        return decoder.readString();
      }
    },
    
    TLLong: {
      encode: (src: TLLong, encoder: TLWriteBuffer) => {
        encoder.writeInt64(src);
      },
      decode: (decoder: TLReadBuffer): TLLong => {
        return decoder.readInt64();
      }
    },


    testObject: {
        encode: (src: testObject, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.value);
            Codecs.object.encode(src.o, encoder);
            Codecs.function.encode(src.f, encoder);
        },
        decode: (decoder: TLReadBuffer): testObject => {
            let value = decoder.readInt32();
            let o = Codecs.object.decode(decoder);
            let f = Codecs.function.decode(decoder);
            return { kind: 'testObject', value, o, f };
        },
    } as TLCodec<testObject>,

    testString: {
        encode: (src: testString, encoder: TLWriteBuffer) => {
            encoder.writeString(src.value);
        },
        decode: (decoder: TLReadBuffer): testString => {
            let value = decoder.readString();
            return { kind: 'testString', value };
        },
    } as TLCodec<testString>,

    testInt: {
        encode: (src: testInt, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.value);
        },
        decode: (decoder: TLReadBuffer): testInt => {
            let value = decoder.readInt32();
            return { kind: 'testInt', value };
        },
    } as TLCodec<testInt>,

    testVectorBytes: {
        encode: (src: testVectorBytes, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.TLBytes.encode, src.value);
        },
        decode: (decoder: TLReadBuffer): testVectorBytes => {
            let value = decoder.readVector(Codecs.TLBytes.decode);
            return { kind: 'testVectorBytes', value };
        },
    } as TLCodec<testVectorBytes>,

    tcp_pong: {
        encode: (src: tcp_pong, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.randomId);
        },
        decode: (decoder: TLReadBuffer): tcp_pong => {
            let randomId = decoder.readInt64();
            return { kind: 'tcp.pong', randomId };
        },
    } as TLCodec<tcp_pong>,

    tcp_authentificate: {
        encode: (src: tcp_authentificate, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.nonce);
        },
        decode: (decoder: TLReadBuffer): tcp_authentificate => {
            let nonce = decoder.readBuffer();
            return { kind: 'tcp.authentificate', nonce };
        },
    } as TLCodec<tcp_authentificate>,

    tcp_authentificationNonce: {
        encode: (src: tcp_authentificationNonce, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.nonce);
        },
        decode: (decoder: TLReadBuffer): tcp_authentificationNonce => {
            let nonce = decoder.readBuffer();
            return { kind: 'tcp.authentificationNonce', nonce };
        },
    } as TLCodec<tcp_authentificationNonce>,

    tcp_authentificationComplete: {
        encode: (src: tcp_authentificationComplete, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.key, encoder);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): tcp_authentificationComplete => {
            let key = Codecs.PublicKey.decode(decoder);
            let signature = decoder.readBuffer();
            return { kind: 'tcp.authentificationComplete', key, signature };
        },
    } as TLCodec<tcp_authentificationComplete>,

    fec_raptorQ: {
        encode: (src: fec_raptorQ, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.dataSize);
            encoder.writeInt32(src.symbolSize);
            encoder.writeInt32(src.symbolsCount);
        },
        decode: (decoder: TLReadBuffer): fec_raptorQ => {
            let dataSize = decoder.readInt32();
            let symbolSize = decoder.readInt32();
            let symbolsCount = decoder.readInt32();
            return { kind: 'fec.raptorQ', dataSize, symbolSize, symbolsCount };
        },
    } as TLCodec<fec_raptorQ>,

    fec_roundRobin: {
        encode: (src: fec_roundRobin, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.dataSize);
            encoder.writeInt32(src.symbolSize);
            encoder.writeInt32(src.symbolsCount);
        },
        decode: (decoder: TLReadBuffer): fec_roundRobin => {
            let dataSize = decoder.readInt32();
            let symbolSize = decoder.readInt32();
            let symbolsCount = decoder.readInt32();
            return { kind: 'fec.roundRobin', dataSize, symbolSize, symbolsCount };
        },
    } as TLCodec<fec_roundRobin>,

    fec_online: {
        encode: (src: fec_online, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.dataSize);
            encoder.writeInt32(src.symbolSize);
            encoder.writeInt32(src.symbolsCount);
        },
        decode: (decoder: TLReadBuffer): fec_online => {
            let dataSize = decoder.readInt32();
            let symbolSize = decoder.readInt32();
            let symbolsCount = decoder.readInt32();
            return { kind: 'fec.online', dataSize, symbolSize, symbolsCount };
        },
    } as TLCodec<fec_online>,

    pk_unenc: {
        encode: (src: pk_unenc, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): pk_unenc => {
            let data = decoder.readBuffer();
            return { kind: 'pk.unenc', data };
        },
    } as TLCodec<pk_unenc>,

    pk_ed25519: {
        encode: (src: pk_ed25519, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.key);
        },
        decode: (decoder: TLReadBuffer): pk_ed25519 => {
            let key = decoder.readInt256();
            return { kind: 'pk.ed25519', key };
        },
    } as TLCodec<pk_ed25519>,

    pk_aes: {
        encode: (src: pk_aes, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.key);
        },
        decode: (decoder: TLReadBuffer): pk_aes => {
            let key = decoder.readInt256();
            return { kind: 'pk.aes', key };
        },
    } as TLCodec<pk_aes>,

    pk_overlay: {
        encode: (src: pk_overlay, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.name);
        },
        decode: (decoder: TLReadBuffer): pk_overlay => {
            let name = decoder.readBuffer();
            return { kind: 'pk.overlay', name };
        },
    } as TLCodec<pk_overlay>,

    pub_unenc: {
        encode: (src: pub_unenc, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): pub_unenc => {
            let data = decoder.readBuffer();
            return { kind: 'pub.unenc', data };
        },
    } as TLCodec<pub_unenc>,

    pub_ed25519: {
        encode: (src: pub_ed25519, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.key);
        },
        decode: (decoder: TLReadBuffer): pub_ed25519 => {
            let key = decoder.readInt256();
            return { kind: 'pub.ed25519', key };
        },
    } as TLCodec<pub_ed25519>,

    pub_aes: {
        encode: (src: pub_aes, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.key);
        },
        decode: (decoder: TLReadBuffer): pub_aes => {
            let key = decoder.readInt256();
            return { kind: 'pub.aes', key };
        },
    } as TLCodec<pub_aes>,

    pub_overlay: {
        encode: (src: pub_overlay, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.name);
        },
        decode: (decoder: TLReadBuffer): pub_overlay => {
            let name = decoder.readBuffer();
            return { kind: 'pub.overlay', name };
        },
    } as TLCodec<pub_overlay>,

    adnl_id_short: {
        encode: (src: adnl_id_short, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
        },
        decode: (decoder: TLReadBuffer): adnl_id_short => {
            let id = decoder.readInt256();
            return { kind: 'adnl.id.short', id };
        },
    } as TLCodec<adnl_id_short>,

    adnl_proxyToFastHash: {
        encode: (src: adnl_proxyToFastHash, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.ip);
            encoder.writeInt32(src.port);
            encoder.writeInt32(src.date);
            encoder.writeInt256(src.dataHash);
            encoder.writeInt256(src.sharedSecret);
        },
        decode: (decoder: TLReadBuffer): adnl_proxyToFastHash => {
            let ip = decoder.readInt32();
            let port = decoder.readInt32();
            let date = decoder.readInt32();
            let dataHash = decoder.readInt256();
            let sharedSecret = decoder.readInt256();
            return { kind: 'adnl.proxyToFastHash', ip, port, date, dataHash, sharedSecret };
        },
    } as TLCodec<adnl_proxyToFastHash>,

    adnl_proxyToFast: {
        encode: (src: adnl_proxyToFast, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.ip);
            encoder.writeInt32(src.port);
            encoder.writeInt32(src.date);
            encoder.writeInt256(src.signature);
        },
        decode: (decoder: TLReadBuffer): adnl_proxyToFast => {
            let ip = decoder.readInt32();
            let port = decoder.readInt32();
            let date = decoder.readInt32();
            let signature = decoder.readInt256();
            return { kind: 'adnl.proxyToFast', ip, port, date, signature };
        },
    } as TLCodec<adnl_proxyToFast>,

    adnl_proxy_none: {
        encode: (src: adnl_proxy_none, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
        },
        decode: (decoder: TLReadBuffer): adnl_proxy_none => {
            let id = decoder.readInt256();
            return { kind: 'adnl.proxy.none', id };
        },
    } as TLCodec<adnl_proxy_none>,

    adnl_proxy_fast: {
        encode: (src: adnl_proxy_fast, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeBuffer(src.sharedSecret);
        },
        decode: (decoder: TLReadBuffer): adnl_proxy_fast => {
            let id = decoder.readInt256();
            let sharedSecret = decoder.readBuffer();
            return { kind: 'adnl.proxy.fast', id, sharedSecret };
        },
    } as TLCodec<adnl_proxy_fast>,

    adnl_address_udp: {
        encode: (src: adnl_address_udp, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.ip);
            encoder.writeInt32(src.port);
        },
        decode: (decoder: TLReadBuffer): adnl_address_udp => {
            let ip = decoder.readInt32();
            let port = decoder.readInt32();
            return { kind: 'adnl.address.udp', ip, port };
        },
    } as TLCodec<adnl_address_udp>,

    adnl_address_udp6: {
        encode: (src: adnl_address_udp6, encoder: TLWriteBuffer) => {
            Codecs.int128.encode(src.ip, encoder);
            encoder.writeInt32(src.port);
        },
        decode: (decoder: TLReadBuffer): adnl_address_udp6 => {
            let ip = Codecs.int128.decode(decoder);
            let port = decoder.readInt32();
            return { kind: 'adnl.address.udp6', ip, port };
        },
    } as TLCodec<adnl_address_udp6>,

    adnl_address_tunnel: {
        encode: (src: adnl_address_tunnel, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.to);
            Codecs.PublicKey.encode(src.pubkey, encoder);
        },
        decode: (decoder: TLReadBuffer): adnl_address_tunnel => {
            let to = decoder.readInt256();
            let pubkey = Codecs.PublicKey.decode(decoder);
            return { kind: 'adnl.address.tunnel', to, pubkey };
        },
    } as TLCodec<adnl_address_tunnel>,

    adnl_address_reverse: {
        encode: (src: adnl_address_reverse, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): adnl_address_reverse => {
            return { kind: 'adnl.address.reverse',  };
        },
    } as TLCodec<adnl_address_reverse>,

    adnl_addressList: {
        encode: (src: adnl_addressList, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.adnl_Address.encode, src.addrs);
            encoder.writeInt32(src.version);
            encoder.writeInt32(src.reinitDate);
            encoder.writeInt32(src.priority);
            encoder.writeInt32(src.expireAt);
        },
        decode: (decoder: TLReadBuffer): adnl_addressList => {
            let addrs = decoder.readVector(Codecs.adnl_Address.decode);
            let version = decoder.readInt32();
            let reinitDate = decoder.readInt32();
            let priority = decoder.readInt32();
            let expireAt = decoder.readInt32();
            return { kind: 'adnl.addressList', addrs, version, reinitDate, priority, expireAt };
        },
    } as TLCodec<adnl_addressList>,

    adnl_node: {
        encode: (src: adnl_node, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.id, encoder);
            Codecs.adnl_addressList.encode(src.addrList, encoder);
        },
        decode: (decoder: TLReadBuffer): adnl_node => {
            let id = Codecs.PublicKey.decode(decoder);
            let addrList = Codecs.adnl_addressList.decode(decoder);
            return { kind: 'adnl.node', id, addrList };
        },
    } as TLCodec<adnl_node>,

    adnl_nodes: {
        encode: (src: adnl_nodes, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.adnl_node.encode, src.nodes);
        },
        decode: (decoder: TLReadBuffer): adnl_nodes => {
            let nodes = decoder.readVector(Codecs.adnl_node.decode);
            return { kind: 'adnl.nodes', nodes };
        },
    } as TLCodec<adnl_nodes>,

    adnl_packetContents: {
        encode: (src: adnl_packetContents, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.rand1);
            encoder.writeUInt32(src.flags);
            (src.flags & (1 << 0)) && !!src.from && Codecs.PublicKey.encode(src.from, encoder);
            (src.flags & (1 << 1)) && !!src.fromShort && Codecs.adnl_id_short.encode(src.fromShort, encoder);
            (src.flags & (1 << 2)) && !!src.message && Codecs.adnl_Message.encode(src.message, encoder);
            (src.flags & (1 << 3)) && !!src.messages && encoder.writeVector(Codecs.adnl_Message.encode, src.messages);
            (src.flags & (1 << 4)) && !!src.address && Codecs.adnl_addressList.encode(src.address, encoder);
            (src.flags & (1 << 5)) && !!src.priorityAddress && Codecs.adnl_addressList.encode(src.priorityAddress, encoder);
            (src.flags & (1 << 6)) && !!src.seqno && encoder.writeInt64(src.seqno);
            (src.flags & (1 << 7)) && !!src.confirmSeqno && encoder.writeInt64(src.confirmSeqno);
            (src.flags & (1 << 8)) && !!src.recvAddrListVersion && encoder.writeInt32(src.recvAddrListVersion);
            (src.flags & (1 << 9)) && !!src.recvPriorityAddrListVersion && encoder.writeInt32(src.recvPriorityAddrListVersion);
            (src.flags & (1 << 10)) && !!src.reinitDate && encoder.writeInt32(src.reinitDate);
            (src.flags & (1 << 10)) && !!src.dstReinitDate && encoder.writeInt32(src.dstReinitDate);
            (src.flags & (1 << 11)) && !!src.signature && encoder.writeBuffer(src.signature);
            encoder.writeBuffer(src.rand2);
        },
        decode: (decoder: TLReadBuffer): adnl_packetContents => {
            let rand1 = decoder.readBuffer();
            let flags = decoder.readUInt32();
            let from = (flags & (1 << 0)) ? Codecs.PublicKey.decode(decoder) : null;
            let fromShort = (flags & (1 << 1)) ? Codecs.adnl_id_short.decode(decoder) : null;
            let message = (flags & (1 << 2)) ? Codecs.adnl_Message.decode(decoder) : null;
            let messages = (flags & (1 << 3)) ? decoder.readVector(Codecs.adnl_Message.decode) : null;
            let address = (flags & (1 << 4)) ? Codecs.adnl_addressList.decode(decoder) : null;
            let priorityAddress = (flags & (1 << 5)) ? Codecs.adnl_addressList.decode(decoder) : null;
            let seqno = (flags & (1 << 6)) ? decoder.readInt64() : null;
            let confirmSeqno = (flags & (1 << 7)) ? decoder.readInt64() : null;
            let recvAddrListVersion = (flags & (1 << 8)) ? decoder.readInt32() : null;
            let recvPriorityAddrListVersion = (flags & (1 << 9)) ? decoder.readInt32() : null;
            let reinitDate = (flags & (1 << 10)) ? decoder.readInt32() : null;
            let dstReinitDate = (flags & (1 << 10)) ? decoder.readInt32() : null;
            let signature = (flags & (1 << 11)) ? decoder.readBuffer() : null;
            let rand2 = decoder.readBuffer();
            return { kind: 'adnl.packetContents', rand1, flags, from, fromShort, message, messages, address, priorityAddress, seqno, confirmSeqno, recvAddrListVersion, recvPriorityAddrListVersion, reinitDate, dstReinitDate, signature, rand2 };
        },
    } as TLCodec<adnl_packetContents>,

    adnl_tunnelPacketContents: {
        encode: (src: adnl_tunnelPacketContents, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.rand1);
            encoder.writeUInt32(src.flags);
            (src.flags & (1 << 0)) && !!src.fromIp && encoder.writeInt32(src.fromIp);
            (src.flags & (1 << 0)) && !!src.fromPort && encoder.writeInt32(src.fromPort);
            (src.flags & (1 << 1)) && !!src.message && encoder.writeBuffer(src.message);
            (src.flags & (1 << 2)) && !!src.statistics && encoder.writeBuffer(src.statistics);
            (src.flags & (1 << 3)) && !!src.payment && encoder.writeBuffer(src.payment);
            encoder.writeBuffer(src.rand2);
        },
        decode: (decoder: TLReadBuffer): adnl_tunnelPacketContents => {
            let rand1 = decoder.readBuffer();
            let flags = decoder.readUInt32();
            let fromIp = (flags & (1 << 0)) ? decoder.readInt32() : null;
            let fromPort = (flags & (1 << 0)) ? decoder.readInt32() : null;
            let message = (flags & (1 << 1)) ? decoder.readBuffer() : null;
            let statistics = (flags & (1 << 2)) ? decoder.readBuffer() : null;
            let payment = (flags & (1 << 3)) ? decoder.readBuffer() : null;
            let rand2 = decoder.readBuffer();
            return { kind: 'adnl.tunnelPacketContents', rand1, flags, fromIp, fromPort, message, statistics, payment, rand2 };
        },
    } as TLCodec<adnl_tunnelPacketContents>,

    adnl_proxyPacketHeader: {
        encode: (src: adnl_proxyPacketHeader, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.proxyId);
            encoder.writeUInt32(src.flags);
            (src.flags & (1 << 0)) && !!src.ip && encoder.writeInt32(src.ip);
            (src.flags & (1 << 0)) && !!src.port && encoder.writeInt32(src.port);
            (src.flags & (1 << 1)) && !!src.adnlStartTime && encoder.writeInt32(src.adnlStartTime);
            (src.flags & (1 << 2)) && !!src.seqno && encoder.writeInt64(src.seqno);
            (src.flags & (1 << 3)) && !!src.date && encoder.writeInt32(src.date);
            encoder.writeInt256(src.signature);
        },
        decode: (decoder: TLReadBuffer): adnl_proxyPacketHeader => {
            let proxyId = decoder.readInt256();
            let flags = decoder.readUInt32();
            let ip = (flags & (1 << 0)) ? decoder.readInt32() : null;
            let port = (flags & (1 << 0)) ? decoder.readInt32() : null;
            let adnlStartTime = (flags & (1 << 1)) ? decoder.readInt32() : null;
            let seqno = (flags & (1 << 2)) ? decoder.readInt64() : null;
            let date = (flags & (1 << 3)) ? decoder.readInt32() : null;
            let signature = decoder.readInt256();
            return { kind: 'adnl.proxyPacketHeader', proxyId, flags, ip, port, adnlStartTime, seqno, date, signature };
        },
    } as TLCodec<adnl_proxyPacketHeader>,

    adnl_proxyControlPacketPing: {
        encode: (src: adnl_proxyControlPacketPing, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
        },
        decode: (decoder: TLReadBuffer): adnl_proxyControlPacketPing => {
            let id = decoder.readInt256();
            return { kind: 'adnl.proxyControlPacketPing', id };
        },
    } as TLCodec<adnl_proxyControlPacketPing>,

    adnl_proxyControlPacketPong: {
        encode: (src: adnl_proxyControlPacketPong, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
        },
        decode: (decoder: TLReadBuffer): adnl_proxyControlPacketPong => {
            let id = decoder.readInt256();
            return { kind: 'adnl.proxyControlPacketPong', id };
        },
    } as TLCodec<adnl_proxyControlPacketPong>,

    adnl_proxyControlPacketRegister: {
        encode: (src: adnl_proxyControlPacketRegister, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.ip);
            encoder.writeInt32(src.port);
        },
        decode: (decoder: TLReadBuffer): adnl_proxyControlPacketRegister => {
            let ip = decoder.readInt32();
            let port = decoder.readInt32();
            return { kind: 'adnl.proxyControlPacketRegister', ip, port };
        },
    } as TLCodec<adnl_proxyControlPacketRegister>,

    adnl_message_createChannel: {
        encode: (src: adnl_message_createChannel, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.key);
            encoder.writeInt32(src.date);
        },
        decode: (decoder: TLReadBuffer): adnl_message_createChannel => {
            let key = decoder.readInt256();
            let date = decoder.readInt32();
            return { kind: 'adnl.message.createChannel', key, date };
        },
    } as TLCodec<adnl_message_createChannel>,

    adnl_message_confirmChannel: {
        encode: (src: adnl_message_confirmChannel, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.key);
            encoder.writeInt256(src.peerKey);
            encoder.writeInt32(src.date);
        },
        decode: (decoder: TLReadBuffer): adnl_message_confirmChannel => {
            let key = decoder.readInt256();
            let peerKey = decoder.readInt256();
            let date = decoder.readInt32();
            return { kind: 'adnl.message.confirmChannel', key, peerKey, date };
        },
    } as TLCodec<adnl_message_confirmChannel>,

    adnl_message_custom: {
        encode: (src: adnl_message_custom, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): adnl_message_custom => {
            let data = decoder.readBuffer();
            return { kind: 'adnl.message.custom', data };
        },
    } as TLCodec<adnl_message_custom>,

    adnl_message_nop: {
        encode: (src: adnl_message_nop, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): adnl_message_nop => {
            return { kind: 'adnl.message.nop',  };
        },
    } as TLCodec<adnl_message_nop>,

    adnl_message_reinit: {
        encode: (src: adnl_message_reinit, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.date);
        },
        decode: (decoder: TLReadBuffer): adnl_message_reinit => {
            let date = decoder.readInt32();
            return { kind: 'adnl.message.reinit', date };
        },
    } as TLCodec<adnl_message_reinit>,

    adnl_message_query: {
        encode: (src: adnl_message_query, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.queryId);
            encoder.writeBuffer(src.query);
        },
        decode: (decoder: TLReadBuffer): adnl_message_query => {
            let queryId = decoder.readInt256();
            let query = decoder.readBuffer();
            return { kind: 'adnl.message.query', queryId, query };
        },
    } as TLCodec<adnl_message_query>,

    adnl_message_answer: {
        encode: (src: adnl_message_answer, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.queryId);
            encoder.writeBuffer(src.answer);
        },
        decode: (decoder: TLReadBuffer): adnl_message_answer => {
            let queryId = decoder.readInt256();
            let answer = decoder.readBuffer();
            return { kind: 'adnl.message.answer', queryId, answer };
        },
    } as TLCodec<adnl_message_answer>,

    adnl_message_part: {
        encode: (src: adnl_message_part, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeInt32(src.totalSize);
            encoder.writeInt32(src.offset);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): adnl_message_part => {
            let hash = decoder.readInt256();
            let totalSize = decoder.readInt32();
            let offset = decoder.readInt32();
            let data = decoder.readBuffer();
            return { kind: 'adnl.message.part', hash, totalSize, offset, data };
        },
    } as TLCodec<adnl_message_part>,

    adnl_db_node_key: {
        encode: (src: adnl_db_node_key, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.localId);
            encoder.writeInt256(src.peerId);
        },
        decode: (decoder: TLReadBuffer): adnl_db_node_key => {
            let localId = decoder.readInt256();
            let peerId = decoder.readInt256();
            return { kind: 'adnl.db.node.key', localId, peerId };
        },
    } as TLCodec<adnl_db_node_key>,

    adnl_db_node_value: {
        encode: (src: adnl_db_node_value, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.date);
            Codecs.PublicKey.encode(src.id, encoder);
            Codecs.adnl_addressList.encode(src.addrList, encoder);
            Codecs.adnl_addressList.encode(src.priorityAddrList, encoder);
        },
        decode: (decoder: TLReadBuffer): adnl_db_node_value => {
            let date = decoder.readInt32();
            let id = Codecs.PublicKey.decode(decoder);
            let addrList = Codecs.adnl_addressList.decode(decoder);
            let priorityAddrList = Codecs.adnl_addressList.decode(decoder);
            return { kind: 'adnl.db.node.value', date, id, addrList, priorityAddrList };
        },
    } as TLCodec<adnl_db_node_value>,

    rldp2_messagePart: {
        encode: (src: rldp2_messagePart, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.transferId);
            Codecs.fec_Type.encode(src.fecType, encoder);
            encoder.writeInt32(src.part);
            encoder.writeInt64(src.totalSize);
            encoder.writeInt32(src.seqno);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): rldp2_messagePart => {
            let transferId = decoder.readInt256();
            let fecType = Codecs.fec_Type.decode(decoder);
            let part = decoder.readInt32();
            let totalSize = decoder.readInt64();
            let seqno = decoder.readInt32();
            let data = decoder.readBuffer();
            return { kind: 'rldp2.messagePart', transferId, fecType, part, totalSize, seqno, data };
        },
    } as TLCodec<rldp2_messagePart>,

    rldp2_confirm: {
        encode: (src: rldp2_confirm, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.transferId);
            encoder.writeInt32(src.part);
            encoder.writeInt32(src.maxSeqno);
            encoder.writeInt32(src.receivedMask);
            encoder.writeInt32(src.receivedCount);
        },
        decode: (decoder: TLReadBuffer): rldp2_confirm => {
            let transferId = decoder.readInt256();
            let part = decoder.readInt32();
            let maxSeqno = decoder.readInt32();
            let receivedMask = decoder.readInt32();
            let receivedCount = decoder.readInt32();
            return { kind: 'rldp2.confirm', transferId, part, maxSeqno, receivedMask, receivedCount };
        },
    } as TLCodec<rldp2_confirm>,

    rldp2_complete: {
        encode: (src: rldp2_complete, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.transferId);
            encoder.writeInt32(src.part);
        },
        decode: (decoder: TLReadBuffer): rldp2_complete => {
            let transferId = decoder.readInt256();
            let part = decoder.readInt32();
            return { kind: 'rldp2.complete', transferId, part };
        },
    } as TLCodec<rldp2_complete>,

    rldp_messagePart: {
        encode: (src: rldp_messagePart, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.transferId);
            Codecs.fec_Type.encode(src.fecType, encoder);
            encoder.writeInt32(src.part);
            encoder.writeInt64(src.totalSize);
            encoder.writeInt32(src.seqno);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): rldp_messagePart => {
            let transferId = decoder.readInt256();
            let fecType = Codecs.fec_Type.decode(decoder);
            let part = decoder.readInt32();
            let totalSize = decoder.readInt64();
            let seqno = decoder.readInt32();
            let data = decoder.readBuffer();
            return { kind: 'rldp.messagePart', transferId, fecType, part, totalSize, seqno, data };
        },
    } as TLCodec<rldp_messagePart>,

    rldp_confirm: {
        encode: (src: rldp_confirm, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.transferId);
            encoder.writeInt32(src.part);
            encoder.writeInt32(src.seqno);
        },
        decode: (decoder: TLReadBuffer): rldp_confirm => {
            let transferId = decoder.readInt256();
            let part = decoder.readInt32();
            let seqno = decoder.readInt32();
            return { kind: 'rldp.confirm', transferId, part, seqno };
        },
    } as TLCodec<rldp_confirm>,

    rldp_complete: {
        encode: (src: rldp_complete, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.transferId);
            encoder.writeInt32(src.part);
        },
        decode: (decoder: TLReadBuffer): rldp_complete => {
            let transferId = decoder.readInt256();
            let part = decoder.readInt32();
            return { kind: 'rldp.complete', transferId, part };
        },
    } as TLCodec<rldp_complete>,

    rldp_message: {
        encode: (src: rldp_message, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): rldp_message => {
            let id = decoder.readInt256();
            let data = decoder.readBuffer();
            return { kind: 'rldp.message', id, data };
        },
    } as TLCodec<rldp_message>,

    rldp_query: {
        encode: (src: rldp_query, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.queryId);
            encoder.writeInt64(src.maxAnswerSize);
            encoder.writeInt32(src.timeout);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): rldp_query => {
            let queryId = decoder.readInt256();
            let maxAnswerSize = decoder.readInt64();
            let timeout = decoder.readInt32();
            let data = decoder.readBuffer();
            return { kind: 'rldp.query', queryId, maxAnswerSize, timeout, data };
        },
    } as TLCodec<rldp_query>,

    rldp_answer: {
        encode: (src: rldp_answer, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.queryId);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): rldp_answer => {
            let queryId = decoder.readInt256();
            let data = decoder.readBuffer();
            return { kind: 'rldp.answer', queryId, data };
        },
    } as TLCodec<rldp_answer>,

    dht_node: {
        encode: (src: dht_node, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.id, encoder);
            Codecs.adnl_addressList.encode(src.addrList, encoder);
            encoder.writeInt32(src.version);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): dht_node => {
            let id = Codecs.PublicKey.decode(decoder);
            let addrList = Codecs.adnl_addressList.decode(decoder);
            let version = decoder.readInt32();
            let signature = decoder.readBuffer();
            return { kind: 'dht.node', id, addrList, version, signature };
        },
    } as TLCodec<dht_node>,

    dht_nodes: {
        encode: (src: dht_nodes, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.dht_node.encode, src.nodes);
        },
        decode: (decoder: TLReadBuffer): dht_nodes => {
            let nodes = decoder.readVector(Codecs.dht_node.decode);
            return { kind: 'dht.nodes', nodes };
        },
    } as TLCodec<dht_nodes>,

    dht_key: {
        encode: (src: dht_key, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeBuffer(src.name);
            encoder.writeInt32(src.idx);
        },
        decode: (decoder: TLReadBuffer): dht_key => {
            let id = decoder.readInt256();
            let name = decoder.readBuffer();
            let idx = decoder.readInt32();
            return { kind: 'dht.key', id, name, idx };
        },
    } as TLCodec<dht_key>,

    dht_updateRule_signature: {
        encode: (src: dht_updateRule_signature, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): dht_updateRule_signature => {
            return { kind: 'dht.updateRule.signature',  };
        },
    } as TLCodec<dht_updateRule_signature>,

    dht_updateRule_anybody: {
        encode: (src: dht_updateRule_anybody, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): dht_updateRule_anybody => {
            return { kind: 'dht.updateRule.anybody',  };
        },
    } as TLCodec<dht_updateRule_anybody>,

    dht_updateRule_overlayNodes: {
        encode: (src: dht_updateRule_overlayNodes, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): dht_updateRule_overlayNodes => {
            return { kind: 'dht.updateRule.overlayNodes',  };
        },
    } as TLCodec<dht_updateRule_overlayNodes>,

    dht_keyDescription: {
        encode: (src: dht_keyDescription, encoder: TLWriteBuffer) => {
            Codecs.dht_key.encode(src.key, encoder);
            Codecs.PublicKey.encode(src.id, encoder);
            Codecs.dht_UpdateRule.encode(src.updateRule, encoder);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): dht_keyDescription => {
            let key = Codecs.dht_key.decode(decoder);
            let id = Codecs.PublicKey.decode(decoder);
            let updateRule = Codecs.dht_UpdateRule.decode(decoder);
            let signature = decoder.readBuffer();
            return { kind: 'dht.keyDescription', key, id, updateRule, signature };
        },
    } as TLCodec<dht_keyDescription>,

    dht_value: {
        encode: (src: dht_value, encoder: TLWriteBuffer) => {
            Codecs.dht_keyDescription.encode(src.key, encoder);
            encoder.writeBuffer(src.value);
            encoder.writeInt32(src.ttl);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): dht_value => {
            let key = Codecs.dht_keyDescription.decode(decoder);
            let value = decoder.readBuffer();
            let ttl = decoder.readInt32();
            let signature = decoder.readBuffer();
            return { kind: 'dht.value', key, value, ttl, signature };
        },
    } as TLCodec<dht_value>,

    dht_pong: {
        encode: (src: dht_pong, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.randomId);
        },
        decode: (decoder: TLReadBuffer): dht_pong => {
            let randomId = decoder.readInt64();
            return { kind: 'dht.pong', randomId };
        },
    } as TLCodec<dht_pong>,

    dht_valueNotFound: {
        encode: (src: dht_valueNotFound, encoder: TLWriteBuffer) => {
            Codecs.dht_nodes.encode(src.nodes, encoder);
        },
        decode: (decoder: TLReadBuffer): dht_valueNotFound => {
            let nodes = Codecs.dht_nodes.decode(decoder);
            return { kind: 'dht.valueNotFound', nodes };
        },
    } as TLCodec<dht_valueNotFound>,

    dht_valueFound: {
        encode: (src: dht_valueFound, encoder: TLWriteBuffer) => {
            Codecs.dht_Value.encode(src.value, encoder);
        },
        decode: (decoder: TLReadBuffer): dht_valueFound => {
            let value = Codecs.dht_Value.decode(decoder);
            return { kind: 'dht.valueFound', value };
        },
    } as TLCodec<dht_valueFound>,

    dht_clientNotFound: {
        encode: (src: dht_clientNotFound, encoder: TLWriteBuffer) => {
            Codecs.dht_nodes.encode(src.nodes, encoder);
        },
        decode: (decoder: TLReadBuffer): dht_clientNotFound => {
            let nodes = Codecs.dht_nodes.decode(decoder);
            return { kind: 'dht.clientNotFound', nodes };
        },
    } as TLCodec<dht_clientNotFound>,

    dht_reversePingOk: {
        encode: (src: dht_reversePingOk, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): dht_reversePingOk => {
            return { kind: 'dht.reversePingOk',  };
        },
    } as TLCodec<dht_reversePingOk>,

    dht_stored: {
        encode: (src: dht_stored, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): dht_stored => {
            return { kind: 'dht.stored',  };
        },
    } as TLCodec<dht_stored>,

    dht_message: {
        encode: (src: dht_message, encoder: TLWriteBuffer) => {
            Codecs.dht_node.encode(src.node, encoder);
        },
        decode: (decoder: TLReadBuffer): dht_message => {
            let node = Codecs.dht_node.decode(decoder);
            return { kind: 'dht.message', node };
        },
    } as TLCodec<dht_message>,

    dht_requestReversePingCont: {
        encode: (src: dht_requestReversePingCont, encoder: TLWriteBuffer) => {
            Codecs.adnl_Node.encode(src.target, encoder);
            encoder.writeBuffer(src.signature);
            encoder.writeInt256(src.client);
        },
        decode: (decoder: TLReadBuffer): dht_requestReversePingCont => {
            let target = Codecs.adnl_Node.decode(decoder);
            let signature = decoder.readBuffer();
            let client = decoder.readInt256();
            return { kind: 'dht.requestReversePingCont', target, signature, client };
        },
    } as TLCodec<dht_requestReversePingCont>,

    dht_db_bucket: {
        encode: (src: dht_db_bucket, encoder: TLWriteBuffer) => {
            Codecs.dht_nodes.encode(src.nodes, encoder);
        },
        decode: (decoder: TLReadBuffer): dht_db_bucket => {
            let nodes = Codecs.dht_nodes.decode(decoder);
            return { kind: 'dht.db.bucket', nodes };
        },
    } as TLCodec<dht_db_bucket>,

    dht_db_key_bucket: {
        encode: (src: dht_db_key_bucket, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.id);
        },
        decode: (decoder: TLReadBuffer): dht_db_key_bucket => {
            let id = decoder.readInt32();
            return { kind: 'dht.db.key.bucket', id };
        },
    } as TLCodec<dht_db_key_bucket>,

    overlay_node_toSign: {
        encode: (src: overlay_node_toSign, encoder: TLWriteBuffer) => {
            Codecs.adnl_id_short.encode(src.id, encoder);
            encoder.writeInt256(src.overlay);
            encoder.writeInt32(src.version);
        },
        decode: (decoder: TLReadBuffer): overlay_node_toSign => {
            let id = Codecs.adnl_id_short.decode(decoder);
            let overlay = decoder.readInt256();
            let version = decoder.readInt32();
            return { kind: 'overlay.node.toSign', id, overlay, version };
        },
    } as TLCodec<overlay_node_toSign>,

    overlay_node: {
        encode: (src: overlay_node, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.id, encoder);
            encoder.writeInt256(src.overlay);
            encoder.writeInt32(src.version);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): overlay_node => {
            let id = Codecs.PublicKey.decode(decoder);
            let overlay = decoder.readInt256();
            let version = decoder.readInt32();
            let signature = decoder.readBuffer();
            return { kind: 'overlay.node', id, overlay, version, signature };
        },
    } as TLCodec<overlay_node>,

    overlay_nodes: {
        encode: (src: overlay_nodes, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.overlay_node.encode, src.nodes);
        },
        decode: (decoder: TLReadBuffer): overlay_nodes => {
            let nodes = decoder.readVector(Codecs.overlay_node.decode);
            return { kind: 'overlay.nodes', nodes };
        },
    } as TLCodec<overlay_nodes>,

    overlay_message: {
        encode: (src: overlay_message, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.overlay);
        },
        decode: (decoder: TLReadBuffer): overlay_message => {
            let overlay = decoder.readInt256();
            return { kind: 'overlay.message', overlay };
        },
    } as TLCodec<overlay_message>,

    overlay_broadcastList: {
        encode: (src: overlay_broadcastList, encoder: TLWriteBuffer) => {
            encoder.writeVector((s, d) => d.writeInt256(s), src.hashes);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcastList => {
            let hashes = decoder.readVector((d) => d.readInt256());
            return { kind: 'overlay.broadcastList', hashes };
        },
    } as TLCodec<overlay_broadcastList>,

    overlay_fec_received: {
        encode: (src: overlay_fec_received, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): overlay_fec_received => {
            let hash = decoder.readInt256();
            return { kind: 'overlay.fec.received', hash };
        },
    } as TLCodec<overlay_fec_received>,

    overlay_fec_completed: {
        encode: (src: overlay_fec_completed, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): overlay_fec_completed => {
            let hash = decoder.readInt256();
            return { kind: 'overlay.fec.completed', hash };
        },
    } as TLCodec<overlay_fec_completed>,

    overlay_unicast: {
        encode: (src: overlay_unicast, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): overlay_unicast => {
            let data = decoder.readBuffer();
            return { kind: 'overlay.unicast', data };
        },
    } as TLCodec<overlay_unicast>,

    overlay_broadcast: {
        encode: (src: overlay_broadcast, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.src, encoder);
            Codecs.overlay_Certificate.encode(src.certificate, encoder);
            encoder.writeInt32(src.flags);
            encoder.writeBuffer(src.data);
            encoder.writeInt32(src.date);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcast => {
            let src = Codecs.PublicKey.decode(decoder);
            let certificate = Codecs.overlay_Certificate.decode(decoder);
            let flags = decoder.readInt32();
            let data = decoder.readBuffer();
            let date = decoder.readInt32();
            let signature = decoder.readBuffer();
            return { kind: 'overlay.broadcast', src, certificate, flags, data, date, signature };
        },
    } as TLCodec<overlay_broadcast>,

    overlay_broadcastFec: {
        encode: (src: overlay_broadcastFec, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.src, encoder);
            Codecs.overlay_Certificate.encode(src.certificate, encoder);
            encoder.writeInt256(src.dataHash);
            encoder.writeInt32(src.dataSize);
            encoder.writeInt32(src.flags);
            encoder.writeBuffer(src.data);
            encoder.writeInt32(src.seqno);
            Codecs.fec_Type.encode(src.fec, encoder);
            encoder.writeInt32(src.date);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcastFec => {
            let src = Codecs.PublicKey.decode(decoder);
            let certificate = Codecs.overlay_Certificate.decode(decoder);
            let dataHash = decoder.readInt256();
            let dataSize = decoder.readInt32();
            let flags = decoder.readInt32();
            let data = decoder.readBuffer();
            let seqno = decoder.readInt32();
            let fec = Codecs.fec_Type.decode(decoder);
            let date = decoder.readInt32();
            let signature = decoder.readBuffer();
            return { kind: 'overlay.broadcastFec', src, certificate, dataHash, dataSize, flags, data, seqno, fec, date, signature };
        },
    } as TLCodec<overlay_broadcastFec>,

    overlay_broadcastFecShort: {
        encode: (src: overlay_broadcastFecShort, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.src, encoder);
            Codecs.overlay_Certificate.encode(src.certificate, encoder);
            encoder.writeInt256(src.broadcastHash);
            encoder.writeInt256(src.partDataHash);
            encoder.writeInt32(src.seqno);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcastFecShort => {
            let src = Codecs.PublicKey.decode(decoder);
            let certificate = Codecs.overlay_Certificate.decode(decoder);
            let broadcastHash = decoder.readInt256();
            let partDataHash = decoder.readInt256();
            let seqno = decoder.readInt32();
            let signature = decoder.readBuffer();
            return { kind: 'overlay.broadcastFecShort', src, certificate, broadcastHash, partDataHash, seqno, signature };
        },
    } as TLCodec<overlay_broadcastFecShort>,

    overlay_broadcastNotFound: {
        encode: (src: overlay_broadcastNotFound, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): overlay_broadcastNotFound => {
            return { kind: 'overlay.broadcastNotFound',  };
        },
    } as TLCodec<overlay_broadcastNotFound>,

    overlay_broadcast_id: {
        encode: (src: overlay_broadcast_id, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.src);
            encoder.writeInt256(src.dataHash);
            encoder.writeInt32(src.flags);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcast_id => {
            let src = decoder.readInt256();
            let dataHash = decoder.readInt256();
            let flags = decoder.readInt32();
            return { kind: 'overlay.broadcast.id', src, dataHash, flags };
        },
    } as TLCodec<overlay_broadcast_id>,

    overlay_broadcastFec_id: {
        encode: (src: overlay_broadcastFec_id, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.src);
            encoder.writeInt256(src.type);
            encoder.writeInt256(src.dataHash);
            encoder.writeInt32(src.size);
            encoder.writeInt32(src.flags);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcastFec_id => {
            let src = decoder.readInt256();
            let type = decoder.readInt256();
            let dataHash = decoder.readInt256();
            let size = decoder.readInt32();
            let flags = decoder.readInt32();
            return { kind: 'overlay.broadcastFec.id', src, type, dataHash, size, flags };
        },
    } as TLCodec<overlay_broadcastFec_id>,

    overlay_broadcastFec_partId: {
        encode: (src: overlay_broadcastFec_partId, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.broadcastHash);
            encoder.writeInt256(src.dataHash);
            encoder.writeInt32(src.seqno);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcastFec_partId => {
            let broadcastHash = decoder.readInt256();
            let dataHash = decoder.readInt256();
            let seqno = decoder.readInt32();
            return { kind: 'overlay.broadcastFec.partId', broadcastHash, dataHash, seqno };
        },
    } as TLCodec<overlay_broadcastFec_partId>,

    overlay_broadcast_toSign: {
        encode: (src: overlay_broadcast_toSign, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeInt32(src.date);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcast_toSign => {
            let hash = decoder.readInt256();
            let date = decoder.readInt32();
            return { kind: 'overlay.broadcast.toSign', hash, date };
        },
    } as TLCodec<overlay_broadcast_toSign>,

    overlay_certificate: {
        encode: (src: overlay_certificate, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.issuedBy, encoder);
            encoder.writeInt32(src.expireAt);
            encoder.writeInt32(src.maxSize);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): overlay_certificate => {
            let issuedBy = Codecs.PublicKey.decode(decoder);
            let expireAt = decoder.readInt32();
            let maxSize = decoder.readInt32();
            let signature = decoder.readBuffer();
            return { kind: 'overlay.certificate', issuedBy, expireAt, maxSize, signature };
        },
    } as TLCodec<overlay_certificate>,

    overlay_certificateV2: {
        encode: (src: overlay_certificateV2, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.issuedBy, encoder);
            encoder.writeInt32(src.expireAt);
            encoder.writeInt32(src.maxSize);
            encoder.writeInt32(src.flags);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): overlay_certificateV2 => {
            let issuedBy = Codecs.PublicKey.decode(decoder);
            let expireAt = decoder.readInt32();
            let maxSize = decoder.readInt32();
            let flags = decoder.readInt32();
            let signature = decoder.readBuffer();
            return { kind: 'overlay.certificateV2', issuedBy, expireAt, maxSize, flags, signature };
        },
    } as TLCodec<overlay_certificateV2>,

    overlay_emptyCertificate: {
        encode: (src: overlay_emptyCertificate, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): overlay_emptyCertificate => {
            return { kind: 'overlay.emptyCertificate',  };
        },
    } as TLCodec<overlay_emptyCertificate>,

    overlay_certificateId: {
        encode: (src: overlay_certificateId, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.overlayId);
            encoder.writeInt256(src.node);
            encoder.writeInt32(src.expireAt);
            encoder.writeInt32(src.maxSize);
        },
        decode: (decoder: TLReadBuffer): overlay_certificateId => {
            let overlayId = decoder.readInt256();
            let node = decoder.readInt256();
            let expireAt = decoder.readInt32();
            let maxSize = decoder.readInt32();
            return { kind: 'overlay.certificateId', overlayId, node, expireAt, maxSize };
        },
    } as TLCodec<overlay_certificateId>,

    overlay_certificateIdV2: {
        encode: (src: overlay_certificateIdV2, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.overlayId);
            encoder.writeInt256(src.node);
            encoder.writeInt32(src.expireAt);
            encoder.writeInt32(src.maxSize);
            encoder.writeInt32(src.flags);
        },
        decode: (decoder: TLReadBuffer): overlay_certificateIdV2 => {
            let overlayId = decoder.readInt256();
            let node = decoder.readInt256();
            let expireAt = decoder.readInt32();
            let maxSize = decoder.readInt32();
            let flags = decoder.readInt32();
            return { kind: 'overlay.certificateIdV2', overlayId, node, expireAt, maxSize, flags };
        },
    } as TLCodec<overlay_certificateIdV2>,

    overlay_db_nodes: {
        encode: (src: overlay_db_nodes, encoder: TLWriteBuffer) => {
            Codecs.overlay_nodes.encode(src.nodes, encoder);
        },
        decode: (decoder: TLReadBuffer): overlay_db_nodes => {
            let nodes = Codecs.overlay_nodes.decode(decoder);
            return { kind: 'overlay.db.nodes', nodes };
        },
    } as TLCodec<overlay_db_nodes>,

    overlay_db_key_nodes: {
        encode: (src: overlay_db_key_nodes, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.localId);
            encoder.writeInt256(src.overlay);
        },
        decode: (decoder: TLReadBuffer): overlay_db_key_nodes => {
            let localId = decoder.readInt256();
            let overlay = decoder.readInt256();
            return { kind: 'overlay.db.key.nodes', localId, overlay };
        },
    } as TLCodec<overlay_db_key_nodes>,

    catchain_block_id: {
        encode: (src: catchain_block_id, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.incarnation);
            encoder.writeInt256(src.src);
            encoder.writeInt32(src.height);
            encoder.writeInt256(src.dataHash);
        },
        decode: (decoder: TLReadBuffer): catchain_block_id => {
            let incarnation = decoder.readInt256();
            let src = decoder.readInt256();
            let height = decoder.readInt32();
            let dataHash = decoder.readInt256();
            return { kind: 'catchain.block.id', incarnation, src, height, dataHash };
        },
    } as TLCodec<catchain_block_id>,

    catchain_block_dep: {
        encode: (src: catchain_block_dep, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.src);
            encoder.writeInt32(src.height);
            encoder.writeInt256(src.dataHash);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): catchain_block_dep => {
            let src = decoder.readInt32();
            let height = decoder.readInt32();
            let dataHash = decoder.readInt256();
            let signature = decoder.readBuffer();
            return { kind: 'catchain.block.dep', src, height, dataHash, signature };
        },
    } as TLCodec<catchain_block_dep>,

    catchain_block_data: {
        encode: (src: catchain_block_data, encoder: TLWriteBuffer) => {
            Codecs.catchain_block_dep.encode(src.prev, encoder);
            encoder.writeVector(Codecs.catchain_block_dep.encode, src.deps);
        },
        decode: (decoder: TLReadBuffer): catchain_block_data => {
            let prev = Codecs.catchain_block_dep.decode(decoder);
            let deps = decoder.readVector(Codecs.catchain_block_dep.decode);
            return { kind: 'catchain.block.data', prev, deps };
        },
    } as TLCodec<catchain_block_data>,

    catchain_block: {
        encode: (src: catchain_block, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.incarnation);
            encoder.writeInt32(src.src);
            encoder.writeInt32(src.height);
            Codecs.catchain_block_data.encode(src.data, encoder);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): catchain_block => {
            let incarnation = decoder.readInt256();
            let src = decoder.readInt32();
            let height = decoder.readInt32();
            let data = Codecs.catchain_block_data.decode(decoder);
            let signature = decoder.readBuffer();
            return { kind: 'catchain.block', incarnation, src, height, data, signature };
        },
    } as TLCodec<catchain_block>,

    catchain_blocks: {
        encode: (src: catchain_blocks, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.catchain_block.encode, src.blocks);
        },
        decode: (decoder: TLReadBuffer): catchain_blocks => {
            let blocks = decoder.readVector(Codecs.catchain_block.decode);
            return { kind: 'catchain.blocks', blocks };
        },
    } as TLCodec<catchain_blocks>,

    catchain_blockUpdate: {
        encode: (src: catchain_blockUpdate, encoder: TLWriteBuffer) => {
            Codecs.catchain_block.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): catchain_blockUpdate => {
            let block = Codecs.catchain_block.decode(decoder);
            return { kind: 'catchain.blockUpdate', block };
        },
    } as TLCodec<catchain_blockUpdate>,

    catchain_block_data_badBlock: {
        encode: (src: catchain_block_data_badBlock, encoder: TLWriteBuffer) => {
            Codecs.catchain_block.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): catchain_block_data_badBlock => {
            let block = Codecs.catchain_block.decode(decoder);
            return { kind: 'catchain.block.data.badBlock', block };
        },
    } as TLCodec<catchain_block_data_badBlock>,

    catchain_block_data_fork: {
        encode: (src: catchain_block_data_fork, encoder: TLWriteBuffer) => {
            Codecs.catchain_block_Dep.encode(src.left, encoder);
            Codecs.catchain_block_Dep.encode(src.right, encoder);
        },
        decode: (decoder: TLReadBuffer): catchain_block_data_fork => {
            let left = Codecs.catchain_block_Dep.decode(decoder);
            let right = Codecs.catchain_block_Dep.decode(decoder);
            return { kind: 'catchain.block.data.fork', left, right };
        },
    } as TLCodec<catchain_block_data_fork>,

    catchain_block_data_nop: {
        encode: (src: catchain_block_data_nop, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): catchain_block_data_nop => {
            return { kind: 'catchain.block.data.nop',  };
        },
    } as TLCodec<catchain_block_data_nop>,

    catchain_firstblock: {
        encode: (src: catchain_firstblock, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.uniqueHash);
            encoder.writeVector((s, d) => d.writeInt256(s), src.nodes);
        },
        decode: (decoder: TLReadBuffer): catchain_firstblock => {
            let uniqueHash = decoder.readInt256();
            let nodes = decoder.readVector((d) => d.readInt256());
            return { kind: 'catchain.firstblock', uniqueHash, nodes };
        },
    } as TLCodec<catchain_firstblock>,

    catchain_difference: {
        encode: (src: catchain_difference, encoder: TLWriteBuffer) => {
            encoder.writeVector((s, d) => d.writeInt32(s), src.sentUpto);
        },
        decode: (decoder: TLReadBuffer): catchain_difference => {
            let sentUpto = decoder.readVector((d) => d.readInt32());
            return { kind: 'catchain.difference', sentUpto };
        },
    } as TLCodec<catchain_difference>,

    catchain_differenceFork: {
        encode: (src: catchain_differenceFork, encoder: TLWriteBuffer) => {
            Codecs.catchain_block_dep.encode(src.left, encoder);
            Codecs.catchain_block_dep.encode(src.right, encoder);
        },
        decode: (decoder: TLReadBuffer): catchain_differenceFork => {
            let left = Codecs.catchain_block_dep.decode(decoder);
            let right = Codecs.catchain_block_dep.decode(decoder);
            return { kind: 'catchain.differenceFork', left, right };
        },
    } as TLCodec<catchain_differenceFork>,

    catchain_blockNotFound: {
        encode: (src: catchain_blockNotFound, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): catchain_blockNotFound => {
            return { kind: 'catchain.blockNotFound',  };
        },
    } as TLCodec<catchain_blockNotFound>,

    catchain_blockResult: {
        encode: (src: catchain_blockResult, encoder: TLWriteBuffer) => {
            Codecs.catchain_block.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): catchain_blockResult => {
            let block = Codecs.catchain_block.decode(decoder);
            return { kind: 'catchain.blockResult', block };
        },
    } as TLCodec<catchain_blockResult>,

    catchain_sent: {
        encode: (src: catchain_sent, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.cnt);
        },
        decode: (decoder: TLReadBuffer): catchain_sent => {
            let cnt = decoder.readInt32();
            return { kind: 'catchain.sent', cnt };
        },
    } as TLCodec<catchain_sent>,

    validatorSession_round_id: {
        encode: (src: validatorSession_round_id, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.session);
            encoder.writeInt64(src.height);
            encoder.writeInt256(src.prevBlock);
            encoder.writeInt32(src.seqno);
        },
        decode: (decoder: TLReadBuffer): validatorSession_round_id => {
            let session = decoder.readInt256();
            let height = decoder.readInt64();
            let prevBlock = decoder.readInt256();
            let seqno = decoder.readInt32();
            return { kind: 'validatorSession.round.id', session, height, prevBlock, seqno };
        },
    } as TLCodec<validatorSession_round_id>,

    validatorSession_candidate_id: {
        encode: (src: validatorSession_candidate_id, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.round);
            encoder.writeInt256(src.blockHash);
        },
        decode: (decoder: TLReadBuffer): validatorSession_candidate_id => {
            let round = decoder.readInt256();
            let blockHash = decoder.readInt256();
            return { kind: 'validatorSession.candidate.id', round, blockHash };
        },
    } as TLCodec<validatorSession_candidate_id>,

    validatorSession_message_startSession: {
        encode: (src: validatorSession_message_startSession, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): validatorSession_message_startSession => {
            return { kind: 'validatorSession.message.startSession',  };
        },
    } as TLCodec<validatorSession_message_startSession>,

    validatorSession_message_finishSession: {
        encode: (src: validatorSession_message_finishSession, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): validatorSession_message_finishSession => {
            return { kind: 'validatorSession.message.finishSession',  };
        },
    } as TLCodec<validatorSession_message_finishSession>,

    validatorSession_message_submittedBlock: {
        encode: (src: validatorSession_message_submittedBlock, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.round);
            encoder.writeInt256(src.rootHash);
            encoder.writeInt256(src.fileHash);
            encoder.writeInt256(src.collatedDataFileHash);
        },
        decode: (decoder: TLReadBuffer): validatorSession_message_submittedBlock => {
            let round = decoder.readInt32();
            let rootHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            let collatedDataFileHash = decoder.readInt256();
            return { kind: 'validatorSession.message.submittedBlock', round, rootHash, fileHash, collatedDataFileHash };
        },
    } as TLCodec<validatorSession_message_submittedBlock>,

    validatorSession_message_approvedBlock: {
        encode: (src: validatorSession_message_approvedBlock, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.round);
            encoder.writeInt256(src.candidate);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): validatorSession_message_approvedBlock => {
            let round = decoder.readInt32();
            let candidate = decoder.readInt256();
            let signature = decoder.readBuffer();
            return { kind: 'validatorSession.message.approvedBlock', round, candidate, signature };
        },
    } as TLCodec<validatorSession_message_approvedBlock>,

    validatorSession_message_rejectedBlock: {
        encode: (src: validatorSession_message_rejectedBlock, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.round);
            encoder.writeInt256(src.candidate);
            encoder.writeBuffer(src.reason);
        },
        decode: (decoder: TLReadBuffer): validatorSession_message_rejectedBlock => {
            let round = decoder.readInt32();
            let candidate = decoder.readInt256();
            let reason = decoder.readBuffer();
            return { kind: 'validatorSession.message.rejectedBlock', round, candidate, reason };
        },
    } as TLCodec<validatorSession_message_rejectedBlock>,

    validatorSession_message_commit: {
        encode: (src: validatorSession_message_commit, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.round);
            encoder.writeInt256(src.candidate);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): validatorSession_message_commit => {
            let round = decoder.readInt32();
            let candidate = decoder.readInt256();
            let signature = decoder.readBuffer();
            return { kind: 'validatorSession.message.commit', round, candidate, signature };
        },
    } as TLCodec<validatorSession_message_commit>,

    validatorSession_message_vote: {
        encode: (src: validatorSession_message_vote, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.round);
            encoder.writeInt32(src.attempt);
            encoder.writeInt256(src.candidate);
        },
        decode: (decoder: TLReadBuffer): validatorSession_message_vote => {
            let round = decoder.readInt32();
            let attempt = decoder.readInt32();
            let candidate = decoder.readInt256();
            return { kind: 'validatorSession.message.vote', round, attempt, candidate };
        },
    } as TLCodec<validatorSession_message_vote>,

    validatorSession_message_voteFor: {
        encode: (src: validatorSession_message_voteFor, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.round);
            encoder.writeInt32(src.attempt);
            encoder.writeInt256(src.candidate);
        },
        decode: (decoder: TLReadBuffer): validatorSession_message_voteFor => {
            let round = decoder.readInt32();
            let attempt = decoder.readInt32();
            let candidate = decoder.readInt256();
            return { kind: 'validatorSession.message.voteFor', round, attempt, candidate };
        },
    } as TLCodec<validatorSession_message_voteFor>,

    validatorSession_message_precommit: {
        encode: (src: validatorSession_message_precommit, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.round);
            encoder.writeInt32(src.attempt);
            encoder.writeInt256(src.candidate);
        },
        decode: (decoder: TLReadBuffer): validatorSession_message_precommit => {
            let round = decoder.readInt32();
            let attempt = decoder.readInt32();
            let candidate = decoder.readInt256();
            return { kind: 'validatorSession.message.precommit', round, attempt, candidate };
        },
    } as TLCodec<validatorSession_message_precommit>,

    validatorSession_message_empty: {
        encode: (src: validatorSession_message_empty, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.round);
            encoder.writeInt32(src.attempt);
        },
        decode: (decoder: TLReadBuffer): validatorSession_message_empty => {
            let round = decoder.readInt32();
            let attempt = decoder.readInt32();
            return { kind: 'validatorSession.message.empty', round, attempt };
        },
    } as TLCodec<validatorSession_message_empty>,

    validatorSession_pong: {
        encode: (src: validatorSession_pong, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.hash);
        },
        decode: (decoder: TLReadBuffer): validatorSession_pong => {
            let hash = decoder.readInt64();
            return { kind: 'validatorSession.pong', hash };
        },
    } as TLCodec<validatorSession_pong>,

    validatorSession_candidateId: {
        encode: (src: validatorSession_candidateId, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.src);
            encoder.writeInt256(src.rootHash);
            encoder.writeInt256(src.fileHash);
            encoder.writeInt256(src.collatedDataFileHash);
        },
        decode: (decoder: TLReadBuffer): validatorSession_candidateId => {
            let src = decoder.readInt256();
            let rootHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            let collatedDataFileHash = decoder.readInt256();
            return { kind: 'validatorSession.candidateId', src, rootHash, fileHash, collatedDataFileHash };
        },
    } as TLCodec<validatorSession_candidateId>,

    validatorSession_blockUpdate: {
        encode: (src: validatorSession_blockUpdate, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.ts);
            encoder.writeVector(Codecs.validatorSession_round_Message.encode, src.actions);
            encoder.writeInt32(src.state);
        },
        decode: (decoder: TLReadBuffer): validatorSession_blockUpdate => {
            let ts = decoder.readInt64();
            let actions = decoder.readVector(Codecs.validatorSession_round_Message.decode);
            let state = decoder.readInt32();
            return { kind: 'validatorSession.blockUpdate', ts, actions, state };
        },
    } as TLCodec<validatorSession_blockUpdate>,

    validatorSession_candidate: {
        encode: (src: validatorSession_candidate, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.src);
            encoder.writeInt32(src.round);
            encoder.writeInt256(src.rootHash);
            encoder.writeBuffer(src.data);
            encoder.writeBuffer(src.collatedData);
        },
        decode: (decoder: TLReadBuffer): validatorSession_candidate => {
            let src = decoder.readInt256();
            let round = decoder.readInt32();
            let rootHash = decoder.readInt256();
            let data = decoder.readBuffer();
            let collatedData = decoder.readBuffer();
            return { kind: 'validatorSession.candidate', src, round, rootHash, data, collatedData };
        },
    } as TLCodec<validatorSession_candidate>,

    validatorSession_config: {
        encode: (src: validatorSession_config, encoder: TLWriteBuffer) => {
            Codecs.double.encode(src.catchainIdleTimeout, encoder);
            encoder.writeInt32(src.catchainMaxDeps);
            encoder.writeInt32(src.roundCandidates);
            Codecs.double.encode(src.nextCandidateDelay, encoder);
            encoder.writeInt32(src.roundAttemptDuration);
            encoder.writeInt32(src.maxRoundAttempts);
            encoder.writeInt32(src.maxBlockSize);
            encoder.writeInt32(src.maxCollatedDataSize);
        },
        decode: (decoder: TLReadBuffer): validatorSession_config => {
            let catchainIdleTimeout = Codecs.double.decode(decoder);
            let catchainMaxDeps = decoder.readInt32();
            let roundCandidates = decoder.readInt32();
            let nextCandidateDelay = Codecs.double.decode(decoder);
            let roundAttemptDuration = decoder.readInt32();
            let maxRoundAttempts = decoder.readInt32();
            let maxBlockSize = decoder.readInt32();
            let maxCollatedDataSize = decoder.readInt32();
            return { kind: 'validatorSession.config', catchainIdleTimeout, catchainMaxDeps, roundCandidates, nextCandidateDelay, roundAttemptDuration, maxRoundAttempts, maxBlockSize, maxCollatedDataSize };
        },
    } as TLCodec<validatorSession_config>,

    validatorSession_configNew: {
        encode: (src: validatorSession_configNew, encoder: TLWriteBuffer) => {
            Codecs.double.encode(src.catchainIdleTimeout, encoder);
            encoder.writeInt32(src.catchainMaxDeps);
            encoder.writeInt32(src.roundCandidates);
            Codecs.double.encode(src.nextCandidateDelay, encoder);
            encoder.writeInt32(src.roundAttemptDuration);
            encoder.writeInt32(src.maxRoundAttempts);
            encoder.writeInt32(src.maxBlockSize);
            encoder.writeInt32(src.maxCollatedDataSize);
            encoder.writeBool(src.newCatchainIds);
        },
        decode: (decoder: TLReadBuffer): validatorSession_configNew => {
            let catchainIdleTimeout = Codecs.double.decode(decoder);
            let catchainMaxDeps = decoder.readInt32();
            let roundCandidates = decoder.readInt32();
            let nextCandidateDelay = Codecs.double.decode(decoder);
            let roundAttemptDuration = decoder.readInt32();
            let maxRoundAttempts = decoder.readInt32();
            let maxBlockSize = decoder.readInt32();
            let maxCollatedDataSize = decoder.readInt32();
            let newCatchainIds = decoder.readBool();
            return { kind: 'validatorSession.configNew', catchainIdleTimeout, catchainMaxDeps, roundCandidates, nextCandidateDelay, roundAttemptDuration, maxRoundAttempts, maxBlockSize, maxCollatedDataSize, newCatchainIds };
        },
    } as TLCodec<validatorSession_configNew>,

    validatorSession_configVersioned: {
        encode: (src: validatorSession_configVersioned, encoder: TLWriteBuffer) => {
            Codecs.double.encode(src.catchainIdleTimeout, encoder);
            encoder.writeInt32(src.catchainMaxDeps);
            encoder.writeInt32(src.roundCandidates);
            Codecs.double.encode(src.nextCandidateDelay, encoder);
            encoder.writeInt32(src.roundAttemptDuration);
            encoder.writeInt32(src.maxRoundAttempts);
            encoder.writeInt32(src.maxBlockSize);
            encoder.writeInt32(src.maxCollatedDataSize);
            encoder.writeInt32(src.version);
        },
        decode: (decoder: TLReadBuffer): validatorSession_configVersioned => {
            let catchainIdleTimeout = Codecs.double.decode(decoder);
            let catchainMaxDeps = decoder.readInt32();
            let roundCandidates = decoder.readInt32();
            let nextCandidateDelay = Codecs.double.decode(decoder);
            let roundAttemptDuration = decoder.readInt32();
            let maxRoundAttempts = decoder.readInt32();
            let maxBlockSize = decoder.readInt32();
            let maxCollatedDataSize = decoder.readInt32();
            let version = decoder.readInt32();
            return { kind: 'validatorSession.configVersioned', catchainIdleTimeout, catchainMaxDeps, roundCandidates, nextCandidateDelay, roundAttemptDuration, maxRoundAttempts, maxBlockSize, maxCollatedDataSize, version };
        },
    } as TLCodec<validatorSession_configVersioned>,

    validatorSession_configVersionedV2: {
        encode: (src: validatorSession_configVersionedV2, encoder: TLWriteBuffer) => {
            Codecs.validatorSession_CatChainOptions.encode(src.catchainOpts, encoder);
            encoder.writeInt32(src.roundCandidates);
            Codecs.double.encode(src.nextCandidateDelay, encoder);
            encoder.writeInt32(src.roundAttemptDuration);
            encoder.writeInt32(src.maxRoundAttempts);
            encoder.writeInt32(src.maxBlockSize);
            encoder.writeInt32(src.maxCollatedDataSize);
            encoder.writeInt32(src.version);
        },
        decode: (decoder: TLReadBuffer): validatorSession_configVersionedV2 => {
            let catchainOpts = Codecs.validatorSession_CatChainOptions.decode(decoder);
            let roundCandidates = decoder.readInt32();
            let nextCandidateDelay = Codecs.double.decode(decoder);
            let roundAttemptDuration = decoder.readInt32();
            let maxRoundAttempts = decoder.readInt32();
            let maxBlockSize = decoder.readInt32();
            let maxCollatedDataSize = decoder.readInt32();
            let version = decoder.readInt32();
            return { kind: 'validatorSession.configVersionedV2', catchainOpts, roundCandidates, nextCandidateDelay, roundAttemptDuration, maxRoundAttempts, maxBlockSize, maxCollatedDataSize, version };
        },
    } as TLCodec<validatorSession_configVersionedV2>,

    validatorSession_catchainOptions: {
        encode: (src: validatorSession_catchainOptions, encoder: TLWriteBuffer) => {
            Codecs.double.encode(src.idleTimeout, encoder);
            encoder.writeInt32(src.maxDeps);
            encoder.writeInt32(src.maxBlockSize);
            encoder.writeBool(src.blockHashCoversData);
            encoder.writeInt32(src.maxBlockHeightCeoff);
            encoder.writeBool(src.debugDisableDb);
        },
        decode: (decoder: TLReadBuffer): validatorSession_catchainOptions => {
            let idleTimeout = Codecs.double.decode(decoder);
            let maxDeps = decoder.readInt32();
            let maxBlockSize = decoder.readInt32();
            let blockHashCoversData = decoder.readBool();
            let maxBlockHeightCeoff = decoder.readInt32();
            let debugDisableDb = decoder.readBool();
            return { kind: 'validatorSession.catchainOptions', idleTimeout, maxDeps, maxBlockSize, blockHashCoversData, maxBlockHeightCeoff, debugDisableDb };
        },
    } as TLCodec<validatorSession_catchainOptions>,

    hashable_bool: {
        encode: (src: hashable_bool, encoder: TLWriteBuffer) => {
            encoder.writeBool(src.value);
        },
        decode: (decoder: TLReadBuffer): hashable_bool => {
            let value = decoder.readBool();
            return { kind: 'hashable.bool', value };
        },
    } as TLCodec<hashable_bool>,

    hashable_int32: {
        encode: (src: hashable_int32, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.value);
        },
        decode: (decoder: TLReadBuffer): hashable_int32 => {
            let value = decoder.readInt32();
            return { kind: 'hashable.int32', value };
        },
    } as TLCodec<hashable_int32>,

    hashable_int64: {
        encode: (src: hashable_int64, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.value);
        },
        decode: (decoder: TLReadBuffer): hashable_int64 => {
            let value = decoder.readInt64();
            return { kind: 'hashable.int64', value };
        },
    } as TLCodec<hashable_int64>,

    hashable_int256: {
        encode: (src: hashable_int256, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.value);
        },
        decode: (decoder: TLReadBuffer): hashable_int256 => {
            let value = decoder.readInt256();
            return { kind: 'hashable.int256', value };
        },
    } as TLCodec<hashable_int256>,

    hashable_bytes: {
        encode: (src: hashable_bytes, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.value);
        },
        decode: (decoder: TLReadBuffer): hashable_bytes => {
            let value = decoder.readBuffer();
            return { kind: 'hashable.bytes', value };
        },
    } as TLCodec<hashable_bytes>,

    hashable_pair: {
        encode: (src: hashable_pair, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.left);
            encoder.writeInt32(src.right);
        },
        decode: (decoder: TLReadBuffer): hashable_pair => {
            let left = decoder.readInt32();
            let right = decoder.readInt32();
            return { kind: 'hashable.pair', left, right };
        },
    } as TLCodec<hashable_pair>,

    hashable_vector: {
        encode: (src: hashable_vector, encoder: TLWriteBuffer) => {
            encoder.writeVector((s, d) => d.writeInt32(s), src.value);
        },
        decode: (decoder: TLReadBuffer): hashable_vector => {
            let value = decoder.readVector((d) => d.readInt32());
            return { kind: 'hashable.vector', value };
        },
    } as TLCodec<hashable_vector>,

    hashable_validatorSessionOldRound: {
        encode: (src: hashable_validatorSessionOldRound, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.seqno);
            encoder.writeInt32(src.block);
            encoder.writeInt32(src.signatures);
            encoder.writeInt32(src.approveSignatures);
        },
        decode: (decoder: TLReadBuffer): hashable_validatorSessionOldRound => {
            let seqno = decoder.readInt32();
            let block = decoder.readInt32();
            let signatures = decoder.readInt32();
            let approveSignatures = decoder.readInt32();
            return { kind: 'hashable.validatorSessionOldRound', seqno, block, signatures, approveSignatures };
        },
    } as TLCodec<hashable_validatorSessionOldRound>,

    hashable_validatorSessionRoundAttempt: {
        encode: (src: hashable_validatorSessionRoundAttempt, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.seqno);
            encoder.writeInt32(src.votes);
            encoder.writeInt32(src.precommitted);
            encoder.writeInt32(src.voteForInited);
            encoder.writeInt32(src.voteFor);
        },
        decode: (decoder: TLReadBuffer): hashable_validatorSessionRoundAttempt => {
            let seqno = decoder.readInt32();
            let votes = decoder.readInt32();
            let precommitted = decoder.readInt32();
            let voteForInited = decoder.readInt32();
            let voteFor = decoder.readInt32();
            return { kind: 'hashable.validatorSessionRoundAttempt', seqno, votes, precommitted, voteForInited, voteFor };
        },
    } as TLCodec<hashable_validatorSessionRoundAttempt>,

    hashable_validatorSessionRound: {
        encode: (src: hashable_validatorSessionRound, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.lockedRound);
            encoder.writeInt32(src.lockedBlock);
            encoder.writeInt32(src.seqno);
            encoder.writeBool(src.precommitted);
            encoder.writeInt32(src.firstAttempt);
            encoder.writeInt32(src.approvedBlocks);
            encoder.writeInt32(src.signatures);
            encoder.writeInt32(src.attempts);
        },
        decode: (decoder: TLReadBuffer): hashable_validatorSessionRound => {
            let lockedRound = decoder.readInt32();
            let lockedBlock = decoder.readInt32();
            let seqno = decoder.readInt32();
            let precommitted = decoder.readBool();
            let firstAttempt = decoder.readInt32();
            let approvedBlocks = decoder.readInt32();
            let signatures = decoder.readInt32();
            let attempts = decoder.readInt32();
            return { kind: 'hashable.validatorSessionRound', lockedRound, lockedBlock, seqno, precommitted, firstAttempt, approvedBlocks, signatures, attempts };
        },
    } as TLCodec<hashable_validatorSessionRound>,

    hashable_blockSignature: {
        encode: (src: hashable_blockSignature, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.signature);
        },
        decode: (decoder: TLReadBuffer): hashable_blockSignature => {
            let signature = decoder.readInt32();
            return { kind: 'hashable.blockSignature', signature };
        },
    } as TLCodec<hashable_blockSignature>,

    hashable_sentBlock: {
        encode: (src: hashable_sentBlock, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.src);
            encoder.writeInt32(src.rootHash);
            encoder.writeInt32(src.fileHash);
            encoder.writeInt32(src.collatedDataFileHash);
        },
        decode: (decoder: TLReadBuffer): hashable_sentBlock => {
            let src = decoder.readInt32();
            let rootHash = decoder.readInt32();
            let fileHash = decoder.readInt32();
            let collatedDataFileHash = decoder.readInt32();
            return { kind: 'hashable.sentBlock', src, rootHash, fileHash, collatedDataFileHash };
        },
    } as TLCodec<hashable_sentBlock>,

    hashable_sentBlockEmpty: {
        encode: (src: hashable_sentBlockEmpty, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): hashable_sentBlockEmpty => {
            return { kind: 'hashable.sentBlockEmpty',  };
        },
    } as TLCodec<hashable_sentBlockEmpty>,

    hashable_vote: {
        encode: (src: hashable_vote, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.block);
            encoder.writeInt32(src.node);
        },
        decode: (decoder: TLReadBuffer): hashable_vote => {
            let block = decoder.readInt32();
            let node = decoder.readInt32();
            return { kind: 'hashable.vote', block, node };
        },
    } as TLCodec<hashable_vote>,

    hashable_blockCandidate: {
        encode: (src: hashable_blockCandidate, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.block);
            encoder.writeInt32(src.approved);
        },
        decode: (decoder: TLReadBuffer): hashable_blockCandidate => {
            let block = decoder.readInt32();
            let approved = decoder.readInt32();
            return { kind: 'hashable.blockCandidate', block, approved };
        },
    } as TLCodec<hashable_blockCandidate>,

    hashable_blockVoteCandidate: {
        encode: (src: hashable_blockVoteCandidate, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.block);
            encoder.writeInt32(src.approved);
        },
        decode: (decoder: TLReadBuffer): hashable_blockVoteCandidate => {
            let block = decoder.readInt32();
            let approved = decoder.readInt32();
            return { kind: 'hashable.blockVoteCandidate', block, approved };
        },
    } as TLCodec<hashable_blockVoteCandidate>,

    hashable_blockCandidateAttempt: {
        encode: (src: hashable_blockCandidateAttempt, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.block);
            encoder.writeInt32(src.votes);
        },
        decode: (decoder: TLReadBuffer): hashable_blockCandidateAttempt => {
            let block = decoder.readInt32();
            let votes = decoder.readInt32();
            return { kind: 'hashable.blockCandidateAttempt', block, votes };
        },
    } as TLCodec<hashable_blockCandidateAttempt>,

    hashable_cntVector: {
        encode: (src: hashable_cntVector, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.data);
        },
        decode: (decoder: TLReadBuffer): hashable_cntVector => {
            let data = decoder.readInt32();
            return { kind: 'hashable.cntVector', data };
        },
    } as TLCodec<hashable_cntVector>,

    hashable_cntSortedVector: {
        encode: (src: hashable_cntSortedVector, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.data);
        },
        decode: (decoder: TLReadBuffer): hashable_cntSortedVector => {
            let data = decoder.readInt32();
            return { kind: 'hashable.cntSortedVector', data };
        },
    } as TLCodec<hashable_cntSortedVector>,

    hashable_validatorSession: {
        encode: (src: hashable_validatorSession, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.ts);
            encoder.writeInt32(src.oldRounds);
            encoder.writeInt32(src.curRound);
        },
        decode: (decoder: TLReadBuffer): hashable_validatorSession => {
            let ts = decoder.readInt32();
            let oldRounds = decoder.readInt32();
            let curRound = decoder.readInt32();
            return { kind: 'hashable.validatorSession', ts, oldRounds, curRound };
        },
    } as TLCodec<hashable_validatorSession>,

    tonNode_sessionId: {
        encode: (src: tonNode_sessionId, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.ccSeqno);
            encoder.writeInt256(src.optsHash);
        },
        decode: (decoder: TLReadBuffer): tonNode_sessionId => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let ccSeqno = decoder.readInt32();
            let optsHash = decoder.readInt256();
            return { kind: 'tonNode.sessionId', workchain, shard, ccSeqno, optsHash };
        },
    } as TLCodec<tonNode_sessionId>,

    tonNode_blockSignature: {
        encode: (src: tonNode_blockSignature, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.who);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): tonNode_blockSignature => {
            let who = decoder.readInt256();
            let signature = decoder.readBuffer();
            return { kind: 'tonNode.blockSignature', who, signature };
        },
    } as TLCodec<tonNode_blockSignature>,

    tonNode_blockId: {
        encode: (src: tonNode_blockId, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.seqno);
        },
        decode: (decoder: TLReadBuffer): tonNode_blockId => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let seqno = decoder.readInt32();
            return { kind: 'tonNode.blockId', workchain, shard, seqno };
        },
    } as TLCodec<tonNode_blockId>,

    tonNode_blockIdExt: {
        encode: (src: tonNode_blockIdExt, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.seqno);
            encoder.writeInt256(src.rootHash);
            encoder.writeInt256(src.fileHash);
        },
        decode: (decoder: TLReadBuffer): tonNode_blockIdExt => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let seqno = decoder.readInt32();
            let rootHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            return { kind: 'tonNode.blockIdExt', workchain, shard, seqno, rootHash, fileHash };
        },
    } as TLCodec<tonNode_blockIdExt>,

    tonNode_zeroStateIdExt: {
        encode: (src: tonNode_zeroStateIdExt, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt256(src.rootHash);
            encoder.writeInt256(src.fileHash);
        },
        decode: (decoder: TLReadBuffer): tonNode_zeroStateIdExt => {
            let workchain = decoder.readInt32();
            let rootHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            return { kind: 'tonNode.zeroStateIdExt', workchain, rootHash, fileHash };
        },
    } as TLCodec<tonNode_zeroStateIdExt>,

    tonNode_blockDescriptionEmpty: {
        encode: (src: tonNode_blockDescriptionEmpty, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_blockDescriptionEmpty => {
            return { kind: 'tonNode.blockDescriptionEmpty',  };
        },
    } as TLCodec<tonNode_blockDescriptionEmpty>,

    tonNode_blockDescription: {
        encode: (src: tonNode_blockDescription, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_blockDescription => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.blockDescription', id };
        },
    } as TLCodec<tonNode_blockDescription>,

    tonNode_blocksDescription: {
        encode: (src: tonNode_blocksDescription, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.ids);
            encoder.writeBool(src.incomplete);
        },
        decode: (decoder: TLReadBuffer): tonNode_blocksDescription => {
            let ids = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            let incomplete = decoder.readBool();
            return { kind: 'tonNode.blocksDescription', ids, incomplete };
        },
    } as TLCodec<tonNode_blocksDescription>,

    tonNode_preparedProofEmpty: {
        encode: (src: tonNode_preparedProofEmpty, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_preparedProofEmpty => {
            return { kind: 'tonNode.preparedProofEmpty',  };
        },
    } as TLCodec<tonNode_preparedProofEmpty>,

    tonNode_preparedProof: {
        encode: (src: tonNode_preparedProof, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_preparedProof => {
            return { kind: 'tonNode.preparedProof',  };
        },
    } as TLCodec<tonNode_preparedProof>,

    tonNode_preparedProofLink: {
        encode: (src: tonNode_preparedProofLink, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_preparedProofLink => {
            return { kind: 'tonNode.preparedProofLink',  };
        },
    } as TLCodec<tonNode_preparedProofLink>,

    tonNode_preparedState: {
        encode: (src: tonNode_preparedState, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_preparedState => {
            return { kind: 'tonNode.preparedState',  };
        },
    } as TLCodec<tonNode_preparedState>,

    tonNode_notFoundState: {
        encode: (src: tonNode_notFoundState, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_notFoundState => {
            return { kind: 'tonNode.notFoundState',  };
        },
    } as TLCodec<tonNode_notFoundState>,

    tonNode_prepared: {
        encode: (src: tonNode_prepared, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_prepared => {
            return { kind: 'tonNode.prepared',  };
        },
    } as TLCodec<tonNode_prepared>,

    tonNode_notFound: {
        encode: (src: tonNode_notFound, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_notFound => {
            return { kind: 'tonNode.notFound',  };
        },
    } as TLCodec<tonNode_notFound>,

    tonNode_data: {
        encode: (src: tonNode_data, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): tonNode_data => {
            let data = decoder.readBuffer();
            return { kind: 'tonNode.data', data };
        },
    } as TLCodec<tonNode_data>,

    tonNode_ihrMessage: {
        encode: (src: tonNode_ihrMessage, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): tonNode_ihrMessage => {
            let data = decoder.readBuffer();
            return { kind: 'tonNode.ihrMessage', data };
        },
    } as TLCodec<tonNode_ihrMessage>,

    tonNode_externalMessage: {
        encode: (src: tonNode_externalMessage, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): tonNode_externalMessage => {
            let data = decoder.readBuffer();
            return { kind: 'tonNode.externalMessage', data };
        },
    } as TLCodec<tonNode_externalMessage>,

    tonNode_newShardBlock: {
        encode: (src: tonNode_newShardBlock, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
            encoder.writeInt32(src.ccSeqno);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): tonNode_newShardBlock => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            let ccSeqno = decoder.readInt32();
            let data = decoder.readBuffer();
            return { kind: 'tonNode.newShardBlock', block, ccSeqno, data };
        },
    } as TLCodec<tonNode_newShardBlock>,

    tonNode_blockBroadcast: {
        encode: (src: tonNode_blockBroadcast, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt32(src.catchainSeqno);
            encoder.writeInt32(src.validatorSetHash);
            encoder.writeVector(Codecs.tonNode_blockSignature.encode, src.signatures);
            encoder.writeBuffer(src.proof);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): tonNode_blockBroadcast => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let catchainSeqno = decoder.readInt32();
            let validatorSetHash = decoder.readInt32();
            let signatures = decoder.readVector(Codecs.tonNode_blockSignature.decode);
            let proof = decoder.readBuffer();
            let data = decoder.readBuffer();
            return { kind: 'tonNode.blockBroadcast', id, catchainSeqno, validatorSetHash, signatures, proof, data };
        },
    } as TLCodec<tonNode_blockBroadcast>,

    tonNode_ihrMessageBroadcast: {
        encode: (src: tonNode_ihrMessageBroadcast, encoder: TLWriteBuffer) => {
            Codecs.tonNode_ihrMessage.encode(src.message, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_ihrMessageBroadcast => {
            let message = Codecs.tonNode_ihrMessage.decode(decoder);
            return { kind: 'tonNode.ihrMessageBroadcast', message };
        },
    } as TLCodec<tonNode_ihrMessageBroadcast>,

    tonNode_externalMessageBroadcast: {
        encode: (src: tonNode_externalMessageBroadcast, encoder: TLWriteBuffer) => {
            Codecs.tonNode_externalMessage.encode(src.message, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_externalMessageBroadcast => {
            let message = Codecs.tonNode_externalMessage.decode(decoder);
            return { kind: 'tonNode.externalMessageBroadcast', message };
        },
    } as TLCodec<tonNode_externalMessageBroadcast>,

    tonNode_newShardBlockBroadcast: {
        encode: (src: tonNode_newShardBlockBroadcast, encoder: TLWriteBuffer) => {
            Codecs.tonNode_newShardBlock.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_newShardBlockBroadcast => {
            let block = Codecs.tonNode_newShardBlock.decode(decoder);
            return { kind: 'tonNode.newShardBlockBroadcast', block };
        },
    } as TLCodec<tonNode_newShardBlockBroadcast>,

    tonNode_shardPublicOverlayId: {
        encode: (src: tonNode_shardPublicOverlayId, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt256(src.zeroStateFileHash);
        },
        decode: (decoder: TLReadBuffer): tonNode_shardPublicOverlayId => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let zeroStateFileHash = decoder.readInt256();
            return { kind: 'tonNode.shardPublicOverlayId', workchain, shard, zeroStateFileHash };
        },
    } as TLCodec<tonNode_shardPublicOverlayId>,

    tonNode_keyBlocks: {
        encode: (src: tonNode_keyBlocks, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.blocks);
            encoder.writeBool(src.incomplete);
            encoder.writeBool(src.error);
        },
        decode: (decoder: TLReadBuffer): tonNode_keyBlocks => {
            let blocks = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            let incomplete = decoder.readBool();
            let error = decoder.readBool();
            return { kind: 'tonNode.keyBlocks', blocks, incomplete, error };
        },
    } as TLCodec<tonNode_keyBlocks>,

    ton_blockId: {
        encode: (src: ton_blockId, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.rootCellHash);
            encoder.writeInt256(src.fileHash);
        },
        decode: (decoder: TLReadBuffer): ton_blockId => {
            let rootCellHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            return { kind: 'ton.blockId', rootCellHash, fileHash };
        },
    } as TLCodec<ton_blockId>,

    ton_blockIdApprove: {
        encode: (src: ton_blockIdApprove, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.rootCellHash);
            encoder.writeInt256(src.fileHash);
        },
        decode: (decoder: TLReadBuffer): ton_blockIdApprove => {
            let rootCellHash = decoder.readInt256();
            let fileHash = decoder.readInt256();
            return { kind: 'ton.blockIdApprove', rootCellHash, fileHash };
        },
    } as TLCodec<ton_blockIdApprove>,

    tonNode_dataList: {
        encode: (src: tonNode_dataList, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.TLBytes.encode, src.data);
        },
        decode: (decoder: TLReadBuffer): tonNode_dataList => {
            let data = decoder.readVector(Codecs.TLBytes.decode);
            return { kind: 'tonNode.dataList', data };
        },
    } as TLCodec<tonNode_dataList>,

    tonNode_dataFull: {
        encode: (src: tonNode_dataFull, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.proof);
            encoder.writeBuffer(src.block);
            encoder.writeBool(src.isLink);
        },
        decode: (decoder: TLReadBuffer): tonNode_dataFull => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let proof = decoder.readBuffer();
            let block = decoder.readBuffer();
            let isLink = decoder.readBool();
            return { kind: 'tonNode.dataFull', id, proof, block, isLink };
        },
    } as TLCodec<tonNode_dataFull>,

    tonNode_dataFullEmpty: {
        encode: (src: tonNode_dataFullEmpty, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_dataFullEmpty => {
            return { kind: 'tonNode.dataFullEmpty',  };
        },
    } as TLCodec<tonNode_dataFullEmpty>,

    tonNode_capabilities: {
        encode: (src: tonNode_capabilities, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.version);
            encoder.writeInt64(src.capabilities);
        },
        decode: (decoder: TLReadBuffer): tonNode_capabilities => {
            let version = decoder.readInt32();
            let capabilities = decoder.readInt64();
            return { kind: 'tonNode.capabilities', version, capabilities };
        },
    } as TLCodec<tonNode_capabilities>,

    tonNode_success: {
        encode: (src: tonNode_success, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_success => {
            return { kind: 'tonNode.success',  };
        },
    } as TLCodec<tonNode_success>,

    tonNode_archiveNotFound: {
        encode: (src: tonNode_archiveNotFound, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_archiveNotFound => {
            return { kind: 'tonNode.archiveNotFound',  };
        },
    } as TLCodec<tonNode_archiveNotFound>,

    tonNode_archiveInfo: {
        encode: (src: tonNode_archiveInfo, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.id);
        },
        decode: (decoder: TLReadBuffer): tonNode_archiveInfo => {
            let id = decoder.readInt64();
            return { kind: 'tonNode.archiveInfo', id };
        },
    } as TLCodec<tonNode_archiveInfo>,

    db_root_dbDescription: {
        encode: (src: db_root_dbDescription, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.version);
            Codecs.tonNode_blockIdExt.encode(src.firstMasterchainBlockId, encoder);
            encoder.writeInt32(src.flags);
        },
        decode: (decoder: TLReadBuffer): db_root_dbDescription => {
            let version = decoder.readInt32();
            let firstMasterchainBlockId = Codecs.tonNode_blockIdExt.decode(decoder);
            let flags = decoder.readInt32();
            return { kind: 'db.root.dbDescription', version, firstMasterchainBlockId, flags };
        },
    } as TLCodec<db_root_dbDescription>,

    db_root_key_cellDb: {
        encode: (src: db_root_key_cellDb, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.version);
        },
        decode: (decoder: TLReadBuffer): db_root_key_cellDb => {
            let version = decoder.readInt32();
            return { kind: 'db.root.key.cellDb', version };
        },
    } as TLCodec<db_root_key_cellDb>,

    db_root_key_blockDb: {
        encode: (src: db_root_key_blockDb, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.version);
        },
        decode: (decoder: TLReadBuffer): db_root_key_blockDb => {
            let version = decoder.readInt32();
            return { kind: 'db.root.key.blockDb', version };
        },
    } as TLCodec<db_root_key_blockDb>,

    db_root_key_config: {
        encode: (src: db_root_key_config, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): db_root_key_config => {
            return { kind: 'db.root.key.config',  };
        },
    } as TLCodec<db_root_key_config>,

    db_root_config: {
        encode: (src: db_root_config, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.celldbVersion);
            encoder.writeInt32(src.blockdbVersion);
        },
        decode: (decoder: TLReadBuffer): db_root_config => {
            let celldbVersion = decoder.readInt32();
            let blockdbVersion = decoder.readInt32();
            return { kind: 'db.root.config', celldbVersion, blockdbVersion };
        },
    } as TLCodec<db_root_config>,

    db_celldb_value: {
        encode: (src: db_celldb_value, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.blockId, encoder);
            encoder.writeInt256(src.prev);
            encoder.writeInt256(src.next);
            encoder.writeInt256(src.rootHash);
        },
        decode: (decoder: TLReadBuffer): db_celldb_value => {
            let blockId = Codecs.tonNode_blockIdExt.decode(decoder);
            let prev = decoder.readInt256();
            let next = decoder.readInt256();
            let rootHash = decoder.readInt256();
            return { kind: 'db.celldb.value', blockId, prev, next, rootHash };
        },
    } as TLCodec<db_celldb_value>,

    db_celldb_key_value: {
        encode: (src: db_celldb_key_value, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): db_celldb_key_value => {
            let hash = decoder.readInt256();
            return { kind: 'db.celldb.key.value', hash };
        },
    } as TLCodec<db_celldb_key_value>,

    db_block_info: {
        encode: (src: db_block_info, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.flags);
            (src.flags & (1 << 1)) && !!src.prevLeft && Codecs.tonNode_blockIdExt.encode(src.prevLeft, encoder);
            (src.flags & (1 << 2)) && !!src.prevRight && Codecs.tonNode_blockIdExt.encode(src.prevRight, encoder);
            (src.flags & (1 << 3)) && !!src.nextLeft && Codecs.tonNode_blockIdExt.encode(src.nextLeft, encoder);
            (src.flags & (1 << 4)) && !!src.nextRight && Codecs.tonNode_blockIdExt.encode(src.nextRight, encoder);
            (src.flags & (1 << 13)) && !!src.lt && encoder.writeInt64(src.lt);
            (src.flags & (1 << 14)) && !!src.ts && encoder.writeInt32(src.ts);
            (src.flags & (1 << 17)) && !!src.state && encoder.writeInt256(src.state);
            (src.flags & (1 << 23)) && !!src.masterchainRefSeqno && encoder.writeInt32(src.masterchainRefSeqno);
        },
        decode: (decoder: TLReadBuffer): db_block_info => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let flags = decoder.readUInt32();
            let prevLeft = (flags & (1 << 1)) ? Codecs.tonNode_blockIdExt.decode(decoder) : null;
            let prevRight = (flags & (1 << 2)) ? Codecs.tonNode_blockIdExt.decode(decoder) : null;
            let nextLeft = (flags & (1 << 3)) ? Codecs.tonNode_blockIdExt.decode(decoder) : null;
            let nextRight = (flags & (1 << 4)) ? Codecs.tonNode_blockIdExt.decode(decoder) : null;
            let lt = (flags & (1 << 13)) ? decoder.readInt64() : null;
            let ts = (flags & (1 << 14)) ? decoder.readInt32() : null;
            let state = (flags & (1 << 17)) ? decoder.readInt256() : null;
            let masterchainRefSeqno = (flags & (1 << 23)) ? decoder.readInt32() : null;
            return { kind: 'db.block.info', id, flags, prevLeft, prevRight, nextLeft, nextRight, lt, ts, state, masterchainRefSeqno };
        },
    } as TLCodec<db_block_info>,

    db_block_packedInfo: {
        encode: (src: db_block_packedInfo, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt32(src.unixtime);
            encoder.writeInt64(src.offset);
        },
        decode: (decoder: TLReadBuffer): db_block_packedInfo => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let unixtime = decoder.readInt32();
            let offset = decoder.readInt64();
            return { kind: 'db.block.packedInfo', id, unixtime, offset };
        },
    } as TLCodec<db_block_packedInfo>,

    db_block_archivedInfo: {
        encode: (src: db_block_archivedInfo, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeUInt32(src.flags);
            (src.flags & (1 << 0)) && !!src.next && Codecs.tonNode_blockIdExt.encode(src.next, encoder);
        },
        decode: (decoder: TLReadBuffer): db_block_archivedInfo => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let flags = decoder.readUInt32();
            let next = (flags & (1 << 0)) ? Codecs.tonNode_blockIdExt.decode(decoder) : null;
            return { kind: 'db.block.archivedInfo', id, flags, next };
        },
    } as TLCodec<db_block_archivedInfo>,

    db_blockdb_value: {
        encode: (src: db_blockdb_value, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.next, encoder);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): db_blockdb_value => {
            let next = Codecs.tonNode_blockIdExt.decode(decoder);
            let data = decoder.readBuffer();
            return { kind: 'db.blockdb.value', next, data };
        },
    } as TLCodec<db_blockdb_value>,

    db_blockdb_lru: {
        encode: (src: db_blockdb_lru, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt256(src.prev);
            encoder.writeInt256(src.next);
        },
        decode: (decoder: TLReadBuffer): db_blockdb_lru => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let prev = decoder.readInt256();
            let next = decoder.readInt256();
            return { kind: 'db.blockdb.lru', id, prev, next };
        },
    } as TLCodec<db_blockdb_lru>,

    db_blockdb_key_lru: {
        encode: (src: db_blockdb_key_lru, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): db_blockdb_key_lru => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.blockdb.key.lru', id };
        },
    } as TLCodec<db_blockdb_key_lru>,

    db_blockdb_key_value: {
        encode: (src: db_blockdb_key_value, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): db_blockdb_key_value => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.blockdb.key.value', id };
        },
    } as TLCodec<db_blockdb_key_value>,

    db_candidate: {
        encode: (src: db_candidate, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.source, encoder);
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeBuffer(src.data);
            encoder.writeBuffer(src.collatedData);
        },
        decode: (decoder: TLReadBuffer): db_candidate => {
            let source = Codecs.PublicKey.decode(decoder);
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let data = decoder.readBuffer();
            let collatedData = decoder.readBuffer();
            return { kind: 'db.candidate', source, id, data, collatedData };
        },
    } as TLCodec<db_candidate>,

    db_candidate_id: {
        encode: (src: db_candidate_id, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.source, encoder);
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt256(src.collatedDataFileHash);
        },
        decode: (decoder: TLReadBuffer): db_candidate_id => {
            let source = Codecs.PublicKey.decode(decoder);
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let collatedDataFileHash = decoder.readInt256();
            return { kind: 'db.candidate.id', source, id, collatedDataFileHash };
        },
    } as TLCodec<db_candidate_id>,

    db_filedb_key_empty: {
        encode: (src: db_filedb_key_empty, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): db_filedb_key_empty => {
            return { kind: 'db.filedb.key.empty',  };
        },
    } as TLCodec<db_filedb_key_empty>,

    db_filedb_key_blockFile: {
        encode: (src: db_filedb_key_blockFile, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.blockId, encoder);
        },
        decode: (decoder: TLReadBuffer): db_filedb_key_blockFile => {
            let blockId = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.filedb.key.blockFile', blockId };
        },
    } as TLCodec<db_filedb_key_blockFile>,

    db_filedb_key_zeroStateFile: {
        encode: (src: db_filedb_key_zeroStateFile, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.blockId, encoder);
        },
        decode: (decoder: TLReadBuffer): db_filedb_key_zeroStateFile => {
            let blockId = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.filedb.key.zeroStateFile', blockId };
        },
    } as TLCodec<db_filedb_key_zeroStateFile>,

    db_filedb_key_persistentStateFile: {
        encode: (src: db_filedb_key_persistentStateFile, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.blockId, encoder);
            Codecs.tonNode_blockIdExt.encode(src.masterchainBlockId, encoder);
        },
        decode: (decoder: TLReadBuffer): db_filedb_key_persistentStateFile => {
            let blockId = Codecs.tonNode_blockIdExt.decode(decoder);
            let masterchainBlockId = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.filedb.key.persistentStateFile', blockId, masterchainBlockId };
        },
    } as TLCodec<db_filedb_key_persistentStateFile>,

    db_filedb_key_proof: {
        encode: (src: db_filedb_key_proof, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.blockId, encoder);
        },
        decode: (decoder: TLReadBuffer): db_filedb_key_proof => {
            let blockId = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.filedb.key.proof', blockId };
        },
    } as TLCodec<db_filedb_key_proof>,

    db_filedb_key_proofLink: {
        encode: (src: db_filedb_key_proofLink, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.blockId, encoder);
        },
        decode: (decoder: TLReadBuffer): db_filedb_key_proofLink => {
            let blockId = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.filedb.key.proofLink', blockId };
        },
    } as TLCodec<db_filedb_key_proofLink>,

    db_filedb_key_signatures: {
        encode: (src: db_filedb_key_signatures, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.blockId, encoder);
        },
        decode: (decoder: TLReadBuffer): db_filedb_key_signatures => {
            let blockId = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.filedb.key.signatures', blockId };
        },
    } as TLCodec<db_filedb_key_signatures>,

    db_filedb_key_candidate: {
        encode: (src: db_filedb_key_candidate, encoder: TLWriteBuffer) => {
            Codecs.db_candidate_id.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): db_filedb_key_candidate => {
            let id = Codecs.db_candidate_id.decode(decoder);
            return { kind: 'db.filedb.key.candidate', id };
        },
    } as TLCodec<db_filedb_key_candidate>,

    db_filedb_key_blockInfo: {
        encode: (src: db_filedb_key_blockInfo, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.blockId, encoder);
        },
        decode: (decoder: TLReadBuffer): db_filedb_key_blockInfo => {
            let blockId = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.filedb.key.blockInfo', blockId };
        },
    } as TLCodec<db_filedb_key_blockInfo>,

    db_filedb_value: {
        encode: (src: db_filedb_value, encoder: TLWriteBuffer) => {
            Codecs.db_filedb_Key.encode(src.key, encoder);
            encoder.writeInt256(src.prev);
            encoder.writeInt256(src.next);
            encoder.writeInt256(src.fileHash);
        },
        decode: (decoder: TLReadBuffer): db_filedb_value => {
            let key = Codecs.db_filedb_Key.decode(decoder);
            let prev = decoder.readInt256();
            let next = decoder.readInt256();
            let fileHash = decoder.readInt256();
            return { kind: 'db.filedb.value', key, prev, next, fileHash };
        },
    } as TLCodec<db_filedb_value>,

    db_state_destroyedSessions: {
        encode: (src: db_state_destroyedSessions, encoder: TLWriteBuffer) => {
            encoder.writeVector((s, d) => d.writeInt256(s), src.sessions);
        },
        decode: (decoder: TLReadBuffer): db_state_destroyedSessions => {
            let sessions = decoder.readVector((d) => d.readInt256());
            return { kind: 'db.state.destroyedSessions', sessions };
        },
    } as TLCodec<db_state_destroyedSessions>,

    db_state_initBlockId: {
        encode: (src: db_state_initBlockId, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): db_state_initBlockId => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.state.initBlockId', block };
        },
    } as TLCodec<db_state_initBlockId>,

    db_state_gcBlockId: {
        encode: (src: db_state_gcBlockId, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): db_state_gcBlockId => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.state.gcBlockId', block };
        },
    } as TLCodec<db_state_gcBlockId>,

    db_state_shardClient: {
        encode: (src: db_state_shardClient, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): db_state_shardClient => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'db.state.shardClient', block };
        },
    } as TLCodec<db_state_shardClient>,

    db_state_asyncSerializer: {
        encode: (src: db_state_asyncSerializer, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
            Codecs.tonNode_blockIdExt.encode(src.last, encoder);
            encoder.writeInt32(src.lastTs);
        },
        decode: (decoder: TLReadBuffer): db_state_asyncSerializer => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            let last = Codecs.tonNode_blockIdExt.decode(decoder);
            let lastTs = decoder.readInt32();
            return { kind: 'db.state.asyncSerializer', block, last, lastTs };
        },
    } as TLCodec<db_state_asyncSerializer>,

    db_state_hardforks: {
        encode: (src: db_state_hardforks, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.blocks);
        },
        decode: (decoder: TLReadBuffer): db_state_hardforks => {
            let blocks = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            return { kind: 'db.state.hardforks', blocks };
        },
    } as TLCodec<db_state_hardforks>,

    db_state_dbVersion: {
        encode: (src: db_state_dbVersion, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.version);
        },
        decode: (decoder: TLReadBuffer): db_state_dbVersion => {
            let version = decoder.readInt32();
            return { kind: 'db.state.dbVersion', version };
        },
    } as TLCodec<db_state_dbVersion>,

    db_state_key_destroyedSessions: {
        encode: (src: db_state_key_destroyedSessions, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): db_state_key_destroyedSessions => {
            return { kind: 'db.state.key.destroyedSessions',  };
        },
    } as TLCodec<db_state_key_destroyedSessions>,

    db_state_key_initBlockId: {
        encode: (src: db_state_key_initBlockId, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): db_state_key_initBlockId => {
            return { kind: 'db.state.key.initBlockId',  };
        },
    } as TLCodec<db_state_key_initBlockId>,

    db_state_key_gcBlockId: {
        encode: (src: db_state_key_gcBlockId, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): db_state_key_gcBlockId => {
            return { kind: 'db.state.key.gcBlockId',  };
        },
    } as TLCodec<db_state_key_gcBlockId>,

    db_state_key_shardClient: {
        encode: (src: db_state_key_shardClient, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): db_state_key_shardClient => {
            return { kind: 'db.state.key.shardClient',  };
        },
    } as TLCodec<db_state_key_shardClient>,

    db_state_key_asyncSerializer: {
        encode: (src: db_state_key_asyncSerializer, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): db_state_key_asyncSerializer => {
            return { kind: 'db.state.key.asyncSerializer',  };
        },
    } as TLCodec<db_state_key_asyncSerializer>,

    db_state_key_hardforks: {
        encode: (src: db_state_key_hardforks, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): db_state_key_hardforks => {
            return { kind: 'db.state.key.hardforks',  };
        },
    } as TLCodec<db_state_key_hardforks>,

    db_state_key_dbVersion: {
        encode: (src: db_state_key_dbVersion, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): db_state_key_dbVersion => {
            return { kind: 'db.state.key.dbVersion',  };
        },
    } as TLCodec<db_state_key_dbVersion>,

    db_lt_el_key: {
        encode: (src: db_lt_el_key, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.idx);
        },
        decode: (decoder: TLReadBuffer): db_lt_el_key => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let idx = decoder.readInt32();
            return { kind: 'db.lt.el.key', workchain, shard, idx };
        },
    } as TLCodec<db_lt_el_key>,

    db_lt_desc_key: {
        encode: (src: db_lt_desc_key, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
        },
        decode: (decoder: TLReadBuffer): db_lt_desc_key => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            return { kind: 'db.lt.desc.key', workchain, shard };
        },
    } as TLCodec<db_lt_desc_key>,

    db_lt_shard_key: {
        encode: (src: db_lt_shard_key, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.idx);
        },
        decode: (decoder: TLReadBuffer): db_lt_shard_key => {
            let idx = decoder.readInt32();
            return { kind: 'db.lt.shard.key', idx };
        },
    } as TLCodec<db_lt_shard_key>,

    db_lt_status_key: {
        encode: (src: db_lt_status_key, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): db_lt_status_key => {
            return { kind: 'db.lt.status.key',  };
        },
    } as TLCodec<db_lt_status_key>,

    db_lt_el_value: {
        encode: (src: db_lt_el_value, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.id, encoder);
            encoder.writeInt64(src.lt);
            encoder.writeInt32(src.ts);
        },
        decode: (decoder: TLReadBuffer): db_lt_el_value => {
            let id = Codecs.tonNode_blockIdExt.decode(decoder);
            let lt = decoder.readInt64();
            let ts = decoder.readInt32();
            return { kind: 'db.lt.el.value', id, lt, ts };
        },
    } as TLCodec<db_lt_el_value>,

    db_lt_desc_value: {
        encode: (src: db_lt_desc_value, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.firstIdx);
            encoder.writeInt32(src.lastIdx);
            encoder.writeInt32(src.lastSeqno);
            encoder.writeInt64(src.lastLt);
            encoder.writeInt32(src.lastTs);
        },
        decode: (decoder: TLReadBuffer): db_lt_desc_value => {
            let firstIdx = decoder.readInt32();
            let lastIdx = decoder.readInt32();
            let lastSeqno = decoder.readInt32();
            let lastLt = decoder.readInt64();
            let lastTs = decoder.readInt32();
            return { kind: 'db.lt.desc.value', firstIdx, lastIdx, lastSeqno, lastLt, lastTs };
        },
    } as TLCodec<db_lt_desc_value>,

    db_lt_shard_value: {
        encode: (src: db_lt_shard_value, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
        },
        decode: (decoder: TLReadBuffer): db_lt_shard_value => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            return { kind: 'db.lt.shard.value', workchain, shard };
        },
    } as TLCodec<db_lt_shard_value>,

    db_lt_status_value: {
        encode: (src: db_lt_status_value, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.totalShards);
        },
        decode: (decoder: TLReadBuffer): db_lt_status_value => {
            let totalShards = decoder.readInt32();
            return { kind: 'db.lt.status.value', totalShards };
        },
    } as TLCodec<db_lt_status_value>,

    db_files_index_key: {
        encode: (src: db_files_index_key, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): db_files_index_key => {
            return { kind: 'db.files.index.key',  };
        },
    } as TLCodec<db_files_index_key>,

    db_files_package_key: {
        encode: (src: db_files_package_key, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.packageId);
            encoder.writeBool(src.key);
            encoder.writeBool(src.temp);
        },
        decode: (decoder: TLReadBuffer): db_files_package_key => {
            let packageId = decoder.readInt32();
            let key = decoder.readBool();
            let temp = decoder.readBool();
            return { kind: 'db.files.package.key', packageId, key, temp };
        },
    } as TLCodec<db_files_package_key>,

    db_files_index_value: {
        encode: (src: db_files_index_value, encoder: TLWriteBuffer) => {
            encoder.writeVector((s, d) => d.writeInt32(s), src.packages);
            encoder.writeVector((s, d) => d.writeInt32(s), src.keyPackages);
            encoder.writeVector((s, d) => d.writeInt32(s), src.tempPackages);
        },
        decode: (decoder: TLReadBuffer): db_files_index_value => {
            let packages = decoder.readVector((d) => d.readInt32());
            let keyPackages = decoder.readVector((d) => d.readInt32());
            let tempPackages = decoder.readVector((d) => d.readInt32());
            return { kind: 'db.files.index.value', packages, keyPackages, tempPackages };
        },
    } as TLCodec<db_files_index_value>,

    db_files_package_firstBlock: {
        encode: (src: db_files_package_firstBlock, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.seqno);
            encoder.writeInt32(src.unixtime);
            encoder.writeInt64(src.lt);
        },
        decode: (decoder: TLReadBuffer): db_files_package_firstBlock => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let seqno = decoder.readInt32();
            let unixtime = decoder.readInt32();
            let lt = decoder.readInt64();
            return { kind: 'db.files.package.firstBlock', workchain, shard, seqno, unixtime, lt };
        },
    } as TLCodec<db_files_package_firstBlock>,

    db_files_package_value: {
        encode: (src: db_files_package_value, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.packageId);
            encoder.writeBool(src.key);
            encoder.writeBool(src.temp);
            encoder.writeVector(Codecs.db_files_package_firstBlock.encode, src.firstblocks);
            encoder.writeBool(src.deleted);
        },
        decode: (decoder: TLReadBuffer): db_files_package_value => {
            let packageId = decoder.readInt32();
            let key = decoder.readBool();
            let temp = decoder.readBool();
            let firstblocks = decoder.readVector(Codecs.db_files_package_firstBlock.decode);
            let deleted = decoder.readBool();
            return { kind: 'db.files.package.value', packageId, key, temp, firstblocks, deleted };
        },
    } as TLCodec<db_files_package_value>,

    validator_groupMember: {
        encode: (src: validator_groupMember, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.publicKeyHash);
            encoder.writeInt256(src.adnl);
            encoder.writeInt64(src.weight);
        },
        decode: (decoder: TLReadBuffer): validator_groupMember => {
            let publicKeyHash = decoder.readInt256();
            let adnl = decoder.readInt256();
            let weight = decoder.readInt64();
            return { kind: 'validator.groupMember', publicKeyHash, adnl, weight };
        },
    } as TLCodec<validator_groupMember>,

    validator_group: {
        encode: (src: validator_group, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.catchainSeqno);
            encoder.writeInt256(src.configHash);
            encoder.writeVector(Codecs.validator_groupMember.encode, src.members);
        },
        decode: (decoder: TLReadBuffer): validator_group => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let catchainSeqno = decoder.readInt32();
            let configHash = decoder.readInt256();
            let members = decoder.readVector(Codecs.validator_groupMember.decode);
            return { kind: 'validator.group', workchain, shard, catchainSeqno, configHash, members };
        },
    } as TLCodec<validator_group>,

    validator_groupEx: {
        encode: (src: validator_groupEx, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.verticalSeqno);
            encoder.writeInt32(src.catchainSeqno);
            encoder.writeInt256(src.configHash);
            encoder.writeVector(Codecs.validator_groupMember.encode, src.members);
        },
        decode: (decoder: TLReadBuffer): validator_groupEx => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let verticalSeqno = decoder.readInt32();
            let catchainSeqno = decoder.readInt32();
            let configHash = decoder.readInt256();
            let members = decoder.readVector(Codecs.validator_groupMember.decode);
            return { kind: 'validator.groupEx', workchain, shard, verticalSeqno, catchainSeqno, configHash, members };
        },
    } as TLCodec<validator_groupEx>,

    validator_groupNew: {
        encode: (src: validator_groupNew, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            encoder.writeInt32(src.verticalSeqno);
            encoder.writeInt32(src.lastKeyBlockSeqno);
            encoder.writeInt32(src.catchainSeqno);
            encoder.writeInt256(src.configHash);
            encoder.writeVector(Codecs.validator_groupMember.encode, src.members);
        },
        decode: (decoder: TLReadBuffer): validator_groupNew => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let verticalSeqno = decoder.readInt32();
            let lastKeyBlockSeqno = decoder.readInt32();
            let catchainSeqno = decoder.readInt32();
            let configHash = decoder.readInt256();
            let members = decoder.readVector(Codecs.validator_groupMember.decode);
            return { kind: 'validator.groupNew', workchain, shard, verticalSeqno, lastKeyBlockSeqno, catchainSeqno, configHash, members };
        },
    } as TLCodec<validator_groupNew>,

    id_config_local: {
        encode: (src: id_config_local, encoder: TLWriteBuffer) => {
            Codecs.PrivateKey.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): id_config_local => {
            let id = Codecs.PrivateKey.decode(decoder);
            return { kind: 'id.config.local', id };
        },
    } as TLCodec<id_config_local>,

    dht_config_local: {
        encode: (src: dht_config_local, encoder: TLWriteBuffer) => {
            Codecs.adnl_id_short.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): dht_config_local => {
            let id = Codecs.adnl_id_short.decode(decoder);
            return { kind: 'dht.config.local', id };
        },
    } as TLCodec<dht_config_local>,

    dht_config_random_local: {
        encode: (src: dht_config_random_local, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.cnt);
        },
        decode: (decoder: TLReadBuffer): dht_config_random_local => {
            let cnt = decoder.readInt32();
            return { kind: 'dht.config.random.local', cnt };
        },
    } as TLCodec<dht_config_random_local>,

    liteserver_config_local: {
        encode: (src: liteserver_config_local, encoder: TLWriteBuffer) => {
            Codecs.PrivateKey.encode(src.id, encoder);
            encoder.writeInt32(src.port);
        },
        decode: (decoder: TLReadBuffer): liteserver_config_local => {
            let id = Codecs.PrivateKey.decode(decoder);
            let port = decoder.readInt32();
            return { kind: 'liteserver.config.local', id, port };
        },
    } as TLCodec<liteserver_config_local>,

    liteserver_config_random_local: {
        encode: (src: liteserver_config_random_local, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.port);
        },
        decode: (decoder: TLReadBuffer): liteserver_config_random_local => {
            let port = decoder.readInt32();
            return { kind: 'liteserver.config.random.local', port };
        },
    } as TLCodec<liteserver_config_random_local>,

    validator_config_local: {
        encode: (src: validator_config_local, encoder: TLWriteBuffer) => {
            Codecs.adnl_id_short.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): validator_config_local => {
            let id = Codecs.adnl_id_short.decode(decoder);
            return { kind: 'validator.config.local', id };
        },
    } as TLCodec<validator_config_local>,

    validator_config_random_local: {
        encode: (src: validator_config_random_local, encoder: TLWriteBuffer) => {
            Codecs.adnl_addressList.encode(src.addrList, encoder);
        },
        decode: (decoder: TLReadBuffer): validator_config_random_local => {
            let addrList = Codecs.adnl_addressList.decode(decoder);
            return { kind: 'validator.config.random.local', addrList };
        },
    } as TLCodec<validator_config_random_local>,

    control_config_local: {
        encode: (src: control_config_local, encoder: TLWriteBuffer) => {
            Codecs.PrivateKey.encode(src.priv, encoder);
            encoder.writeInt256(src.pub);
            encoder.writeInt32(src.port);
        },
        decode: (decoder: TLReadBuffer): control_config_local => {
            let priv = Codecs.PrivateKey.decode(decoder);
            let pub = decoder.readInt256();
            let port = decoder.readInt32();
            return { kind: 'control.config.local', priv, pub, port };
        },
    } as TLCodec<control_config_local>,

    config_local: {
        encode: (src: config_local, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.id_config_local.encode, src.localIds);
            encoder.writeVector(Codecs.dht_config_Local.encode, src.dht);
            encoder.writeVector(Codecs.validator_config_Local.encode, src.validators);
            encoder.writeVector(Codecs.liteserver_config_Local.encode, src.liteservers);
            encoder.writeVector(Codecs.control_config_local.encode, src.control);
        },
        decode: (decoder: TLReadBuffer): config_local => {
            let localIds = decoder.readVector(Codecs.id_config_local.decode);
            let dht = decoder.readVector(Codecs.dht_config_Local.decode);
            let validators = decoder.readVector(Codecs.validator_config_Local.decode);
            let liteservers = decoder.readVector(Codecs.liteserver_config_Local.decode);
            let control = decoder.readVector(Codecs.control_config_local.decode);
            return { kind: 'config.local', localIds, dht, validators, liteservers, control };
        },
    } as TLCodec<config_local>,

    dht_config_global: {
        encode: (src: dht_config_global, encoder: TLWriteBuffer) => {
            Codecs.dht_nodes.encode(src.staticNodes, encoder);
            encoder.writeInt32(src.k);
            encoder.writeInt32(src.a);
        },
        decode: (decoder: TLReadBuffer): dht_config_global => {
            let staticNodes = Codecs.dht_nodes.decode(decoder);
            let k = decoder.readInt32();
            let a = decoder.readInt32();
            return { kind: 'dht.config.global', staticNodes, k, a };
        },
    } as TLCodec<dht_config_global>,

    dht_config_global_v2: {
        encode: (src: dht_config_global_v2, encoder: TLWriteBuffer) => {
            Codecs.dht_nodes.encode(src.staticNodes, encoder);
            encoder.writeInt32(src.k);
            encoder.writeInt32(src.a);
            encoder.writeInt32(src.networkId);
        },
        decode: (decoder: TLReadBuffer): dht_config_global_v2 => {
            let staticNodes = Codecs.dht_nodes.decode(decoder);
            let k = decoder.readInt32();
            let a = decoder.readInt32();
            let networkId = decoder.readInt32();
            return { kind: 'dht.config.global_v2', staticNodes, k, a, networkId };
        },
    } as TLCodec<dht_config_global_v2>,

    adnl_config_global: {
        encode: (src: adnl_config_global, encoder: TLWriteBuffer) => {
            Codecs.adnl_nodes.encode(src.staticNodes, encoder);
        },
        decode: (decoder: TLReadBuffer): adnl_config_global => {
            let staticNodes = Codecs.adnl_nodes.decode(decoder);
            return { kind: 'adnl.config.global', staticNodes };
        },
    } as TLCodec<adnl_config_global>,

    catchain_config_global: {
        encode: (src: catchain_config_global, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.tag);
            encoder.writeVector(Codecs.PublicKey.encode, src.nodes);
        },
        decode: (decoder: TLReadBuffer): catchain_config_global => {
            let tag = decoder.readInt256();
            let nodes = decoder.readVector(Codecs.PublicKey.decode);
            return { kind: 'catchain.config.global', tag, nodes };
        },
    } as TLCodec<catchain_config_global>,

    dummyworkchain0_config_global: {
        encode: (src: dummyworkchain0_config_global, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.zeroStateHash);
        },
        decode: (decoder: TLReadBuffer): dummyworkchain0_config_global => {
            let zeroStateHash = decoder.readInt256();
            return { kind: 'dummyworkchain0.config.global', zeroStateHash };
        },
    } as TLCodec<dummyworkchain0_config_global>,

    validator_config_global: {
        encode: (src: validator_config_global, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.zeroState, encoder);
            Codecs.tonNode_blockIdExt.encode(src.initBlock, encoder);
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.hardforks);
        },
        decode: (decoder: TLReadBuffer): validator_config_global => {
            let zeroState = Codecs.tonNode_blockIdExt.decode(decoder);
            let initBlock = Codecs.tonNode_blockIdExt.decode(decoder);
            let hardforks = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            return { kind: 'validator.config.global', zeroState, initBlock, hardforks };
        },
    } as TLCodec<validator_config_global>,

    config_global: {
        encode: (src: config_global, encoder: TLWriteBuffer) => {
            Codecs.adnl_config_global.encode(src.adnl, encoder);
            Codecs.dht_config_Global.encode(src.dht, encoder);
            Codecs.validator_config_global.encode(src.validator, encoder);
        },
        decode: (decoder: TLReadBuffer): config_global => {
            let adnl = Codecs.adnl_config_global.decode(decoder);
            let dht = Codecs.dht_config_Global.decode(decoder);
            let validator = Codecs.validator_config_global.decode(decoder);
            return { kind: 'config.global', adnl, dht, validator };
        },
    } as TLCodec<config_global>,

    liteserver_desc: {
        encode: (src: liteserver_desc, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.id, encoder);
            encoder.writeInt32(src.ip);
            encoder.writeInt32(src.port);
        },
        decode: (decoder: TLReadBuffer): liteserver_desc => {
            let id = Codecs.PublicKey.decode(decoder);
            let ip = decoder.readInt32();
            let port = decoder.readInt32();
            return { kind: 'liteserver.desc', id, ip, port };
        },
    } as TLCodec<liteserver_desc>,

    liteclient_config_global: {
        encode: (src: liteclient_config_global, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.liteserver_desc.encode, src.liteservers);
            Codecs.validator_config_global.encode(src.validator, encoder);
        },
        decode: (decoder: TLReadBuffer): liteclient_config_global => {
            let liteservers = decoder.readVector(Codecs.liteserver_desc.decode);
            let validator = Codecs.validator_config_global.decode(decoder);
            return { kind: 'liteclient.config.global', liteservers, validator };
        },
    } as TLCodec<liteclient_config_global>,

    engine_adnl: {
        encode: (src: engine_adnl, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeInt32(src.category);
        },
        decode: (decoder: TLReadBuffer): engine_adnl => {
            let id = decoder.readInt256();
            let category = decoder.readInt32();
            return { kind: 'engine.adnl', id, category };
        },
    } as TLCodec<engine_adnl>,

    engine_addr: {
        encode: (src: engine_addr, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.ip);
            encoder.writeInt32(src.port);
            encoder.writeVector((s, d) => d.writeInt32(s), src.categories);
            encoder.writeVector((s, d) => d.writeInt32(s), src.priorityCategories);
        },
        decode: (decoder: TLReadBuffer): engine_addr => {
            let ip = decoder.readInt32();
            let port = decoder.readInt32();
            let categories = decoder.readVector((d) => d.readInt32());
            let priorityCategories = decoder.readVector((d) => d.readInt32());
            return { kind: 'engine.addr', ip, port, categories, priorityCategories };
        },
    } as TLCodec<engine_addr>,

    engine_addrProxy: {
        encode: (src: engine_addrProxy, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.inIp);
            encoder.writeInt32(src.inPort);
            encoder.writeInt32(src.outIp);
            encoder.writeInt32(src.outPort);
            Codecs.adnl_Proxy.encode(src.proxyType, encoder);
            encoder.writeVector((s, d) => d.writeInt32(s), src.categories);
            encoder.writeVector((s, d) => d.writeInt32(s), src.priorityCategories);
        },
        decode: (decoder: TLReadBuffer): engine_addrProxy => {
            let inIp = decoder.readInt32();
            let inPort = decoder.readInt32();
            let outIp = decoder.readInt32();
            let outPort = decoder.readInt32();
            let proxyType = Codecs.adnl_Proxy.decode(decoder);
            let categories = decoder.readVector((d) => d.readInt32());
            let priorityCategories = decoder.readVector((d) => d.readInt32());
            return { kind: 'engine.addrProxy', inIp, inPort, outIp, outPort, proxyType, categories, priorityCategories };
        },
    } as TLCodec<engine_addrProxy>,

    engine_dht: {
        encode: (src: engine_dht, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
        },
        decode: (decoder: TLReadBuffer): engine_dht => {
            let id = decoder.readInt256();
            return { kind: 'engine.dht', id };
        },
    } as TLCodec<engine_dht>,

    engine_validatorTempKey: {
        encode: (src: engine_validatorTempKey, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.key);
            encoder.writeInt32(src.expireAt);
        },
        decode: (decoder: TLReadBuffer): engine_validatorTempKey => {
            let key = decoder.readInt256();
            let expireAt = decoder.readInt32();
            return { kind: 'engine.validatorTempKey', key, expireAt };
        },
    } as TLCodec<engine_validatorTempKey>,

    engine_validatorAdnlAddress: {
        encode: (src: engine_validatorAdnlAddress, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeInt32(src.expireAt);
        },
        decode: (decoder: TLReadBuffer): engine_validatorAdnlAddress => {
            let id = decoder.readInt256();
            let expireAt = decoder.readInt32();
            return { kind: 'engine.validatorAdnlAddress', id, expireAt };
        },
    } as TLCodec<engine_validatorAdnlAddress>,

    engine_validator: {
        encode: (src: engine_validator, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeVector(Codecs.engine_validatorTempKey.encode, src.tempKeys);
            encoder.writeVector(Codecs.engine_validatorAdnlAddress.encode, src.adnlAddrs);
            encoder.writeInt32(src.electionDate);
            encoder.writeInt32(src.expireAt);
        },
        decode: (decoder: TLReadBuffer): engine_validator => {
            let id = decoder.readInt256();
            let tempKeys = decoder.readVector(Codecs.engine_validatorTempKey.decode);
            let adnlAddrs = decoder.readVector(Codecs.engine_validatorAdnlAddress.decode);
            let electionDate = decoder.readInt32();
            let expireAt = decoder.readInt32();
            return { kind: 'engine.validator', id, tempKeys, adnlAddrs, electionDate, expireAt };
        },
    } as TLCodec<engine_validator>,

    engine_liteServer: {
        encode: (src: engine_liteServer, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeInt32(src.port);
        },
        decode: (decoder: TLReadBuffer): engine_liteServer => {
            let id = decoder.readInt256();
            let port = decoder.readInt32();
            return { kind: 'engine.liteServer', id, port };
        },
    } as TLCodec<engine_liteServer>,

    engine_controlProcess: {
        encode: (src: engine_controlProcess, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeInt32(src.permissions);
        },
        decode: (decoder: TLReadBuffer): engine_controlProcess => {
            let id = decoder.readInt256();
            let permissions = decoder.readInt32();
            return { kind: 'engine.controlProcess', id, permissions };
        },
    } as TLCodec<engine_controlProcess>,

    engine_controlInterface: {
        encode: (src: engine_controlInterface, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeInt32(src.port);
            encoder.writeVector(Codecs.engine_controlProcess.encode, src.allowed);
        },
        decode: (decoder: TLReadBuffer): engine_controlInterface => {
            let id = decoder.readInt256();
            let port = decoder.readInt32();
            let allowed = decoder.readVector(Codecs.engine_controlProcess.decode);
            return { kind: 'engine.controlInterface', id, port, allowed };
        },
    } as TLCodec<engine_controlInterface>,

    engine_gc: {
        encode: (src: engine_gc, encoder: TLWriteBuffer) => {
            encoder.writeVector((s, d) => d.writeInt256(s), src.ids);
        },
        decode: (decoder: TLReadBuffer): engine_gc => {
            let ids = decoder.readVector((d) => d.readInt256());
            return { kind: 'engine.gc', ids };
        },
    } as TLCodec<engine_gc>,

    engine_dht_config: {
        encode: (src: engine_dht_config, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.engine_dht.encode, src.dht);
            Codecs.engine_gc.encode(src.gc, encoder);
        },
        decode: (decoder: TLReadBuffer): engine_dht_config => {
            let dht = decoder.readVector(Codecs.engine_dht.decode);
            let gc = Codecs.engine_gc.decode(decoder);
            return { kind: 'engine.dht.config', dht, gc };
        },
    } as TLCodec<engine_dht_config>,

    engine_validator_fullNodeMaster: {
        encode: (src: engine_validator_fullNodeMaster, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.port);
            encoder.writeInt256(src.adnl);
        },
        decode: (decoder: TLReadBuffer): engine_validator_fullNodeMaster => {
            let port = decoder.readInt32();
            let adnl = decoder.readInt256();
            return { kind: 'engine.validator.fullNodeMaster', port, adnl };
        },
    } as TLCodec<engine_validator_fullNodeMaster>,

    engine_validator_fullNodeSlave: {
        encode: (src: engine_validator_fullNodeSlave, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.ip);
            encoder.writeInt32(src.port);
            Codecs.PublicKey.encode(src.adnl, encoder);
        },
        decode: (decoder: TLReadBuffer): engine_validator_fullNodeSlave => {
            let ip = decoder.readInt32();
            let port = decoder.readInt32();
            let adnl = Codecs.PublicKey.decode(decoder);
            return { kind: 'engine.validator.fullNodeSlave', ip, port, adnl };
        },
    } as TLCodec<engine_validator_fullNodeSlave>,

    engine_validator_config: {
        encode: (src: engine_validator_config, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.outPort);
            encoder.writeVector(Codecs.engine_Addr.encode, src.addrs);
            encoder.writeVector(Codecs.engine_adnl.encode, src.adnl);
            encoder.writeVector(Codecs.engine_dht.encode, src.dht);
            encoder.writeVector(Codecs.engine_validator.encode, src.validators);
            encoder.writeInt256(src.fullnode);
            encoder.writeVector(Codecs.engine_validator_fullNodeSlave.encode, src.fullnodeslaves);
            encoder.writeVector(Codecs.engine_validator_fullNodeMaster.encode, src.fullnodemasters);
            encoder.writeVector(Codecs.engine_liteServer.encode, src.liteservers);
            encoder.writeVector(Codecs.engine_controlInterface.encode, src.control);
            Codecs.engine_gc.encode(src.gc, encoder);
        },
        decode: (decoder: TLReadBuffer): engine_validator_config => {
            let outPort = decoder.readInt32();
            let addrs = decoder.readVector(Codecs.engine_Addr.decode);
            let adnl = decoder.readVector(Codecs.engine_adnl.decode);
            let dht = decoder.readVector(Codecs.engine_dht.decode);
            let validators = decoder.readVector(Codecs.engine_validator.decode);
            let fullnode = decoder.readInt256();
            let fullnodeslaves = decoder.readVector(Codecs.engine_validator_fullNodeSlave.decode);
            let fullnodemasters = decoder.readVector(Codecs.engine_validator_fullNodeMaster.decode);
            let liteservers = decoder.readVector(Codecs.engine_liteServer.decode);
            let control = decoder.readVector(Codecs.engine_controlInterface.decode);
            let gc = Codecs.engine_gc.decode(decoder);
            return { kind: 'engine.validator.config', outPort, addrs, adnl, dht, validators, fullnode, fullnodeslaves, fullnodemasters, liteservers, control, gc };
        },
    } as TLCodec<engine_validator_config>,

    engine_adnlProxy_port: {
        encode: (src: engine_adnlProxy_port, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.inPort);
            encoder.writeInt32(src.outPort);
            encoder.writeInt32(src.dstIp);
            encoder.writeInt32(src.dstPort);
            Codecs.adnl_Proxy.encode(src.proxyType, encoder);
        },
        decode: (decoder: TLReadBuffer): engine_adnlProxy_port => {
            let inPort = decoder.readInt32();
            let outPort = decoder.readInt32();
            let dstIp = decoder.readInt32();
            let dstPort = decoder.readInt32();
            let proxyType = Codecs.adnl_Proxy.decode(decoder);
            return { kind: 'engine.adnlProxy.port', inPort, outPort, dstIp, dstPort, proxyType };
        },
    } as TLCodec<engine_adnlProxy_port>,

    engine_adnlProxy_config: {
        encode: (src: engine_adnlProxy_config, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.engine_adnlProxy_port.encode, src.ports);
        },
        decode: (decoder: TLReadBuffer): engine_adnlProxy_config => {
            let ports = decoder.readVector(Codecs.engine_adnlProxy_port.decode);
            return { kind: 'engine.adnlProxy.config', ports };
        },
    } as TLCodec<engine_adnlProxy_config>,

    adnl_pong: {
        encode: (src: adnl_pong, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.value);
        },
        decode: (decoder: TLReadBuffer): adnl_pong => {
            let value = decoder.readInt64();
            return { kind: 'adnl.pong', value };
        },
    } as TLCodec<adnl_pong>,

    engine_validator_keyHash: {
        encode: (src: engine_validator_keyHash, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
        },
        decode: (decoder: TLReadBuffer): engine_validator_keyHash => {
            let keyHash = decoder.readInt256();
            return { kind: 'engine.validator.keyHash', keyHash };
        },
    } as TLCodec<engine_validator_keyHash>,

    engine_validator_signature: {
        encode: (src: engine_validator_signature, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): engine_validator_signature => {
            let signature = decoder.readBuffer();
            return { kind: 'engine.validator.signature', signature };
        },
    } as TLCodec<engine_validator_signature>,

    engine_validator_oneStat: {
        encode: (src: engine_validator_oneStat, encoder: TLWriteBuffer) => {
            encoder.writeString(src.key);
            encoder.writeString(src.value);
        },
        decode: (decoder: TLReadBuffer): engine_validator_oneStat => {
            let key = decoder.readString();
            let value = decoder.readString();
            return { kind: 'engine.validator.oneStat', key, value };
        },
    } as TLCodec<engine_validator_oneStat>,

    engine_validator_stats: {
        encode: (src: engine_validator_stats, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.engine_validator_oneStat.encode, src.stats);
        },
        decode: (decoder: TLReadBuffer): engine_validator_stats => {
            let stats = decoder.readVector(Codecs.engine_validator_oneStat.decode);
            return { kind: 'engine.validator.stats', stats };
        },
    } as TLCodec<engine_validator_stats>,

    engine_validator_controlQueryError: {
        encode: (src: engine_validator_controlQueryError, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.code);
            encoder.writeString(src.message);
        },
        decode: (decoder: TLReadBuffer): engine_validator_controlQueryError => {
            let code = decoder.readInt32();
            let message = decoder.readString();
            return { kind: 'engine.validator.controlQueryError', code, message };
        },
    } as TLCodec<engine_validator_controlQueryError>,

    engine_validator_time: {
        encode: (src: engine_validator_time, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.time);
        },
        decode: (decoder: TLReadBuffer): engine_validator_time => {
            let time = decoder.readInt32();
            return { kind: 'engine.validator.time', time };
        },
    } as TLCodec<engine_validator_time>,

    engine_validator_success: {
        encode: (src: engine_validator_success, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): engine_validator_success => {
            return { kind: 'engine.validator.success',  };
        },
    } as TLCodec<engine_validator_success>,

    engine_validator_jsonConfig: {
        encode: (src: engine_validator_jsonConfig, encoder: TLWriteBuffer) => {
            encoder.writeString(src.data);
        },
        decode: (decoder: TLReadBuffer): engine_validator_jsonConfig => {
            let data = decoder.readString();
            return { kind: 'engine.validator.jsonConfig', data };
        },
    } as TLCodec<engine_validator_jsonConfig>,

    engine_validator_electionBid: {
        encode: (src: engine_validator_electionBid, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.electionDate);
            encoder.writeInt256(src.permKey);
            encoder.writeInt256(src.adnlAddr);
            encoder.writeBuffer(src.toSendPayload);
        },
        decode: (decoder: TLReadBuffer): engine_validator_electionBid => {
            let electionDate = decoder.readInt32();
            let permKey = decoder.readInt256();
            let adnlAddr = decoder.readInt256();
            let toSendPayload = decoder.readBuffer();
            return { kind: 'engine.validator.electionBid', electionDate, permKey, adnlAddr, toSendPayload };
        },
    } as TLCodec<engine_validator_electionBid>,

    engine_validator_proposalVote: {
        encode: (src: engine_validator_proposalVote, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.permKey);
            encoder.writeBuffer(src.toSend);
        },
        decode: (decoder: TLReadBuffer): engine_validator_proposalVote => {
            let permKey = decoder.readInt256();
            let toSend = decoder.readBuffer();
            return { kind: 'engine.validator.proposalVote', permKey, toSend };
        },
    } as TLCodec<engine_validator_proposalVote>,

    engine_validator_dhtServerStatus: {
        encode: (src: engine_validator_dhtServerStatus, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeInt32(src.status);
        },
        decode: (decoder: TLReadBuffer): engine_validator_dhtServerStatus => {
            let id = decoder.readInt256();
            let status = decoder.readInt32();
            return { kind: 'engine.validator.dhtServerStatus', id, status };
        },
    } as TLCodec<engine_validator_dhtServerStatus>,

    engine_validator_dhtServersStatus: {
        encode: (src: engine_validator_dhtServersStatus, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.engine_validator_dhtServerStatus.encode, src.servers);
        },
        decode: (decoder: TLReadBuffer): engine_validator_dhtServersStatus => {
            let servers = decoder.readVector(Codecs.engine_validator_dhtServerStatus.decode);
            return { kind: 'engine.validator.dhtServersStatus', servers };
        },
    } as TLCodec<engine_validator_dhtServersStatus>,

    engine_validator_overlayStatsNode: {
        encode: (src: engine_validator_overlayStatsNode, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.adnlId);
            encoder.writeString(src.ipAddr);
            encoder.writeInt32(src.bdcstErrors);
            encoder.writeInt32(src.fecBdcstErrors);
            encoder.writeInt32(src.lastInQuery);
            encoder.writeInt32(src.lastOutQuery);
            encoder.writeInt32(src.tOutBytes);
            encoder.writeInt32(src.tInBytes);
            encoder.writeInt32(src.tOutPckts);
            encoder.writeInt32(src.tInPckts);
        },
        decode: (decoder: TLReadBuffer): engine_validator_overlayStatsNode => {
            let adnlId = decoder.readInt256();
            let ipAddr = decoder.readString();
            let bdcstErrors = decoder.readInt32();
            let fecBdcstErrors = decoder.readInt32();
            let lastInQuery = decoder.readInt32();
            let lastOutQuery = decoder.readInt32();
            let tOutBytes = decoder.readInt32();
            let tInBytes = decoder.readInt32();
            let tOutPckts = decoder.readInt32();
            let tInPckts = decoder.readInt32();
            return { kind: 'engine.validator.overlayStatsNode', adnlId, ipAddr, bdcstErrors, fecBdcstErrors, lastInQuery, lastOutQuery, tOutBytes, tInBytes, tOutPckts, tInPckts };
        },
    } as TLCodec<engine_validator_overlayStatsNode>,

    engine_validator_overlayStats: {
        encode: (src: engine_validator_overlayStats, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.overlayId);
            Codecs.PublicKey.encode(src.overlayIdFull, encoder);
            encoder.writeInt256(src.adnlId);
            encoder.writeString(src.scope);
            encoder.writeVector(Codecs.engine_validator_overlayStatsNode.encode, src.nodes);
            encoder.writeVector(Codecs.engine_validator_oneStat.encode, src.stats);
        },
        decode: (decoder: TLReadBuffer): engine_validator_overlayStats => {
            let overlayId = decoder.readInt256();
            let overlayIdFull = Codecs.PublicKey.decode(decoder);
            let adnlId = decoder.readInt256();
            let scope = decoder.readString();
            let nodes = decoder.readVector(Codecs.engine_validator_overlayStatsNode.decode);
            let stats = decoder.readVector(Codecs.engine_validator_oneStat.decode);
            return { kind: 'engine.validator.overlayStats', overlayId, overlayIdFull, adnlId, scope, nodes, stats };
        },
    } as TLCodec<engine_validator_overlayStats>,

    engine_validator_overlaysStats: {
        encode: (src: engine_validator_overlaysStats, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.engine_validator_overlayStats.encode, src.overlays);
        },
        decode: (decoder: TLReadBuffer): engine_validator_overlaysStats => {
            let overlays = decoder.readVector(Codecs.engine_validator_overlayStats.decode);
            return { kind: 'engine.validator.overlaysStats', overlays };
        },
    } as TLCodec<engine_validator_overlaysStats>,

    engine_validator_onePerfTimerStat: {
        encode: (src: engine_validator_onePerfTimerStat, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.time);
            Codecs.double.encode(src.min, encoder);
            Codecs.double.encode(src.avg, encoder);
            Codecs.double.encode(src.max, encoder);
        },
        decode: (decoder: TLReadBuffer): engine_validator_onePerfTimerStat => {
            let time = decoder.readInt32();
            let min = Codecs.double.decode(decoder);
            let avg = Codecs.double.decode(decoder);
            let max = Codecs.double.decode(decoder);
            return { kind: 'engine.validator.onePerfTimerStat', time, min, avg, max };
        },
    } as TLCodec<engine_validator_onePerfTimerStat>,

    engine_validator_perfTimerStatsByName: {
        encode: (src: engine_validator_perfTimerStatsByName, encoder: TLWriteBuffer) => {
            encoder.writeString(src.name);
            encoder.writeVector(Codecs.engine_validator_OnePerfTimerStat.encode, src.stats);
        },
        decode: (decoder: TLReadBuffer): engine_validator_perfTimerStatsByName => {
            let name = decoder.readString();
            let stats = decoder.readVector(Codecs.engine_validator_OnePerfTimerStat.decode);
            return { kind: 'engine.validator.perfTimerStatsByName', name, stats };
        },
    } as TLCodec<engine_validator_perfTimerStatsByName>,

    engine_validator_perfTimerStats: {
        encode: (src: engine_validator_perfTimerStats, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.engine_validator_PerfTimerStatsByName.encode, src.stats);
        },
        decode: (decoder: TLReadBuffer): engine_validator_perfTimerStats => {
            let stats = decoder.readVector(Codecs.engine_validator_PerfTimerStatsByName.decode);
            return { kind: 'engine.validator.perfTimerStats', stats };
        },
    } as TLCodec<engine_validator_perfTimerStats>,

    storage_pong: {
        encode: (src: storage_pong, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_pong => {
            return { kind: 'storage.pong',  };
        },
    } as TLCodec<storage_pong>,

    storage_ok: {
        encode: (src: storage_ok, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_ok => {
            return { kind: 'storage.ok',  };
        },
    } as TLCodec<storage_ok>,

    storage_state: {
        encode: (src: storage_state, encoder: TLWriteBuffer) => {
            encoder.writeBool(src.willUpload);
            encoder.writeBool(src.wantDownload);
        },
        decode: (decoder: TLReadBuffer): storage_state => {
            let willUpload = decoder.readBool();
            let wantDownload = decoder.readBool();
            return { kind: 'storage.state', willUpload, wantDownload };
        },
    } as TLCodec<storage_state>,

    storage_piece: {
        encode: (src: storage_piece, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.proof);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): storage_piece => {
            let proof = decoder.readBuffer();
            let data = decoder.readBuffer();
            return { kind: 'storage.piece', proof, data };
        },
    } as TLCodec<storage_piece>,

    storage_torrentInfo: {
        encode: (src: storage_torrentInfo, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): storage_torrentInfo => {
            let data = decoder.readBuffer();
            return { kind: 'storage.torrentInfo', data };
        },
    } as TLCodec<storage_torrentInfo>,

    storage_updateInit: {
        encode: (src: storage_updateInit, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.havePieces);
            encoder.writeInt32(src.havePiecesOffset);
            Codecs.storage_State.encode(src.state, encoder);
        },
        decode: (decoder: TLReadBuffer): storage_updateInit => {
            let havePieces = decoder.readBuffer();
            let havePiecesOffset = decoder.readInt32();
            let state = Codecs.storage_State.decode(decoder);
            return { kind: 'storage.updateInit', havePieces, havePiecesOffset, state };
        },
    } as TLCodec<storage_updateInit>,

    storage_updateHavePieces: {
        encode: (src: storage_updateHavePieces, encoder: TLWriteBuffer) => {
            encoder.writeVector((s, d) => d.writeInt32(s), src.pieceId);
        },
        decode: (decoder: TLReadBuffer): storage_updateHavePieces => {
            let pieceId = decoder.readVector((d) => d.readInt32());
            return { kind: 'storage.updateHavePieces', pieceId };
        },
    } as TLCodec<storage_updateHavePieces>,

    storage_updateState: {
        encode: (src: storage_updateState, encoder: TLWriteBuffer) => {
            Codecs.storage_State.encode(src.state, encoder);
        },
        decode: (decoder: TLReadBuffer): storage_updateState => {
            let state = Codecs.storage_State.decode(decoder);
            return { kind: 'storage.updateState', state };
        },
    } as TLCodec<storage_updateState>,

    http_header: {
        encode: (src: http_header, encoder: TLWriteBuffer) => {
            encoder.writeString(src.name);
            encoder.writeString(src.value);
        },
        decode: (decoder: TLReadBuffer): http_header => {
            let name = decoder.readString();
            let value = decoder.readString();
            return { kind: 'http.header', name, value };
        },
    } as TLCodec<http_header>,

    http_payloadPart: {
        encode: (src: http_payloadPart, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
            encoder.writeVector(Codecs.http_header.encode, src.trailer);
            encoder.writeBool(src.last);
        },
        decode: (decoder: TLReadBuffer): http_payloadPart => {
            let data = decoder.readBuffer();
            let trailer = decoder.readVector(Codecs.http_header.decode);
            let last = decoder.readBool();
            return { kind: 'http.payloadPart', data, trailer, last };
        },
    } as TLCodec<http_payloadPart>,

    http_response: {
        encode: (src: http_response, encoder: TLWriteBuffer) => {
            encoder.writeString(src.httpVersion);
            encoder.writeInt32(src.statusCode);
            encoder.writeString(src.reason);
            encoder.writeVector(Codecs.http_header.encode, src.headers);
            encoder.writeBool(src.noPayload);
        },
        decode: (decoder: TLReadBuffer): http_response => {
            let httpVersion = decoder.readString();
            let statusCode = decoder.readInt32();
            let reason = decoder.readString();
            let headers = decoder.readVector(Codecs.http_header.decode);
            let noPayload = decoder.readBool();
            return { kind: 'http.response', httpVersion, statusCode, reason, headers, noPayload };
        },
    } as TLCodec<http_response>,

    http_proxy_capabilities: {
        encode: (src: http_proxy_capabilities, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.capabilities);
        },
        decode: (decoder: TLReadBuffer): http_proxy_capabilities => {
            let capabilities = decoder.readInt64();
            return { kind: 'http.proxy.capabilities', capabilities };
        },
    } as TLCodec<http_proxy_capabilities>,

    http_server_dnsEntry: {
        encode: (src: http_server_dnsEntry, encoder: TLWriteBuffer) => {
            encoder.writeString(src.domain);
            Codecs.adnl_id_short.encode(src.addr, encoder);
        },
        decode: (decoder: TLReadBuffer): http_server_dnsEntry => {
            let domain = decoder.readString();
            let addr = Codecs.adnl_id_short.decode(decoder);
            return { kind: 'http.server.dnsEntry', domain, addr };
        },
    } as TLCodec<http_server_dnsEntry>,

    http_server_host: {
        encode: (src: http_server_host, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.TLString.encode, src.domains);
            encoder.writeInt32(src.ip);
            encoder.writeInt32(src.port);
            Codecs.adnl_id_short.encode(src.adnlId, encoder);
        },
        decode: (decoder: TLReadBuffer): http_server_host => {
            let domains = decoder.readVector(Codecs.TLString.decode);
            let ip = decoder.readInt32();
            let port = decoder.readInt32();
            let adnlId = Codecs.adnl_id_short.decode(decoder);
            return { kind: 'http.server.host', domains, ip, port, adnlId };
        },
    } as TLCodec<http_server_host>,

    http_server_config: {
        encode: (src: http_server_config, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.http_server_dnsEntry.encode, src.dhs);
            encoder.writeVector(Codecs.http_server_host.encode, src.localHosts);
        },
        decode: (decoder: TLReadBuffer): http_server_config => {
            let dhs = decoder.readVector(Codecs.http_server_dnsEntry.decode);
            let localHosts = decoder.readVector(Codecs.http_server_host.decode);
            return { kind: 'http.server.config', dhs, localHosts };
        },
    } as TLCodec<http_server_config>,

    validatorSession_statsProducer: {
        encode: (src: validatorSession_statsProducer, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeInt32(src.blockStatus);
            encoder.writeInt64(src.blockTimestamp);
        },
        decode: (decoder: TLReadBuffer): validatorSession_statsProducer => {
            let id = decoder.readInt256();
            let blockStatus = decoder.readInt32();
            let blockTimestamp = decoder.readInt64();
            return { kind: 'validatorSession.statsProducer', id, blockStatus, blockTimestamp };
        },
    } as TLCodec<validatorSession_statsProducer>,

    validatorSession_statsRound: {
        encode: (src: validatorSession_statsRound, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.timestamp);
            encoder.writeVector(Codecs.validatorSession_statsProducer.encode, src.producers);
        },
        decode: (decoder: TLReadBuffer): validatorSession_statsRound => {
            let timestamp = decoder.readInt64();
            let producers = decoder.readVector(Codecs.validatorSession_statsProducer.decode);
            return { kind: 'validatorSession.statsRound', timestamp, producers };
        },
    } as TLCodec<validatorSession_statsRound>,

    validatorSession_stats: {
        encode: (src: validatorSession_stats, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockId.encode(src.id, encoder);
            encoder.writeInt64(src.timestamp);
            encoder.writeInt256(src.self);
            encoder.writeInt256(src.creator);
            encoder.writeInt32(src.totalValidators);
            encoder.writeInt64(src.totalWeight);
            encoder.writeInt32(src.signatures);
            encoder.writeInt64(src.signaturesWeight);
            encoder.writeInt32(src.approveSignatures);
            encoder.writeInt64(src.approveSignaturesWeight);
            encoder.writeInt32(src.firstRound);
            encoder.writeVector(Codecs.validatorSession_statsRound.encode, src.rounds);
        },
        decode: (decoder: TLReadBuffer): validatorSession_stats => {
            let id = Codecs.tonNode_blockId.decode(decoder);
            let timestamp = decoder.readInt64();
            let self = decoder.readInt256();
            let creator = decoder.readInt256();
            let totalValidators = decoder.readInt32();
            let totalWeight = decoder.readInt64();
            let signatures = decoder.readInt32();
            let signaturesWeight = decoder.readInt64();
            let approveSignatures = decoder.readInt32();
            let approveSignaturesWeight = decoder.readInt64();
            let firstRound = decoder.readInt32();
            let rounds = decoder.readVector(Codecs.validatorSession_statsRound.decode);
            return { kind: 'validatorSession.stats', id, timestamp, self, creator, totalValidators, totalWeight, signatures, signaturesWeight, approveSignatures, approveSignaturesWeight, firstRound, rounds };
        },
    } as TLCodec<validatorSession_stats>,

    storage_db_key_torrentList: {
        encode: (src: storage_db_key_torrentList, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_db_key_torrentList => {
            return { kind: 'storage.db.key.torrentList',  };
        },
    } as TLCodec<storage_db_key_torrentList>,

    storage_db_key_torrent: {
        encode: (src: storage_db_key_torrent, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): storage_db_key_torrent => {
            let hash = decoder.readInt256();
            return { kind: 'storage.db.key.torrent', hash };
        },
    } as TLCodec<storage_db_key_torrent>,

    storage_db_key_torrentMeta: {
        encode: (src: storage_db_key_torrentMeta, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): storage_db_key_torrentMeta => {
            let hash = decoder.readInt256();
            return { kind: 'storage.db.key.torrentMeta', hash };
        },
    } as TLCodec<storage_db_key_torrentMeta>,

    storage_db_key_priorities: {
        encode: (src: storage_db_key_priorities, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): storage_db_key_priorities => {
            let hash = decoder.readInt256();
            return { kind: 'storage.db.key.priorities', hash };
        },
    } as TLCodec<storage_db_key_priorities>,

    storage_db_key_piecesInDb: {
        encode: (src: storage_db_key_piecesInDb, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): storage_db_key_piecesInDb => {
            let hash = decoder.readInt256();
            return { kind: 'storage.db.key.piecesInDb', hash };
        },
    } as TLCodec<storage_db_key_piecesInDb>,

    storage_db_key_pieceInDb: {
        encode: (src: storage_db_key_pieceInDb, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeInt64(src.idx);
        },
        decode: (decoder: TLReadBuffer): storage_db_key_pieceInDb => {
            let hash = decoder.readInt256();
            let idx = decoder.readInt64();
            return { kind: 'storage.db.key.pieceInDb', hash, idx };
        },
    } as TLCodec<storage_db_key_pieceInDb>,

    storage_db_torrentList: {
        encode: (src: storage_db_torrentList, encoder: TLWriteBuffer) => {
            encoder.writeVector((s, d) => d.writeInt256(s), src.torrents);
        },
        decode: (decoder: TLReadBuffer): storage_db_torrentList => {
            let torrents = decoder.readVector((d) => d.readInt256());
            return { kind: 'storage.db.torrentList', torrents };
        },
    } as TLCodec<storage_db_torrentList>,

    storage_db_torrent: {
        encode: (src: storage_db_torrent, encoder: TLWriteBuffer) => {
            encoder.writeString(src.rootDir);
            encoder.writeBool(src.activeDownload);
            encoder.writeBool(src.activeUpload);
        },
        decode: (decoder: TLReadBuffer): storage_db_torrent => {
            let rootDir = decoder.readString();
            let activeDownload = decoder.readBool();
            let activeUpload = decoder.readBool();
            return { kind: 'storage.db.torrent', rootDir, activeDownload, activeUpload };
        },
    } as TLCodec<storage_db_torrent>,

    storage_db_priorities: {
        encode: (src: storage_db_priorities, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.storage_PriorityAction.encode, src.actions);
        },
        decode: (decoder: TLReadBuffer): storage_db_priorities => {
            let actions = decoder.readVector(Codecs.storage_PriorityAction.decode);
            return { kind: 'storage.db.priorities', actions };
        },
    } as TLCodec<storage_db_priorities>,

    storage_db_piecesInDb: {
        encode: (src: storage_db_piecesInDb, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.TLLong.encode, src.pieces);
        },
        decode: (decoder: TLReadBuffer): storage_db_piecesInDb => {
            let pieces = decoder.readVector(Codecs.TLLong.decode);
            return { kind: 'storage.db.piecesInDb', pieces };
        },
    } as TLCodec<storage_db_piecesInDb>,

    storage_priorityAction_all: {
        encode: (src: storage_priorityAction_all, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.priority);
        },
        decode: (decoder: TLReadBuffer): storage_priorityAction_all => {
            let priority = decoder.readInt32();
            return { kind: 'storage.priorityAction.all', priority };
        },
    } as TLCodec<storage_priorityAction_all>,

    storage_priorityAction_idx: {
        encode: (src: storage_priorityAction_idx, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.idx);
            encoder.writeInt32(src.priority);
        },
        decode: (decoder: TLReadBuffer): storage_priorityAction_idx => {
            let idx = decoder.readInt64();
            let priority = decoder.readInt32();
            return { kind: 'storage.priorityAction.idx', idx, priority };
        },
    } as TLCodec<storage_priorityAction_idx>,

    storage_priorityAction_name: {
        encode: (src: storage_priorityAction_name, encoder: TLWriteBuffer) => {
            encoder.writeString(src.name);
            encoder.writeInt32(src.priority);
        },
        decode: (decoder: TLReadBuffer): storage_priorityAction_name => {
            let name = decoder.readString();
            let priority = decoder.readInt32();
            return { kind: 'storage.priorityAction.name', name, priority };
        },
    } as TLCodec<storage_priorityAction_name>,

    storage_daemon_config: {
        encode: (src: storage_daemon_config, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.serverKey, encoder);
            encoder.writeInt256(src.cliKeyHash);
            encoder.writeString(src.providerAddress);
            Codecs.PublicKey.encode(src.adnlId, encoder);
            Codecs.PublicKey.encode(src.dhtId, encoder);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_config => {
            let serverKey = Codecs.PublicKey.decode(decoder);
            let cliKeyHash = decoder.readInt256();
            let providerAddress = decoder.readString();
            let adnlId = Codecs.PublicKey.decode(decoder);
            let dhtId = Codecs.PublicKey.decode(decoder);
            return { kind: 'storage.daemon.config', serverKey, cliKeyHash, providerAddress, adnlId, dhtId };
        },
    } as TLCodec<storage_daemon_config>,

    storage_daemon_provider_params: {
        encode: (src: storage_daemon_provider_params, encoder: TLWriteBuffer) => {
            encoder.writeBool(src.acceptNewContracts);
            encoder.writeString(src.ratePerMbDay);
            encoder.writeInt32(src.maxSpan);
            encoder.writeInt64(src.minimalFileSize);
            encoder.writeInt64(src.maximalFileSize);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_provider_params => {
            let acceptNewContracts = decoder.readBool();
            let ratePerMbDay = decoder.readString();
            let maxSpan = decoder.readInt32();
            let minimalFileSize = decoder.readInt64();
            let maximalFileSize = decoder.readInt64();
            return { kind: 'storage.daemon.provider.params', acceptNewContracts, ratePerMbDay, maxSpan, minimalFileSize, maximalFileSize };
        },
    } as TLCodec<storage_daemon_provider_params>,

    storage_provider_db_key_state: {
        encode: (src: storage_provider_db_key_state, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_key_state => {
            return { kind: 'storage.provider.db.key.state',  };
        },
    } as TLCodec<storage_provider_db_key_state>,

    storage_provider_db_key_contractList: {
        encode: (src: storage_provider_db_key_contractList, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_key_contractList => {
            return { kind: 'storage.provider.db.key.contractList',  };
        },
    } as TLCodec<storage_provider_db_key_contractList>,

    storage_provider_db_key_storageContract: {
        encode: (src: storage_provider_db_key_storageContract, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.wc);
            encoder.writeInt256(src.addr);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_key_storageContract => {
            let wc = decoder.readInt32();
            let addr = decoder.readInt256();
            return { kind: 'storage.provider.db.key.storageContract', wc, addr };
        },
    } as TLCodec<storage_provider_db_key_storageContract>,

    storage_provider_db_key_microchunkTree: {
        encode: (src: storage_provider_db_key_microchunkTree, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.wc);
            encoder.writeInt256(src.addr);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_key_microchunkTree => {
            let wc = decoder.readInt32();
            let addr = decoder.readInt256();
            return { kind: 'storage.provider.db.key.microchunkTree', wc, addr };
        },
    } as TLCodec<storage_provider_db_key_microchunkTree>,

    storage_provider_db_key_providerConfig: {
        encode: (src: storage_provider_db_key_providerConfig, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_key_providerConfig => {
            return { kind: 'storage.provider.db.key.providerConfig',  };
        },
    } as TLCodec<storage_provider_db_key_providerConfig>,

    storage_provider_db_state: {
        encode: (src: storage_provider_db_state, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.lastProcessedLt);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_state => {
            let lastProcessedLt = decoder.readInt64();
            return { kind: 'storage.provider.db.state', lastProcessedLt };
        },
    } as TLCodec<storage_provider_db_state>,

    storage_provider_db_contractAddress: {
        encode: (src: storage_provider_db_contractAddress, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.wc);
            encoder.writeInt256(src.addr);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_contractAddress => {
            let wc = decoder.readInt32();
            let addr = decoder.readInt256();
            return { kind: 'storage.provider.db.contractAddress', wc, addr };
        },
    } as TLCodec<storage_provider_db_contractAddress>,

    storage_provider_db_contractList: {
        encode: (src: storage_provider_db_contractList, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.storage_provider_db_contractAddress.encode, src.contracts);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_contractList => {
            let contracts = decoder.readVector(Codecs.storage_provider_db_contractAddress.decode);
            return { kind: 'storage.provider.db.contractList', contracts };
        },
    } as TLCodec<storage_provider_db_contractList>,

    storage_provider_db_storageContract: {
        encode: (src: storage_provider_db_storageContract, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.torrentHash);
            encoder.writeInt256(src.microchunkHash);
            encoder.writeInt32(src.createdTime);
            encoder.writeInt32(src.state);
            encoder.writeInt64(src.fileSize);
            encoder.writeString(src.rate);
            encoder.writeInt32(src.maxSpan);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_storageContract => {
            let torrentHash = decoder.readInt256();
            let microchunkHash = decoder.readInt256();
            let createdTime = decoder.readInt32();
            let state = decoder.readInt32();
            let fileSize = decoder.readInt64();
            let rate = decoder.readString();
            let maxSpan = decoder.readInt32();
            return { kind: 'storage.provider.db.storageContract', torrentHash, microchunkHash, createdTime, state, fileSize, rate, maxSpan };
        },
    } as TLCodec<storage_provider_db_storageContract>,

    storage_provider_db_microchunkTree: {
        encode: (src: storage_provider_db_microchunkTree, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_microchunkTree => {
            let data = decoder.readBuffer();
            return { kind: 'storage.provider.db.microchunkTree', data };
        },
    } as TLCodec<storage_provider_db_microchunkTree>,

    storage_daemon_queryError: {
        encode: (src: storage_daemon_queryError, encoder: TLWriteBuffer) => {
            encoder.writeString(src.message);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_queryError => {
            let message = decoder.readString();
            return { kind: 'storage.daemon.queryError', message };
        },
    } as TLCodec<storage_daemon_queryError>,

    storage_daemon_success: {
        encode: (src: storage_daemon_success, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_daemon_success => {
            return { kind: 'storage.daemon.success',  };
        },
    } as TLCodec<storage_daemon_success>,

    storage_daemon_torrent: {
        encode: (src: storage_daemon_torrent, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeUInt32(src.flags);
            (src.flags & (1 << 0)) && !!src.totalSize && encoder.writeInt64(src.totalSize);
            (src.flags & (1 << 0)) && !!src.description && encoder.writeString(src.description);
            (src.flags & (1 << 1)) && !!src.filesCount && encoder.writeInt64(src.filesCount);
            (src.flags & (1 << 1)) && !!src.includedSize && encoder.writeInt64(src.includedSize);
            (src.flags & (1 << 1)) && !!src.dirName && encoder.writeString(src.dirName);
            encoder.writeInt64(src.downloadedSize);
            encoder.writeString(src.rootDir);
            encoder.writeBool(src.activeDownload);
            encoder.writeBool(src.activeUpload);
            encoder.writeBool(src.completed);
            Codecs.double.encode(src.downloadSpeed, encoder);
            Codecs.double.encode(src.uploadSpeed, encoder);
            (src.flags & (1 << 2)) && !!src.fatalError && encoder.writeString(src.fatalError);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_torrent => {
            let hash = decoder.readInt256();
            let flags = decoder.readUInt32();
            let totalSize = (flags & (1 << 0)) ? decoder.readInt64() : null;
            let description = (flags & (1 << 0)) ? decoder.readString() : null;
            let filesCount = (flags & (1 << 1)) ? decoder.readInt64() : null;
            let includedSize = (flags & (1 << 1)) ? decoder.readInt64() : null;
            let dirName = (flags & (1 << 1)) ? decoder.readString() : null;
            let downloadedSize = decoder.readInt64();
            let rootDir = decoder.readString();
            let activeDownload = decoder.readBool();
            let activeUpload = decoder.readBool();
            let completed = decoder.readBool();
            let downloadSpeed = Codecs.double.decode(decoder);
            let uploadSpeed = Codecs.double.decode(decoder);
            let fatalError = (flags & (1 << 2)) ? decoder.readString() : null;
            return { kind: 'storage.daemon.torrent', hash, flags, totalSize, description, filesCount, includedSize, dirName, downloadedSize, rootDir, activeDownload, activeUpload, completed, downloadSpeed, uploadSpeed, fatalError };
        },
    } as TLCodec<storage_daemon_torrent>,

    storage_daemon_fileInfo: {
        encode: (src: storage_daemon_fileInfo, encoder: TLWriteBuffer) => {
            encoder.writeString(src.name);
            encoder.writeInt64(src.size);
            encoder.writeInt32(src.priority);
            encoder.writeInt64(src.downloadedSize);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_fileInfo => {
            let name = decoder.readString();
            let size = decoder.readInt64();
            let priority = decoder.readInt32();
            let downloadedSize = decoder.readInt64();
            return { kind: 'storage.daemon.fileInfo', name, size, priority, downloadedSize };
        },
    } as TLCodec<storage_daemon_fileInfo>,

    storage_daemon_torrentFull: {
        encode: (src: storage_daemon_torrentFull, encoder: TLWriteBuffer) => {
            Codecs.storage_daemon_torrent.encode(src.torrent, encoder);
            encoder.writeVector(Codecs.storage_daemon_fileInfo.encode, src.files);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_torrentFull => {
            let torrent = Codecs.storage_daemon_torrent.decode(decoder);
            let files = decoder.readVector(Codecs.storage_daemon_fileInfo.decode);
            return { kind: 'storage.daemon.torrentFull', torrent, files };
        },
    } as TLCodec<storage_daemon_torrentFull>,

    storage_daemon_torrentList: {
        encode: (src: storage_daemon_torrentList, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.storage_daemon_torrent.encode, src.torrents);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_torrentList => {
            let torrents = decoder.readVector(Codecs.storage_daemon_torrent.decode);
            return { kind: 'storage.daemon.torrentList', torrents };
        },
    } as TLCodec<storage_daemon_torrentList>,

    storage_daemon_torrentMeta: {
        encode: (src: storage_daemon_torrentMeta, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.meta);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_torrentMeta => {
            let meta = decoder.readBuffer();
            return { kind: 'storage.daemon.torrentMeta', meta };
        },
    } as TLCodec<storage_daemon_torrentMeta>,

    storage_daemon_newContractParams: {
        encode: (src: storage_daemon_newContractParams, encoder: TLWriteBuffer) => {
            encoder.writeString(src.rate);
            encoder.writeInt32(src.maxSpan);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_newContractParams => {
            let rate = decoder.readString();
            let maxSpan = decoder.readInt32();
            return { kind: 'storage.daemon.newContractParams', rate, maxSpan };
        },
    } as TLCodec<storage_daemon_newContractParams>,

    storage_daemon_newContractParamsAuto: {
        encode: (src: storage_daemon_newContractParamsAuto, encoder: TLWriteBuffer) => {
            encoder.writeString(src.providerAddress);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_newContractParamsAuto => {
            let providerAddress = decoder.readString();
            return { kind: 'storage.daemon.newContractParamsAuto', providerAddress };
        },
    } as TLCodec<storage_daemon_newContractParamsAuto>,

    storage_daemon_newContractMessage: {
        encode: (src: storage_daemon_newContractMessage, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.body);
            encoder.writeString(src.rate);
            encoder.writeInt32(src.maxSpan);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_newContractMessage => {
            let body = decoder.readBuffer();
            let rate = decoder.readString();
            let maxSpan = decoder.readInt32();
            return { kind: 'storage.daemon.newContractMessage', body, rate, maxSpan };
        },
    } as TLCodec<storage_daemon_newContractMessage>,

    storage_daemon_peer: {
        encode: (src: storage_daemon_peer, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.adnlId);
            encoder.writeString(src.ipStr);
            Codecs.double.encode(src.downloadSpeed, encoder);
            Codecs.double.encode(src.uploadSpeed, encoder);
            encoder.writeInt64(src.readyParts);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_peer => {
            let adnlId = decoder.readInt256();
            let ipStr = decoder.readString();
            let downloadSpeed = Codecs.double.decode(decoder);
            let uploadSpeed = Codecs.double.decode(decoder);
            let readyParts = decoder.readInt64();
            return { kind: 'storage.daemon.peer', adnlId, ipStr, downloadSpeed, uploadSpeed, readyParts };
        },
    } as TLCodec<storage_daemon_peer>,

    storage_daemon_peerList: {
        encode: (src: storage_daemon_peerList, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.storage_daemon_peer.encode, src.peers);
            Codecs.double.encode(src.downloadSpeed, encoder);
            Codecs.double.encode(src.uploadSpeed, encoder);
            encoder.writeInt64(src.totalParts);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_peerList => {
            let peers = decoder.readVector(Codecs.storage_daemon_peer.decode);
            let downloadSpeed = Codecs.double.decode(decoder);
            let uploadSpeed = Codecs.double.decode(decoder);
            let totalParts = decoder.readInt64();
            return { kind: 'storage.daemon.peerList', peers, downloadSpeed, uploadSpeed, totalParts };
        },
    } as TLCodec<storage_daemon_peerList>,

    storage_daemon_prioritySet: {
        encode: (src: storage_daemon_prioritySet, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_daemon_prioritySet => {
            return { kind: 'storage.daemon.prioritySet',  };
        },
    } as TLCodec<storage_daemon_prioritySet>,

    storage_daemon_priorityPending: {
        encode: (src: storage_daemon_priorityPending, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_daemon_priorityPending => {
            return { kind: 'storage.daemon.priorityPending',  };
        },
    } as TLCodec<storage_daemon_priorityPending>,

    storage_daemon_keyHash: {
        encode: (src: storage_daemon_keyHash, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_keyHash => {
            let keyHash = decoder.readInt256();
            return { kind: 'storage.daemon.keyHash', keyHash };
        },
    } as TLCodec<storage_daemon_keyHash>,

    storage_daemon_providerConfig: {
        encode: (src: storage_daemon_providerConfig, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.maxContracts);
            encoder.writeInt64(src.maxTotalSize);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_providerConfig => {
            let maxContracts = decoder.readInt32();
            let maxTotalSize = decoder.readInt64();
            return { kind: 'storage.daemon.providerConfig', maxContracts, maxTotalSize };
        },
    } as TLCodec<storage_daemon_providerConfig>,

    storage_daemon_contractInfo: {
        encode: (src: storage_daemon_contractInfo, encoder: TLWriteBuffer) => {
            encoder.writeString(src.address);
            encoder.writeInt32(src.state);
            encoder.writeInt256(src.torrent);
            encoder.writeInt32(src.createdTime);
            encoder.writeInt64(src.fileSize);
            encoder.writeInt64(src.downloadedSize);
            encoder.writeString(src.rate);
            encoder.writeInt32(src.maxSpan);
            encoder.writeString(src.clientBalance);
            encoder.writeString(src.contractBalance);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_contractInfo => {
            let address = decoder.readString();
            let state = decoder.readInt32();
            let torrent = decoder.readInt256();
            let createdTime = decoder.readInt32();
            let fileSize = decoder.readInt64();
            let downloadedSize = decoder.readInt64();
            let rate = decoder.readString();
            let maxSpan = decoder.readInt32();
            let clientBalance = decoder.readString();
            let contractBalance = decoder.readString();
            return { kind: 'storage.daemon.contractInfo', address, state, torrent, createdTime, fileSize, downloadedSize, rate, maxSpan, clientBalance, contractBalance };
        },
    } as TLCodec<storage_daemon_contractInfo>,

    storage_daemon_providerInfo: {
        encode: (src: storage_daemon_providerInfo, encoder: TLWriteBuffer) => {
            encoder.writeString(src.address);
            encoder.writeString(src.balance);
            Codecs.storage_daemon_providerConfig.encode(src.config, encoder);
            encoder.writeInt32(src.contractsCount);
            encoder.writeInt64(src.contractsTotalSize);
            encoder.writeVector(Codecs.storage_daemon_contractInfo.encode, src.contracts);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_providerInfo => {
            let address = decoder.readString();
            let balance = decoder.readString();
            let config = Codecs.storage_daemon_providerConfig.decode(decoder);
            let contractsCount = decoder.readInt32();
            let contractsTotalSize = decoder.readInt64();
            let contracts = decoder.readVector(Codecs.storage_daemon_contractInfo.decode);
            return { kind: 'storage.daemon.providerInfo', address, balance, config, contractsCount, contractsTotalSize, contracts };
        },
    } as TLCodec<storage_daemon_providerInfo>,

    storage_daemon_providerAddress: {
        encode: (src: storage_daemon_providerAddress, encoder: TLWriteBuffer) => {
            encoder.writeString(src.address);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_providerAddress => {
            let address = decoder.readString();
            return { kind: 'storage.daemon.providerAddress', address };
        },
    } as TLCodec<storage_daemon_providerAddress>,

    tcp_ping: {
        encode: (src: tcp_ping, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.randomId);
        },
        decode: (decoder: TLReadBuffer): tcp_ping => {
            let randomId = decoder.readInt64();
            return { kind: 'tcp.ping', randomId };
        },
    } as TLCodec<tcp_ping>,

    getTestObject: {
        encode: (src: getTestObject, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): getTestObject => {
            return { kind: 'getTestObject',  };
        },
    } as TLCodec<getTestObject>,

    dht_ping: {
        encode: (src: dht_ping, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.randomId);
        },
        decode: (decoder: TLReadBuffer): dht_ping => {
            let randomId = decoder.readInt64();
            return { kind: 'dht.ping', randomId };
        },
    } as TLCodec<dht_ping>,

    dht_store: {
        encode: (src: dht_store, encoder: TLWriteBuffer) => {
            Codecs.dht_value.encode(src.value, encoder);
        },
        decode: (decoder: TLReadBuffer): dht_store => {
            let value = Codecs.dht_value.decode(decoder);
            return { kind: 'dht.store', value };
        },
    } as TLCodec<dht_store>,

    dht_findNode: {
        encode: (src: dht_findNode, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.key);
            encoder.writeInt32(src.k);
        },
        decode: (decoder: TLReadBuffer): dht_findNode => {
            let key = decoder.readInt256();
            let k = decoder.readInt32();
            return { kind: 'dht.findNode', key, k };
        },
    } as TLCodec<dht_findNode>,

    dht_findValue: {
        encode: (src: dht_findValue, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.key);
            encoder.writeInt32(src.k);
        },
        decode: (decoder: TLReadBuffer): dht_findValue => {
            let key = decoder.readInt256();
            let k = decoder.readInt32();
            return { kind: 'dht.findValue', key, k };
        },
    } as TLCodec<dht_findValue>,

    dht_getSignedAddressList: {
        encode: (src: dht_getSignedAddressList, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): dht_getSignedAddressList => {
            return { kind: 'dht.getSignedAddressList',  };
        },
    } as TLCodec<dht_getSignedAddressList>,

    dht_registerReverseConnection: {
        encode: (src: dht_registerReverseConnection, encoder: TLWriteBuffer) => {
            Codecs.PublicKey.encode(src.node, encoder);
            encoder.writeInt32(src.ttl);
            encoder.writeBuffer(src.signature);
        },
        decode: (decoder: TLReadBuffer): dht_registerReverseConnection => {
            let node = Codecs.PublicKey.decode(decoder);
            let ttl = decoder.readInt32();
            let signature = decoder.readBuffer();
            return { kind: 'dht.registerReverseConnection', node, ttl, signature };
        },
    } as TLCodec<dht_registerReverseConnection>,

    dht_requestReversePing: {
        encode: (src: dht_requestReversePing, encoder: TLWriteBuffer) => {
            Codecs.adnl_Node.encode(src.target, encoder);
            encoder.writeBuffer(src.signature);
            encoder.writeInt256(src.client);
            encoder.writeInt32(src.k);
        },
        decode: (decoder: TLReadBuffer): dht_requestReversePing => {
            let target = Codecs.adnl_Node.decode(decoder);
            let signature = decoder.readBuffer();
            let client = decoder.readInt256();
            let k = decoder.readInt32();
            return { kind: 'dht.requestReversePing', target, signature, client, k };
        },
    } as TLCodec<dht_requestReversePing>,

    dht_query: {
        encode: (src: dht_query, encoder: TLWriteBuffer) => {
            Codecs.dht_node.encode(src.node, encoder);
        },
        decode: (decoder: TLReadBuffer): dht_query => {
            let node = Codecs.dht_node.decode(decoder);
            return { kind: 'dht.query', node };
        },
    } as TLCodec<dht_query>,

    overlay_getRandomPeers: {
        encode: (src: overlay_getRandomPeers, encoder: TLWriteBuffer) => {
            Codecs.overlay_nodes.encode(src.peers, encoder);
        },
        decode: (decoder: TLReadBuffer): overlay_getRandomPeers => {
            let peers = Codecs.overlay_nodes.decode(decoder);
            return { kind: 'overlay.getRandomPeers', peers };
        },
    } as TLCodec<overlay_getRandomPeers>,

    overlay_query: {
        encode: (src: overlay_query, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.overlay);
        },
        decode: (decoder: TLReadBuffer): overlay_query => {
            let overlay = decoder.readInt256();
            return { kind: 'overlay.query', overlay };
        },
    } as TLCodec<overlay_query>,

    overlay_getBroadcast: {
        encode: (src: overlay_getBroadcast, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): overlay_getBroadcast => {
            let hash = decoder.readInt256();
            return { kind: 'overlay.getBroadcast', hash };
        },
    } as TLCodec<overlay_getBroadcast>,

    overlay_getBroadcastList: {
        encode: (src: overlay_getBroadcastList, encoder: TLWriteBuffer) => {
            Codecs.overlay_broadcastList.encode(src.list, encoder);
        },
        decode: (decoder: TLReadBuffer): overlay_getBroadcastList => {
            let list = Codecs.overlay_broadcastList.decode(decoder);
            return { kind: 'overlay.getBroadcastList', list };
        },
    } as TLCodec<overlay_getBroadcastList>,

    catchain_getBlock: {
        encode: (src: catchain_getBlock, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.block);
        },
        decode: (decoder: TLReadBuffer): catchain_getBlock => {
            let block = decoder.readInt256();
            return { kind: 'catchain.getBlock', block };
        },
    } as TLCodec<catchain_getBlock>,

    catchain_getBlocks: {
        encode: (src: catchain_getBlocks, encoder: TLWriteBuffer) => {
            encoder.writeVector((s, d) => d.writeInt256(s), src.blocks);
        },
        decode: (decoder: TLReadBuffer): catchain_getBlocks => {
            let blocks = decoder.readVector((d) => d.readInt256());
            return { kind: 'catchain.getBlocks', blocks };
        },
    } as TLCodec<catchain_getBlocks>,

    catchain_getDifference: {
        encode: (src: catchain_getDifference, encoder: TLWriteBuffer) => {
            encoder.writeVector((s, d) => d.writeInt32(s), src.rt);
        },
        decode: (decoder: TLReadBuffer): catchain_getDifference => {
            let rt = decoder.readVector((d) => d.readInt32());
            return { kind: 'catchain.getDifference', rt };
        },
    } as TLCodec<catchain_getDifference>,

    catchain_getBlockHistory: {
        encode: (src: catchain_getBlockHistory, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.block);
            encoder.writeInt64(src.height);
            encoder.writeVector((s, d) => d.writeInt256(s), src.stopIf);
        },
        decode: (decoder: TLReadBuffer): catchain_getBlockHistory => {
            let block = decoder.readInt256();
            let height = decoder.readInt64();
            let stopIf = decoder.readVector((d) => d.readInt256());
            return { kind: 'catchain.getBlockHistory', block, height, stopIf };
        },
    } as TLCodec<catchain_getBlockHistory>,

    validatorSession_ping: {
        encode: (src: validatorSession_ping, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.hash);
        },
        decode: (decoder: TLReadBuffer): validatorSession_ping => {
            let hash = decoder.readInt64();
            return { kind: 'validatorSession.ping', hash };
        },
    } as TLCodec<validatorSession_ping>,

    validatorSession_downloadCandidate: {
        encode: (src: validatorSession_downloadCandidate, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.round);
            Codecs.validatorSession_candidateId.encode(src.id, encoder);
        },
        decode: (decoder: TLReadBuffer): validatorSession_downloadCandidate => {
            let round = decoder.readInt32();
            let id = Codecs.validatorSession_candidateId.decode(decoder);
            return { kind: 'validatorSession.downloadCandidate', round, id };
        },
    } as TLCodec<validatorSession_downloadCandidate>,

    tonNode_getNextBlockDescription: {
        encode: (src: tonNode_getNextBlockDescription, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.prevBlock, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_getNextBlockDescription => {
            let prevBlock = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.getNextBlockDescription', prevBlock };
        },
    } as TLCodec<tonNode_getNextBlockDescription>,

    tonNode_getNextBlocksDescription: {
        encode: (src: tonNode_getNextBlocksDescription, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.prevBlock, encoder);
            encoder.writeInt32(src.limit);
        },
        decode: (decoder: TLReadBuffer): tonNode_getNextBlocksDescription => {
            let prevBlock = Codecs.tonNode_blockIdExt.decode(decoder);
            let limit = decoder.readInt32();
            return { kind: 'tonNode.getNextBlocksDescription', prevBlock, limit };
        },
    } as TLCodec<tonNode_getNextBlocksDescription>,

    tonNode_getPrevBlocksDescription: {
        encode: (src: tonNode_getPrevBlocksDescription, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.nextBlock, encoder);
            encoder.writeInt32(src.limit);
            encoder.writeInt32(src.cutoffSeqno);
        },
        decode: (decoder: TLReadBuffer): tonNode_getPrevBlocksDescription => {
            let nextBlock = Codecs.tonNode_blockIdExt.decode(decoder);
            let limit = decoder.readInt32();
            let cutoffSeqno = decoder.readInt32();
            return { kind: 'tonNode.getPrevBlocksDescription', nextBlock, limit, cutoffSeqno };
        },
    } as TLCodec<tonNode_getPrevBlocksDescription>,

    tonNode_prepareBlockProof: {
        encode: (src: tonNode_prepareBlockProof, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
            encoder.writeBool(src.allowPartial);
        },
        decode: (decoder: TLReadBuffer): tonNode_prepareBlockProof => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            let allowPartial = decoder.readBool();
            return { kind: 'tonNode.prepareBlockProof', block, allowPartial };
        },
    } as TLCodec<tonNode_prepareBlockProof>,

    tonNode_prepareKeyBlockProof: {
        encode: (src: tonNode_prepareKeyBlockProof, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
            encoder.writeBool(src.allowPartial);
        },
        decode: (decoder: TLReadBuffer): tonNode_prepareKeyBlockProof => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            let allowPartial = decoder.readBool();
            return { kind: 'tonNode.prepareKeyBlockProof', block, allowPartial };
        },
    } as TLCodec<tonNode_prepareKeyBlockProof>,

    tonNode_prepareBlockProofs: {
        encode: (src: tonNode_prepareBlockProofs, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.blocks);
            encoder.writeBool(src.allowPartial);
        },
        decode: (decoder: TLReadBuffer): tonNode_prepareBlockProofs => {
            let blocks = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            let allowPartial = decoder.readBool();
            return { kind: 'tonNode.prepareBlockProofs', blocks, allowPartial };
        },
    } as TLCodec<tonNode_prepareBlockProofs>,

    tonNode_prepareKeyBlockProofs: {
        encode: (src: tonNode_prepareKeyBlockProofs, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.blocks);
            encoder.writeBool(src.allowPartial);
        },
        decode: (decoder: TLReadBuffer): tonNode_prepareKeyBlockProofs => {
            let blocks = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            let allowPartial = decoder.readBool();
            return { kind: 'tonNode.prepareKeyBlockProofs', blocks, allowPartial };
        },
    } as TLCodec<tonNode_prepareKeyBlockProofs>,

    tonNode_prepareBlock: {
        encode: (src: tonNode_prepareBlock, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_prepareBlock => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.prepareBlock', block };
        },
    } as TLCodec<tonNode_prepareBlock>,

    tonNode_prepareBlocks: {
        encode: (src: tonNode_prepareBlocks, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.blocks);
        },
        decode: (decoder: TLReadBuffer): tonNode_prepareBlocks => {
            let blocks = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            return { kind: 'tonNode.prepareBlocks', blocks };
        },
    } as TLCodec<tonNode_prepareBlocks>,

    tonNode_preparePersistentState: {
        encode: (src: tonNode_preparePersistentState, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
            Codecs.tonNode_blockIdExt.encode(src.masterchainBlock, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_preparePersistentState => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            let masterchainBlock = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.preparePersistentState', block, masterchainBlock };
        },
    } as TLCodec<tonNode_preparePersistentState>,

    tonNode_prepareZeroState: {
        encode: (src: tonNode_prepareZeroState, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_prepareZeroState => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.prepareZeroState', block };
        },
    } as TLCodec<tonNode_prepareZeroState>,

    tonNode_getNextKeyBlockIds: {
        encode: (src: tonNode_getNextKeyBlockIds, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
            encoder.writeInt32(src.maxSize);
        },
        decode: (decoder: TLReadBuffer): tonNode_getNextKeyBlockIds => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            let maxSize = decoder.readInt32();
            return { kind: 'tonNode.getNextKeyBlockIds', block, maxSize };
        },
    } as TLCodec<tonNode_getNextKeyBlockIds>,

    tonNode_downloadNextBlockFull: {
        encode: (src: tonNode_downloadNextBlockFull, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.prevBlock, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadNextBlockFull => {
            let prevBlock = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.downloadNextBlockFull', prevBlock };
        },
    } as TLCodec<tonNode_downloadNextBlockFull>,

    tonNode_downloadBlockFull: {
        encode: (src: tonNode_downloadBlockFull, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadBlockFull => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.downloadBlockFull', block };
        },
    } as TLCodec<tonNode_downloadBlockFull>,

    tonNode_downloadBlock: {
        encode: (src: tonNode_downloadBlock, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadBlock => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.downloadBlock', block };
        },
    } as TLCodec<tonNode_downloadBlock>,

    tonNode_downloadBlocks: {
        encode: (src: tonNode_downloadBlocks, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.blocks);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadBlocks => {
            let blocks = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            return { kind: 'tonNode.downloadBlocks', blocks };
        },
    } as TLCodec<tonNode_downloadBlocks>,

    tonNode_downloadPersistentState: {
        encode: (src: tonNode_downloadPersistentState, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
            Codecs.tonNode_blockIdExt.encode(src.masterchainBlock, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadPersistentState => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            let masterchainBlock = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.downloadPersistentState', block, masterchainBlock };
        },
    } as TLCodec<tonNode_downloadPersistentState>,

    tonNode_downloadPersistentStateSlice: {
        encode: (src: tonNode_downloadPersistentStateSlice, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
            Codecs.tonNode_blockIdExt.encode(src.masterchainBlock, encoder);
            encoder.writeInt64(src.offset);
            encoder.writeInt64(src.maxSize);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadPersistentStateSlice => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            let masterchainBlock = Codecs.tonNode_blockIdExt.decode(decoder);
            let offset = decoder.readInt64();
            let maxSize = decoder.readInt64();
            return { kind: 'tonNode.downloadPersistentStateSlice', block, masterchainBlock, offset, maxSize };
        },
    } as TLCodec<tonNode_downloadPersistentStateSlice>,

    tonNode_downloadZeroState: {
        encode: (src: tonNode_downloadZeroState, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadZeroState => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.downloadZeroState', block };
        },
    } as TLCodec<tonNode_downloadZeroState>,

    tonNode_downloadBlockProof: {
        encode: (src: tonNode_downloadBlockProof, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadBlockProof => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.downloadBlockProof', block };
        },
    } as TLCodec<tonNode_downloadBlockProof>,

    tonNode_downloadKeyBlockProof: {
        encode: (src: tonNode_downloadKeyBlockProof, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadKeyBlockProof => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.downloadKeyBlockProof', block };
        },
    } as TLCodec<tonNode_downloadKeyBlockProof>,

    tonNode_downloadBlockProofs: {
        encode: (src: tonNode_downloadBlockProofs, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.blocks);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadBlockProofs => {
            let blocks = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            return { kind: 'tonNode.downloadBlockProofs', blocks };
        },
    } as TLCodec<tonNode_downloadBlockProofs>,

    tonNode_downloadKeyBlockProofs: {
        encode: (src: tonNode_downloadKeyBlockProofs, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.blocks);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadKeyBlockProofs => {
            let blocks = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            return { kind: 'tonNode.downloadKeyBlockProofs', blocks };
        },
    } as TLCodec<tonNode_downloadKeyBlockProofs>,

    tonNode_downloadBlockProofLink: {
        encode: (src: tonNode_downloadBlockProofLink, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadBlockProofLink => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.downloadBlockProofLink', block };
        },
    } as TLCodec<tonNode_downloadBlockProofLink>,

    tonNode_downloadKeyBlockProofLink: {
        encode: (src: tonNode_downloadKeyBlockProofLink, encoder: TLWriteBuffer) => {
            Codecs.tonNode_blockIdExt.encode(src.block, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadKeyBlockProofLink => {
            let block = Codecs.tonNode_blockIdExt.decode(decoder);
            return { kind: 'tonNode.downloadKeyBlockProofLink', block };
        },
    } as TLCodec<tonNode_downloadKeyBlockProofLink>,

    tonNode_downloadBlockProofLinks: {
        encode: (src: tonNode_downloadBlockProofLinks, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.blocks);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadBlockProofLinks => {
            let blocks = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            return { kind: 'tonNode.downloadBlockProofLinks', blocks };
        },
    } as TLCodec<tonNode_downloadBlockProofLinks>,

    tonNode_downloadKeyBlockProofLinks: {
        encode: (src: tonNode_downloadKeyBlockProofLinks, encoder: TLWriteBuffer) => {
            encoder.writeVector(Codecs.tonNode_blockIdExt.encode, src.blocks);
        },
        decode: (decoder: TLReadBuffer): tonNode_downloadKeyBlockProofLinks => {
            let blocks = decoder.readVector(Codecs.tonNode_blockIdExt.decode);
            return { kind: 'tonNode.downloadKeyBlockProofLinks', blocks };
        },
    } as TLCodec<tonNode_downloadKeyBlockProofLinks>,

    tonNode_getArchiveInfo: {
        encode: (src: tonNode_getArchiveInfo, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.masterchainSeqno);
        },
        decode: (decoder: TLReadBuffer): tonNode_getArchiveInfo => {
            let masterchainSeqno = decoder.readInt32();
            return { kind: 'tonNode.getArchiveInfo', masterchainSeqno };
        },
    } as TLCodec<tonNode_getArchiveInfo>,

    tonNode_getArchiveSlice: {
        encode: (src: tonNode_getArchiveSlice, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.archiveId);
            encoder.writeInt64(src.offset);
            encoder.writeInt32(src.maxSize);
        },
        decode: (decoder: TLReadBuffer): tonNode_getArchiveSlice => {
            let archiveId = decoder.readInt64();
            let offset = decoder.readInt64();
            let maxSize = decoder.readInt32();
            return { kind: 'tonNode.getArchiveSlice', archiveId, offset, maxSize };
        },
    } as TLCodec<tonNode_getArchiveSlice>,

    tonNode_getCapabilities: {
        encode: (src: tonNode_getCapabilities, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_getCapabilities => {
            return { kind: 'tonNode.getCapabilities',  };
        },
    } as TLCodec<tonNode_getCapabilities>,

    tonNode_slave_sendExtMessage: {
        encode: (src: tonNode_slave_sendExtMessage, encoder: TLWriteBuffer) => {
            Codecs.tonNode_externalMessage.encode(src.message, encoder);
        },
        decode: (decoder: TLReadBuffer): tonNode_slave_sendExtMessage => {
            let message = Codecs.tonNode_externalMessage.decode(decoder);
            return { kind: 'tonNode.slave.sendExtMessage', message };
        },
    } as TLCodec<tonNode_slave_sendExtMessage>,

    tonNode_query: {
        encode: (src: tonNode_query, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): tonNode_query => {
            return { kind: 'tonNode.query',  };
        },
    } as TLCodec<tonNode_query>,

    adnl_ping: {
        encode: (src: adnl_ping, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.value);
        },
        decode: (decoder: TLReadBuffer): adnl_ping => {
            let value = decoder.readInt64();
            return { kind: 'adnl.ping', value };
        },
    } as TLCodec<adnl_ping>,

    engine_validator_getTime: {
        encode: (src: engine_validator_getTime, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): engine_validator_getTime => {
            return { kind: 'engine.validator.getTime',  };
        },
    } as TLCodec<engine_validator_getTime>,

    engine_validator_importPrivateKey: {
        encode: (src: engine_validator_importPrivateKey, encoder: TLWriteBuffer) => {
            Codecs.PrivateKey.encode(src.key, encoder);
        },
        decode: (decoder: TLReadBuffer): engine_validator_importPrivateKey => {
            let key = Codecs.PrivateKey.decode(decoder);
            return { kind: 'engine.validator.importPrivateKey', key };
        },
    } as TLCodec<engine_validator_importPrivateKey>,

    engine_validator_exportPrivateKey: {
        encode: (src: engine_validator_exportPrivateKey, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
        },
        decode: (decoder: TLReadBuffer): engine_validator_exportPrivateKey => {
            let keyHash = decoder.readInt256();
            return { kind: 'engine.validator.exportPrivateKey', keyHash };
        },
    } as TLCodec<engine_validator_exportPrivateKey>,

    engine_validator_exportPublicKey: {
        encode: (src: engine_validator_exportPublicKey, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
        },
        decode: (decoder: TLReadBuffer): engine_validator_exportPublicKey => {
            let keyHash = decoder.readInt256();
            return { kind: 'engine.validator.exportPublicKey', keyHash };
        },
    } as TLCodec<engine_validator_exportPublicKey>,

    engine_validator_generateKeyPair: {
        encode: (src: engine_validator_generateKeyPair, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): engine_validator_generateKeyPair => {
            return { kind: 'engine.validator.generateKeyPair',  };
        },
    } as TLCodec<engine_validator_generateKeyPair>,

    engine_validator_addAdnlId: {
        encode: (src: engine_validator_addAdnlId, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
            encoder.writeInt32(src.category);
        },
        decode: (decoder: TLReadBuffer): engine_validator_addAdnlId => {
            let keyHash = decoder.readInt256();
            let category = decoder.readInt32();
            return { kind: 'engine.validator.addAdnlId', keyHash, category };
        },
    } as TLCodec<engine_validator_addAdnlId>,

    engine_validator_addDhtId: {
        encode: (src: engine_validator_addDhtId, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
        },
        decode: (decoder: TLReadBuffer): engine_validator_addDhtId => {
            let keyHash = decoder.readInt256();
            return { kind: 'engine.validator.addDhtId', keyHash };
        },
    } as TLCodec<engine_validator_addDhtId>,

    engine_validator_addValidatorPermanentKey: {
        encode: (src: engine_validator_addValidatorPermanentKey, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
            encoder.writeInt32(src.electionDate);
            encoder.writeInt32(src.ttl);
        },
        decode: (decoder: TLReadBuffer): engine_validator_addValidatorPermanentKey => {
            let keyHash = decoder.readInt256();
            let electionDate = decoder.readInt32();
            let ttl = decoder.readInt32();
            return { kind: 'engine.validator.addValidatorPermanentKey', keyHash, electionDate, ttl };
        },
    } as TLCodec<engine_validator_addValidatorPermanentKey>,

    engine_validator_addValidatorTempKey: {
        encode: (src: engine_validator_addValidatorTempKey, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.permanentKeyHash);
            encoder.writeInt256(src.keyHash);
            encoder.writeInt32(src.ttl);
        },
        decode: (decoder: TLReadBuffer): engine_validator_addValidatorTempKey => {
            let permanentKeyHash = decoder.readInt256();
            let keyHash = decoder.readInt256();
            let ttl = decoder.readInt32();
            return { kind: 'engine.validator.addValidatorTempKey', permanentKeyHash, keyHash, ttl };
        },
    } as TLCodec<engine_validator_addValidatorTempKey>,

    engine_validator_addValidatorAdnlAddress: {
        encode: (src: engine_validator_addValidatorAdnlAddress, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.permanentKeyHash);
            encoder.writeInt256(src.keyHash);
            encoder.writeInt32(src.ttl);
        },
        decode: (decoder: TLReadBuffer): engine_validator_addValidatorAdnlAddress => {
            let permanentKeyHash = decoder.readInt256();
            let keyHash = decoder.readInt256();
            let ttl = decoder.readInt32();
            return { kind: 'engine.validator.addValidatorAdnlAddress', permanentKeyHash, keyHash, ttl };
        },
    } as TLCodec<engine_validator_addValidatorAdnlAddress>,

    engine_validator_changeFullNodeAdnlAddress: {
        encode: (src: engine_validator_changeFullNodeAdnlAddress, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.adnlId);
        },
        decode: (decoder: TLReadBuffer): engine_validator_changeFullNodeAdnlAddress => {
            let adnlId = decoder.readInt256();
            return { kind: 'engine.validator.changeFullNodeAdnlAddress', adnlId };
        },
    } as TLCodec<engine_validator_changeFullNodeAdnlAddress>,

    engine_validator_addLiteserver: {
        encode: (src: engine_validator_addLiteserver, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
            encoder.writeInt32(src.port);
        },
        decode: (decoder: TLReadBuffer): engine_validator_addLiteserver => {
            let keyHash = decoder.readInt256();
            let port = decoder.readInt32();
            return { kind: 'engine.validator.addLiteserver', keyHash, port };
        },
    } as TLCodec<engine_validator_addLiteserver>,

    engine_validator_addControlInterface: {
        encode: (src: engine_validator_addControlInterface, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
            encoder.writeInt32(src.port);
        },
        decode: (decoder: TLReadBuffer): engine_validator_addControlInterface => {
            let keyHash = decoder.readInt256();
            let port = decoder.readInt32();
            return { kind: 'engine.validator.addControlInterface', keyHash, port };
        },
    } as TLCodec<engine_validator_addControlInterface>,

    engine_validator_addControlProcess: {
        encode: (src: engine_validator_addControlProcess, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
            encoder.writeInt32(src.port);
            encoder.writeInt256(src.peerKey);
            encoder.writeInt32(src.permissions);
        },
        decode: (decoder: TLReadBuffer): engine_validator_addControlProcess => {
            let keyHash = decoder.readInt256();
            let port = decoder.readInt32();
            let peerKey = decoder.readInt256();
            let permissions = decoder.readInt32();
            return { kind: 'engine.validator.addControlProcess', keyHash, port, peerKey, permissions };
        },
    } as TLCodec<engine_validator_addControlProcess>,

    engine_validator_delAdnlId: {
        encode: (src: engine_validator_delAdnlId, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
        },
        decode: (decoder: TLReadBuffer): engine_validator_delAdnlId => {
            let keyHash = decoder.readInt256();
            return { kind: 'engine.validator.delAdnlId', keyHash };
        },
    } as TLCodec<engine_validator_delAdnlId>,

    engine_validator_delDhtId: {
        encode: (src: engine_validator_delDhtId, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
        },
        decode: (decoder: TLReadBuffer): engine_validator_delDhtId => {
            let keyHash = decoder.readInt256();
            return { kind: 'engine.validator.delDhtId', keyHash };
        },
    } as TLCodec<engine_validator_delDhtId>,

    engine_validator_delValidatorPermanentKey: {
        encode: (src: engine_validator_delValidatorPermanentKey, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
        },
        decode: (decoder: TLReadBuffer): engine_validator_delValidatorPermanentKey => {
            let keyHash = decoder.readInt256();
            return { kind: 'engine.validator.delValidatorPermanentKey', keyHash };
        },
    } as TLCodec<engine_validator_delValidatorPermanentKey>,

    engine_validator_delValidatorTempKey: {
        encode: (src: engine_validator_delValidatorTempKey, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.permanentKeyHash);
            encoder.writeInt256(src.keyHash);
        },
        decode: (decoder: TLReadBuffer): engine_validator_delValidatorTempKey => {
            let permanentKeyHash = decoder.readInt256();
            let keyHash = decoder.readInt256();
            return { kind: 'engine.validator.delValidatorTempKey', permanentKeyHash, keyHash };
        },
    } as TLCodec<engine_validator_delValidatorTempKey>,

    engine_validator_delValidatorAdnlAddress: {
        encode: (src: engine_validator_delValidatorAdnlAddress, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.permanentKeyHash);
            encoder.writeInt256(src.keyHash);
        },
        decode: (decoder: TLReadBuffer): engine_validator_delValidatorAdnlAddress => {
            let permanentKeyHash = decoder.readInt256();
            let keyHash = decoder.readInt256();
            return { kind: 'engine.validator.delValidatorAdnlAddress', permanentKeyHash, keyHash };
        },
    } as TLCodec<engine_validator_delValidatorAdnlAddress>,

    engine_validator_addListeningPort: {
        encode: (src: engine_validator_addListeningPort, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.ip);
            encoder.writeInt32(src.port);
            encoder.writeVector((s, d) => d.writeInt32(s), src.categories);
            encoder.writeVector((s, d) => d.writeInt32(s), src.priorityCategories);
        },
        decode: (decoder: TLReadBuffer): engine_validator_addListeningPort => {
            let ip = decoder.readInt32();
            let port = decoder.readInt32();
            let categories = decoder.readVector((d) => d.readInt32());
            let priorityCategories = decoder.readVector((d) => d.readInt32());
            return { kind: 'engine.validator.addListeningPort', ip, port, categories, priorityCategories };
        },
    } as TLCodec<engine_validator_addListeningPort>,

    engine_validator_addProxy: {
        encode: (src: engine_validator_addProxy, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.inIp);
            encoder.writeInt32(src.inPort);
            encoder.writeInt32(src.outIp);
            encoder.writeInt32(src.outPort);
            Codecs.adnl_Proxy.encode(src.proxy, encoder);
            encoder.writeVector((s, d) => d.writeInt32(s), src.categories);
            encoder.writeVector((s, d) => d.writeInt32(s), src.priorityCategories);
        },
        decode: (decoder: TLReadBuffer): engine_validator_addProxy => {
            let inIp = decoder.readInt32();
            let inPort = decoder.readInt32();
            let outIp = decoder.readInt32();
            let outPort = decoder.readInt32();
            let proxy = Codecs.adnl_Proxy.decode(decoder);
            let categories = decoder.readVector((d) => d.readInt32());
            let priorityCategories = decoder.readVector((d) => d.readInt32());
            return { kind: 'engine.validator.addProxy', inIp, inPort, outIp, outPort, proxy, categories, priorityCategories };
        },
    } as TLCodec<engine_validator_addProxy>,

    engine_validator_delListeningPort: {
        encode: (src: engine_validator_delListeningPort, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.ip);
            encoder.writeInt32(src.port);
            encoder.writeVector((s, d) => d.writeInt32(s), src.categories);
            encoder.writeVector((s, d) => d.writeInt32(s), src.priorityCategories);
        },
        decode: (decoder: TLReadBuffer): engine_validator_delListeningPort => {
            let ip = decoder.readInt32();
            let port = decoder.readInt32();
            let categories = decoder.readVector((d) => d.readInt32());
            let priorityCategories = decoder.readVector((d) => d.readInt32());
            return { kind: 'engine.validator.delListeningPort', ip, port, categories, priorityCategories };
        },
    } as TLCodec<engine_validator_delListeningPort>,

    engine_validator_delProxy: {
        encode: (src: engine_validator_delProxy, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.outIp);
            encoder.writeInt32(src.outPort);
            encoder.writeVector((s, d) => d.writeInt32(s), src.categories);
            encoder.writeVector((s, d) => d.writeInt32(s), src.priorityCategories);
        },
        decode: (decoder: TLReadBuffer): engine_validator_delProxy => {
            let outIp = decoder.readInt32();
            let outPort = decoder.readInt32();
            let categories = decoder.readVector((d) => d.readInt32());
            let priorityCategories = decoder.readVector((d) => d.readInt32());
            return { kind: 'engine.validator.delProxy', outIp, outPort, categories, priorityCategories };
        },
    } as TLCodec<engine_validator_delProxy>,

    engine_validator_sign: {
        encode: (src: engine_validator_sign, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.keyHash);
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): engine_validator_sign => {
            let keyHash = decoder.readInt256();
            let data = decoder.readBuffer();
            return { kind: 'engine.validator.sign', keyHash, data };
        },
    } as TLCodec<engine_validator_sign>,

    engine_validator_getStats: {
        encode: (src: engine_validator_getStats, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): engine_validator_getStats => {
            return { kind: 'engine.validator.getStats',  };
        },
    } as TLCodec<engine_validator_getStats>,

    engine_validator_getConfig: {
        encode: (src: engine_validator_getConfig, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): engine_validator_getConfig => {
            return { kind: 'engine.validator.getConfig',  };
        },
    } as TLCodec<engine_validator_getConfig>,

    engine_validator_setVerbosity: {
        encode: (src: engine_validator_setVerbosity, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.verbosity);
        },
        decode: (decoder: TLReadBuffer): engine_validator_setVerbosity => {
            let verbosity = decoder.readInt32();
            return { kind: 'engine.validator.setVerbosity', verbosity };
        },
    } as TLCodec<engine_validator_setVerbosity>,

    engine_validator_createElectionBid: {
        encode: (src: engine_validator_createElectionBid, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.electionDate);
            encoder.writeString(src.electionAddr);
            encoder.writeString(src.wallet);
        },
        decode: (decoder: TLReadBuffer): engine_validator_createElectionBid => {
            let electionDate = decoder.readInt32();
            let electionAddr = decoder.readString();
            let wallet = decoder.readString();
            return { kind: 'engine.validator.createElectionBid', electionDate, electionAddr, wallet };
        },
    } as TLCodec<engine_validator_createElectionBid>,

    engine_validator_createProposalVote: {
        encode: (src: engine_validator_createProposalVote, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.vote);
        },
        decode: (decoder: TLReadBuffer): engine_validator_createProposalVote => {
            let vote = decoder.readBuffer();
            return { kind: 'engine.validator.createProposalVote', vote };
        },
    } as TLCodec<engine_validator_createProposalVote>,

    engine_validator_createComplaintVote: {
        encode: (src: engine_validator_createComplaintVote, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.electionId);
            encoder.writeBuffer(src.vote);
        },
        decode: (decoder: TLReadBuffer): engine_validator_createComplaintVote => {
            let electionId = decoder.readInt32();
            let vote = decoder.readBuffer();
            return { kind: 'engine.validator.createComplaintVote', electionId, vote };
        },
    } as TLCodec<engine_validator_createComplaintVote>,

    engine_validator_checkDhtServers: {
        encode: (src: engine_validator_checkDhtServers, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
        },
        decode: (decoder: TLReadBuffer): engine_validator_checkDhtServers => {
            let id = decoder.readInt256();
            return { kind: 'engine.validator.checkDhtServers', id };
        },
    } as TLCodec<engine_validator_checkDhtServers>,

    engine_validator_getOverlaysStats: {
        encode: (src: engine_validator_getOverlaysStats, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): engine_validator_getOverlaysStats => {
            return { kind: 'engine.validator.getOverlaysStats',  };
        },
    } as TLCodec<engine_validator_getOverlaysStats>,

    engine_validator_controlQuery: {
        encode: (src: engine_validator_controlQuery, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.data);
        },
        decode: (decoder: TLReadBuffer): engine_validator_controlQuery => {
            let data = decoder.readBuffer();
            return { kind: 'engine.validator.controlQuery', data };
        },
    } as TLCodec<engine_validator_controlQuery>,

    engine_validator_importCertificate: {
        encode: (src: engine_validator_importCertificate, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.overlayId);
            Codecs.adnl_id_short.encode(src.localId, encoder);
            Codecs.engine_validator_KeyHash.encode(src.signedKey, encoder);
            Codecs.overlay_Certificate.encode(src.cert, encoder);
        },
        decode: (decoder: TLReadBuffer): engine_validator_importCertificate => {
            let overlayId = decoder.readInt256();
            let localId = Codecs.adnl_id_short.decode(decoder);
            let signedKey = Codecs.engine_validator_KeyHash.decode(decoder);
            let cert = Codecs.overlay_Certificate.decode(decoder);
            return { kind: 'engine.validator.importCertificate', overlayId, localId, signedKey, cert };
        },
    } as TLCodec<engine_validator_importCertificate>,

    engine_validator_signShardOverlayCertificate: {
        encode: (src: engine_validator_signShardOverlayCertificate, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            Codecs.engine_validator_KeyHash.encode(src.signedKey, encoder);
            encoder.writeInt32(src.expireAt);
            encoder.writeInt32(src.maxSize);
        },
        decode: (decoder: TLReadBuffer): engine_validator_signShardOverlayCertificate => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let signedKey = Codecs.engine_validator_KeyHash.decode(decoder);
            let expireAt = decoder.readInt32();
            let maxSize = decoder.readInt32();
            return { kind: 'engine.validator.signShardOverlayCertificate', workchain, shard, signedKey, expireAt, maxSize };
        },
    } as TLCodec<engine_validator_signShardOverlayCertificate>,

    engine_validator_importShardOverlayCertificate: {
        encode: (src: engine_validator_importShardOverlayCertificate, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.workchain);
            encoder.writeInt64(src.shard);
            Codecs.engine_validator_KeyHash.encode(src.signedKey, encoder);
            Codecs.overlay_Certificate.encode(src.cert, encoder);
        },
        decode: (decoder: TLReadBuffer): engine_validator_importShardOverlayCertificate => {
            let workchain = decoder.readInt32();
            let shard = decoder.readInt64();
            let signedKey = Codecs.engine_validator_KeyHash.decode(decoder);
            let cert = Codecs.overlay_Certificate.decode(decoder);
            return { kind: 'engine.validator.importShardOverlayCertificate', workchain, shard, signedKey, cert };
        },
    } as TLCodec<engine_validator_importShardOverlayCertificate>,

    engine_validator_getPerfTimerStats: {
        encode: (src: engine_validator_getPerfTimerStats, encoder: TLWriteBuffer) => {
            encoder.writeString(src.name);
        },
        decode: (decoder: TLReadBuffer): engine_validator_getPerfTimerStats => {
            let name = decoder.readString();
            return { kind: 'engine.validator.getPerfTimerStats', name };
        },
    } as TLCodec<engine_validator_getPerfTimerStats>,

    storage_ping: {
        encode: (src: storage_ping, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.sessionId);
        },
        decode: (decoder: TLReadBuffer): storage_ping => {
            let sessionId = decoder.readInt64();
            return { kind: 'storage.ping', sessionId };
        },
    } as TLCodec<storage_ping>,

    storage_addUpdate: {
        encode: (src: storage_addUpdate, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.sessionId);
            encoder.writeInt32(src.seqno);
            Codecs.storage_Update.encode(src.update, encoder);
        },
        decode: (decoder: TLReadBuffer): storage_addUpdate => {
            let sessionId = decoder.readInt64();
            let seqno = decoder.readInt32();
            let update = Codecs.storage_Update.decode(decoder);
            return { kind: 'storage.addUpdate', sessionId, seqno, update };
        },
    } as TLCodec<storage_addUpdate>,

    storage_getTorrentInfo: {
        encode: (src: storage_getTorrentInfo, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_getTorrentInfo => {
            return { kind: 'storage.getTorrentInfo',  };
        },
    } as TLCodec<storage_getTorrentInfo>,

    storage_getPiece: {
        encode: (src: storage_getPiece, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.pieceId);
        },
        decode: (decoder: TLReadBuffer): storage_getPiece => {
            let pieceId = decoder.readInt32();
            return { kind: 'storage.getPiece', pieceId };
        },
    } as TLCodec<storage_getPiece>,

    http_request: {
        encode: (src: http_request, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeString(src.method);
            encoder.writeString(src.url);
            encoder.writeString(src.httpVersion);
            encoder.writeVector(Codecs.http_header.encode, src.headers);
        },
        decode: (decoder: TLReadBuffer): http_request => {
            let id = decoder.readInt256();
            let method = decoder.readString();
            let url = decoder.readString();
            let httpVersion = decoder.readString();
            let headers = decoder.readVector(Codecs.http_header.decode);
            return { kind: 'http.request', id, method, url, httpVersion, headers };
        },
    } as TLCodec<http_request>,

    http_getNextPayloadPart: {
        encode: (src: http_getNextPayloadPart, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.id);
            encoder.writeInt32(src.seqno);
            encoder.writeInt32(src.maxChunkSize);
        },
        decode: (decoder: TLReadBuffer): http_getNextPayloadPart => {
            let id = decoder.readInt256();
            let seqno = decoder.readInt32();
            let maxChunkSize = decoder.readInt32();
            return { kind: 'http.getNextPayloadPart', id, seqno, maxChunkSize };
        },
    } as TLCodec<http_getNextPayloadPart>,

    http_proxy_getCapabilities: {
        encode: (src: http_proxy_getCapabilities, encoder: TLWriteBuffer) => {
            encoder.writeInt64(src.capabilities);
        },
        decode: (decoder: TLReadBuffer): http_proxy_getCapabilities => {
            let capabilities = decoder.readInt64();
            return { kind: 'http.proxy.getCapabilities', capabilities };
        },
    } as TLCodec<http_proxy_getCapabilities>,

    storage_daemon_setVerbosity: {
        encode: (src: storage_daemon_setVerbosity, encoder: TLWriteBuffer) => {
            encoder.writeInt32(src.verbosity);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_setVerbosity => {
            let verbosity = decoder.readInt32();
            return { kind: 'storage.daemon.setVerbosity', verbosity };
        },
    } as TLCodec<storage_daemon_setVerbosity>,

    storage_daemon_createTorrent: {
        encode: (src: storage_daemon_createTorrent, encoder: TLWriteBuffer) => {
            encoder.writeString(src.path);
            encoder.writeString(src.description);
            encoder.writeBool(src.allowUpload);
            encoder.writeBool(src.copyInside);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_createTorrent => {
            let path = decoder.readString();
            let description = decoder.readString();
            let allowUpload = decoder.readBool();
            let copyInside = decoder.readBool();
            return { kind: 'storage.daemon.createTorrent', path, description, allowUpload, copyInside };
        },
    } as TLCodec<storage_daemon_createTorrent>,

    storage_daemon_addByHash: {
        encode: (src: storage_daemon_addByHash, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeString(src.rootDir);
            encoder.writeBool(src.startDownload);
            encoder.writeBool(src.allowUpload);
            encoder.writeVector(Codecs.storage_PriorityAction.encode, src.priorities);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_addByHash => {
            let hash = decoder.readInt256();
            let rootDir = decoder.readString();
            let startDownload = decoder.readBool();
            let allowUpload = decoder.readBool();
            let priorities = decoder.readVector(Codecs.storage_PriorityAction.decode);
            return { kind: 'storage.daemon.addByHash', hash, rootDir, startDownload, allowUpload, priorities };
        },
    } as TLCodec<storage_daemon_addByHash>,

    storage_daemon_addByMeta: {
        encode: (src: storage_daemon_addByMeta, encoder: TLWriteBuffer) => {
            encoder.writeBuffer(src.meta);
            encoder.writeString(src.rootDir);
            encoder.writeBool(src.startDownload);
            encoder.writeBool(src.allowUpload);
            encoder.writeVector(Codecs.storage_PriorityAction.encode, src.priorities);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_addByMeta => {
            let meta = decoder.readBuffer();
            let rootDir = decoder.readString();
            let startDownload = decoder.readBool();
            let allowUpload = decoder.readBool();
            let priorities = decoder.readVector(Codecs.storage_PriorityAction.decode);
            return { kind: 'storage.daemon.addByMeta', meta, rootDir, startDownload, allowUpload, priorities };
        },
    } as TLCodec<storage_daemon_addByMeta>,

    storage_daemon_setActiveDownload: {
        encode: (src: storage_daemon_setActiveDownload, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeBool(src.active);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_setActiveDownload => {
            let hash = decoder.readInt256();
            let active = decoder.readBool();
            return { kind: 'storage.daemon.setActiveDownload', hash, active };
        },
    } as TLCodec<storage_daemon_setActiveDownload>,

    storage_daemon_setActiveUpload: {
        encode: (src: storage_daemon_setActiveUpload, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeBool(src.active);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_setActiveUpload => {
            let hash = decoder.readInt256();
            let active = decoder.readBool();
            return { kind: 'storage.daemon.setActiveUpload', hash, active };
        },
    } as TLCodec<storage_daemon_setActiveUpload>,

    storage_daemon_getTorrents: {
        encode: (src: storage_daemon_getTorrents, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_daemon_getTorrents => {
            return { kind: 'storage.daemon.getTorrents',  };
        },
    } as TLCodec<storage_daemon_getTorrents>,

    storage_daemon_getTorrentFull: {
        encode: (src: storage_daemon_getTorrentFull, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_getTorrentFull => {
            let hash = decoder.readInt256();
            return { kind: 'storage.daemon.getTorrentFull', hash };
        },
    } as TLCodec<storage_daemon_getTorrentFull>,

    storage_daemon_getTorrentMeta: {
        encode: (src: storage_daemon_getTorrentMeta, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_getTorrentMeta => {
            let hash = decoder.readInt256();
            return { kind: 'storage.daemon.getTorrentMeta', hash };
        },
    } as TLCodec<storage_daemon_getTorrentMeta>,

    storage_daemon_getNewContractMessage: {
        encode: (src: storage_daemon_getNewContractMessage, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeInt64(src.queryId);
            Codecs.storage_daemon_NewContractParams.encode(src.params, encoder);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_getNewContractMessage => {
            let hash = decoder.readInt256();
            let queryId = decoder.readInt64();
            let params = Codecs.storage_daemon_NewContractParams.decode(decoder);
            return { kind: 'storage.daemon.getNewContractMessage', hash, queryId, params };
        },
    } as TLCodec<storage_daemon_getNewContractMessage>,

    storage_daemon_getTorrentPeers: {
        encode: (src: storage_daemon_getTorrentPeers, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_getTorrentPeers => {
            let hash = decoder.readInt256();
            return { kind: 'storage.daemon.getTorrentPeers', hash };
        },
    } as TLCodec<storage_daemon_getTorrentPeers>,

    storage_daemon_setFilePriorityAll: {
        encode: (src: storage_daemon_setFilePriorityAll, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeInt32(src.priority);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_setFilePriorityAll => {
            let hash = decoder.readInt256();
            let priority = decoder.readInt32();
            return { kind: 'storage.daemon.setFilePriorityAll', hash, priority };
        },
    } as TLCodec<storage_daemon_setFilePriorityAll>,

    storage_daemon_setFilePriorityByIdx: {
        encode: (src: storage_daemon_setFilePriorityByIdx, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeInt64(src.idx);
            encoder.writeInt32(src.priority);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_setFilePriorityByIdx => {
            let hash = decoder.readInt256();
            let idx = decoder.readInt64();
            let priority = decoder.readInt32();
            return { kind: 'storage.daemon.setFilePriorityByIdx', hash, idx, priority };
        },
    } as TLCodec<storage_daemon_setFilePriorityByIdx>,

    storage_daemon_setFilePriorityByName: {
        encode: (src: storage_daemon_setFilePriorityByName, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeString(src.name);
            encoder.writeInt32(src.priority);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_setFilePriorityByName => {
            let hash = decoder.readInt256();
            let name = decoder.readString();
            let priority = decoder.readInt32();
            return { kind: 'storage.daemon.setFilePriorityByName', hash, name, priority };
        },
    } as TLCodec<storage_daemon_setFilePriorityByName>,

    storage_daemon_removeTorrent: {
        encode: (src: storage_daemon_removeTorrent, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeBool(src.removeFiles);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_removeTorrent => {
            let hash = decoder.readInt256();
            let removeFiles = decoder.readBool();
            return { kind: 'storage.daemon.removeTorrent', hash, removeFiles };
        },
    } as TLCodec<storage_daemon_removeTorrent>,

    storage_daemon_loadFrom: {
        encode: (src: storage_daemon_loadFrom, encoder: TLWriteBuffer) => {
            encoder.writeInt256(src.hash);
            encoder.writeBuffer(src.meta);
            encoder.writeString(src.path);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_loadFrom => {
            let hash = decoder.readInt256();
            let meta = decoder.readBuffer();
            let path = decoder.readString();
            return { kind: 'storage.daemon.loadFrom', hash, meta, path };
        },
    } as TLCodec<storage_daemon_loadFrom>,

    storage_daemon_importPrivateKey: {
        encode: (src: storage_daemon_importPrivateKey, encoder: TLWriteBuffer) => {
            Codecs.PrivateKey.encode(src.key, encoder);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_importPrivateKey => {
            let key = Codecs.PrivateKey.decode(decoder);
            return { kind: 'storage.daemon.importPrivateKey', key };
        },
    } as TLCodec<storage_daemon_importPrivateKey>,

    storage_daemon_initProvider: {
        encode: (src: storage_daemon_initProvider, encoder: TLWriteBuffer) => {
            encoder.writeString(src.accountAddress);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_initProvider => {
            let accountAddress = decoder.readString();
            return { kind: 'storage.daemon.initProvider', accountAddress };
        },
    } as TLCodec<storage_daemon_initProvider>,

    storage_daemon_deployProvider: {
        encode: (src: storage_daemon_deployProvider, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_daemon_deployProvider => {
            return { kind: 'storage.daemon.deployProvider',  };
        },
    } as TLCodec<storage_daemon_deployProvider>,

    storage_daemon_getProviderParams: {
        encode: (src: storage_daemon_getProviderParams, encoder: TLWriteBuffer) => {
            encoder.writeString(src.address);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_getProviderParams => {
            let address = decoder.readString();
            return { kind: 'storage.daemon.getProviderParams', address };
        },
    } as TLCodec<storage_daemon_getProviderParams>,

    storage_daemon_setProviderParams: {
        encode: (src: storage_daemon_setProviderParams, encoder: TLWriteBuffer) => {
            Codecs.storage_daemon_provider_params.encode(src.params, encoder);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_setProviderParams => {
            let params = Codecs.storage_daemon_provider_params.decode(decoder);
            return { kind: 'storage.daemon.setProviderParams', params };
        },
    } as TLCodec<storage_daemon_setProviderParams>,

    storage_daemon_getProviderInfo: {
        encode: (src: storage_daemon_getProviderInfo, encoder: TLWriteBuffer) => {
            encoder.writeBool(src.withBalances);
            encoder.writeBool(src.withContracts);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_getProviderInfo => {
            let withBalances = decoder.readBool();
            let withContracts = decoder.readBool();
            return { kind: 'storage.daemon.getProviderInfo', withBalances, withContracts };
        },
    } as TLCodec<storage_daemon_getProviderInfo>,

    storage_daemon_setProviderConfig: {
        encode: (src: storage_daemon_setProviderConfig, encoder: TLWriteBuffer) => {
            Codecs.storage_daemon_providerConfig.encode(src.config, encoder);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_setProviderConfig => {
            let config = Codecs.storage_daemon_providerConfig.decode(decoder);
            return { kind: 'storage.daemon.setProviderConfig', config };
        },
    } as TLCodec<storage_daemon_setProviderConfig>,

    storage_daemon_withdraw: {
        encode: (src: storage_daemon_withdraw, encoder: TLWriteBuffer) => {
            encoder.writeString(src.contract);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_withdraw => {
            let contract = decoder.readString();
            return { kind: 'storage.daemon.withdraw', contract };
        },
    } as TLCodec<storage_daemon_withdraw>,

    storage_daemon_sendCoins: {
        encode: (src: storage_daemon_sendCoins, encoder: TLWriteBuffer) => {
            encoder.writeString(src.address);
            encoder.writeString(src.amount);
            encoder.writeString(src.message);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_sendCoins => {
            let address = decoder.readString();
            let amount = decoder.readString();
            let message = decoder.readString();
            return { kind: 'storage.daemon.sendCoins', address, amount, message };
        },
    } as TLCodec<storage_daemon_sendCoins>,

    storage_daemon_closeStorageContract: {
        encode: (src: storage_daemon_closeStorageContract, encoder: TLWriteBuffer) => {
            encoder.writeString(src.address);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_closeStorageContract => {
            let address = decoder.readString();
            return { kind: 'storage.daemon.closeStorageContract', address };
        },
    } as TLCodec<storage_daemon_closeStorageContract>,

    storage_daemon_removeStorageProvider: {
        encode: (src: storage_daemon_removeStorageProvider, encoder: TLWriteBuffer) => {
        },
        decode: (decoder: TLReadBuffer): storage_daemon_removeStorageProvider => {
            return { kind: 'storage.daemon.removeStorageProvider',  };
        },
    } as TLCodec<storage_daemon_removeStorageProvider>,

    TestObject: {
        encode: (src: TestObject, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'testObject') {
                encoder.writeInt32(-1521006198);
                Codecs.testObject.encode(src, encoder);
                return;
            }
            if (kind === 'testString') {
                encoder.writeInt32(-934972983);
                Codecs.testString.encode(src, encoder);
                return;
            }
            if (kind === 'testInt') {
                encoder.writeInt32(731271633);
                Codecs.testInt.encode(src, encoder);
                return;
            }
            if (kind === 'testVectorBytes') {
                encoder.writeInt32(1267407827);
                Codecs.testVectorBytes.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): TestObject => {
            const kind = decoder.readInt32();
            if (kind === -1521006198) {
                return Codecs.testObject.decode(decoder);
            }
            if (kind === -934972983) {
                return Codecs.testString.decode(decoder);
            }
            if (kind === 731271633) {
                return Codecs.testInt.decode(decoder);
            }
            if (kind === 1267407827) {
                return Codecs.testVectorBytes.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<TestObject>,

    tcp_Pong: {
        encode: (src: tcp_Pong, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tcp.pong') {
                encoder.writeInt32(-597034237);
                Codecs.tcp_pong.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tcp_Pong => {
            const kind = decoder.readInt32();
            if (kind === -597034237) {
                return Codecs.tcp_pong.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tcp_Pong>,

    tcp_Message: {
        encode: (src: tcp_Message, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tcp.authentificate') {
                encoder.writeInt32(1146858258);
                Codecs.tcp_authentificate.encode(src, encoder);
                return;
            }
            if (kind === 'tcp.authentificationNonce') {
                encoder.writeInt32(-480425290);
                Codecs.tcp_authentificationNonce.encode(src, encoder);
                return;
            }
            if (kind === 'tcp.authentificationComplete') {
                encoder.writeInt32(-139616602);
                Codecs.tcp_authentificationComplete.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tcp_Message => {
            const kind = decoder.readInt32();
            if (kind === 1146858258) {
                return Codecs.tcp_authentificate.decode(decoder);
            }
            if (kind === -480425290) {
                return Codecs.tcp_authentificationNonce.decode(decoder);
            }
            if (kind === -139616602) {
                return Codecs.tcp_authentificationComplete.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tcp_Message>,

    fec_Type: {
        encode: (src: fec_Type, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'fec.raptorQ') {
                encoder.writeInt32(-1953257504);
                Codecs.fec_raptorQ.encode(src, encoder);
                return;
            }
            if (kind === 'fec.roundRobin') {
                encoder.writeInt32(854927588);
                Codecs.fec_roundRobin.encode(src, encoder);
                return;
            }
            if (kind === 'fec.online') {
                encoder.writeInt32(19359244);
                Codecs.fec_online.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): fec_Type => {
            const kind = decoder.readInt32();
            if (kind === -1953257504) {
                return Codecs.fec_raptorQ.decode(decoder);
            }
            if (kind === 854927588) {
                return Codecs.fec_roundRobin.decode(decoder);
            }
            if (kind === 19359244) {
                return Codecs.fec_online.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<fec_Type>,

    PrivateKey: {
        encode: (src: PrivateKey, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'pk.unenc') {
                encoder.writeInt32(-1311007952);
                Codecs.pk_unenc.encode(src, encoder);
                return;
            }
            if (kind === 'pk.ed25519') {
                encoder.writeInt32(1231561495);
                Codecs.pk_ed25519.encode(src, encoder);
                return;
            }
            if (kind === 'pk.aes') {
                encoder.writeInt32(-1511501513);
                Codecs.pk_aes.encode(src, encoder);
                return;
            }
            if (kind === 'pk.overlay') {
                encoder.writeInt32(933623387);
                Codecs.pk_overlay.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): PrivateKey => {
            const kind = decoder.readInt32();
            if (kind === -1311007952) {
                return Codecs.pk_unenc.decode(decoder);
            }
            if (kind === 1231561495) {
                return Codecs.pk_ed25519.decode(decoder);
            }
            if (kind === -1511501513) {
                return Codecs.pk_aes.decode(decoder);
            }
            if (kind === 933623387) {
                return Codecs.pk_overlay.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<PrivateKey>,

    PublicKey: {
        encode: (src: PublicKey, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'pub.unenc') {
                encoder.writeInt32(-1239464694);
                Codecs.pub_unenc.encode(src, encoder);
                return;
            }
            if (kind === 'pub.ed25519') {
                encoder.writeInt32(1209251014);
                Codecs.pub_ed25519.encode(src, encoder);
                return;
            }
            if (kind === 'pub.aes') {
                encoder.writeInt32(767339988);
                Codecs.pub_aes.encode(src, encoder);
                return;
            }
            if (kind === 'pub.overlay') {
                encoder.writeInt32(884622795);
                Codecs.pub_overlay.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): PublicKey => {
            const kind = decoder.readInt32();
            if (kind === -1239464694) {
                return Codecs.pub_unenc.decode(decoder);
            }
            if (kind === 1209251014) {
                return Codecs.pub_ed25519.decode(decoder);
            }
            if (kind === 767339988) {
                return Codecs.pub_aes.decode(decoder);
            }
            if (kind === 884622795) {
                return Codecs.pub_overlay.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<PublicKey>,

    adnl_id_Short: {
        encode: (src: adnl_id_Short, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.id.short') {
                encoder.writeInt32(1044342095);
                Codecs.adnl_id_short.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_id_Short => {
            const kind = decoder.readInt32();
            if (kind === 1044342095) {
                return Codecs.adnl_id_short.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_id_Short>,

    adnl_ProxyTo: {
        encode: (src: adnl_ProxyTo, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.proxyToFastHash') {
                encoder.writeInt32(-574752674);
                Codecs.adnl_proxyToFastHash.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_ProxyTo => {
            const kind = decoder.readInt32();
            if (kind === -574752674) {
                return Codecs.adnl_proxyToFastHash.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_ProxyTo>,

    adnl_ProxyToSign: {
        encode: (src: adnl_ProxyToSign, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.proxyToFast') {
                encoder.writeInt32(-1259462186);
                Codecs.adnl_proxyToFast.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_ProxyToSign => {
            const kind = decoder.readInt32();
            if (kind === -1259462186) {
                return Codecs.adnl_proxyToFast.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_ProxyToSign>,

    adnl_Proxy: {
        encode: (src: adnl_Proxy, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.proxy.none') {
                encoder.writeInt32(892487803);
                Codecs.adnl_proxy_none.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.proxy.fast') {
                encoder.writeInt32(982205877);
                Codecs.adnl_proxy_fast.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_Proxy => {
            const kind = decoder.readInt32();
            if (kind === 892487803) {
                return Codecs.adnl_proxy_none.decode(decoder);
            }
            if (kind === 982205877) {
                return Codecs.adnl_proxy_fast.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_Proxy>,

    adnl_Address: {
        encode: (src: adnl_Address, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.address.udp') {
                encoder.writeInt32(1728947943);
                Codecs.adnl_address_udp.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.address.udp6') {
                encoder.writeInt32(-484613126);
                Codecs.adnl_address_udp6.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.address.tunnel') {
                encoder.writeInt32(153813739);
                Codecs.adnl_address_tunnel.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.address.reverse') {
                encoder.writeInt32(662262406);
                Codecs.adnl_address_reverse.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_Address => {
            const kind = decoder.readInt32();
            if (kind === 1728947943) {
                return Codecs.adnl_address_udp.decode(decoder);
            }
            if (kind === -484613126) {
                return Codecs.adnl_address_udp6.decode(decoder);
            }
            if (kind === 153813739) {
                return Codecs.adnl_address_tunnel.decode(decoder);
            }
            if (kind === 662262406) {
                return Codecs.adnl_address_reverse.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_Address>,

    adnl_AddressList: {
        encode: (src: adnl_AddressList, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.addressList') {
                encoder.writeInt32(573040216);
                Codecs.adnl_addressList.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_AddressList => {
            const kind = decoder.readInt32();
            if (kind === 573040216) {
                return Codecs.adnl_addressList.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_AddressList>,

    adnl_Node: {
        encode: (src: adnl_Node, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.node') {
                encoder.writeInt32(1800802949);
                Codecs.adnl_node.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_Node => {
            const kind = decoder.readInt32();
            if (kind === 1800802949) {
                return Codecs.adnl_node.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_Node>,

    adnl_Nodes: {
        encode: (src: adnl_Nodes, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.nodes') {
                encoder.writeInt32(-1576412330);
                Codecs.adnl_nodes.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_Nodes => {
            const kind = decoder.readInt32();
            if (kind === -1576412330) {
                return Codecs.adnl_nodes.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_Nodes>,

    adnl_PacketContents: {
        encode: (src: adnl_PacketContents, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.packetContents') {
                encoder.writeInt32(-784151159);
                Codecs.adnl_packetContents.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_PacketContents => {
            const kind = decoder.readInt32();
            if (kind === -784151159) {
                return Codecs.adnl_packetContents.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_PacketContents>,

    adnl_TunnelPacketContents: {
        encode: (src: adnl_TunnelPacketContents, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.tunnelPacketContents') {
                encoder.writeInt32(-980338508);
                Codecs.adnl_tunnelPacketContents.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_TunnelPacketContents => {
            const kind = decoder.readInt32();
            if (kind === -980338508) {
                return Codecs.adnl_tunnelPacketContents.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_TunnelPacketContents>,

    adnl_ProxyPacketHeader: {
        encode: (src: adnl_ProxyPacketHeader, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.proxyPacketHeader') {
                encoder.writeInt32(141114488);
                Codecs.adnl_proxyPacketHeader.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_ProxyPacketHeader => {
            const kind = decoder.readInt32();
            if (kind === 141114488) {
                return Codecs.adnl_proxyPacketHeader.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_ProxyPacketHeader>,

    adnl_ProxyControlPacket: {
        encode: (src: adnl_ProxyControlPacket, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.proxyControlPacketPing') {
                encoder.writeInt32(932635723);
                Codecs.adnl_proxyControlPacketPing.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.proxyControlPacketPong') {
                encoder.writeInt32(1272044540);
                Codecs.adnl_proxyControlPacketPong.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.proxyControlPacketRegister') {
                encoder.writeInt32(-1022774721);
                Codecs.adnl_proxyControlPacketRegister.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_ProxyControlPacket => {
            const kind = decoder.readInt32();
            if (kind === 932635723) {
                return Codecs.adnl_proxyControlPacketPing.decode(decoder);
            }
            if (kind === 1272044540) {
                return Codecs.adnl_proxyControlPacketPong.decode(decoder);
            }
            if (kind === -1022774721) {
                return Codecs.adnl_proxyControlPacketRegister.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_ProxyControlPacket>,

    adnl_Message: {
        encode: (src: adnl_Message, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.message.createChannel') {
                encoder.writeInt32(-428620869);
                Codecs.adnl_message_createChannel.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.message.confirmChannel') {
                encoder.writeInt32(1625103721);
                Codecs.adnl_message_confirmChannel.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.message.custom') {
                encoder.writeInt32(541595893);
                Codecs.adnl_message_custom.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.message.nop') {
                encoder.writeInt32(402186202);
                Codecs.adnl_message_nop.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.message.reinit') {
                encoder.writeInt32(281150752);
                Codecs.adnl_message_reinit.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.message.query') {
                encoder.writeInt32(-1265895046);
                Codecs.adnl_message_query.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.message.answer') {
                encoder.writeInt32(262964246);
                Codecs.adnl_message_answer.encode(src, encoder);
                return;
            }
            if (kind === 'adnl.message.part') {
                encoder.writeInt32(-45798087);
                Codecs.adnl_message_part.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_Message => {
            const kind = decoder.readInt32();
            if (kind === -428620869) {
                return Codecs.adnl_message_createChannel.decode(decoder);
            }
            if (kind === 1625103721) {
                return Codecs.adnl_message_confirmChannel.decode(decoder);
            }
            if (kind === 541595893) {
                return Codecs.adnl_message_custom.decode(decoder);
            }
            if (kind === 402186202) {
                return Codecs.adnl_message_nop.decode(decoder);
            }
            if (kind === 281150752) {
                return Codecs.adnl_message_reinit.decode(decoder);
            }
            if (kind === -1265895046) {
                return Codecs.adnl_message_query.decode(decoder);
            }
            if (kind === 262964246) {
                return Codecs.adnl_message_answer.decode(decoder);
            }
            if (kind === -45798087) {
                return Codecs.adnl_message_part.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_Message>,

    adnl_db_Key: {
        encode: (src: adnl_db_Key, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.db.node.key') {
                encoder.writeInt32(-979114962);
                Codecs.adnl_db_node_key.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_db_Key => {
            const kind = decoder.readInt32();
            if (kind === -979114962) {
                return Codecs.adnl_db_node_key.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_db_Key>,

    adnl_db_node_Value: {
        encode: (src: adnl_db_node_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.db.node.value') {
                encoder.writeInt32(1415390983);
                Codecs.adnl_db_node_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_db_node_Value => {
            const kind = decoder.readInt32();
            if (kind === 1415390983) {
                return Codecs.adnl_db_node_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_db_node_Value>,

    rldp2_MessagePart: {
        encode: (src: rldp2_MessagePart, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'rldp2.messagePart') {
                encoder.writeInt32(289934190);
                Codecs.rldp2_messagePart.encode(src, encoder);
                return;
            }
            if (kind === 'rldp2.confirm') {
                encoder.writeInt32(602315077);
                Codecs.rldp2_confirm.encode(src, encoder);
                return;
            }
            if (kind === 'rldp2.complete') {
                encoder.writeInt32(918095903);
                Codecs.rldp2_complete.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): rldp2_MessagePart => {
            const kind = decoder.readInt32();
            if (kind === 289934190) {
                return Codecs.rldp2_messagePart.decode(decoder);
            }
            if (kind === 602315077) {
                return Codecs.rldp2_confirm.decode(decoder);
            }
            if (kind === 918095903) {
                return Codecs.rldp2_complete.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<rldp2_MessagePart>,

    rldp_MessagePart: {
        encode: (src: rldp_MessagePart, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'rldp.messagePart') {
                encoder.writeInt32(408691404);
                Codecs.rldp_messagePart.encode(src, encoder);
                return;
            }
            if (kind === 'rldp.confirm') {
                encoder.writeInt32(-175973288);
                Codecs.rldp_confirm.encode(src, encoder);
                return;
            }
            if (kind === 'rldp.complete') {
                encoder.writeInt32(-1140018497);
                Codecs.rldp_complete.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): rldp_MessagePart => {
            const kind = decoder.readInt32();
            if (kind === 408691404) {
                return Codecs.rldp_messagePart.decode(decoder);
            }
            if (kind === -175973288) {
                return Codecs.rldp_confirm.decode(decoder);
            }
            if (kind === -1140018497) {
                return Codecs.rldp_complete.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<rldp_MessagePart>,

    rldp_Message: {
        encode: (src: rldp_Message, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'rldp.message') {
                encoder.writeInt32(2098973982);
                Codecs.rldp_message.encode(src, encoder);
                return;
            }
            if (kind === 'rldp.query') {
                encoder.writeInt32(-1971761815);
                Codecs.rldp_query.encode(src, encoder);
                return;
            }
            if (kind === 'rldp.answer') {
                encoder.writeInt32(-1543742461);
                Codecs.rldp_answer.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): rldp_Message => {
            const kind = decoder.readInt32();
            if (kind === 2098973982) {
                return Codecs.rldp_message.decode(decoder);
            }
            if (kind === -1971761815) {
                return Codecs.rldp_query.decode(decoder);
            }
            if (kind === -1543742461) {
                return Codecs.rldp_answer.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<rldp_Message>,

    dht_Node: {
        encode: (src: dht_Node, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.node') {
                encoder.writeInt32(-2074922424);
                Codecs.dht_node.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_Node => {
            const kind = decoder.readInt32();
            if (kind === -2074922424) {
                return Codecs.dht_node.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_Node>,

    dht_Nodes: {
        encode: (src: dht_Nodes, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.nodes') {
                encoder.writeInt32(2037686462);
                Codecs.dht_nodes.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_Nodes => {
            const kind = decoder.readInt32();
            if (kind === 2037686462) {
                return Codecs.dht_nodes.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_Nodes>,

    dht_Key: {
        encode: (src: dht_Key, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.key') {
                encoder.writeInt32(-160964977);
                Codecs.dht_key.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_Key => {
            const kind = decoder.readInt32();
            if (kind === -160964977) {
                return Codecs.dht_key.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_Key>,

    dht_UpdateRule: {
        encode: (src: dht_UpdateRule, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.updateRule.signature') {
                encoder.writeInt32(-861982217);
                Codecs.dht_updateRule_signature.encode(src, encoder);
                return;
            }
            if (kind === 'dht.updateRule.anybody') {
                encoder.writeInt32(1633127956);
                Codecs.dht_updateRule_anybody.encode(src, encoder);
                return;
            }
            if (kind === 'dht.updateRule.overlayNodes') {
                encoder.writeInt32(645370755);
                Codecs.dht_updateRule_overlayNodes.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_UpdateRule => {
            const kind = decoder.readInt32();
            if (kind === -861982217) {
                return Codecs.dht_updateRule_signature.decode(decoder);
            }
            if (kind === 1633127956) {
                return Codecs.dht_updateRule_anybody.decode(decoder);
            }
            if (kind === 645370755) {
                return Codecs.dht_updateRule_overlayNodes.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_UpdateRule>,

    dht_KeyDescription: {
        encode: (src: dht_KeyDescription, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.keyDescription') {
                encoder.writeInt32(673009157);
                Codecs.dht_keyDescription.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_KeyDescription => {
            const kind = decoder.readInt32();
            if (kind === 673009157) {
                return Codecs.dht_keyDescription.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_KeyDescription>,

    dht_Value: {
        encode: (src: dht_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.value') {
                encoder.writeInt32(-1867700277);
                Codecs.dht_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_Value => {
            const kind = decoder.readInt32();
            if (kind === -1867700277) {
                return Codecs.dht_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_Value>,

    dht_Pong: {
        encode: (src: dht_Pong, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.pong') {
                encoder.writeInt32(1519054721);
                Codecs.dht_pong.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_Pong => {
            const kind = decoder.readInt32();
            if (kind === 1519054721) {
                return Codecs.dht_pong.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_Pong>,

    dht_ValueResult: {
        encode: (src: dht_ValueResult, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.valueNotFound') {
                encoder.writeInt32(-1570634392);
                Codecs.dht_valueNotFound.encode(src, encoder);
                return;
            }
            if (kind === 'dht.valueFound') {
                encoder.writeInt32(-468912268);
                Codecs.dht_valueFound.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_ValueResult => {
            const kind = decoder.readInt32();
            if (kind === -1570634392) {
                return Codecs.dht_valueNotFound.decode(decoder);
            }
            if (kind === -468912268) {
                return Codecs.dht_valueFound.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_ValueResult>,

    dht_ReversePingResult: {
        encode: (src: dht_ReversePingResult, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.clientNotFound') {
                encoder.writeInt32(756842095);
                Codecs.dht_clientNotFound.encode(src, encoder);
                return;
            }
            if (kind === 'dht.reversePingOk') {
                encoder.writeInt32(541077666);
                Codecs.dht_reversePingOk.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_ReversePingResult => {
            const kind = decoder.readInt32();
            if (kind === 756842095) {
                return Codecs.dht_clientNotFound.decode(decoder);
            }
            if (kind === 541077666) {
                return Codecs.dht_reversePingOk.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_ReversePingResult>,

    dht_Stored: {
        encode: (src: dht_Stored, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.stored') {
                encoder.writeInt32(1881602824);
                Codecs.dht_stored.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_Stored => {
            const kind = decoder.readInt32();
            if (kind === 1881602824) {
                return Codecs.dht_stored.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_Stored>,

    dht_Message: {
        encode: (src: dht_Message, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.message') {
                encoder.writeInt32(-1140008050);
                Codecs.dht_message.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_Message => {
            const kind = decoder.readInt32();
            if (kind === -1140008050) {
                return Codecs.dht_message.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_Message>,

    dht_RequestReversePingCont: {
        encode: (src: dht_RequestReversePingCont, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.requestReversePingCont') {
                encoder.writeInt32(-609369851);
                Codecs.dht_requestReversePingCont.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_RequestReversePingCont => {
            const kind = decoder.readInt32();
            if (kind === -609369851) {
                return Codecs.dht_requestReversePingCont.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_RequestReversePingCont>,

    dht_db_Bucket: {
        encode: (src: dht_db_Bucket, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.db.bucket') {
                encoder.writeInt32(-1281557908);
                Codecs.dht_db_bucket.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_db_Bucket => {
            const kind = decoder.readInt32();
            if (kind === -1281557908) {
                return Codecs.dht_db_bucket.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_db_Bucket>,

    dht_db_Key: {
        encode: (src: dht_db_Key, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.db.key.bucket') {
                encoder.writeInt32(-1553420724);
                Codecs.dht_db_key_bucket.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_db_Key => {
            const kind = decoder.readInt32();
            if (kind === -1553420724) {
                return Codecs.dht_db_key_bucket.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_db_Key>,

    overlay_node_ToSign: {
        encode: (src: overlay_node_ToSign, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.node.toSign') {
                encoder.writeInt32(64530657);
                Codecs.overlay_node_toSign.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_node_ToSign => {
            const kind = decoder.readInt32();
            if (kind === 64530657) {
                return Codecs.overlay_node_toSign.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_node_ToSign>,

    overlay_Node: {
        encode: (src: overlay_Node, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.node') {
                encoder.writeInt32(-1200911741);
                Codecs.overlay_node.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_Node => {
            const kind = decoder.readInt32();
            if (kind === -1200911741) {
                return Codecs.overlay_node.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_Node>,

    overlay_Nodes: {
        encode: (src: overlay_Nodes, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.nodes') {
                encoder.writeInt32(-460904178);
                Codecs.overlay_nodes.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_Nodes => {
            const kind = decoder.readInt32();
            if (kind === -460904178) {
                return Codecs.overlay_nodes.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_Nodes>,

    overlay_Message: {
        encode: (src: overlay_Message, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.message') {
                encoder.writeInt32(1965368352);
                Codecs.overlay_message.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_Message => {
            const kind = decoder.readInt32();
            if (kind === 1965368352) {
                return Codecs.overlay_message.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_Message>,

    overlay_BroadcastList: {
        encode: (src: overlay_BroadcastList, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.broadcastList') {
                encoder.writeInt32(416407263);
                Codecs.overlay_broadcastList.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_BroadcastList => {
            const kind = decoder.readInt32();
            if (kind === 416407263) {
                return Codecs.overlay_broadcastList.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_BroadcastList>,

    overlay_Broadcast: {
        encode: (src: overlay_Broadcast, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.fec.received') {
                encoder.writeInt32(-715385620);
                Codecs.overlay_fec_received.encode(src, encoder);
                return;
            }
            if (kind === 'overlay.fec.completed') {
                encoder.writeInt32(165112084);
                Codecs.overlay_fec_completed.encode(src, encoder);
                return;
            }
            if (kind === 'overlay.unicast') {
                encoder.writeInt32(861097508);
                Codecs.overlay_unicast.encode(src, encoder);
                return;
            }
            if (kind === 'overlay.broadcast') {
                encoder.writeInt32(-1319490709);
                Codecs.overlay_broadcast.encode(src, encoder);
                return;
            }
            if (kind === 'overlay.broadcastFec') {
                encoder.writeInt32(-1160264854);
                Codecs.overlay_broadcastFec.encode(src, encoder);
                return;
            }
            if (kind === 'overlay.broadcastFecShort') {
                encoder.writeInt32(-242740414);
                Codecs.overlay_broadcastFecShort.encode(src, encoder);
                return;
            }
            if (kind === 'overlay.broadcastNotFound') {
                encoder.writeInt32(-1786366428);
                Codecs.overlay_broadcastNotFound.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_Broadcast => {
            const kind = decoder.readInt32();
            if (kind === -715385620) {
                return Codecs.overlay_fec_received.decode(decoder);
            }
            if (kind === 165112084) {
                return Codecs.overlay_fec_completed.decode(decoder);
            }
            if (kind === 861097508) {
                return Codecs.overlay_unicast.decode(decoder);
            }
            if (kind === -1319490709) {
                return Codecs.overlay_broadcast.decode(decoder);
            }
            if (kind === -1160264854) {
                return Codecs.overlay_broadcastFec.decode(decoder);
            }
            if (kind === -242740414) {
                return Codecs.overlay_broadcastFecShort.decode(decoder);
            }
            if (kind === -1786366428) {
                return Codecs.overlay_broadcastNotFound.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_Broadcast>,

    overlay_broadcast_Id: {
        encode: (src: overlay_broadcast_Id, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.broadcast.id') {
                encoder.writeInt32(1375565978);
                Codecs.overlay_broadcast_id.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcast_Id => {
            const kind = decoder.readInt32();
            if (kind === 1375565978) {
                return Codecs.overlay_broadcast_id.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_broadcast_Id>,

    overlay_broadcastFec_Id: {
        encode: (src: overlay_broadcastFec_Id, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.broadcastFec.id') {
                encoder.writeInt32(-80652890);
                Codecs.overlay_broadcastFec_id.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcastFec_Id => {
            const kind = decoder.readInt32();
            if (kind === -80652890) {
                return Codecs.overlay_broadcastFec_id.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_broadcastFec_Id>,

    overlay_broadcastFec_PartId: {
        encode: (src: overlay_broadcastFec_PartId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.broadcastFec.partId') {
                encoder.writeInt32(-1536597296);
                Codecs.overlay_broadcastFec_partId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcastFec_PartId => {
            const kind = decoder.readInt32();
            if (kind === -1536597296) {
                return Codecs.overlay_broadcastFec_partId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_broadcastFec_PartId>,

    overlay_broadcast_ToSign: {
        encode: (src: overlay_broadcast_ToSign, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.broadcast.toSign') {
                encoder.writeInt32(-97038724);
                Codecs.overlay_broadcast_toSign.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_broadcast_ToSign => {
            const kind = decoder.readInt32();
            if (kind === -97038724) {
                return Codecs.overlay_broadcast_toSign.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_broadcast_ToSign>,

    overlay_Certificate: {
        encode: (src: overlay_Certificate, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.certificate') {
                encoder.writeInt32(-526461135);
                Codecs.overlay_certificate.encode(src, encoder);
                return;
            }
            if (kind === 'overlay.certificateV2') {
                encoder.writeInt32(-1270899581);
                Codecs.overlay_certificateV2.encode(src, encoder);
                return;
            }
            if (kind === 'overlay.emptyCertificate') {
                encoder.writeInt32(853195983);
                Codecs.overlay_emptyCertificate.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_Certificate => {
            const kind = decoder.readInt32();
            if (kind === -526461135) {
                return Codecs.overlay_certificate.decode(decoder);
            }
            if (kind === -1270899581) {
                return Codecs.overlay_certificateV2.decode(decoder);
            }
            if (kind === 853195983) {
                return Codecs.overlay_emptyCertificate.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_Certificate>,

    overlay_CertificateId: {
        encode: (src: overlay_CertificateId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.certificateId') {
                encoder.writeInt32(-1884397383);
                Codecs.overlay_certificateId.encode(src, encoder);
                return;
            }
            if (kind === 'overlay.certificateIdV2') {
                encoder.writeInt32(-59977049);
                Codecs.overlay_certificateIdV2.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_CertificateId => {
            const kind = decoder.readInt32();
            if (kind === -1884397383) {
                return Codecs.overlay_certificateId.decode(decoder);
            }
            if (kind === -59977049) {
                return Codecs.overlay_certificateIdV2.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_CertificateId>,

    overlay_db_Nodes: {
        encode: (src: overlay_db_Nodes, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.db.nodes') {
                encoder.writeInt32(-712454630);
                Codecs.overlay_db_nodes.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_db_Nodes => {
            const kind = decoder.readInt32();
            if (kind === -712454630) {
                return Codecs.overlay_db_nodes.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_db_Nodes>,

    overlay_db_Key: {
        encode: (src: overlay_db_Key, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'overlay.db.key.nodes') {
                encoder.writeInt32(-992972010);
                Codecs.overlay_db_key_nodes.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): overlay_db_Key => {
            const kind = decoder.readInt32();
            if (kind === -992972010) {
                return Codecs.overlay_db_key_nodes.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<overlay_db_Key>,

    catchain_block_Id: {
        encode: (src: catchain_block_Id, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.block.id') {
                encoder.writeInt32(620665018);
                Codecs.catchain_block_id.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_block_Id => {
            const kind = decoder.readInt32();
            if (kind === 620665018) {
                return Codecs.catchain_block_id.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_block_Id>,

    catchain_block_Dep: {
        encode: (src: catchain_block_Dep, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.block.dep') {
                encoder.writeInt32(1511706959);
                Codecs.catchain_block_dep.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_block_Dep => {
            const kind = decoder.readInt32();
            if (kind === 1511706959) {
                return Codecs.catchain_block_dep.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_block_Dep>,

    catchain_block_Data: {
        encode: (src: catchain_block_Data, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.block.data') {
                encoder.writeInt32(-122903008);
                Codecs.catchain_block_data.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_block_Data => {
            const kind = decoder.readInt32();
            if (kind === -122903008) {
                return Codecs.catchain_block_data.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_block_Data>,

    catchain_Block: {
        encode: (src: catchain_Block, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.block') {
                encoder.writeInt32(-699055756);
                Codecs.catchain_block.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_Block => {
            const kind = decoder.readInt32();
            if (kind === -699055756) {
                return Codecs.catchain_block.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_Block>,

    catchain_Blocks: {
        encode: (src: catchain_Blocks, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.blocks') {
                encoder.writeInt32(1357697473);
                Codecs.catchain_blocks.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_Blocks => {
            const kind = decoder.readInt32();
            if (kind === 1357697473) {
                return Codecs.catchain_blocks.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_Blocks>,

    catchain_Update: {
        encode: (src: catchain_Update, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.blockUpdate') {
                encoder.writeInt32(593975492);
                Codecs.catchain_blockUpdate.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_Update => {
            const kind = decoder.readInt32();
            if (kind === 593975492) {
                return Codecs.catchain_blockUpdate.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_Update>,

    catchain_block_inner_Data: {
        encode: (src: catchain_block_inner_Data, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.block.data.badBlock') {
                encoder.writeInt32(-1241359786);
                Codecs.catchain_block_data_badBlock.encode(src, encoder);
                return;
            }
            if (kind === 'catchain.block.data.fork') {
                encoder.writeInt32(1685731922);
                Codecs.catchain_block_data_fork.encode(src, encoder);
                return;
            }
            if (kind === 'catchain.block.data.nop') {
                encoder.writeInt32(1417852112);
                Codecs.catchain_block_data_nop.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_block_inner_Data => {
            const kind = decoder.readInt32();
            if (kind === -1241359786) {
                return Codecs.catchain_block_data_badBlock.decode(decoder);
            }
            if (kind === 1685731922) {
                return Codecs.catchain_block_data_fork.decode(decoder);
            }
            if (kind === 1417852112) {
                return Codecs.catchain_block_data_nop.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_block_inner_Data>,

    catchain_FirstBlock: {
        encode: (src: catchain_FirstBlock, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.firstblock') {
                encoder.writeInt32(281609467);
                Codecs.catchain_firstblock.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_FirstBlock => {
            const kind = decoder.readInt32();
            if (kind === 281609467) {
                return Codecs.catchain_firstblock.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_FirstBlock>,

    catchain_Difference: {
        encode: (src: catchain_Difference, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.difference') {
                encoder.writeInt32(336974282);
                Codecs.catchain_difference.encode(src, encoder);
                return;
            }
            if (kind === 'catchain.differenceFork') {
                encoder.writeInt32(1227341935);
                Codecs.catchain_differenceFork.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_Difference => {
            const kind = decoder.readInt32();
            if (kind === 336974282) {
                return Codecs.catchain_difference.decode(decoder);
            }
            if (kind === 1227341935) {
                return Codecs.catchain_differenceFork.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_Difference>,

    catchain_BlockResult: {
        encode: (src: catchain_BlockResult, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.blockNotFound') {
                encoder.writeInt32(-1240397692);
                Codecs.catchain_blockNotFound.encode(src, encoder);
                return;
            }
            if (kind === 'catchain.blockResult') {
                encoder.writeInt32(-1658179513);
                Codecs.catchain_blockResult.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_BlockResult => {
            const kind = decoder.readInt32();
            if (kind === -1240397692) {
                return Codecs.catchain_blockNotFound.decode(decoder);
            }
            if (kind === -1658179513) {
                return Codecs.catchain_blockResult.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_BlockResult>,

    catchain_Sent: {
        encode: (src: catchain_Sent, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.sent') {
                encoder.writeInt32(-84454993);
                Codecs.catchain_sent.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_Sent => {
            const kind = decoder.readInt32();
            if (kind === -84454993) {
                return Codecs.catchain_sent.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_Sent>,

    validatorSession_round_Id: {
        encode: (src: validatorSession_round_Id, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.round.id') {
                encoder.writeInt32(2477989);
                Codecs.validatorSession_round_id.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_round_Id => {
            const kind = decoder.readInt32();
            if (kind === 2477989) {
                return Codecs.validatorSession_round_id.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_round_Id>,

    validatorSession_tempBlock_Id: {
        encode: (src: validatorSession_tempBlock_Id, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.candidate.id') {
                encoder.writeInt32(-1126743751);
                Codecs.validatorSession_candidate_id.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_tempBlock_Id => {
            const kind = decoder.readInt32();
            if (kind === -1126743751) {
                return Codecs.validatorSession_candidate_id.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_tempBlock_Id>,

    validatorSession_Message: {
        encode: (src: validatorSession_Message, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.message.startSession') {
                encoder.writeInt32(-1767807279);
                Codecs.validatorSession_message_startSession.encode(src, encoder);
                return;
            }
            if (kind === 'validatorSession.message.finishSession') {
                encoder.writeInt32(-879025437);
                Codecs.validatorSession_message_finishSession.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_Message => {
            const kind = decoder.readInt32();
            if (kind === -1767807279) {
                return Codecs.validatorSession_message_startSession.decode(decoder);
            }
            if (kind === -879025437) {
                return Codecs.validatorSession_message_finishSession.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_Message>,

    validatorSession_round_Message: {
        encode: (src: validatorSession_round_Message, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.message.submittedBlock') {
                encoder.writeInt32(309732534);
                Codecs.validatorSession_message_submittedBlock.encode(src, encoder);
                return;
            }
            if (kind === 'validatorSession.message.approvedBlock') {
                encoder.writeInt32(77968769);
                Codecs.validatorSession_message_approvedBlock.encode(src, encoder);
                return;
            }
            if (kind === 'validatorSession.message.rejectedBlock') {
                encoder.writeInt32(-1786229141);
                Codecs.validatorSession_message_rejectedBlock.encode(src, encoder);
                return;
            }
            if (kind === 'validatorSession.message.commit') {
                encoder.writeInt32(-1408065803);
                Codecs.validatorSession_message_commit.encode(src, encoder);
                return;
            }
            if (kind === 'validatorSession.message.vote') {
                encoder.writeInt32(-1707978297);
                Codecs.validatorSession_message_vote.encode(src, encoder);
                return;
            }
            if (kind === 'validatorSession.message.voteFor') {
                encoder.writeInt32(1643183663);
                Codecs.validatorSession_message_voteFor.encode(src, encoder);
                return;
            }
            if (kind === 'validatorSession.message.precommit') {
                encoder.writeInt32(-1470843566);
                Codecs.validatorSession_message_precommit.encode(src, encoder);
                return;
            }
            if (kind === 'validatorSession.message.empty') {
                encoder.writeInt32(1243619241);
                Codecs.validatorSession_message_empty.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_round_Message => {
            const kind = decoder.readInt32();
            if (kind === 309732534) {
                return Codecs.validatorSession_message_submittedBlock.decode(decoder);
            }
            if (kind === 77968769) {
                return Codecs.validatorSession_message_approvedBlock.decode(decoder);
            }
            if (kind === -1786229141) {
                return Codecs.validatorSession_message_rejectedBlock.decode(decoder);
            }
            if (kind === -1408065803) {
                return Codecs.validatorSession_message_commit.decode(decoder);
            }
            if (kind === -1707978297) {
                return Codecs.validatorSession_message_vote.decode(decoder);
            }
            if (kind === 1643183663) {
                return Codecs.validatorSession_message_voteFor.decode(decoder);
            }
            if (kind === -1470843566) {
                return Codecs.validatorSession_message_precommit.decode(decoder);
            }
            if (kind === 1243619241) {
                return Codecs.validatorSession_message_empty.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_round_Message>,

    validatorSession_Pong: {
        encode: (src: validatorSession_Pong, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.pong') {
                encoder.writeInt32(-590989459);
                Codecs.validatorSession_pong.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_Pong => {
            const kind = decoder.readInt32();
            if (kind === -590989459) {
                return Codecs.validatorSession_pong.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_Pong>,

    validatorSession_CandidateId: {
        encode: (src: validatorSession_CandidateId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.candidateId') {
                encoder.writeInt32(436135276);
                Codecs.validatorSession_candidateId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_CandidateId => {
            const kind = decoder.readInt32();
            if (kind === 436135276) {
                return Codecs.validatorSession_candidateId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_CandidateId>,

    validatorSession_BlockUpdate: {
        encode: (src: validatorSession_BlockUpdate, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.blockUpdate') {
                encoder.writeInt32(-1836855753);
                Codecs.validatorSession_blockUpdate.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_BlockUpdate => {
            const kind = decoder.readInt32();
            if (kind === -1836855753) {
                return Codecs.validatorSession_blockUpdate.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_BlockUpdate>,

    validatorSession_Candidate: {
        encode: (src: validatorSession_Candidate, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.candidate') {
                encoder.writeInt32(2100525125);
                Codecs.validatorSession_candidate.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_Candidate => {
            const kind = decoder.readInt32();
            if (kind === 2100525125) {
                return Codecs.validatorSession_candidate.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_Candidate>,

    validatorSession_Config: {
        encode: (src: validatorSession_Config, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.config') {
                encoder.writeInt32(-1235092029);
                Codecs.validatorSession_config.encode(src, encoder);
                return;
            }
            if (kind === 'validatorSession.configNew') {
                encoder.writeInt32(-139482724);
                Codecs.validatorSession_configNew.encode(src, encoder);
                return;
            }
            if (kind === 'validatorSession.configVersioned') {
                encoder.writeInt32(1076532995);
                Codecs.validatorSession_configVersioned.encode(src, encoder);
                return;
            }
            if (kind === 'validatorSession.configVersionedV2') {
                encoder.writeInt32(-1451552337);
                Codecs.validatorSession_configVersionedV2.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_Config => {
            const kind = decoder.readInt32();
            if (kind === -1235092029) {
                return Codecs.validatorSession_config.decode(decoder);
            }
            if (kind === -139482724) {
                return Codecs.validatorSession_configNew.decode(decoder);
            }
            if (kind === 1076532995) {
                return Codecs.validatorSession_configVersioned.decode(decoder);
            }
            if (kind === -1451552337) {
                return Codecs.validatorSession_configVersionedV2.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_Config>,

    validatorSession_CatChainOptions: {
        encode: (src: validatorSession_CatChainOptions, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.catchainOptions') {
                encoder.writeInt32(1893878246);
                Codecs.validatorSession_catchainOptions.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_CatChainOptions => {
            const kind = decoder.readInt32();
            if (kind === 1893878246) {
                return Codecs.validatorSession_catchainOptions.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_CatChainOptions>,

    Hashable: {
        encode: (src: Hashable, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'hashable.bool') {
                encoder.writeInt32(-815709156);
                Codecs.hashable_bool.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.int32') {
                encoder.writeInt32(-743074986);
                Codecs.hashable_int32.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.int64') {
                encoder.writeInt32(-405107134);
                Codecs.hashable_int64.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.int256') {
                encoder.writeInt32(975377359);
                Codecs.hashable_int256.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.bytes') {
                encoder.writeInt32(118742546);
                Codecs.hashable_bytes.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.pair') {
                encoder.writeInt32(-941266795);
                Codecs.hashable_pair.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.vector') {
                encoder.writeInt32(-550190227);
                Codecs.hashable_vector.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.validatorSessionOldRound') {
                encoder.writeInt32(1200318377);
                Codecs.hashable_validatorSessionOldRound.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.validatorSessionRoundAttempt') {
                encoder.writeInt32(1276247981);
                Codecs.hashable_validatorSessionRoundAttempt.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.validatorSessionRound') {
                encoder.writeInt32(897011683);
                Codecs.hashable_validatorSessionRound.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.blockSignature') {
                encoder.writeInt32(937530018);
                Codecs.hashable_blockSignature.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.sentBlock') {
                encoder.writeInt32(-1111911125);
                Codecs.hashable_sentBlock.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.sentBlockEmpty') {
                encoder.writeInt32(-1628289361);
                Codecs.hashable_sentBlockEmpty.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.vote') {
                encoder.writeInt32(-1363203131);
                Codecs.hashable_vote.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.blockCandidate') {
                encoder.writeInt32(195670285);
                Codecs.hashable_blockCandidate.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.blockVoteCandidate') {
                encoder.writeInt32(-821202971);
                Codecs.hashable_blockVoteCandidate.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.blockCandidateAttempt') {
                encoder.writeInt32(1063025931);
                Codecs.hashable_blockCandidateAttempt.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.cntVector') {
                encoder.writeInt32(187199288);
                Codecs.hashable_cntVector.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.cntSortedVector') {
                encoder.writeInt32(2073445977);
                Codecs.hashable_cntSortedVector.encode(src, encoder);
                return;
            }
            if (kind === 'hashable.validatorSession') {
                encoder.writeInt32(1746035669);
                Codecs.hashable_validatorSession.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): Hashable => {
            const kind = decoder.readInt32();
            if (kind === -815709156) {
                return Codecs.hashable_bool.decode(decoder);
            }
            if (kind === -743074986) {
                return Codecs.hashable_int32.decode(decoder);
            }
            if (kind === -405107134) {
                return Codecs.hashable_int64.decode(decoder);
            }
            if (kind === 975377359) {
                return Codecs.hashable_int256.decode(decoder);
            }
            if (kind === 118742546) {
                return Codecs.hashable_bytes.decode(decoder);
            }
            if (kind === -941266795) {
                return Codecs.hashable_pair.decode(decoder);
            }
            if (kind === -550190227) {
                return Codecs.hashable_vector.decode(decoder);
            }
            if (kind === 1200318377) {
                return Codecs.hashable_validatorSessionOldRound.decode(decoder);
            }
            if (kind === 1276247981) {
                return Codecs.hashable_validatorSessionRoundAttempt.decode(decoder);
            }
            if (kind === 897011683) {
                return Codecs.hashable_validatorSessionRound.decode(decoder);
            }
            if (kind === 937530018) {
                return Codecs.hashable_blockSignature.decode(decoder);
            }
            if (kind === -1111911125) {
                return Codecs.hashable_sentBlock.decode(decoder);
            }
            if (kind === -1628289361) {
                return Codecs.hashable_sentBlockEmpty.decode(decoder);
            }
            if (kind === -1363203131) {
                return Codecs.hashable_vote.decode(decoder);
            }
            if (kind === 195670285) {
                return Codecs.hashable_blockCandidate.decode(decoder);
            }
            if (kind === -821202971) {
                return Codecs.hashable_blockVoteCandidate.decode(decoder);
            }
            if (kind === 1063025931) {
                return Codecs.hashable_blockCandidateAttempt.decode(decoder);
            }
            if (kind === 187199288) {
                return Codecs.hashable_cntVector.decode(decoder);
            }
            if (kind === 2073445977) {
                return Codecs.hashable_cntSortedVector.decode(decoder);
            }
            if (kind === 1746035669) {
                return Codecs.hashable_validatorSession.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<Hashable>,

    tonNode_SessionId: {
        encode: (src: tonNode_SessionId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.sessionId') {
                encoder.writeInt32(2056402618);
                Codecs.tonNode_sessionId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_SessionId => {
            const kind = decoder.readInt32();
            if (kind === 2056402618) {
                return Codecs.tonNode_sessionId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_SessionId>,

    tonNode_BlockSignature: {
        encode: (src: tonNode_BlockSignature, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.blockSignature') {
                encoder.writeInt32(1357921331);
                Codecs.tonNode_blockSignature.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_BlockSignature => {
            const kind = decoder.readInt32();
            if (kind === 1357921331) {
                return Codecs.tonNode_blockSignature.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_BlockSignature>,

    tonNode_BlockId: {
        encode: (src: tonNode_BlockId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.blockId') {
                encoder.writeInt32(-1211256473);
                Codecs.tonNode_blockId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_BlockId => {
            const kind = decoder.readInt32();
            if (kind === -1211256473) {
                return Codecs.tonNode_blockId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_BlockId>,

    tonNode_BlockIdExt: {
        encode: (src: tonNode_BlockIdExt, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.blockIdExt') {
                encoder.writeInt32(1733487480);
                Codecs.tonNode_blockIdExt.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_BlockIdExt => {
            const kind = decoder.readInt32();
            if (kind === 1733487480) {
                return Codecs.tonNode_blockIdExt.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_BlockIdExt>,

    tonNode_ZeroStateIdExt: {
        encode: (src: tonNode_ZeroStateIdExt, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.zeroStateIdExt') {
                encoder.writeInt32(494024110);
                Codecs.tonNode_zeroStateIdExt.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_ZeroStateIdExt => {
            const kind = decoder.readInt32();
            if (kind === 494024110) {
                return Codecs.tonNode_zeroStateIdExt.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_ZeroStateIdExt>,

    tonNode_BlockDescription: {
        encode: (src: tonNode_BlockDescription, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.blockDescriptionEmpty') {
                encoder.writeInt32(-2088456555);
                Codecs.tonNode_blockDescriptionEmpty.encode(src, encoder);
                return;
            }
            if (kind === 'tonNode.blockDescription') {
                encoder.writeInt32(1185009800);
                Codecs.tonNode_blockDescription.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_BlockDescription => {
            const kind = decoder.readInt32();
            if (kind === -2088456555) {
                return Codecs.tonNode_blockDescriptionEmpty.decode(decoder);
            }
            if (kind === 1185009800) {
                return Codecs.tonNode_blockDescription.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_BlockDescription>,

    tonNode_BlocksDescription: {
        encode: (src: tonNode_BlocksDescription, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.blocksDescription') {
                encoder.writeInt32(-701865684);
                Codecs.tonNode_blocksDescription.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_BlocksDescription => {
            const kind = decoder.readInt32();
            if (kind === -701865684) {
                return Codecs.tonNode_blocksDescription.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_BlocksDescription>,

    tonNode_PreparedProof: {
        encode: (src: tonNode_PreparedProof, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.preparedProofEmpty') {
                encoder.writeInt32(-949370502);
                Codecs.tonNode_preparedProofEmpty.encode(src, encoder);
                return;
            }
            if (kind === 'tonNode.preparedProof') {
                encoder.writeInt32(-1986028981);
                Codecs.tonNode_preparedProof.encode(src, encoder);
                return;
            }
            if (kind === 'tonNode.preparedProofLink') {
                encoder.writeInt32(1040134797);
                Codecs.tonNode_preparedProofLink.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_PreparedProof => {
            const kind = decoder.readInt32();
            if (kind === -949370502) {
                return Codecs.tonNode_preparedProofEmpty.decode(decoder);
            }
            if (kind === -1986028981) {
                return Codecs.tonNode_preparedProof.decode(decoder);
            }
            if (kind === 1040134797) {
                return Codecs.tonNode_preparedProofLink.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_PreparedProof>,

    tonNode_PreparedState: {
        encode: (src: tonNode_PreparedState, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.preparedState') {
                encoder.writeInt32(928762733);
                Codecs.tonNode_preparedState.encode(src, encoder);
                return;
            }
            if (kind === 'tonNode.notFoundState') {
                encoder.writeInt32(842598993);
                Codecs.tonNode_notFoundState.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_PreparedState => {
            const kind = decoder.readInt32();
            if (kind === 928762733) {
                return Codecs.tonNode_preparedState.decode(decoder);
            }
            if (kind === 842598993) {
                return Codecs.tonNode_notFoundState.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_PreparedState>,

    tonNode_Prepared: {
        encode: (src: tonNode_Prepared, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.prepared') {
                encoder.writeInt32(-356205619);
                Codecs.tonNode_prepared.encode(src, encoder);
                return;
            }
            if (kind === 'tonNode.notFound') {
                encoder.writeInt32(-490521178);
                Codecs.tonNode_notFound.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_Prepared => {
            const kind = decoder.readInt32();
            if (kind === -356205619) {
                return Codecs.tonNode_prepared.decode(decoder);
            }
            if (kind === -490521178) {
                return Codecs.tonNode_notFound.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_Prepared>,

    tonNode_Data: {
        encode: (src: tonNode_Data, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.data') {
                encoder.writeInt32(1443505284);
                Codecs.tonNode_data.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_Data => {
            const kind = decoder.readInt32();
            if (kind === 1443505284) {
                return Codecs.tonNode_data.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_Data>,

    tonNode_IhrMessage: {
        encode: (src: tonNode_IhrMessage, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.ihrMessage') {
                encoder.writeInt32(1161085703);
                Codecs.tonNode_ihrMessage.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_IhrMessage => {
            const kind = decoder.readInt32();
            if (kind === 1161085703) {
                return Codecs.tonNode_ihrMessage.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_IhrMessage>,

    tonNode_ExternalMessage: {
        encode: (src: tonNode_ExternalMessage, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.externalMessage') {
                encoder.writeInt32(-596270583);
                Codecs.tonNode_externalMessage.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_ExternalMessage => {
            const kind = decoder.readInt32();
            if (kind === -596270583) {
                return Codecs.tonNode_externalMessage.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_ExternalMessage>,

    tonNode_NewShardBlock: {
        encode: (src: tonNode_NewShardBlock, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.newShardBlock') {
                encoder.writeInt32(-1533165015);
                Codecs.tonNode_newShardBlock.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_NewShardBlock => {
            const kind = decoder.readInt32();
            if (kind === -1533165015) {
                return Codecs.tonNode_newShardBlock.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_NewShardBlock>,

    tonNode_Broadcast: {
        encode: (src: tonNode_Broadcast, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.blockBroadcast') {
                encoder.writeInt32(-1372712699);
                Codecs.tonNode_blockBroadcast.encode(src, encoder);
                return;
            }
            if (kind === 'tonNode.ihrMessageBroadcast') {
                encoder.writeInt32(1381868723);
                Codecs.tonNode_ihrMessageBroadcast.encode(src, encoder);
                return;
            }
            if (kind === 'tonNode.externalMessageBroadcast') {
                encoder.writeInt32(1025185895);
                Codecs.tonNode_externalMessageBroadcast.encode(src, encoder);
                return;
            }
            if (kind === 'tonNode.newShardBlockBroadcast') {
                encoder.writeInt32(183696060);
                Codecs.tonNode_newShardBlockBroadcast.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_Broadcast => {
            const kind = decoder.readInt32();
            if (kind === -1372712699) {
                return Codecs.tonNode_blockBroadcast.decode(decoder);
            }
            if (kind === 1381868723) {
                return Codecs.tonNode_ihrMessageBroadcast.decode(decoder);
            }
            if (kind === 1025185895) {
                return Codecs.tonNode_externalMessageBroadcast.decode(decoder);
            }
            if (kind === 183696060) {
                return Codecs.tonNode_newShardBlockBroadcast.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_Broadcast>,

    tonNode_ShardPublicOverlayId: {
        encode: (src: tonNode_ShardPublicOverlayId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.shardPublicOverlayId') {
                encoder.writeInt32(1302254377);
                Codecs.tonNode_shardPublicOverlayId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_ShardPublicOverlayId => {
            const kind = decoder.readInt32();
            if (kind === 1302254377) {
                return Codecs.tonNode_shardPublicOverlayId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_ShardPublicOverlayId>,

    tonNode_KeyBlocks: {
        encode: (src: tonNode_KeyBlocks, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.keyBlocks') {
                encoder.writeInt32(124144985);
                Codecs.tonNode_keyBlocks.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_KeyBlocks => {
            const kind = decoder.readInt32();
            if (kind === 124144985) {
                return Codecs.tonNode_keyBlocks.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_KeyBlocks>,

    ton_BlockId: {
        encode: (src: ton_BlockId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'ton.blockId') {
                encoder.writeInt32(-989106576);
                Codecs.ton_blockId.encode(src, encoder);
                return;
            }
            if (kind === 'ton.blockIdApprove') {
                encoder.writeInt32(768887369);
                Codecs.ton_blockIdApprove.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): ton_BlockId => {
            const kind = decoder.readInt32();
            if (kind === -989106576) {
                return Codecs.ton_blockId.decode(decoder);
            }
            if (kind === 768887369) {
                return Codecs.ton_blockIdApprove.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<ton_BlockId>,

    tonNode_DataList: {
        encode: (src: tonNode_DataList, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.dataList') {
                encoder.writeInt32(351548179);
                Codecs.tonNode_dataList.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_DataList => {
            const kind = decoder.readInt32();
            if (kind === 351548179) {
                return Codecs.tonNode_dataList.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_DataList>,

    tonNode_DataFull: {
        encode: (src: tonNode_DataFull, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.dataFull') {
                encoder.writeInt32(-1101488237);
                Codecs.tonNode_dataFull.encode(src, encoder);
                return;
            }
            if (kind === 'tonNode.dataFullEmpty') {
                encoder.writeInt32(1466861002);
                Codecs.tonNode_dataFullEmpty.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_DataFull => {
            const kind = decoder.readInt32();
            if (kind === -1101488237) {
                return Codecs.tonNode_dataFull.decode(decoder);
            }
            if (kind === 1466861002) {
                return Codecs.tonNode_dataFullEmpty.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_DataFull>,

    tonNode_Capabilities: {
        encode: (src: tonNode_Capabilities, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.capabilities') {
                encoder.writeInt32(-172007232);
                Codecs.tonNode_capabilities.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_Capabilities => {
            const kind = decoder.readInt32();
            if (kind === -172007232) {
                return Codecs.tonNode_capabilities.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_Capabilities>,

    tonNode_Success: {
        encode: (src: tonNode_Success, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.success') {
                encoder.writeInt32(-1063902129);
                Codecs.tonNode_success.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_Success => {
            const kind = decoder.readInt32();
            if (kind === -1063902129) {
                return Codecs.tonNode_success.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_Success>,

    tonNode_ArchiveInfo: {
        encode: (src: tonNode_ArchiveInfo, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'tonNode.archiveNotFound') {
                encoder.writeInt32(-1725360509);
                Codecs.tonNode_archiveNotFound.encode(src, encoder);
                return;
            }
            if (kind === 'tonNode.archiveInfo') {
                encoder.writeInt32(435158924);
                Codecs.tonNode_archiveInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): tonNode_ArchiveInfo => {
            const kind = decoder.readInt32();
            if (kind === -1725360509) {
                return Codecs.tonNode_archiveNotFound.decode(decoder);
            }
            if (kind === 435158924) {
                return Codecs.tonNode_archiveInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<tonNode_ArchiveInfo>,

    db_root_DbDescription: {
        encode: (src: db_root_DbDescription, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.root.dbDescription') {
                encoder.writeInt32(-1273465869);
                Codecs.db_root_dbDescription.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_root_DbDescription => {
            const kind = decoder.readInt32();
            if (kind === -1273465869) {
                return Codecs.db_root_dbDescription.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_root_DbDescription>,

    db_root_Key: {
        encode: (src: db_root_Key, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.root.key.cellDb') {
                encoder.writeInt32(1928966974);
                Codecs.db_root_key_cellDb.encode(src, encoder);
                return;
            }
            if (kind === 'db.root.key.blockDb') {
                encoder.writeInt32(806534976);
                Codecs.db_root_key_blockDb.encode(src, encoder);
                return;
            }
            if (kind === 'db.root.key.config') {
                encoder.writeInt32(331559556);
                Codecs.db_root_key_config.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_root_Key => {
            const kind = decoder.readInt32();
            if (kind === 1928966974) {
                return Codecs.db_root_key_cellDb.decode(decoder);
            }
            if (kind === 806534976) {
                return Codecs.db_root_key_blockDb.decode(decoder);
            }
            if (kind === 331559556) {
                return Codecs.db_root_key_config.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_root_Key>,

    db_root_Config: {
        encode: (src: db_root_Config, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.root.config') {
                encoder.writeInt32(-703495519);
                Codecs.db_root_config.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_root_Config => {
            const kind = decoder.readInt32();
            if (kind === -703495519) {
                return Codecs.db_root_config.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_root_Config>,

    db_celldb_Value: {
        encode: (src: db_celldb_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.celldb.value') {
                encoder.writeInt32(-435153856);
                Codecs.db_celldb_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_celldb_Value => {
            const kind = decoder.readInt32();
            if (kind === -435153856) {
                return Codecs.db_celldb_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_celldb_Value>,

    db_celldb_key_Value: {
        encode: (src: db_celldb_key_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.celldb.key.value') {
                encoder.writeInt32(1538341155);
                Codecs.db_celldb_key_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_celldb_key_Value => {
            const kind = decoder.readInt32();
            if (kind === 1538341155) {
                return Codecs.db_celldb_key_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_celldb_key_Value>,

    db_block_Info: {
        encode: (src: db_block_Info, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.block.info') {
                encoder.writeInt32(-337705278);
                Codecs.db_block_info.encode(src, encoder);
                return;
            }
            if (kind === 'db.block.packedInfo') {
                encoder.writeInt32(1186697618);
                Codecs.db_block_packedInfo.encode(src, encoder);
                return;
            }
            if (kind === 'db.block.archivedInfo') {
                encoder.writeInt32(543128145);
                Codecs.db_block_archivedInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_block_Info => {
            const kind = decoder.readInt32();
            if (kind === -337705278) {
                return Codecs.db_block_info.decode(decoder);
            }
            if (kind === 1186697618) {
                return Codecs.db_block_packedInfo.decode(decoder);
            }
            if (kind === 543128145) {
                return Codecs.db_block_archivedInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_block_Info>,

    db_blockdb_Value: {
        encode: (src: db_blockdb_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.blockdb.value') {
                encoder.writeInt32(-1299266515);
                Codecs.db_blockdb_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_blockdb_Value => {
            const kind = decoder.readInt32();
            if (kind === -1299266515) {
                return Codecs.db_blockdb_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_blockdb_Value>,

    db_blockdb_Lru: {
        encode: (src: db_blockdb_Lru, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.blockdb.lru') {
                encoder.writeInt32(-1055500877);
                Codecs.db_blockdb_lru.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_blockdb_Lru => {
            const kind = decoder.readInt32();
            if (kind === -1055500877) {
                return Codecs.db_blockdb_lru.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_blockdb_Lru>,

    db_blockdb_Key: {
        encode: (src: db_blockdb_Key, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.blockdb.key.lru') {
                encoder.writeInt32(1354536506);
                Codecs.db_blockdb_key_lru.encode(src, encoder);
                return;
            }
            if (kind === 'db.blockdb.key.value') {
                encoder.writeInt32(2136461683);
                Codecs.db_blockdb_key_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_blockdb_Key => {
            const kind = decoder.readInt32();
            if (kind === 1354536506) {
                return Codecs.db_blockdb_key_lru.decode(decoder);
            }
            if (kind === 2136461683) {
                return Codecs.db_blockdb_key_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_blockdb_Key>,

    db_Candidate: {
        encode: (src: db_Candidate, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.candidate') {
                encoder.writeInt32(1708747482);
                Codecs.db_candidate.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_Candidate => {
            const kind = decoder.readInt32();
            if (kind === 1708747482) {
                return Codecs.db_candidate.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_Candidate>,

    db_candidate_Id: {
        encode: (src: db_candidate_Id, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.candidate.id') {
                encoder.writeInt32(935375495);
                Codecs.db_candidate_id.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_candidate_Id => {
            const kind = decoder.readInt32();
            if (kind === 935375495) {
                return Codecs.db_candidate_id.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_candidate_Id>,

    db_filedb_Key: {
        encode: (src: db_filedb_Key, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.filedb.key.empty') {
                encoder.writeInt32(2080319307);
                Codecs.db_filedb_key_empty.encode(src, encoder);
                return;
            }
            if (kind === 'db.filedb.key.blockFile') {
                encoder.writeInt32(-1326783375);
                Codecs.db_filedb_key_blockFile.encode(src, encoder);
                return;
            }
            if (kind === 'db.filedb.key.zeroStateFile') {
                encoder.writeInt32(307398205);
                Codecs.db_filedb_key_zeroStateFile.encode(src, encoder);
                return;
            }
            if (kind === 'db.filedb.key.persistentStateFile') {
                encoder.writeInt32(-1346996660);
                Codecs.db_filedb_key_persistentStateFile.encode(src, encoder);
                return;
            }
            if (kind === 'db.filedb.key.proof') {
                encoder.writeInt32(-627749396);
                Codecs.db_filedb_key_proof.encode(src, encoder);
                return;
            }
            if (kind === 'db.filedb.key.proofLink') {
                encoder.writeInt32(-1728330290);
                Codecs.db_filedb_key_proofLink.encode(src, encoder);
                return;
            }
            if (kind === 'db.filedb.key.signatures') {
                encoder.writeInt32(-685175541);
                Codecs.db_filedb_key_signatures.encode(src, encoder);
                return;
            }
            if (kind === 'db.filedb.key.candidate') {
                encoder.writeInt32(-494269767);
                Codecs.db_filedb_key_candidate.encode(src, encoder);
                return;
            }
            if (kind === 'db.filedb.key.blockInfo') {
                encoder.writeInt32(-996551428);
                Codecs.db_filedb_key_blockInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_filedb_Key => {
            const kind = decoder.readInt32();
            if (kind === 2080319307) {
                return Codecs.db_filedb_key_empty.decode(decoder);
            }
            if (kind === -1326783375) {
                return Codecs.db_filedb_key_blockFile.decode(decoder);
            }
            if (kind === 307398205) {
                return Codecs.db_filedb_key_zeroStateFile.decode(decoder);
            }
            if (kind === -1346996660) {
                return Codecs.db_filedb_key_persistentStateFile.decode(decoder);
            }
            if (kind === -627749396) {
                return Codecs.db_filedb_key_proof.decode(decoder);
            }
            if (kind === -1728330290) {
                return Codecs.db_filedb_key_proofLink.decode(decoder);
            }
            if (kind === -685175541) {
                return Codecs.db_filedb_key_signatures.decode(decoder);
            }
            if (kind === -494269767) {
                return Codecs.db_filedb_key_candidate.decode(decoder);
            }
            if (kind === -996551428) {
                return Codecs.db_filedb_key_blockInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_filedb_Key>,

    db_filedb_Value: {
        encode: (src: db_filedb_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.filedb.value') {
                encoder.writeInt32(-220390867);
                Codecs.db_filedb_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_filedb_Value => {
            const kind = decoder.readInt32();
            if (kind === -220390867) {
                return Codecs.db_filedb_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_filedb_Value>,

    db_state_DestroyedSessions: {
        encode: (src: db_state_DestroyedSessions, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.state.destroyedSessions') {
                encoder.writeInt32(-1381443196);
                Codecs.db_state_destroyedSessions.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_state_DestroyedSessions => {
            const kind = decoder.readInt32();
            if (kind === -1381443196) {
                return Codecs.db_state_destroyedSessions.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_state_DestroyedSessions>,

    db_state_InitBlockId: {
        encode: (src: db_state_InitBlockId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.state.initBlockId') {
                encoder.writeInt32(1932303605);
                Codecs.db_state_initBlockId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_state_InitBlockId => {
            const kind = decoder.readInt32();
            if (kind === 1932303605) {
                return Codecs.db_state_initBlockId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_state_InitBlockId>,

    db_state_GcBlockId: {
        encode: (src: db_state_GcBlockId, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.state.gcBlockId') {
                encoder.writeInt32(-550453937);
                Codecs.db_state_gcBlockId.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_state_GcBlockId => {
            const kind = decoder.readInt32();
            if (kind === -550453937) {
                return Codecs.db_state_gcBlockId.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_state_GcBlockId>,

    db_state_ShardClient: {
        encode: (src: db_state_ShardClient, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.state.shardClient') {
                encoder.writeInt32(186033821);
                Codecs.db_state_shardClient.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_state_ShardClient => {
            const kind = decoder.readInt32();
            if (kind === 186033821) {
                return Codecs.db_state_shardClient.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_state_ShardClient>,

    db_state_AsyncSerializer: {
        encode: (src: db_state_AsyncSerializer, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.state.asyncSerializer') {
                encoder.writeInt32(-751883871);
                Codecs.db_state_asyncSerializer.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_state_AsyncSerializer => {
            const kind = decoder.readInt32();
            if (kind === -751883871) {
                return Codecs.db_state_asyncSerializer.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_state_AsyncSerializer>,

    db_state_Hardforks: {
        encode: (src: db_state_Hardforks, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.state.hardforks') {
                encoder.writeInt32(-2047668988);
                Codecs.db_state_hardforks.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_state_Hardforks => {
            const kind = decoder.readInt32();
            if (kind === -2047668988) {
                return Codecs.db_state_hardforks.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_state_Hardforks>,

    db_state_DbVersion: {
        encode: (src: db_state_DbVersion, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.state.dbVersion') {
                encoder.writeInt32(-650698505);
                Codecs.db_state_dbVersion.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_state_DbVersion => {
            const kind = decoder.readInt32();
            if (kind === -650698505) {
                return Codecs.db_state_dbVersion.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_state_DbVersion>,

    db_state_Key: {
        encode: (src: db_state_Key, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.state.key.destroyedSessions') {
                encoder.writeInt32(-386404007);
                Codecs.db_state_key_destroyedSessions.encode(src, encoder);
                return;
            }
            if (kind === 'db.state.key.initBlockId') {
                encoder.writeInt32(1971484899);
                Codecs.db_state_key_initBlockId.encode(src, encoder);
                return;
            }
            if (kind === 'db.state.key.gcBlockId') {
                encoder.writeInt32(-1015417890);
                Codecs.db_state_key_gcBlockId.encode(src, encoder);
                return;
            }
            if (kind === 'db.state.key.shardClient') {
                encoder.writeInt32(-912576121);
                Codecs.db_state_key_shardClient.encode(src, encoder);
                return;
            }
            if (kind === 'db.state.key.asyncSerializer') {
                encoder.writeInt32(699304479);
                Codecs.db_state_key_asyncSerializer.encode(src, encoder);
                return;
            }
            if (kind === 'db.state.key.hardforks') {
                encoder.writeInt32(-420206662);
                Codecs.db_state_key_hardforks.encode(src, encoder);
                return;
            }
            if (kind === 'db.state.key.dbVersion') {
                encoder.writeInt32(1917788500);
                Codecs.db_state_key_dbVersion.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_state_Key => {
            const kind = decoder.readInt32();
            if (kind === -386404007) {
                return Codecs.db_state_key_destroyedSessions.decode(decoder);
            }
            if (kind === 1971484899) {
                return Codecs.db_state_key_initBlockId.decode(decoder);
            }
            if (kind === -1015417890) {
                return Codecs.db_state_key_gcBlockId.decode(decoder);
            }
            if (kind === -912576121) {
                return Codecs.db_state_key_shardClient.decode(decoder);
            }
            if (kind === 699304479) {
                return Codecs.db_state_key_asyncSerializer.decode(decoder);
            }
            if (kind === -420206662) {
                return Codecs.db_state_key_hardforks.decode(decoder);
            }
            if (kind === 1917788500) {
                return Codecs.db_state_key_dbVersion.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_state_Key>,

    db_lt_Key: {
        encode: (src: db_lt_Key, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.lt.el.key') {
                encoder.writeInt32(-1523442974);
                Codecs.db_lt_el_key.encode(src, encoder);
                return;
            }
            if (kind === 'db.lt.desc.key') {
                encoder.writeInt32(-236722287);
                Codecs.db_lt_desc_key.encode(src, encoder);
                return;
            }
            if (kind === 'db.lt.shard.key') {
                encoder.writeInt32(1353120015);
                Codecs.db_lt_shard_key.encode(src, encoder);
                return;
            }
            if (kind === 'db.lt.status.key') {
                encoder.writeInt32(2003591255);
                Codecs.db_lt_status_key.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_lt_Key => {
            const kind = decoder.readInt32();
            if (kind === -1523442974) {
                return Codecs.db_lt_el_key.decode(decoder);
            }
            if (kind === -236722287) {
                return Codecs.db_lt_desc_key.decode(decoder);
            }
            if (kind === 1353120015) {
                return Codecs.db_lt_shard_key.decode(decoder);
            }
            if (kind === 2003591255) {
                return Codecs.db_lt_status_key.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_lt_Key>,

    db_lt_el_Value: {
        encode: (src: db_lt_el_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.lt.el.value') {
                encoder.writeInt32(-1780064412);
                Codecs.db_lt_el_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_lt_el_Value => {
            const kind = decoder.readInt32();
            if (kind === -1780064412) {
                return Codecs.db_lt_el_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_lt_el_Value>,

    db_lt_desc_Value: {
        encode: (src: db_lt_desc_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.lt.desc.value') {
                encoder.writeInt32(1907315124);
                Codecs.db_lt_desc_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_lt_desc_Value => {
            const kind = decoder.readInt32();
            if (kind === 1907315124) {
                return Codecs.db_lt_desc_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_lt_desc_Value>,

    db_lt_shard_Value: {
        encode: (src: db_lt_shard_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.lt.shard.value') {
                encoder.writeInt32(1014209147);
                Codecs.db_lt_shard_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_lt_shard_Value => {
            const kind = decoder.readInt32();
            if (kind === 1014209147) {
                return Codecs.db_lt_shard_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_lt_shard_Value>,

    db_lt_status_Value: {
        encode: (src: db_lt_status_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.lt.status.value') {
                encoder.writeInt32(-88150727);
                Codecs.db_lt_status_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_lt_status_Value => {
            const kind = decoder.readInt32();
            if (kind === -88150727) {
                return Codecs.db_lt_status_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_lt_status_Value>,

    db_files_Key: {
        encode: (src: db_files_Key, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.files.index.key') {
                encoder.writeInt32(2109998338);
                Codecs.db_files_index_key.encode(src, encoder);
                return;
            }
            if (kind === 'db.files.package.key') {
                encoder.writeInt32(-1526463682);
                Codecs.db_files_package_key.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_files_Key => {
            const kind = decoder.readInt32();
            if (kind === 2109998338) {
                return Codecs.db_files_index_key.decode(decoder);
            }
            if (kind === -1526463682) {
                return Codecs.db_files_package_key.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_files_Key>,

    db_files_index_Value: {
        encode: (src: db_files_index_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.files.index.value') {
                encoder.writeInt32(-1565402372);
                Codecs.db_files_index_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_files_index_Value => {
            const kind = decoder.readInt32();
            if (kind === -1565402372) {
                return Codecs.db_files_index_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_files_index_Value>,

    db_files_package_FirstBlock: {
        encode: (src: db_files_package_FirstBlock, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.files.package.firstBlock') {
                encoder.writeInt32(1880254951);
                Codecs.db_files_package_firstBlock.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_files_package_FirstBlock => {
            const kind = decoder.readInt32();
            if (kind === 1880254951) {
                return Codecs.db_files_package_firstBlock.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_files_package_FirstBlock>,

    db_files_package_Value: {
        encode: (src: db_files_package_Value, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'db.files.package.value') {
                encoder.writeInt32(-464726741);
                Codecs.db_files_package_value.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): db_files_package_Value => {
            const kind = decoder.readInt32();
            if (kind === -464726741) {
                return Codecs.db_files_package_value.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<db_files_package_Value>,

    engine_validator_GroupMember: {
        encode: (src: engine_validator_GroupMember, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validator.groupMember') {
                encoder.writeInt32(-1953208860);
                Codecs.validator_groupMember.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_GroupMember => {
            const kind = decoder.readInt32();
            if (kind === -1953208860) {
                return Codecs.validator_groupMember.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_GroupMember>,

    validator_Group: {
        encode: (src: validator_Group, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validator.group') {
                encoder.writeInt32(-120029535);
                Codecs.validator_group.encode(src, encoder);
                return;
            }
            if (kind === 'validator.groupEx') {
                encoder.writeInt32(479350270);
                Codecs.validator_groupEx.encode(src, encoder);
                return;
            }
            if (kind === 'validator.groupNew') {
                encoder.writeInt32(-1740398259);
                Codecs.validator_groupNew.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validator_Group => {
            const kind = decoder.readInt32();
            if (kind === -120029535) {
                return Codecs.validator_group.decode(decoder);
            }
            if (kind === 479350270) {
                return Codecs.validator_groupEx.decode(decoder);
            }
            if (kind === -1740398259) {
                return Codecs.validator_groupNew.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validator_Group>,

    id_config_Local: {
        encode: (src: id_config_Local, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'id.config.local') {
                encoder.writeInt32(-1834367090);
                Codecs.id_config_local.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): id_config_Local => {
            const kind = decoder.readInt32();
            if (kind === -1834367090) {
                return Codecs.id_config_local.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<id_config_Local>,

    dht_config_Local: {
        encode: (src: dht_config_Local, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.config.local') {
                encoder.writeInt32(1981827695);
                Codecs.dht_config_local.encode(src, encoder);
                return;
            }
            if (kind === 'dht.config.random.local') {
                encoder.writeInt32(-1679088265);
                Codecs.dht_config_random_local.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_config_Local => {
            const kind = decoder.readInt32();
            if (kind === 1981827695) {
                return Codecs.dht_config_local.decode(decoder);
            }
            if (kind === -1679088265) {
                return Codecs.dht_config_random_local.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_config_Local>,

    liteserver_config_Local: {
        encode: (src: liteserver_config_Local, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteserver.config.local') {
                encoder.writeInt32(1182002063);
                Codecs.liteserver_config_local.encode(src, encoder);
                return;
            }
            if (kind === 'liteserver.config.random.local') {
                encoder.writeInt32(2093565243);
                Codecs.liteserver_config_random_local.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteserver_config_Local => {
            const kind = decoder.readInt32();
            if (kind === 1182002063) {
                return Codecs.liteserver_config_local.decode(decoder);
            }
            if (kind === 2093565243) {
                return Codecs.liteserver_config_random_local.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteserver_config_Local>,

    validator_config_Local: {
        encode: (src: validator_config_Local, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validator.config.local') {
                encoder.writeInt32(1716256616);
                Codecs.validator_config_local.encode(src, encoder);
                return;
            }
            if (kind === 'validator.config.random.local') {
                encoder.writeInt32(1501795426);
                Codecs.validator_config_random_local.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validator_config_Local => {
            const kind = decoder.readInt32();
            if (kind === 1716256616) {
                return Codecs.validator_config_local.decode(decoder);
            }
            if (kind === 1501795426) {
                return Codecs.validator_config_random_local.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validator_config_Local>,

    control_config_Local: {
        encode: (src: control_config_Local, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'control.config.local') {
                encoder.writeInt32(1964895469);
                Codecs.control_config_local.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): control_config_Local => {
            const kind = decoder.readInt32();
            if (kind === 1964895469) {
                return Codecs.control_config_local.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<control_config_Local>,

    config_Local: {
        encode: (src: config_Local, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'config.local') {
                encoder.writeInt32(2023657820);
                Codecs.config_local.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): config_Local => {
            const kind = decoder.readInt32();
            if (kind === 2023657820) {
                return Codecs.config_local.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<config_Local>,

    dht_config_Global: {
        encode: (src: dht_config_Global, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dht.config.global') {
                encoder.writeInt32(-2066822649);
                Codecs.dht_config_global.encode(src, encoder);
                return;
            }
            if (kind === 'dht.config.global_v2') {
                encoder.writeInt32(1768129575);
                Codecs.dht_config_global_v2.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dht_config_Global => {
            const kind = decoder.readInt32();
            if (kind === -2066822649) {
                return Codecs.dht_config_global.decode(decoder);
            }
            if (kind === 1768129575) {
                return Codecs.dht_config_global_v2.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dht_config_Global>,

    adnl_config_Global: {
        encode: (src: adnl_config_Global, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.config.global') {
                encoder.writeInt32(-1099988784);
                Codecs.adnl_config_global.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_config_Global => {
            const kind = decoder.readInt32();
            if (kind === -1099988784) {
                return Codecs.adnl_config_global.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_config_Global>,

    catchain_config_Global: {
        encode: (src: catchain_config_Global, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'catchain.config.global') {
                encoder.writeInt32(1757918801);
                Codecs.catchain_config_global.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): catchain_config_Global => {
            const kind = decoder.readInt32();
            if (kind === 1757918801) {
                return Codecs.catchain_config_global.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<catchain_config_Global>,

    dummyworkchain0_config_Global: {
        encode: (src: dummyworkchain0_config_Global, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'dummyworkchain0.config.global') {
                encoder.writeInt32(-631148845);
                Codecs.dummyworkchain0_config_global.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): dummyworkchain0_config_Global => {
            const kind = decoder.readInt32();
            if (kind === -631148845) {
                return Codecs.dummyworkchain0_config_global.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<dummyworkchain0_config_Global>,

    validator_config_Global: {
        encode: (src: validator_config_Global, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validator.config.global') {
                encoder.writeInt32(-2038562966);
                Codecs.validator_config_global.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validator_config_Global => {
            const kind = decoder.readInt32();
            if (kind === -2038562966) {
                return Codecs.validator_config_global.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validator_config_Global>,

    config_Global: {
        encode: (src: config_Global, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'config.global') {
                encoder.writeInt32(-261690960);
                Codecs.config_global.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): config_Global => {
            const kind = decoder.readInt32();
            if (kind === -261690960) {
                return Codecs.config_global.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<config_Global>,

    liteserver_Desc: {
        encode: (src: liteserver_Desc, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteserver.desc') {
                encoder.writeInt32(-1001806732);
                Codecs.liteserver_desc.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteserver_Desc => {
            const kind = decoder.readInt32();
            if (kind === -1001806732) {
                return Codecs.liteserver_desc.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteserver_Desc>,

    liteclient_config_Global: {
        encode: (src: liteclient_config_Global, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'liteclient.config.global') {
                encoder.writeInt32(143507704);
                Codecs.liteclient_config_global.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): liteclient_config_Global => {
            const kind = decoder.readInt32();
            if (kind === 143507704) {
                return Codecs.liteclient_config_global.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<liteclient_config_Global>,

    engine_Adnl: {
        encode: (src: engine_Adnl, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.adnl') {
                encoder.writeInt32(1658283344);
                Codecs.engine_adnl.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_Adnl => {
            const kind = decoder.readInt32();
            if (kind === 1658283344) {
                return Codecs.engine_adnl.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_Adnl>,

    engine_Addr: {
        encode: (src: engine_Addr, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.addr') {
                encoder.writeInt32(-281993236);
                Codecs.engine_addr.encode(src, encoder);
                return;
            }
            if (kind === 'engine.addrProxy') {
                encoder.writeInt32(-1965071031);
                Codecs.engine_addrProxy.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_Addr => {
            const kind = decoder.readInt32();
            if (kind === -281993236) {
                return Codecs.engine_addr.decode(decoder);
            }
            if (kind === -1965071031) {
                return Codecs.engine_addrProxy.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_Addr>,

    engine_Dht: {
        encode: (src: engine_Dht, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.dht') {
                encoder.writeInt32(1575613178);
                Codecs.engine_dht.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_Dht => {
            const kind = decoder.readInt32();
            if (kind === 1575613178) {
                return Codecs.engine_dht.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_Dht>,

    engine_ValidatorTempKey: {
        encode: (src: engine_ValidatorTempKey, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validatorTempKey') {
                encoder.writeInt32(1581962974);
                Codecs.engine_validatorTempKey.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_ValidatorTempKey => {
            const kind = decoder.readInt32();
            if (kind === 1581962974) {
                return Codecs.engine_validatorTempKey.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_ValidatorTempKey>,

    engine_ValidatorAdnlAddress: {
        encode: (src: engine_ValidatorAdnlAddress, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validatorAdnlAddress') {
                encoder.writeInt32(-750434882);
                Codecs.engine_validatorAdnlAddress.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_ValidatorAdnlAddress => {
            const kind = decoder.readInt32();
            if (kind === -750434882) {
                return Codecs.engine_validatorAdnlAddress.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_ValidatorAdnlAddress>,

    engine_Validator: {
        encode: (src: engine_Validator, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator') {
                encoder.writeInt32(-2006980055);
                Codecs.engine_validator.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_Validator => {
            const kind = decoder.readInt32();
            if (kind === -2006980055) {
                return Codecs.engine_validator.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_Validator>,

    engine_LiteServer: {
        encode: (src: engine_LiteServer, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.liteServer') {
                encoder.writeInt32(-1150251266);
                Codecs.engine_liteServer.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_LiteServer => {
            const kind = decoder.readInt32();
            if (kind === -1150251266) {
                return Codecs.engine_liteServer.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_LiteServer>,

    engine_ControlProcess: {
        encode: (src: engine_ControlProcess, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.controlProcess') {
                encoder.writeInt32(1790986263);
                Codecs.engine_controlProcess.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_ControlProcess => {
            const kind = decoder.readInt32();
            if (kind === 1790986263) {
                return Codecs.engine_controlProcess.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_ControlProcess>,

    engine_ControlInterface: {
        encode: (src: engine_ControlInterface, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.controlInterface') {
                encoder.writeInt32(830566315);
                Codecs.engine_controlInterface.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_ControlInterface => {
            const kind = decoder.readInt32();
            if (kind === 830566315) {
                return Codecs.engine_controlInterface.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_ControlInterface>,

    engine_Gc: {
        encode: (src: engine_Gc, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.gc') {
                encoder.writeInt32(-1078093701);
                Codecs.engine_gc.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_Gc => {
            const kind = decoder.readInt32();
            if (kind === -1078093701) {
                return Codecs.engine_gc.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_Gc>,

    engine_dht_Config: {
        encode: (src: engine_dht_Config, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.dht.config') {
                encoder.writeInt32(-197295930);
                Codecs.engine_dht_config.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_dht_Config => {
            const kind = decoder.readInt32();
            if (kind === -197295930) {
                return Codecs.engine_dht_config.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_dht_Config>,

    engine_validator_FullNodeMaster: {
        encode: (src: engine_validator_FullNodeMaster, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.fullNodeMaster') {
                encoder.writeInt32(-2071595416);
                Codecs.engine_validator_fullNodeMaster.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_FullNodeMaster => {
            const kind = decoder.readInt32();
            if (kind === -2071595416) {
                return Codecs.engine_validator_fullNodeMaster.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_FullNodeMaster>,

    engine_validator_FullNodeSlave: {
        encode: (src: engine_validator_FullNodeSlave, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.fullNodeSlave') {
                encoder.writeInt32(-2010813575);
                Codecs.engine_validator_fullNodeSlave.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_FullNodeSlave => {
            const kind = decoder.readInt32();
            if (kind === -2010813575) {
                return Codecs.engine_validator_fullNodeSlave.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_FullNodeSlave>,

    engine_validator_Config: {
        encode: (src: engine_validator_Config, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.config') {
                encoder.writeInt32(-826140252);
                Codecs.engine_validator_config.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_Config => {
            const kind = decoder.readInt32();
            if (kind === -826140252) {
                return Codecs.engine_validator_config.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_Config>,

    engine_adnlProxy_Port: {
        encode: (src: engine_adnlProxy_Port, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.adnlProxy.port') {
                encoder.writeInt32(-117344950);
                Codecs.engine_adnlProxy_port.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_adnlProxy_Port => {
            const kind = decoder.readInt32();
            if (kind === -117344950) {
                return Codecs.engine_adnlProxy_port.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_adnlProxy_Port>,

    engine_adnlProxy_Config: {
        encode: (src: engine_adnlProxy_Config, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.adnlProxy.config') {
                encoder.writeInt32(1848000769);
                Codecs.engine_adnlProxy_config.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_adnlProxy_Config => {
            const kind = decoder.readInt32();
            if (kind === 1848000769) {
                return Codecs.engine_adnlProxy_config.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_adnlProxy_Config>,

    adnl_Pong: {
        encode: (src: adnl_Pong, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'adnl.pong') {
                encoder.writeInt32(544504846);
                Codecs.adnl_pong.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): adnl_Pong => {
            const kind = decoder.readInt32();
            if (kind === 544504846) {
                return Codecs.adnl_pong.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<adnl_Pong>,

    engine_validator_KeyHash: {
        encode: (src: engine_validator_KeyHash, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.keyHash') {
                encoder.writeInt32(-1027168946);
                Codecs.engine_validator_keyHash.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_KeyHash => {
            const kind = decoder.readInt32();
            if (kind === -1027168946) {
                return Codecs.engine_validator_keyHash.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_KeyHash>,

    engine_validator_Signature: {
        encode: (src: engine_validator_Signature, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.signature') {
                encoder.writeInt32(-76791000);
                Codecs.engine_validator_signature.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_Signature => {
            const kind = decoder.readInt32();
            if (kind === -76791000) {
                return Codecs.engine_validator_signature.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_Signature>,

    engine_validator_OneStat: {
        encode: (src: engine_validator_OneStat, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.oneStat') {
                encoder.writeInt32(-1533527315);
                Codecs.engine_validator_oneStat.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_OneStat => {
            const kind = decoder.readInt32();
            if (kind === -1533527315) {
                return Codecs.engine_validator_oneStat.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_OneStat>,

    engine_validator_Stats: {
        encode: (src: engine_validator_Stats, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.stats') {
                encoder.writeInt32(1565119343);
                Codecs.engine_validator_stats.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_Stats => {
            const kind = decoder.readInt32();
            if (kind === 1565119343) {
                return Codecs.engine_validator_stats.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_Stats>,

    engine_validator_ControlQueryError: {
        encode: (src: engine_validator_ControlQueryError, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.controlQueryError') {
                encoder.writeInt32(1999018527);
                Codecs.engine_validator_controlQueryError.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_ControlQueryError => {
            const kind = decoder.readInt32();
            if (kind === 1999018527) {
                return Codecs.engine_validator_controlQueryError.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_ControlQueryError>,

    engine_validator_Time: {
        encode: (src: engine_validator_Time, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.time') {
                encoder.writeInt32(-547380738);
                Codecs.engine_validator_time.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_Time => {
            const kind = decoder.readInt32();
            if (kind === -547380738) {
                return Codecs.engine_validator_time.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_Time>,

    engine_validator_Success: {
        encode: (src: engine_validator_Success, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.success') {
                encoder.writeInt32(-1276860789);
                Codecs.engine_validator_success.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_Success => {
            const kind = decoder.readInt32();
            if (kind === -1276860789) {
                return Codecs.engine_validator_success.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_Success>,

    engine_validator_JsonConfig: {
        encode: (src: engine_validator_JsonConfig, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.jsonConfig') {
                encoder.writeInt32(321753611);
                Codecs.engine_validator_jsonConfig.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_JsonConfig => {
            const kind = decoder.readInt32();
            if (kind === 321753611) {
                return Codecs.engine_validator_jsonConfig.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_JsonConfig>,

    engine_validator_ElectionBid: {
        encode: (src: engine_validator_ElectionBid, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.electionBid') {
                encoder.writeInt32(598899261);
                Codecs.engine_validator_electionBid.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_ElectionBid => {
            const kind = decoder.readInt32();
            if (kind === 598899261) {
                return Codecs.engine_validator_electionBid.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_ElectionBid>,

    engine_validator_ProposalVote: {
        encode: (src: engine_validator_ProposalVote, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.proposalVote') {
                encoder.writeInt32(2137401069);
                Codecs.engine_validator_proposalVote.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_ProposalVote => {
            const kind = decoder.readInt32();
            if (kind === 2137401069) {
                return Codecs.engine_validator_proposalVote.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_ProposalVote>,

    engine_validator_DhtServerStatus: {
        encode: (src: engine_validator_DhtServerStatus, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.dhtServerStatus') {
                encoder.writeInt32(-1323440290);
                Codecs.engine_validator_dhtServerStatus.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_DhtServerStatus => {
            const kind = decoder.readInt32();
            if (kind === -1323440290) {
                return Codecs.engine_validator_dhtServerStatus.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_DhtServerStatus>,

    engine_validator_DhtServersStatus: {
        encode: (src: engine_validator_DhtServersStatus, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.dhtServersStatus') {
                encoder.writeInt32(725155112);
                Codecs.engine_validator_dhtServersStatus.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_DhtServersStatus => {
            const kind = decoder.readInt32();
            if (kind === 725155112) {
                return Codecs.engine_validator_dhtServersStatus.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_DhtServersStatus>,

    engine_validator_OverlayStatsNode: {
        encode: (src: engine_validator_OverlayStatsNode, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.overlayStatsNode') {
                encoder.writeInt32(-109960999);
                Codecs.engine_validator_overlayStatsNode.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_OverlayStatsNode => {
            const kind = decoder.readInt32();
            if (kind === -109960999) {
                return Codecs.engine_validator_overlayStatsNode.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_OverlayStatsNode>,

    engine_validator_OverlayStats: {
        encode: (src: engine_validator_OverlayStats, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.overlayStats') {
                encoder.writeInt32(-543098119);
                Codecs.engine_validator_overlayStats.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_OverlayStats => {
            const kind = decoder.readInt32();
            if (kind === -543098119) {
                return Codecs.engine_validator_overlayStats.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_OverlayStats>,

    engine_validator_OverlaysStats: {
        encode: (src: engine_validator_OverlaysStats, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.overlaysStats') {
                encoder.writeInt32(-1677121921);
                Codecs.engine_validator_overlaysStats.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_OverlaysStats => {
            const kind = decoder.readInt32();
            if (kind === -1677121921) {
                return Codecs.engine_validator_overlaysStats.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_OverlaysStats>,

    engine_validator_OnePerfTimerStat: {
        encode: (src: engine_validator_OnePerfTimerStat, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.onePerfTimerStat') {
                encoder.writeInt32(-1859935384);
                Codecs.engine_validator_onePerfTimerStat.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_OnePerfTimerStat => {
            const kind = decoder.readInt32();
            if (kind === -1859935384) {
                return Codecs.engine_validator_onePerfTimerStat.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_OnePerfTimerStat>,

    engine_validator_PerfTimerStatsByName: {
        encode: (src: engine_validator_PerfTimerStatsByName, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.perfTimerStatsByName') {
                encoder.writeInt32(-2101686812);
                Codecs.engine_validator_perfTimerStatsByName.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_PerfTimerStatsByName => {
            const kind = decoder.readInt32();
            if (kind === -2101686812) {
                return Codecs.engine_validator_perfTimerStatsByName.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_PerfTimerStatsByName>,

    engine_validator_PerfTimerStats: {
        encode: (src: engine_validator_PerfTimerStats, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'engine.validator.perfTimerStats') {
                encoder.writeInt32(1607488795);
                Codecs.engine_validator_perfTimerStats.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): engine_validator_PerfTimerStats => {
            const kind = decoder.readInt32();
            if (kind === 1607488795) {
                return Codecs.engine_validator_perfTimerStats.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<engine_validator_PerfTimerStats>,

    storage_Pong: {
        encode: (src: storage_Pong, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.pong') {
                encoder.writeInt32(1828046501);
                Codecs.storage_pong.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_Pong => {
            const kind = decoder.readInt32();
            if (kind === 1828046501) {
                return Codecs.storage_pong.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_Pong>,

    Ok: {
        encode: (src: Ok, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.ok') {
                encoder.writeInt32(-1020584955);
                Codecs.storage_ok.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): Ok => {
            const kind = decoder.readInt32();
            if (kind === -1020584955) {
                return Codecs.storage_ok.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<Ok>,

    storage_State: {
        encode: (src: storage_State, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.state') {
                encoder.writeInt32(856912010);
                Codecs.storage_state.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_State => {
            const kind = decoder.readInt32();
            if (kind === 856912010) {
                return Codecs.storage_state.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_State>,

    storage_Piece: {
        encode: (src: storage_Piece, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.piece') {
                encoder.writeInt32(-2135623155);
                Codecs.storage_piece.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_Piece => {
            const kind = decoder.readInt32();
            if (kind === -2135623155) {
                return Codecs.storage_piece.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_Piece>,

    storage_TorrentInfo: {
        encode: (src: storage_TorrentInfo, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.torrentInfo') {
                encoder.writeInt32(349098222);
                Codecs.storage_torrentInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_TorrentInfo => {
            const kind = decoder.readInt32();
            if (kind === 349098222) {
                return Codecs.storage_torrentInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_TorrentInfo>,

    storage_Update: {
        encode: (src: storage_Update, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.updateInit') {
                encoder.writeInt32(-835460938);
                Codecs.storage_updateInit.encode(src, encoder);
                return;
            }
            if (kind === 'storage.updateHavePieces') {
                encoder.writeInt32(1006116937);
                Codecs.storage_updateHavePieces.encode(src, encoder);
                return;
            }
            if (kind === 'storage.updateState') {
                encoder.writeInt32(95433909);
                Codecs.storage_updateState.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_Update => {
            const kind = decoder.readInt32();
            if (kind === -835460938) {
                return Codecs.storage_updateInit.decode(decoder);
            }
            if (kind === 1006116937) {
                return Codecs.storage_updateHavePieces.decode(decoder);
            }
            if (kind === 95433909) {
                return Codecs.storage_updateState.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_Update>,

    http_Header: {
        encode: (src: http_Header, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'http.header') {
                encoder.writeInt32(-1902385903);
                Codecs.http_header.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): http_Header => {
            const kind = decoder.readInt32();
            if (kind === -1902385903) {
                return Codecs.http_header.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<http_Header>,

    http_PayloadPart: {
        encode: (src: http_PayloadPart, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'http.payloadPart') {
                encoder.writeInt32(693819236);
                Codecs.http_payloadPart.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): http_PayloadPart => {
            const kind = decoder.readInt32();
            if (kind === 693819236) {
                return Codecs.http_payloadPart.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<http_PayloadPart>,

    http_Response: {
        encode: (src: http_Response, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'http.response') {
                encoder.writeInt32(-901208246);
                Codecs.http_response.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): http_Response => {
            const kind = decoder.readInt32();
            if (kind === -901208246) {
                return Codecs.http_response.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<http_Response>,

    http_proxy_Capabilities: {
        encode: (src: http_proxy_Capabilities, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'http.proxy.capabilities') {
                encoder.writeInt32(831679505);
                Codecs.http_proxy_capabilities.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): http_proxy_Capabilities => {
            const kind = decoder.readInt32();
            if (kind === 831679505) {
                return Codecs.http_proxy_capabilities.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<http_proxy_Capabilities>,

    http_server_DnsEntry: {
        encode: (src: http_server_DnsEntry, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'http.server.dnsEntry') {
                encoder.writeInt32(-663592810);
                Codecs.http_server_dnsEntry.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): http_server_DnsEntry => {
            const kind = decoder.readInt32();
            if (kind === -663592810) {
                return Codecs.http_server_dnsEntry.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<http_server_DnsEntry>,

    http_server_Host: {
        encode: (src: http_server_Host, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'http.server.host') {
                encoder.writeInt32(-981605721);
                Codecs.http_server_host.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): http_server_Host => {
            const kind = decoder.readInt32();
            if (kind === -981605721) {
                return Codecs.http_server_host.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<http_server_Host>,

    http_server_Config: {
        encode: (src: http_server_Config, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'http.server.config') {
                encoder.writeInt32(974419964);
                Codecs.http_server_config.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): http_server_Config => {
            const kind = decoder.readInt32();
            if (kind === 974419964) {
                return Codecs.http_server_config.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<http_server_Config>,

    validatorSession_StatsProducer: {
        encode: (src: validatorSession_StatsProducer, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.statsProducer') {
                encoder.writeInt32(-1912887795);
                Codecs.validatorSession_statsProducer.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_StatsProducer => {
            const kind = decoder.readInt32();
            if (kind === -1912887795) {
                return Codecs.validatorSession_statsProducer.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_StatsProducer>,

    validatorSession_StatsRound: {
        encode: (src: validatorSession_StatsRound, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.statsRound') {
                encoder.writeInt32(-1557143706);
                Codecs.validatorSession_statsRound.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_StatsRound => {
            const kind = decoder.readInt32();
            if (kind === -1557143706) {
                return Codecs.validatorSession_statsRound.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_StatsRound>,

    validatorSession_Stats: {
        encode: (src: validatorSession_Stats, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'validatorSession.stats') {
                encoder.writeInt32(1749899919);
                Codecs.validatorSession_stats.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): validatorSession_Stats => {
            const kind = decoder.readInt32();
            if (kind === 1749899919) {
                return Codecs.validatorSession_stats.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<validatorSession_Stats>,

    storage_db_key_TorrentList: {
        encode: (src: storage_db_key_TorrentList, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.db.key.torrentList') {
                encoder.writeInt32(-876156842);
                Codecs.storage_db_key_torrentList.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_key_TorrentList => {
            const kind = decoder.readInt32();
            if (kind === -876156842) {
                return Codecs.storage_db_key_torrentList.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_key_TorrentList>,

    storage_db_key_TorrentShort: {
        encode: (src: storage_db_key_TorrentShort, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.db.key.torrent') {
                encoder.writeInt32(-1182264785);
                Codecs.storage_db_key_torrent.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_key_TorrentShort => {
            const kind = decoder.readInt32();
            if (kind === -1182264785) {
                return Codecs.storage_db_key_torrent.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_key_TorrentShort>,

    storage_db_key_TorrentMeta: {
        encode: (src: storage_db_key_TorrentMeta, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.db.key.torrentMeta') {
                encoder.writeInt32(1646501222);
                Codecs.storage_db_key_torrentMeta.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_key_TorrentMeta => {
            const kind = decoder.readInt32();
            if (kind === 1646501222) {
                return Codecs.storage_db_key_torrentMeta.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_key_TorrentMeta>,

    storage_db_key_Priorities: {
        encode: (src: storage_db_key_Priorities, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.db.key.priorities') {
                encoder.writeInt32(-1242445203);
                Codecs.storage_db_key_priorities.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_key_Priorities => {
            const kind = decoder.readInt32();
            if (kind === -1242445203) {
                return Codecs.storage_db_key_priorities.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_key_Priorities>,

    storage_db_key_PiecesInDb: {
        encode: (src: storage_db_key_PiecesInDb, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.db.key.piecesInDb') {
                encoder.writeInt32(-605500957);
                Codecs.storage_db_key_piecesInDb.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_key_PiecesInDb => {
            const kind = decoder.readInt32();
            if (kind === -605500957) {
                return Codecs.storage_db_key_piecesInDb.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_key_PiecesInDb>,

    storage_db_key_PieceInDb: {
        encode: (src: storage_db_key_PieceInDb, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.db.key.pieceInDb') {
                encoder.writeInt32(-1005916723);
                Codecs.storage_db_key_pieceInDb.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_key_PieceInDb => {
            const kind = decoder.readInt32();
            if (kind === -1005916723) {
                return Codecs.storage_db_key_pieceInDb.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_key_PieceInDb>,

    storage_db_TorrentList: {
        encode: (src: storage_db_TorrentList, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.db.torrentList') {
                encoder.writeInt32(1508893569);
                Codecs.storage_db_torrentList.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_TorrentList => {
            const kind = decoder.readInt32();
            if (kind === 1508893569) {
                return Codecs.storage_db_torrentList.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_TorrentList>,

    storage_db_TorrentShort: {
        encode: (src: storage_db_TorrentShort, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.db.torrent') {
                encoder.writeInt32(-1389545574);
                Codecs.storage_db_torrent.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_TorrentShort => {
            const kind = decoder.readInt32();
            if (kind === -1389545574) {
                return Codecs.storage_db_torrent.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_TorrentShort>,

    storage_db_Priorities: {
        encode: (src: storage_db_Priorities, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.db.priorities') {
                encoder.writeInt32(959048526);
                Codecs.storage_db_priorities.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_Priorities => {
            const kind = decoder.readInt32();
            if (kind === 959048526) {
                return Codecs.storage_db_priorities.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_Priorities>,

    storage_db_PiecesInDb: {
        encode: (src: storage_db_PiecesInDb, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.db.piecesInDb') {
                encoder.writeInt32(102347836);
                Codecs.storage_db_piecesInDb.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_PiecesInDb => {
            const kind = decoder.readInt32();
            if (kind === 102347836) {
                return Codecs.storage_db_piecesInDb.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_PiecesInDb>,

    storage_PriorityAction: {
        encode: (src: storage_PriorityAction, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.priorityAction.all') {
                encoder.writeInt32(-31225536);
                Codecs.storage_priorityAction_all.encode(src, encoder);
                return;
            }
            if (kind === 'storage.priorityAction.idx') {
                encoder.writeInt32(-1794132184);
                Codecs.storage_priorityAction_idx.encode(src, encoder);
                return;
            }
            if (kind === 'storage.priorityAction.name') {
                encoder.writeInt32(19190208);
                Codecs.storage_priorityAction_name.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_PriorityAction => {
            const kind = decoder.readInt32();
            if (kind === -31225536) {
                return Codecs.storage_priorityAction_all.decode(decoder);
            }
            if (kind === -1794132184) {
                return Codecs.storage_priorityAction_idx.decode(decoder);
            }
            if (kind === 19190208) {
                return Codecs.storage_priorityAction_name.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_PriorityAction>,

    storage_daemon_provider_Config: {
        encode: (src: storage_daemon_provider_Config, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.config') {
                encoder.writeInt32(-255421257);
                Codecs.storage_daemon_config.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_provider_Config => {
            const kind = decoder.readInt32();
            if (kind === -255421257) {
                return Codecs.storage_daemon_config.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_provider_Config>,

    storage_daemon_provider_Params: {
        encode: (src: storage_daemon_provider_Params, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.provider.params') {
                encoder.writeInt32(-1401721337);
                Codecs.storage_daemon_provider_params.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_provider_Params => {
            const kind = decoder.readInt32();
            if (kind === -1401721337) {
                return Codecs.storage_daemon_provider_params.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_provider_Params>,

    storage_provider_db_key_State: {
        encode: (src: storage_provider_db_key_State, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.provider.db.key.state') {
                encoder.writeInt32(-199176286);
                Codecs.storage_provider_db_key_state.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_key_State => {
            const kind = decoder.readInt32();
            if (kind === -199176286) {
                return Codecs.storage_provider_db_key_state.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_provider_db_key_State>,

    storage_provider_db_key_ContractList: {
        encode: (src: storage_provider_db_key_ContractList, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.provider.db.key.contractList') {
                encoder.writeInt32(1435683910);
                Codecs.storage_provider_db_key_contractList.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_key_ContractList => {
            const kind = decoder.readInt32();
            if (kind === 1435683910) {
                return Codecs.storage_provider_db_key_contractList.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_provider_db_key_ContractList>,

    storage_provider_db_key_StorageContract: {
        encode: (src: storage_provider_db_key_StorageContract, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.provider.db.key.storageContract') {
                encoder.writeInt32(-866202850);
                Codecs.storage_provider_db_key_storageContract.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_key_StorageContract => {
            const kind = decoder.readInt32();
            if (kind === -866202850) {
                return Codecs.storage_provider_db_key_storageContract.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_provider_db_key_StorageContract>,

    storage_provider_db_key_MicrochunkTree: {
        encode: (src: storage_provider_db_key_MicrochunkTree, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.provider.db.key.microchunkTree') {
                encoder.writeInt32(697887353);
                Codecs.storage_provider_db_key_microchunkTree.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_key_MicrochunkTree => {
            const kind = decoder.readInt32();
            if (kind === 697887353) {
                return Codecs.storage_provider_db_key_microchunkTree.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_provider_db_key_MicrochunkTree>,

    storage_provider_db_key_ProviderConfig: {
        encode: (src: storage_provider_db_key_ProviderConfig, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.provider.db.key.providerConfig') {
                encoder.writeInt32(-404223694);
                Codecs.storage_provider_db_key_providerConfig.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_key_ProviderConfig => {
            const kind = decoder.readInt32();
            if (kind === -404223694) {
                return Codecs.storage_provider_db_key_providerConfig.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_provider_db_key_ProviderConfig>,

    storage_provider_db_State: {
        encode: (src: storage_provider_db_State, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.provider.db.state') {
                encoder.writeInt32(27874803);
                Codecs.storage_provider_db_state.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_State => {
            const kind = decoder.readInt32();
            if (kind === 27874803) {
                return Codecs.storage_provider_db_state.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_provider_db_State>,

    storage_db_ContractAddress: {
        encode: (src: storage_db_ContractAddress, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.provider.db.contractAddress') {
                encoder.writeInt32(-497488643);
                Codecs.storage_provider_db_contractAddress.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_ContractAddress => {
            const kind = decoder.readInt32();
            if (kind === -497488643) {
                return Codecs.storage_provider_db_contractAddress.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_ContractAddress>,

    storage_db_ContractList: {
        encode: (src: storage_db_ContractList, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.provider.db.contractList') {
                encoder.writeInt32(-633805033);
                Codecs.storage_provider_db_contractList.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_db_ContractList => {
            const kind = decoder.readInt32();
            if (kind === -633805033) {
                return Codecs.storage_provider_db_contractList.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_db_ContractList>,

    storage_provider_db_StorageContract: {
        encode: (src: storage_provider_db_StorageContract, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.provider.db.storageContract') {
                encoder.writeInt32(-290216142);
                Codecs.storage_provider_db_storageContract.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_StorageContract => {
            const kind = decoder.readInt32();
            if (kind === -290216142) {
                return Codecs.storage_provider_db_storageContract.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_provider_db_StorageContract>,

    storage_provider_db_MicrochunkTree: {
        encode: (src: storage_provider_db_MicrochunkTree, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.provider.db.microchunkTree') {
                encoder.writeInt32(-1026945214);
                Codecs.storage_provider_db_microchunkTree.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_provider_db_MicrochunkTree => {
            const kind = decoder.readInt32();
            if (kind === -1026945214) {
                return Codecs.storage_provider_db_microchunkTree.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_provider_db_MicrochunkTree>,

    storage_daemon_QueryError: {
        encode: (src: storage_daemon_QueryError, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.queryError') {
                encoder.writeInt32(79542980);
                Codecs.storage_daemon_queryError.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_QueryError => {
            const kind = decoder.readInt32();
            if (kind === 79542980) {
                return Codecs.storage_daemon_queryError.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_QueryError>,

    storage_daemon_Success: {
        encode: (src: storage_daemon_Success, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.success') {
                encoder.writeInt32(-1280381156);
                Codecs.storage_daemon_success.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_Success => {
            const kind = decoder.readInt32();
            if (kind === -1280381156) {
                return Codecs.storage_daemon_success.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_Success>,

    storage_daemon_Torrent: {
        encode: (src: storage_daemon_Torrent, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.torrent') {
                encoder.writeInt32(1691225670);
                Codecs.storage_daemon_torrent.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_Torrent => {
            const kind = decoder.readInt32();
            if (kind === 1691225670) {
                return Codecs.storage_daemon_torrent.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_Torrent>,

    storage_daemon_FileInfo: {
        encode: (src: storage_daemon_FileInfo, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.fileInfo') {
                encoder.writeInt32(1498170004);
                Codecs.storage_daemon_fileInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_FileInfo => {
            const kind = decoder.readInt32();
            if (kind === 1498170004) {
                return Codecs.storage_daemon_fileInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_FileInfo>,

    storage_daemon_TorrentFull: {
        encode: (src: storage_daemon_TorrentFull, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.torrentFull') {
                encoder.writeInt32(1604881447);
                Codecs.storage_daemon_torrentFull.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_TorrentFull => {
            const kind = decoder.readInt32();
            if (kind === 1604881447) {
                return Codecs.storage_daemon_torrentFull.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_TorrentFull>,

    storage_daemon_TorrentList: {
        encode: (src: storage_daemon_TorrentList, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.torrentList') {
                encoder.writeInt32(1327241282);
                Codecs.storage_daemon_torrentList.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_TorrentList => {
            const kind = decoder.readInt32();
            if (kind === 1327241282) {
                return Codecs.storage_daemon_torrentList.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_TorrentList>,

    storage_daemon_TorrentMeta: {
        encode: (src: storage_daemon_TorrentMeta, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.torrentMeta') {
                encoder.writeInt32(-725737752);
                Codecs.storage_daemon_torrentMeta.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_TorrentMeta => {
            const kind = decoder.readInt32();
            if (kind === -725737752) {
                return Codecs.storage_daemon_torrentMeta.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_TorrentMeta>,

    storage_daemon_NewContractParams: {
        encode: (src: storage_daemon_NewContractParams, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.newContractParams') {
                encoder.writeInt32(1432029316);
                Codecs.storage_daemon_newContractParams.encode(src, encoder);
                return;
            }
            if (kind === 'storage.daemon.newContractParamsAuto') {
                encoder.writeInt32(-1351129171);
                Codecs.storage_daemon_newContractParamsAuto.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_NewContractParams => {
            const kind = decoder.readInt32();
            if (kind === 1432029316) {
                return Codecs.storage_daemon_newContractParams.decode(decoder);
            }
            if (kind === -1351129171) {
                return Codecs.storage_daemon_newContractParamsAuto.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_NewContractParams>,

    storage_daemon_NewContractMessage: {
        encode: (src: storage_daemon_NewContractMessage, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.newContractMessage') {
                encoder.writeInt32(-175526410);
                Codecs.storage_daemon_newContractMessage.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_NewContractMessage => {
            const kind = decoder.readInt32();
            if (kind === -175526410) {
                return Codecs.storage_daemon_newContractMessage.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_NewContractMessage>,

    storage_daemon_Peer: {
        encode: (src: storage_daemon_Peer, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.peer') {
                encoder.writeInt32(-1120645068);
                Codecs.storage_daemon_peer.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_Peer => {
            const kind = decoder.readInt32();
            if (kind === -1120645068) {
                return Codecs.storage_daemon_peer.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_Peer>,

    storage_daemon_PeerList: {
        encode: (src: storage_daemon_PeerList, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.peerList') {
                encoder.writeInt32(-1512163307);
                Codecs.storage_daemon_peerList.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_PeerList => {
            const kind = decoder.readInt32();
            if (kind === -1512163307) {
                return Codecs.storage_daemon_peerList.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_PeerList>,

    storage_daemon_SetPriorityStatus: {
        encode: (src: storage_daemon_SetPriorityStatus, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.prioritySet') {
                encoder.writeInt32(-1226268713);
                Codecs.storage_daemon_prioritySet.encode(src, encoder);
                return;
            }
            if (kind === 'storage.daemon.priorityPending') {
                encoder.writeInt32(-2079759962);
                Codecs.storage_daemon_priorityPending.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_SetPriorityStatus => {
            const kind = decoder.readInt32();
            if (kind === -1226268713) {
                return Codecs.storage_daemon_prioritySet.decode(decoder);
            }
            if (kind === -2079759962) {
                return Codecs.storage_daemon_priorityPending.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_SetPriorityStatus>,

    storage_daemon_KeyHash: {
        encode: (src: storage_daemon_KeyHash, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.keyHash') {
                encoder.writeInt32(-2051710244);
                Codecs.storage_daemon_keyHash.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_KeyHash => {
            const kind = decoder.readInt32();
            if (kind === -2051710244) {
                return Codecs.storage_daemon_keyHash.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_KeyHash>,

    storage_daemon_ProviderConfig: {
        encode: (src: storage_daemon_ProviderConfig, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.providerConfig') {
                encoder.writeInt32(2108492436);
                Codecs.storage_daemon_providerConfig.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_ProviderConfig => {
            const kind = decoder.readInt32();
            if (kind === 2108492436) {
                return Codecs.storage_daemon_providerConfig.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_ProviderConfig>,

    storage_daemon_ContractInfo: {
        encode: (src: storage_daemon_ContractInfo, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.contractInfo') {
                encoder.writeInt32(-680243447);
                Codecs.storage_daemon_contractInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_ContractInfo => {
            const kind = decoder.readInt32();
            if (kind === -680243447) {
                return Codecs.storage_daemon_contractInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_ContractInfo>,

    storage_daemon_ProviderInfo: {
        encode: (src: storage_daemon_ProviderInfo, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.providerInfo') {
                encoder.writeInt32(-412417747);
                Codecs.storage_daemon_providerInfo.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_ProviderInfo => {
            const kind = decoder.readInt32();
            if (kind === -412417747) {
                return Codecs.storage_daemon_providerInfo.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_ProviderInfo>,

    storage_daemon_ProviderAddress: {
        encode: (src: storage_daemon_ProviderAddress, encoder: TLWriteBuffer) => {
            const kind = src.kind;
            if (kind === 'storage.daemon.providerAddress') {
                encoder.writeInt32(-2007058158);
                Codecs.storage_daemon_providerAddress.encode(src, encoder);
                return;
            }
            throw Error('Unknown type: ' + kind);
        },
        decode: (decoder: TLReadBuffer): storage_daemon_ProviderAddress => {
            const kind = decoder.readInt32();
            if (kind === -2007058158) {
                return Codecs.storage_daemon_providerAddress.decode(decoder);
            }
            throw Error('Unknown type: ' + kind);
        },
    } as TLCodec<storage_daemon_ProviderAddress>,

};
