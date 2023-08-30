import { constants } from "ethers";

import { TokenType } from "@gemunion/types-blockchain";

import { ITemplateAsset, ITemplateAssetComponent } from "./types";

export function getEmptyTemplate(tokenType = TokenType.ERC20): any {
  return {
    components: [
      {
        // id: 0, breaks validation
        tokenType,
        contractId: 0,
        contract: {
          id: 0,
          title: "",
          contractType: tokenType,
          contractFeatures: [] as Array<any>,
          decimals: tokenType === TokenType.NATIVE || tokenType === TokenType.ERC20 ? 18 : 0,
          address: constants.AddressZero,
        },
        templateId: 0,
        template: {
          id: 0,
          title: "",
          description: JSON.stringify({
            blocks: [
              {
                key: "ee782",
                text: "",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
              },
            ],
            entityMap: {},
          }),
          imageUrl:
            "https://firebasestorage.googleapis.com/v0/b/gemunion-firebase.appspot.com/o/DO_NOT_REMOVE_LOGO.png?alt=media&token=85c376a8-33a0-4b6b-9285-2b9022287289",
        },
        amount:
          tokenType === TokenType.NATIVE || tokenType === TokenType.ERC20 ? constants.WeiPerEther.toString() : "1",
      } as ITemplateAssetComponent,
    ],
  } as ITemplateAsset;
}

export const emptyPrice = getEmptyTemplate(TokenType.NATIVE);

export const emptyItem = getEmptyTemplate(TokenType.ERC721);
