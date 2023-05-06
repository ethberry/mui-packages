import { ZeroAddress, WeiPerEther } from "ethers";

import { TokenType } from "@gemunion/types-blockchain";

import { ITemplateAsset, ITemplateAssetComponent } from "./types";

export function getEmptyTemplate(tokenType = TokenType.ERC20): any {
  return {
    components: [
      {
        tokenType,
        contractId: 0,
        contract: {
          decimals: tokenType === TokenType.NATIVE || tokenType === TokenType.ERC20 ? 18 : 0,
          address: ZeroAddress,
        },
        templateId: 0,
        amount: tokenType === TokenType.NATIVE || tokenType === TokenType.ERC20 ? WeiPerEther.toString() : "1",
      } as ITemplateAssetComponent,
    ],
  } as ITemplateAsset;
}

export const emptyPrice = getEmptyTemplate(TokenType.NATIVE);

export const emptyItem = getEmptyTemplate(TokenType.ERC721);
