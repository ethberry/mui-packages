import type { TokenType } from "@gemunion/types-blockchain";

export interface ITemplateAssetComponent {
  tokenType: TokenType;
  contractId: number;
  contract: {
    address: string;
    decimals: number;
    contractType: TokenType;
  };
  templateId: number;
  amount: string;
}

export interface ITemplateAsset {
  components: Array<ITemplateAssetComponent>;
}
