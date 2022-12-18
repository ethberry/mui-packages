import { FC, useMemo } from "react";
import { get, useFormContext, useWatch } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

import { TokenType } from "@gemunion/types-blockchain";
import { useDeepCompareEffect } from "@gemunion/react-hooks";

import { ContractInput } from "../input/contract";
import { TokenInput } from "../input/token";
import { ITokenAssetComponent } from "./types";
import { emptyToken } from "./empty";
import { TokenTypeInput } from "../input/token-type";
import { AmountInput } from "../input/amount";
import { CommonStatus } from "../interfaces";

export interface ITokenAssetProps {
  prefix: string;
  multiple?: boolean;
  readOnly?: boolean;
  tokenType?: {
    disabledOptions?: Array<TokenType>;
  };
  contract?: {
    data?: {
      contractModule?: Array<string>;
      contractStatus?: Array<string>;
    };
  };
}

export const TokenAssetInput: FC<ITokenAssetProps> = props => {
  const { prefix = "price", multiple = false, tokenType, contract, readOnly } = props;

  const { formatMessage } = useIntl();
  const form = useFormContext<any>();
  const ancestorPrefix = prefix.split(".").pop() as string;
  const nestedPrefix = `${prefix}.components`;

  const values = get(useWatch(), nestedPrefix);

  const handleOptionAdd = (): (() => void) => (): void => {
    const newValue = get(form.getValues(), nestedPrefix);
    newValue.push(emptyToken.components[0]);
    form.setValue(nestedPrefix, newValue);
  };

  const handleOptionDelete =
    (i: number): (() => void) =>
    (): void => {
      const newValue = get(form.getValues(), nestedPrefix);
      newValue.splice(i, 1);
      form.setValue(nestedPrefix, newValue);
    };

  useDeepCompareEffect(() => {
    if (!values) {
      return;
    }
    values.forEach((value: ITokenAssetComponent, i: number) => {
      form.setValue(`${nestedPrefix}[${i}].decimals`, value.contract?.decimals);
      form.setValue(`${nestedPrefix}[${i}].address`, value.contract?.address);
    });
  }, [values]);

  return useMemo(
    () => (
      <Box mt={2}>
        <Typography>
          <FormattedMessage id={`form.labels.${ancestorPrefix}`} />
        </Typography>

        {values?.map((o: ITokenAssetComponent, i: number) => (
          <Box
            key={`${o.contractId}_${o.templateId}_${i}`}
            mt={1}
            mb={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box flex={1}>
              <Paper sx={{ p: 2, display: "flex", alignItems: "stretch", flex: 1, flexDirection: "column" }}>
                <TokenTypeInput
                  prefix={`${nestedPrefix}[${i}]`}
                  disabledOptions={tokenType?.disabledOptions}
                  readOnly={readOnly}
                />
                <ContractInput
                  prefix={`${nestedPrefix}[${i}]`}
                  readOnly={readOnly}
                  data={{
                    ...contract?.data,
                    contractStatus: [CommonStatus.ACTIVE],
                  }}
                />
                <TokenInput prefix={`${nestedPrefix}[${i}]`} readOnly={readOnly} />
                <AmountInput prefix={`${nestedPrefix}[${i}]`} readOnly={readOnly} />
              </Paper>
            </Box>

            {multiple && (
              <Box ml={2}>
                <Tooltip title={formatMessage({ id: "form.tips.delete" })}>
                  <IconButton aria-label="delete" onClick={handleOptionDelete(i)} disabled={!i}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        ))}

        {multiple ? (
          <Tooltip title={formatMessage({ id: "form.tips.create" })}>
            <IconButton size="large" aria-label="add" onClick={handleOptionAdd()}>
              <Add fontSize="large" color="primary" />
            </IconButton>
          </Tooltip>
        ) : null}
      </Box>
    ),
    [tokenType?.disabledOptions, readOnly, values],
  );
};
