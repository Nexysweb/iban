import * as Bvr from "./esr";

test("generate from template", () => {
  const s = "76 54321 23400 00000 00000 00015".replace(/ /g, "");
  const idx = 678;
  expect(s.length).toEqual(Bvr.refNrLength);
  const r = Bvr.generateFromTemplate(s, idx);
  expect(r).toEqual("765432123400000000000006787");
  expect(Bvr.isRefNumberValid(r)).toEqual(true);
  const r2 = Bvr.generate(idx, s);
  expect(r2).toEqual(r);
});

test("generate ", () => {
  const r = Bvr.generate(123);
  expect(r).toEqual("000000000000000000000001236");
  expect(Bvr.isRefNumberValid(r)).toEqual(true);
});

test("modulo10CheckSum", () => {
  const s1 = "123";
  expect(Bvr.modulo10CheckSum(s1)).toEqual(6);

  const s2 = "65 43265 43200 00000 00000 0001";
  expect(Bvr.modulo10CheckSum(s2)).toEqual(8);

  const s3 = "76 54321 23400 00000 00000 0001";
  expect(Bvr.modulo10CheckSum(s3)).toEqual(5);

  const s4 = "34 56700 00000 00000 00000 0001";
  expect(Bvr.modulo10CheckSum(s4)).toEqual(1);
});

test("bvrbToRefNr", () => {
  const iban = "34 56700 00000 00000 00000 00011";
  const ibanSeqInt = iban
    .replace(/ /g, "")
    .split("")
    .map((x) => Number(x));

  expect(Bvr.formatRefNr(ibanSeqInt)).toEqual(iban);
});

test("isRefNumberWithCorrectLength", () => {
  const s1 = "12 34000 00000 00000 00000 00016";
  const s2 = "12 34000 00000 00000 00000 000";

  expect(Bvr.isRefNumberWithCorrectLength(s1)).toEqual(true);
  expect(Bvr.isRefNumberWithCorrectLength(s2)).toEqual(false);
});

test("isRefNumberValid", () => {
  const s1 = "12 34000 00000 00000 00000 00016";
  expect(Bvr.isRefNumberValid(s1)).toEqual(true);

  const s2 = "12 34000 00000 00000 00000 00017";
  expect(Bvr.isRefNumberValid(s2)).toEqual(false);

  const s3 = "12 34000 00000 00000 00000 00018";
  expect(Bvr.isRefNumberValid(s3)).toEqual(false);

  const s4 = "12 34000 00000 00000 00000 00019";
  expect(Bvr.isRefNumberValid(s4)).toEqual(false);

  const s5 = "12 34000 00000 00000 00000 00010";
  expect(Bvr.isRefNumberValid(s5)).toEqual(false);

  const s6 = "12 34000 00000 00000 00000 00011";
  expect(Bvr.isRefNumberValid(s6)).toEqual(false);

  const s7 = "12 34000 00000 00000 00000 00012";
  expect(Bvr.isRefNumberValid(s7)).toEqual(false);
  const s8 = "12 34000 00000 00000 00000 00013";
  expect(Bvr.isRefNumberValid(s8)).toEqual(false);

  const s9 = "12 34000 00000 00000 00000 00014";
  expect(Bvr.isRefNumberValid(s9)).toEqual(false);

  const s0 = "12 34000 00000 00000 00000 00015";
  expect(Bvr.isRefNumberValid(s0)).toEqual(false);
});

test("ispost acccount", () => {
  const s1 = "01-000145-6";
  expect(Bvr.isAccount(s1)).toEqual(true);

  const s2 = "01-1245-1";
  expect(Bvr.isAccount(s2)).toEqual(false);

  const s3 = "01-084798-7";
  expect(Bvr.isAccount(s3)).toEqual(true);

  const s4 = "0a-12451-1";
  expect(Bvr.isAccount(s4)).toEqual(false);

  const s5 = "01-036888-3";
  expect(Bvr.isAccount(s5)).toEqual(true);

  const s6 = "01-016905-5";
  expect(Bvr.isAccount(s6)).toEqual(true);
});
