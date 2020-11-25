import Nutils, { string } from "@nexys/utils";

/**
 * helper object for BVr
 * note ref number are always input and output as strings since they can begin with zero and to avoid bad rounding etc..
 */

/**
 * length of of reference number (without checksum)
 */
const refNrLength = 26;

/**
 *  create list of integers from string, remove all non digits (hence flatMap)
 * @param  s: input string
 * @return list of int (between 0 and 9)
 */
export const stringToInt = (s: string): number[] =>
  s
    .split("")
    .map((x) => {
      // get int to from string (by default get the ASCII code, need to remove 48 to get proper int)
      const i = x.charCodeAt(0) - 48;
      // make sure resulting if between 0 and 9, otherwise exclude
      if (i >= 0 && i <= 9) {
        return i;
      }

      return undefined;
    })
    .filter(Nutils.array.notEmpty);

/**
 * calculates last number if bvr (checksum)
 * @param s: input string (always a  number but can begin with zeros)
 * @see https://gist.github.com/christianmeichtry/9348451
 */
export const modulo10CheckSum = (s: string): number => {
  // ref table
  const table = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];

  // create list of integers from string
  // prefix the list with zero
  const ss = stringToInt(s);
  const intList: number[] = [0, ...ss];

  // go trhough the list and return 10- table(idx)
  const rResult = intList.reduce((a, b) => {
    // get index
    const idx = (a + b) % 10;

    // get associated value from the table
    return table[idx];
  });

  return 10 - (rResult % 10); // % 10 required here, in order not to return > 9 !
};

// Takes a credit card string value and returns true on valid number
const modulo10CheckSum2 = (value: string): number => {
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) {
    throw Error("must be only numbers based");
  }

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0,
    bEven = false;
  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10; //== 0;
};

/**
 * Luhn algorithm in JavaScript: validate credit card number supplied as string of numbers
 * @author ShirtlessKirk. Copyright (c) 2012.
 * @license WTFPL (http://www.wtfpl.net/txt/copying)
 */
var modulo10CheckSum3 = (function (arr) {
  return (ccNum: any) => {
    var len = ccNum.length,
      bit = 1,
      sum = 0,
      val;

    while (len) {
      val = parseInt(ccNum.charAt(--len), 10);
      sum += (bit ^= 1) ? arr[val] : val;
    }

    return sum && sum % 10;
  };
})([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]);

/**
 * format reference number
 * @param  s: ref number as array of int
 * @return string properly formatted
 */
export const formatRefNr = (s: number[]): String =>
  s
    .map((x, i) => {
      if ((i - 2) % 5 === 0) {
        return " " + x;
      }
      return String(x);
    })
    .reduce((a, b) => a + b);

/**
 * check if given ref number is valid
 * @param s: ref number
 * @return true or false
 */
export const isRefNumberValid = (s: string): boolean => {
  try {
    const t = stringToInt(s);

    //return true;
    return (
      modulo10CheckSum3(s.slice(0, -1)) == t[t.length - 1] &&
      isRefNumberWithCorrectLength(s)
    );
  } catch (err) {
    return false;
  }
};

/**
 * checks if ref number has correct length
 * @param s: ref number
 * @return true or false
 */
export const isRefNumberWithCorrectLength = (s: string): boolean => {
  try {
    const t = stringToInt(s);

    return t.length == 27;
  } catch (err) {
    return false;
  }
};

/**
 * checks if input string is a valid post account (this will be replaced with IBAN soon)
 */
const isAccountRightFormat = (s: string): boolean => {
  const pattern = /^0[12]-[0-9]{6}-[0-9]$/;

  return !!s.match(pattern);
};

const isAccountCheck = (s: string): boolean => {
  try {
    const last = Number(s[s.length - 1]);
    const r = modulo10CheckSum(s.slice(0, -1));

    return r == last;
  } catch (err) {
    return false;
  }
};

const isAccount = (s: string): boolean =>
  isAccountRightFormat(s) && isAccountCheck(s);

/**
 * is participant number
 * @param s: participant number
 * @return boolean
 */
const isParticipantNumber = (s: string): boolean => {
  const t = formatParticipantNumber(s);

  return t.length <= 9 && !!t.match(/\d+/) && !!t.slice(0, 2).match(/0[12]/);
};

/**
 * format participant number
 * @param s: participant number
 * @return formatted paerticipatn number
 */
const formatParticipantNumber = (s: string): string => {
  const f = s.replace(/-/g, "");
  const t1 = f.slice(0, 2);
  const tn = f[f.length - 1]; //.takeRight(1)

  const t2 = f; // f.drop(1).dropRight(1)

  return t1 + t2 + tn;
};
