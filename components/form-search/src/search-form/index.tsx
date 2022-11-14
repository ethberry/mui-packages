import { FC, PropsWithChildren } from "react";
import { Collapse, Grid } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { AutoSave, FormWrapper } from "@gemunion/mui-form";
import { SearchInput } from "@gemunion/mui-inputs-core";

interface ICommonSearchFormProps {
  autosave?: boolean;
  onSubmit: (values: any, form: UseFormReturn<FieldValues, any>) => Promise<void>;
  initialValues: any;
  open?: boolean;
  testId?: string;
}

export const CommonSearchForm: FC<PropsWithChildren<ICommonSearchFormProps>> = props => {
  const { autosave = true, onSubmit, initialValues, open = false, testId, children } = props;

  const { query } = initialValues;
  const fixedValues = { query };

  return (
    <FormWrapper initialValues={fixedValues} onSubmit={onSubmit} showButtons={false} showPrompt={false} testId={testId}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <SearchInput name="query" data-testid="CommonSearchInput" />
        </Grid>
      </Grid>
      <Collapse in={open}>
        <Grid container spacing={2}>
          {children}
        </Grid>
      </Collapse>
      {autosave ? <AutoSave onSubmit={onSubmit} /> : null}
    </FormWrapper>
  );
};
