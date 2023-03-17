import { constants } from "ethers";

import { TokenType } from "@gemunion/types-blockchain";

import { ITokenAsset, ITokenAssetComponent } from "./types";

export function getEmptyToken(tokenType = TokenType.ERC20): any {
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

export const emptyToken = getEmptyToken(TokenType.ERC721);
