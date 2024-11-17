import { FC } from "react";
import { TextFieldProps } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { useIntl } from "react-intl";

import { useTestId } from "@ethberry/provider-test-id";
import { TToolbarControl } from "@ethberry/mui-rte";
import { TextInput } from "@ethberry/mui-inputs-core";

import { IRichTextInputProps, RichTextInput } from "../input";

const defaultControls = [
  "title",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "highlight",
  "undo",
  "redo",
  "numberList",
  "bulletList",
  "clear",
];

export interface IRichTextFieldProps {
  name: string;
  customControls?: Array<TToolbarControl>;
}

export const RichTextEditor: FC<IRichTextFieldProps & TextFieldProps> = props => {
  const { name, InputLabelProps, customControls = [], ...rest } = props;

  const suffix = name.split(".").pop()!;

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const form = useFormContext<any>();
  const value = useWatch({ name });

  const { formatMessage } = useIntl();
  const localizedPlaceholder = formatMessage({ id: `form.placeholders.${suffix}` });

  const inputProps: IRichTextInputProps = {
    defaultValue: value,
    label: localizedPlaceholder,
    onSave: (data: string) => {
      form.setValue(name, data, { shouldTouch: true, shouldDirty: true });
    },
    controls: defaultControls.concat(customControls),
    ...testIdProps,
  };

  return (
    <TextInput
      name={name}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      InputProps={{
        inputComponent: RichTextInput,
        inputProps,
      }}
      onChange={() => {}}
      {...rest}
    />
  );
};
