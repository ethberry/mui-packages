import type { TokenType } from "@gemunion/types-blockchain";

export interface ITemplateAssetComponent {
  id: number;
  tokenType: TokenType;
  contractId: number;
  contract: {
    id: number;
    title: string;
    address: string;
    decimals: number;
    contractType: TokenType;
  };
  templateId: number;
  template: {
    id: number;
    description: string;
    imageUrl: string;
    title: string;
    imgUrl: string;
  };
  amount: string;
}

export interface ITemplateAsset {
  components: Array<ITemplateAssetComponent>;
}
