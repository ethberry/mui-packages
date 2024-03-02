import { FC } from "react";

import { SelectInput } from "@gemunion/mui-inputs-core";
import { TokenType } from "@gemunion/types-blockchain";
import { SelectProps } from "@mui/material";

export type ITokenTypeInputProps = {
  prefix: string;
  name?: string;
  readOnly?: boolean;
  disabledOptions?: Array<TokenType>;
} & SelectProps;

export const TokenTypeInput: FC<ITokenTypeInputProps> = props => {
  const { prefix, name = "tokenType", variant = "standard", disabledOptions = [], readOnly } = props;

  return (
    <SelectInput
      name={`${prefix}.${name}`}
      options={TokenType}
      disabledOptions={disabledOptions}
      variant={variant}
      readOnly={readOnly}
    />
  );
};
