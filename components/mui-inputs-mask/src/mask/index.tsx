import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { TextInput } from "@ethberry/mui-inputs-core";
import { useTestId } from "@ethberry/provider-test-id";

export interface IMaskedInputProps {
  name: string;
  required?: boolean;
  thousandSeparator?: string;
  valueIsNumericString?: boolean;
  prefix?: string;
  decimalSeparator?: string;
  decimalScale?: number;
  allowNegative?: boolean;
  allowLeadingZeros?: boolean;
  readOnly?: boolean;
  formatValue: (values: any) => string | number;
  normalizeValue?: (value: any) => string | number;
  InputProps?: any;
  defaultValue?: any;
  value?: any;
  displayType?: "input" | "text";
  type?: "text" | "tel" | "password";
  format?: string;
  mask?: string;
}

export const MaskedInput: FC<IMaskedInputProps> = props => {
  const { name, formatValue, normalizeValue, value: _value, readOnly, ...rest } = props;

  const form = useFormContext<any>();

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${props.name}` } : {};

  const onValueChange = (values: any) => {
    const formattedValue = formatValue(values.value);
    form.setValue(props.name, formattedValue, { shouldTouch: true, shouldDirty: true });
  };

  const onTriggerField = () => {
    void form.trigger(name);
  };

  return (
    <NumericFormat
      customInput={TextInput}
      onValueChange={onValueChange}
      name={name}
      normalizeValue={normalizeValue}
      formatValue={formatValue}
      readOnly={readOnly}
      onChange={onTriggerField}
      onBlur={onTriggerField}
      {...rest}
      {...testIdProps}
    />
  );
};
