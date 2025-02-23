import { FC, PropsWithChildren } from "react";
import { Collapse, Grid2 } from "@mui/material";
import { UseFormReturn } from "react-hook-form";

import { AutoSave, FormWrapper } from "@ethberry/mui-form";
import { SearchInput } from "@ethberry/mui-inputs-core";

interface ICommonSearchFormProps {
  onSubmit: (values: any, form: UseFormReturn) => Promise<void>;
  initialValues: any;
  autosave?: boolean;
  open?: boolean;
  name?: string;
  testId?: string;
}

export const CommonSearchForm: FC<PropsWithChildren<ICommonSearchFormProps>> = props => {
  const { onSubmit, initialValues, name = "query", autosave = true, open = false, testId, children } = props;

  return (
    <FormWrapper
      initialValues={initialValues}
      onSubmit={onSubmit}
      showButtons={false}
      showPrompt={false}
      testId={testId || "CommonSearchForm"}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 12 }}>
          <SearchInput name={name} data-testid="CommonSearchInput" />
        </Grid2>
      </Grid2>
      <Collapse in={open}>{children}</Collapse>
      {autosave ? <AutoSave onSubmit={onSubmit} /> : null}
    </FormWrapper>
  );
};
