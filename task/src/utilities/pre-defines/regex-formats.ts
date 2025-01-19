/**
 * REGEX FORMATS
 */
const ALFA_FORMAT = /^[a-zA-Z\s]+$/;
const ALFA_NUM_FORMAT = /^[a-zA-Z0-9\s,]+$/;
const NUMBER_FORMAT = /^[0-9]+$/;
const MONEY_FORMAT = /^\d{1,10}(\.\d{1,5})?$/;
const FLOAT_NUMBER_FORMAT = /^[+]?\d*\.?\d+$/;
const USERNAME_FORMAT = /^[a-zA-Z0-9]+$/;
const MAIL_FORMAT = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
const IBAN_FORMAT = /^SA\d{4}[0-9]{18}$/;

const CONTAINS_SPECIAL_CHARACTERS = /[!@#$%^&*(),.?":{}|<>_/^\\[\]\-+=']/;
const CONTAINS_UPPERCASE_AND_LOWERCASE = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
const CONTAINS_NUMBER = /\d/;

const EnglishOnly = /^[a-zA-Z0-9 ]*$/;
const ArabicOnly = /^[\u0621-\u064A0-9 ]*$/;
const ArabicAndEnglishOnly = /^[a-zA-Z0-9 \u0621-\u064A ]*$/;

const PASSWORD =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_/^\\[\]\-+=']).{8,}$/;

const NATIONAL_ID = /^[1-2]\d{9}$/;
const NoSepcialCharacters = /^[a-zA-Z0-9]*$/;

const SUADI_MOBILE = /^5\d{8}$/;

// EXPORT ALL FORMATS
export const REGEX_FORMATS = {
  ALFA: ALFA_FORMAT,
  ALFA_NUM: ALFA_NUM_FORMAT,
  NUMBER: NUMBER_FORMAT,
  MONEY: MONEY_FORMAT,
  FLOAT: FLOAT_NUMBER_FORMAT,
  USERNAME: USERNAME_FORMAT,
  MAIL: MAIL_FORMAT,
  PASSWORD,
  NATIONAL_ID,
  CONTAINS_SPECIAL_CHARACTERS,
  CONTAINS_UPPERCASE_AND_LOWERCASE,
  CONTAINS_NUMBER,
  NoSepcialCharacters,
  EnglishOnly,
  ArabicOnly,
  ArabicAndEnglishOnly,
  SUADI_MOBILE,
  IBAN_FORMAT: IBAN_FORMAT
};
