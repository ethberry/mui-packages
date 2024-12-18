export enum CommonStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  HIDDEN = "HIDDEN",
}

export enum ContractFeatures {
  // SYSTEM
  "WITHDRAW" = "WITHDRAW",
  "ALLOWANCE" = "ALLOWANCE",
  "EXTERNAL" = "EXTERNAL",

  // ERC20
  "BLACKLIST" = "BLACKLIST",
  "WHITELIST" = "WHITELIST",
  "STABLE_COIN" = "STABLE_COIN",

  // EC721
  "DISCRETE" = "DISCRETE",
  "GENES" = "GENES",
  "RANDOM" = "RANDOM",
  "RENTABLE" = "RENTABLE",
  "SOULBOUND" = "SOULBOUND",
  "VOTES" = "VOTES",
  "TRAITS" = "TRAITS",

  // ERC998
  "ERC20OWNER" = "ERC20OWNER",
  "ERC1155OWNER" = "ERC1155OWNER",
  "STATEHASH" = "STATEHASH",

  // MODULE:MYSTERY
  "PAUSABLE" = "PAUSABLE",

  // MODULE:PONZI
  "REFERRAL" = "REFERRAL",
  "SPLITTER" = "SPLITTER",
}
