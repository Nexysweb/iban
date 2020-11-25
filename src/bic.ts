/**
 * BIC/SWIFT after ISO_9362
 * @see https://en.wikipedia.org/wiki/ISO_9362
 * @param {[type]} bic: String [description]
 */

import { patterns } from "pdfkit/js/page";

// cleans input
export const sanitize = (bic: string): string =>
  bic.replace(/[^0-9A-Z]/g, "").toUpperCase();

const pattern = new RegExp(
  [
    "^",
    "[A-Z]{4}", // 4 letters: institution code or bank code.
    "[A-Z]{2}", // 2 letters: ISO 3166-1 alpha-2 country code
    "[0-9A-Z]{2}", // 2 letters or digits: location code
    "([0-9A-Z]{3})?", // 3 letters or digits: branch code, optional ('XXX' for primary office)
    "$",
  ].join("")
);

export const isValid = (bic: string): boolean => {
  const r = bic.match(pattern);

  return !!r;
};
