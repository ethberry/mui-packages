export interface IBlockchainError {
  type: BlockchainErrorType;
  reason: string;
}

export enum BlockchainErrorType {
  EMPTY = "EMPTY",
  SYSTEM_STRING = "SYSTEM_STRING",
  SYSTEM_PANIC_CODE = "SYSTEM_PANIC_CODE",
  CUSTOM_ERROR = "CUSTOM_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export enum SystemErrorPrefix {
  EMPTY = "0x",
  ERROR_STRING_PREFIX = "0x08c379a0",
  PANIC_CODE_PREFIX = "0x4e487b71",
}

export enum CustomErrors {
  "0xf5390b24" = "DiamondAlreadyInitialised",
  "0xdf4cc36d" = "ExpiredSignature",
  "0xa9ad62f8" = "FunctionDoesNotExist",
  "0x14140525" = "GenesNotOwnerNorApproved",
  "0x897169d0" = "GenesPregnancyCountLimitExceed",
  "0x546f6975" = "GenesPregnancyTimeLimitExceed",
  "0xf461d719" = "LotteryBalanceExceed",
  "0xd5dcb873" = "LotteryNotOwnerNorApproved",
  "0xebf531d7" = "LotteryPrizeNotEligible",
  "0xca4b8f09" = "LotteryRoundNotActive",
  "0x18d326b1" = "LotteryRoundNotComplete",
  "0x8a35bd73" = "LotteryTicketExpired",
  "0xddf9ff20" = "LotteryTicketLimitExceed",
  "0x008028c4" = "LotteryWrongRound",
  "0xa735d4c6" = "LotteryWrongToken",
  "0x3301fd38" = "LotteryZeroBalance",
  "0xdadda903" = "MergeDifferentContracts",
  "0xa178a447" = "MergeDifferentTemplate",
  "0xcd7ee2ee" = "MethodNotSupported",
  "0x93a0236d" = "NoContent",
  "0xe9bd70e2" = "PredictionAlreadyResolved",
  "0x4397222f" = "PredictionBetAlreadyPlaced",
  "0x18aee06d" = "PredictionBetAmountTooLow",
  "0x187ff6c6" = "PredictionBetNotFound",
  "0x5457b749" = "PredictionCannotClaimBeforeResolution",
  "0xee515eaa" = "PredictionEnded",
  "0xcbd819ac" = "PredictionInvalidOutcome",
  "0x8d570457" = "PredictionNoTreasuryAssets",
  "0xf7df1016" = "PredictionNotEligibleForClaim",
  "0xb648cd78" = "PredictionNotFound",
  "0x15488d57" = "PredictionNotStarted",
  "0xecede0d9" = "PredictionRewardAlreadyClaimed",
  "0xeb030b0c" = "PredictionTreasuryFeeTooHigh",
  "0x6e113271" = "PredictionWrongToken",
  "0xab36f391" = "ProtectedAttribute",
  "0xc69513ea" = "RaffleNotOwnerNorApproved",
  "0x634f06a2" = "RafflePrizeNotEligible",
  "0x6fc0251d" = "RaffleRoundNotActive",
  "0x239d7389" = "RaffleRoundNotComplete",
  "0xec2c266c" = "RaffleTicketExpired",
  "0x932534c7" = "RaffleTicketLimitExceed",
  "0x3eefbf9a" = "RaffleWrongRound",
  "0x2a0ab845" = "RaffleWrongToken",
  "0x10cb6e1c" = "RaffleZeroBalance",
  "0xcf95f450" = "RentableNoItems",
  "0x255a6a43" = "SignerMissingRole",
  "0x5c201a4d" = "TemplateZero",
  "0xd78b7d54" = "UnsupportedTokenType",
  "0x0a308026" = "WaitListAddressAlreadyExists",
  "0xb05b1b1d" = "WaitListMissingRoot",
  "0x4fcc7d10" = "WaitListNoReward",
  "0x8a0f93cf" = "WaitListRewardAlreadyClaimed",
  "0x74ccfad9" = "WaitListRootAlreadySet",
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
