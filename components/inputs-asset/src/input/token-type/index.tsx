import { FC } from "react";

import { SelectInput } from "@gemunion/mui-inputs-core";
import { TokenType } from "@gemunion/types-blockchain";

export interface ITokenTypeInputProps {
  prefix: string;
  name?: string;
  readOnly?: boolean;
  disabledOptions?: Array<TokenType>;
}

export const TokenTypeInput: FC<ITokenTypeInputProps> = props => {
  const { prefix, name = "tokenType", disabledOptions = [], readOnly } = props;

  return (
    <SelectInput name={`${prefix}.${name}`} options={TokenType} disabledOptions={disabledOptions} readOnly={readOnly} />
  );
};
