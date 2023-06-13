import { ChangeEvent, FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useIntl } from "react-intl";

import { EntityInput } from "@gemunion/mui-inputs-entity";
import { TokenType } from "@gemunion/types-blockchain";
import { CommonStatus } from "../../interfaces";

export interface ITemplateInputProps {
  prefix: string;
  name?: string;
  readOnly?: boolean;
  autoSelect?: boolean;
  data?: {
    templateStatus?: Array<any>;
  };
}

export const TemplateInput: FC<ITemplateInputProps> = props => {
  const { prefix, name = "templateId", data, readOnly, autoSelect } = props;

  const { formatMessage } = useIntl();
  const form = useFormContext<any>();
  const tokenType = useWatch({ name: `${prefix}.tokenType` });
  const contractId = useWatch({ name: `${prefix}.contractId` });

  const handleChange = (_event: ChangeEvent<unknown>, option: any | null): void => {
    form.setValue(`${prefix}.${name}`, option?.id ?? 0);
    form.setValue(`${prefix}.template.tokens`, option.tokens ?? []);
  };

  if (!contractId) {
    return null;
  }

  switch (tokenType) {
    case TokenType.ERC721:
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
          onChange={handleChange}
          readOnly={readOnly}
          autoselect={autoSelect}
        />
      );
    case TokenType.ERC998:
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
          onChange={handleChange}
          readOnly={readOnly}
          autoselect={autoSelect}
        />
      );
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
          onChange={handleChange}
          readOnly={readOnly}
          autoselect={autoSelect}
        />
      );
    case TokenType.NATIVE:
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
          onChange={handleChange}
          readOnly={readOnly}
          autoselect={autoSelect}
        />
      );
    case TokenType.ERC20:
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
          onChange={handleChange}
          readOnly={readOnly}
          autoselect={autoSelect}
        />
      );
    default:
      return null;
  }
};
