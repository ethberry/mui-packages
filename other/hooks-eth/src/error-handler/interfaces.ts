export enum SystemErrorPrefix {
  EMPTY = "0x",
  ERROR_STRING_PREFIX = "0x08c379a0",
  PANIC_CODE_PREFIX = "0x4e487b71",
}

export enum CustomErrorPrefix {
  "0xf0f16622" = "BalanceExceed",
  "0x1c97df40" = "CountExceed",
  "0x203d82d8" = "Expired",
  "0xdf4cc36d" = "ExpiredSignature",
  "0x4fce92cf" = "LimitExceed",
  "0xcd7ee2ee" = "MethodNotSupported",
  "0x80cb55e2" = "NotActive",
  "0xeea91ff8" = "NotAnOwner",
  "0x0701727f" = "NotComplete",
  "0xad5679e1" = "NotExist",
  "0x354c44dd" = "RefProgramSet",
  "0x255a6a43" = "SignerMissingRole",
  "0x5c201a4d" = "TemplateZero",
  "0xd78b7d54" = "UnsupportedTokenType",
  "0x49986e73" = "WrongAmount",
  "0x517070ee" = "WrongRule",
  "0x67f3734e" = "WrongStake",
  "0xa0f3feea" = "WrongToken",
  "0x669567ea" = "ZeroBalance",
}

export enum CustomErrorReasons {
  BalanceExceed = "The balance exceeds the limit",
  CountExceed = "The count exceeds the limit",
  Expired = "The item has expired",
  ExpiredSignature = "The signature has expired",
  LimitExceed = "The limit has been exceeded",
  MethodNotSupported = "The method is not supported",
  NotActive = "The item is not active",
  NotAnOwner = "The user is not an owner",
  NotComplete = "The operation is not complete",
  NotExist = "The item does not exist",
  RefProgramSet = "The referral program is set",
  SignerMissingRole = "The signer is missing a role",
  TemplateZero = "The template is zero",
  UnsupportedTokenType = "The token type is not supported",
  WrongAmount = "The amount is wrong",
  WrongRule = "The rule is wrong",
  WrongStake = "The stake is wrong",
  WrongToken = "The token is wrong",
  ZeroBalance = "The balance is zero",
}

export enum PanicCodes {
  ASSERTION_ERROR = 0x1,
  ARITHMETIC_UNDER_OR_OVERFLOW = 0x11,
  DIVISION_BY_ZERO = 0x12,
  ENUM_CONVERSION_OUT_OF_BOUNDS = 0x21,
  INCORRECTLY_ENCODED_STORAGE_BYTE_ARRAY = 0x22,
  POP_ON_EMPTY_ARRAY = 0x31,
  ARRAY_ACCESS_OUT_OF_BOUNDS = 0x32,
  TOO_MUCH_MEMORY_ALLOCATED = 0x41,
  ZERO_INITIALIZED_VARIABLE = 0x51,
}

export enum PanicReasons {
  ASSERTION_ERROR = "Assertion error",
  ARITHMETIC_UNDER_OR_OVERFLOW = "Arithmetic operation underflowed or overflowed outside of an unchecked block",
  DIVISION_BY_ZERO = "Division or modulo division by zero",
  ENUM_CONVERSION_OUT_OF_BOUNDS = "Tried to convert a value into an enum, but the value was too big or negative",
  INCORRECTLY_ENCODED_STORAGE_BYTE_ARRAY = "Incorrectly encoded storage byte array",
  POP_ON_EMPTY_ARRAY = ".pop() was called on an empty array",
  ARRAY_ACCESS_OUT_OF_BOUNDS = "Array accessed at an out-of-bounds or negative index",
  TOO_MUCH_MEMORY_ALLOCATED = "Too much memory was allocated, or an array was created that is too large",
  ZERO_INITIALIZED_VARIABLE = "Called a zero-initialized variable of internal function type",
}
