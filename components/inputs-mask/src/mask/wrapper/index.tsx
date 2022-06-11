import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";

export const MaskedInputWrapper = forwardRef<NumberFormat<any>>(function NumberFormatCustom(props: any, ref) {
  const { formatValue, ...rest } = props;
  const form = useFormContext<any>();

  const onValueChange = (values: any) => {
    form.setValue(props.name, formatValue(values.value));
  };

  return <NumberFormat onValueChange={onValueChange} {...rest} getInputRef={ref} />;
});
