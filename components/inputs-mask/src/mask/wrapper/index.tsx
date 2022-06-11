import { forwardRef } from "react";
import NumberFormat from "react-number-format";

export const MaskedInputWrapper = forwardRef<NumberFormat<any>>(function NumberFormatCustom(props: any, ref) {
  const { onChange, ...rest } = props;

  return <NumberFormat onValueChange={onChange} {...rest} getInputRef={ref} />;
});
