import {generate} from 'ton-tl/dist/gen';
import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';

{
  const tl = readFileSync(join(__dirname, '../../scheme/ton_api.tl'), 'utf8')
    .replace(/;.*/g, ';');

  const types = `
// @ts-nocheck

export type TLDouble = TLBytes;
export type double = TLDouble;

export type True = true;

export type int128 = TLInt128;

`;

  const generatedSchema = types + generate(tl)
    .replaceAll('readonly f: function;', 'readonly f: Function;')
    .replace('export const Codecs = {', `export const Codecs = {
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

`);

  writeFileSync(join(__dirname, '../ton_api.ts'), generatedSchema);
}
