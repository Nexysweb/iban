// taken from https://gitlab.com/nexyserp/erpback/-/blob/dev/app/utils/Iban.scala

export const sanitize = (iban: string) => iban.replace(/\s/g, "");

/**
 * IBAN regex pattern, IBAN2007
 * taken from line 615 of camt054.1.2.xsc
 */
const pattern: RegExp = /[A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30}/;

/**
 * hash table of country prefix and asssociated length
 */
const ibanLen = new Map([
  ["NO", 15],
  ["BE", 16],
  ["DK", 18],
  ["FI", 18],
  ["FO", 18],
  ["GL", 18],
  ["NL", 18],
  ["MK", 19],
  ["SI", 19],
  ["AT", 20],
  ["BA", 20],
  ["EE", 20],
  ["KZ", 20],
  ["LT", 20],
  ["LU", 20],
  ["CR", 21],
  ["CH", 21],
  ["HR", 21],
  ["LI", 21],
  ["LV", 21],
  ["BG", 22],
  ["BH", 22],
  ["DE", 22],
  ["GB", 22],
  ["GE", 22],
  ["IE", 22],
  ["ME", 22],
  ["RS", 22],
  ["AE", 23],
  ["GI", 23],
  ["IL", 23],
  ["AD", 24],
  ["CZ", 24],
  ["ES", 24],
  ["MD", 24],
  ["PK", 24],
  ["RO", 24],
  ["SA", 24],
  ["SE", 24],
  ["SK", 24],
  ["VG", 24],
  ["TN", 24],
  ["PT", 25],
  ["IS", 26],
  ["TR", 26],
  ["FR", 27],
  ["GR", 27],
  ["IT", 27],
  ["MC", 27],
  ["MR", 27],
  ["SM", 27],
  ["AL", 28],
  ["AZ", 28],
  ["CY", 28],
  ["DO", 28],
  ["GT", 28],
  ["HU", 28],
  ["LB", 28],
  ["PL", 28],
  ["BR", 29],
  ["PS", 29],
  ["KW", 30],
  ["MU", 30],
  ["MT", 31],
]);

/**
 * check iBAN validity
 * @param iban: input iban
 * @return valid or not
 * @see https://rosettacode.org/wiki/IBAN#Scala
 * @see https://en.wikipedia.org/wiki/International_Bank_Account_Number#Validating_the_IBAN
 */
export const isValid = (iban: string): boolean => {
  try {
    check(iban);
    return true;
  } catch (err) {
    console.warn(err.message);
    return false;
  }
};

export const check = (iban: string): void => {
  // remove space and all uppercase
  const cleanIban = sanitize(iban);

  // check IBAN length
  const prefix = cleanIban.slice(0, 2);
  const il = ibanLen.get(prefix);

  if (!il) {
    throw Error("prefix not found");
  }

  if (il !== cleanIban.length) {
    throw Error("IBAN length does not match expected length " + cleanIban);
  }

  // check if pattern is right
  const isValidpattern = cleanIban.match(pattern);

  // if not right pattern, return false
  if (!isValidpattern) {
    throw Error("pattern invalid");
  }

  // do mod 97 validation
  const isMod97 = mod97(cleanIban);

  if (!isMod97) {
    throw Error("mod97 failed");
  }
};

const mod97 = (s: string): boolean => {
  const rearranged = s.substring(4, s.length) + s.substring(0, 4);
  const numeric = Array.from(rearranged)
    .map((c) => (isNaN(parseInt(c)) ? (c.charCodeAt(0) - 55).toString() : c))
    .join("");
  const remainder = Array.from(numeric)
    .map((c) => parseInt(c))
    .reduce((remainder, value) => (remainder * 10 + value) % 97, 0);

  return remainder === 1;
};
