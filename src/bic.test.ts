import * as Bic from "./bic";

const bic1 = "POFICHBEXXX";
const bic2 = "UBSWCHZHXXX";
const bic3 = "GIBAHUHB";
const bic4 = "GIBA-HU HB";

test("sanitize", () => {
  const s = Bic.sanitize(bic4);

  expect(s).toEqual(bic3);
});

test("isValid", () => {
  expect(Bic.isValid(bic1)).toEqual(true);
  expect(Bic.isValid(bic2)).toEqual(true);
  expect(Bic.isValid(bic3)).toEqual(true);
  expect(Bic.isValid(bic4)).toEqual(false);
});
