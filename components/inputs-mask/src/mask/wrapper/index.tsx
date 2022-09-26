import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { useTestId } from "@gemunion/provider-test-id";

export const MaskedInputWrapper = forwardRef<any>(function NumberFormatCustom(props: any, ref) {
  const { formatValue, ...rest } = props;
  const form = useFormContext<any>();

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${props.name as string}` } : {};

  const onValueChange = (values: any) => {
    form.setValue(props.name, formatValue(values.value));
  };

  return <NumericFormat onValueChange={onValueChange} {...rest} getInputRef={ref} {...testIdProps} />;
});
