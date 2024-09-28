import { constants } from "ethers";

import { TokenType } from "@ethberry/types-blockchain";

import type { ITokenAsset, ITokenAssetComponent } from "./types";

export function getEmptyToken(tokenType = TokenType.ERC20, contractId = 0): any {
  return {
    components: [
      {
        tokenType,
        contractId,
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

export const emptyToken = getEmptyToken(TokenType.ERC721);
