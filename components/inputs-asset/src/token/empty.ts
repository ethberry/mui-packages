import { constants } from "ethers";

import { TokenType } from "@gemunion/types-blockchain";

import { ITokenAsset, ITokenAssetComponent } from "./types";

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
