import { ITemplateAssetComponent } from "../template/types";

export interface ITokenAssetComponent extends ITemplateAssetComponent {
  token: {
    tokenId?: string;
  };
}

export interface ITokenAsset {
  components: Array<ITokenAssetComponent>;
}
