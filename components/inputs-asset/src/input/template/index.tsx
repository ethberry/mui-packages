import { FC } from "react";
import { useWatch } from "react-hook-form";
import { useIntl } from "react-intl";

import { EntityInput } from "@gemunion/mui-inputs-entity";
import { TokenType } from "@gemunion/types-blockchain";
import { CommonStatus } from "../../interfaces";

export interface ITemplateInputProps {
  prefix: string;
  name?: string;
  readOnly?: boolean;
  data?: {
    templateStatus?: Array<any>;
  };
}

export const TemplateInput: FC<ITemplateInputProps> = props => {
  const { prefix, name = "templateId", data, readOnly } = props;

  const { formatMessage } = useIntl();
  const tokenType = useWatch({ name: `${prefix}.tokenType` });
  const contractId = useWatch({ name: `${prefix}.contractId` });

  if (!contractId) {
    return null;
  }

  switch (tokenType) {
    case TokenType.ERC721:
    case TokenType.ERC998:
    case TokenType.ERC1155:
      return (
        <EntityInput
          name={`${prefix}.${name}`}
          controller="templates"
          label={formatMessage({ id: "form.labels.templateIds" })}
          placeholder={formatMessage({ id: "form.placeholders.templateIds" })}
          data={{
            contractIds: [contractId],
            templateStatus: [CommonStatus.ACTIVE, CommonStatus.HIDDEN],
            ...data,
          }}
          readOnly={readOnly}
          isAutoselect
        />
      );
    case TokenType.NATIVE:
    case TokenType.ERC20:
    default:
      return null;
  }
};
