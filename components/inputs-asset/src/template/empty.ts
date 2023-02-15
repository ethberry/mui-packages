import { constants } from "ethers";

import { TokenType } from "@gemunion/types-blockchain";

import { ITemplateAsset, ITemplateAssetComponent } from "./types";
import { ITokenAsset, ITokenAssetComponent } from "../token/types";

export function getEmptyTemplate(tokenType = TokenType.ERC20) {
  return {
    components: [
      {
        tokenType,
        contractId: 0,
        contract: {
          decimals: 18,
          address: constants.AddressZero,
        },
        templateId: 0,
        amount:
          tokenType === TokenType.NATIVE || tokenType === TokenType.ERC20 ? constants.WeiPerEther.toString() : "1",
      } as ITemplateAssetComponent,
    ],
  } as ITemplateAsset;
}

export const emptyPrice = {
  components: [
    {
      tokenType: TokenType.NATIVE,
      contractId: 0,
      contract: {
        decimals: 18,
        address: constants.AddressZero,
      },
      templateId: 0,
      amount: constants.WeiPerEther.toString(),
    } as ITemplateAssetComponent,
  ],
} as ITemplateAsset;

export const emptyItem = {
  components: [
    {
      tokenType: TokenType.ERC721,
      contractId: 0,
      contract: {
        decimals: 0,
        address: constants.AddressZero,
      },
      templateId: 0,
      amount: "1", // default amount for ERC721-998-1155
    } as ITokenAssetComponent,
  ],
} as ITokenAsset;
