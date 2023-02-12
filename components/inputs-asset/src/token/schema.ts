import * as Yup from "yup";

import { bigNumberValidationSchema } from "@gemunion/yup-rules-eth";
import { TokenType } from "@gemunion/types-blockchain";

export const tokenAssetComponentValidationSchema = Yup.object().shape({
  tokenType: Yup.mixed<TokenType>().oneOf(Object.values(TokenType)).required("form.validations.valueMissing"),
  contractId: Yup.number()
    .required("form.validations.valueMissing")
    .integer("form.validations.badInput")
    .min(1, "form.validations.rangeUnderflow"),
  token: Yup.object().shape({
    tokenId: Yup.number().when("tokenType", {
      is: (tokenType: TokenType) => tokenType !== TokenType.ERC20 && tokenType !== TokenType.NATIVE,
      then: Yup.number()
        .min(1, "form.validations.valueMissing")
        .integer("form.validations.badInput")
        .required("form.validations.valueMissing"),
    }),
  }),
  amount: bigNumberValidationSchema.when("tokenType", {
    is: (tokenType: TokenType) => tokenType !== TokenType.ERC721 && tokenType !== TokenType.ERC998,
    then: bigNumberValidationSchema.min(1, "form.validations.rangeUnderflow").required("form.validations.valueMissing"),
  }),
});

export const tokenAssetValidationSchema = Yup.object().shape({
  components: Yup.array().of(tokenAssetComponentValidationSchema),
});
