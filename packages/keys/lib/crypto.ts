// import nacl from 'tweetnacl';
// import { getPublicKey, getSharedSecret } from '@noble/ed25519';
// import ed2curve from 'ed2curve';
//
// (async () => {
//   const keyPair1 = nacl.sign.keyPair();
//   const publicKey1 = Buffer.from(keyPair1.publicKey);
//   const secretKey1 = Buffer.from(keyPair1.secretKey);
//
//   const keyPair2 = nacl.sign.keyPair();
//   const publicKey2 = Buffer.from(keyPair2.publicKey);
//   const secretKey2 = Buffer.from(keyPair2.secretKey);
//
//   const curveSecretKey1 = ed2curve.convertSecretKey(secretKey1.slice(0, 32));
//   const curvePublicKey2 = ed2curve.convertPublicKey(publicKey2) !;
//   const sharedSecret1 = Buffer.from(nacl.scalarMult(curveSecretKey1, curvePublicKey2));
//   // d117da5a2cd0f6ae36c534af44f1a3125e651eb3bc0399fc0a22037501dc1a5a
//   console.log({ sharedSecret1: sharedSecret1.toString('hex') });
//
//   const sharedSecret2 = Buffer.from(await getSharedSecret(secretKey1.slice(0, 32), publicKey2));
//   // d117da5a2cd0f6ae36c534af44f1a3125e651eb3bc0399fc0a22037501dc1a5a
//   console.log({ sharedSecret2: sharedSecret2.toString('hex') });
// })();
