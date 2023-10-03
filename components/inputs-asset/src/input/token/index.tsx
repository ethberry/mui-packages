import { ChangeEvent, FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useIntl } from "react-intl";

import { EntityInput } from "@gemunion/mui-inputs-entity";
import { TokenType } from "@gemunion/types-blockchain";

export interface ITokenInputProps {
  prefix: string;
  name?: string;
  readOnly?: boolean;
  disableClear?: boolean;
  data?: {
    tokenStatus?: Array<string>;
    [k: string]: any;
  };
}

export const TokenInput: FC<ITokenInputProps> = props => {
  const { prefix, name = "tokenId", data, readOnly, disableClear = true } = props;
  const form = useFormContext<any>();

  const { formatMessage } = useIntl();
  const tokenType = useWatch({ name: `${prefix}.tokenType` });
  const contractId = useWatch({ name: `${prefix}.contractId` });

  if (!contractId) {
    return null;
  }

  const handleChange = (_event: ChangeEvent<unknown>, option: any): void => {
    form.setValue(`${prefix}.tokenId`, option?.id ?? 0, { shouldDirty: true }); // actually id
    form.setValue(`${prefix}.token.tokenId`, option?.tokenId ?? 0);
  };

  switch (tokenType) {
    case TokenType.ERC721:
    case TokenType.ERC998:
    case TokenType.ERC1155:
      return (
        <EntityInput
          name={`${prefix}.${name}`}
          controller="tokens"
          data={{
            contractIds: [contractId],
            ...data,
          }}
          label={formatMessage({ id: "form.labels.tokenIds" })}
          placeholder={formatMessage({ id: "form.placeholders.tokenIds" })}
          getTitle={(token: any) => `${token.template.title as string} #${token.tokenId as string}`}
          readOnly={readOnly}
          onChange={handleChange}
          disableClear={readOnly || disableClear}
        />
      );
    case TokenType.NATIVE:
    case TokenType.ERC20:
    default:
      return null;
  }
};
