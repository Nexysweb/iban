import * as Bvr from "./esr";

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

/*
    "" in {
     

     
    }

    "isRefNumberValid" in {
      val s1 = "12 34000 00000 00000 00000 00016"
      isRefNumberValid(s1) mustEqual (true)

      
      isRefNumberValid(s2) mustEqual (false)

      val s3 = "12 34000 00000 00000 00000 00018"
      isRefNumberValid(s3) mustEqual (false)

      val s4 = "12 34000 00000 00000 00000 00019"
      isRefNumberValid(s4) mustEqual (false)

      val s5 = "12 34000 00000 00000 00000 00010"
      isRefNumberValid(s5) mustEqual (false)

      val s6 = "12 34000 00000 00000 00000 00011"
      isRefNumberValid(s6) mustEqual (false)

      val s7 = "12 34000 00000 00000 00000 00012"
      isRefNumberValid(s7) mustEqual (false)

      val s8 = "12 34000 00000 00000 00000 00013"
      isRefNumberValid(s8) mustEqual (false)

      val s9 = "12 34000 00000 00000 00000 00014"
      isRefNumberValid(s9) mustEqual (false)

      val s0 = "12 34000 00000 00000 00000 00015"
      isRefNumberValid(s0) mustEqual (false)
    }

    "is post Account" in {
      val s1 = "01-000145-6"
      isAccount(s1) mustEqual (true)

      val s2 = "01-1245-1"
      isAccount(s2) mustEqual (false)

      val s3 = "01-084798-7"
      isAccount(s3) mustEqual (true)

      val s4 = "0a-12451-1"
      isAccount(s4) mustEqual (false)

      val s5 = "01-036888-3"
      isAccount(s5) mustEqual(true)

      val s6 = "01-16905-5"
      isAccount(s5) mustEqual (true)
    }
 */
