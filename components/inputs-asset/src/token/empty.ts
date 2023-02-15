import { constants } from "ethers";

import { TokenType } from "@gemunion/types-blockchain";

import { ITokenAsset, ITokenAssetComponent } from "./types";

export function getEmptyToken(tokenType = TokenType.ERC20) {
  return {
    components: [
      {
        tokenType,
        contractId: 0,
        contract: {
          decimals: tokenType === TokenType.NATIVE || tokenType === TokenType.ERC20 ? 18 : 0,
          address: constants.AddressZero,
        },
        templateId: 0,
        token: {
          tokenId: "0",
        },
        amount:
          tokenType === TokenType.NATIVE || tokenType === TokenType.ERC20 ? constants.WeiPerEther.toString() : "1",
      } as ITokenAssetComponent,
    ],
  } as ITokenAsset;
}

export const emptyToken = {
  components: [
    {
      tokenType: TokenType.ERC721,
      contractId: 0,
      contract: {
        decimals: 0,
        address: constants.AddressZero,
      },
      templateId: 0,
      token: {
        tokenId: "0",
      },
      amount: "1", // default amount for ERC721-998-1155
    } as ITokenAssetComponent,
  ],
} as ITokenAsset;
