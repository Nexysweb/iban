import * as Iban from "./iban";

test("sanitize", () => {
  const iban = "CH84 0022 8228 5516 5140U";
  const ibanS = "CH840022822855165140U";
  const s = Iban.sanitize(iban);

  expect(s).toEqual(ibanS);
});

test("isValid", () => {
  const iban1 = "HU04 1160 0006 0000 0000 5028 3396";
  const iban2 = "CH38 0022 8228 1133 9301 G";
  const iban3 = "CH38 0022 8228 1133 9301 ";

  expect(Iban.isValid(iban1)).toEqual(true);
  expect(Iban.isValid(iban2)).toEqual(true);
  expect(Iban.isValid(iban3)).toEqual(false);
});
