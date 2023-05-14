import {adnlIdDecode, adnlIdEncode} from "../lib/adnl-node-id";

describe('ADNL node ID', () => {
  it('adnlIdEncode', () => {
    const id = Buffer.from('12345678901234567890123456789012', 'ascii');
    const encoded = adnlIdEncode(id, false);
    expect(encoded).toBe('uytemzugu3doobzgaytemzugu3doobzgaytemzugu3doobzgaytfurj');
  });
  it('adnlIdEncode upper case', () => {
    const id = Buffer.from('12345678901234567890123456789012', 'ascii');
    const encoded = adnlIdEncode(id, true);
    expect(encoded).toBe('UYTEMZUGU3DOOBZGAYTEMZUGU3DOOBZGAYTEMZUGU3DOOBZGAYTFURJ');
  });
  it('adnlIdDecode', () => {
    const encoded = 'uytemzugu3doobzgaytemzugu3doobzgaytemzugu3doobzgaytfurj';
    const decoded = adnlIdDecode(encoded);
    expect(decoded).toEqual(Buffer.from('12345678901234567890123456789012', 'ascii'));
  });
  it('adnlIdDecode upper case', () => {
    const encoded = 'UYTEMZUGU3DOOBZGAYTEMZUGU3DOOBZGAYTEMZUGU3DOOBZGAYTFURJ';
    const decoded = adnlIdDecode(encoded);
    expect(decoded).toEqual(Buffer.from('12345678901234567890123456789012', 'ascii'));
  });
});
