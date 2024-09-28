import { FC, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { Button, ButtonProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { ButtonToolbar } from "@ethberry/mui-page-layout";

interface IFormButtonsProps {
  formButtonProps?: Partial<ButtonProps>;
  visible?: boolean;
  submit?: string;
  showDebug?: boolean;
  handleSubmit: (e: any) => Promise<void>;
  ref?: any;
}

export const FormButtons: FC<IFormButtonsProps> = forwardRef((props, ref: any) => {
  const { formButtonProps = {}, visible = true, submit = "submit", showDebug = false, handleSubmit } = props;

  const {
    formState: { isSubmitting, isValid, errors },
  } = useFormContext();

  const disabled = isSubmitting || !isValid;

  if (disabled && showDebug) {
    if (Object.keys(errors).length) {
      console.error("[validation errors]", errors);
    }
  }

  if (!visible) {
    return null;
  }

  return (
    <ButtonToolbar>
      <Button
        onClick={handleSubmit}
        ref={ref}
        variant="contained"
        color="primary"
        disabled={disabled}
        data-testid="FormSubmitButton"
        {...formButtonProps}
      >
        <FormattedMessage id={`form.buttons.${submit}`} />
      </Button>
    </ButtonToolbar>
  );
});
