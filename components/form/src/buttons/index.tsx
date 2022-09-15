import { FC, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { ButtonToolbar } from "@gemunion/mui-page-layout";

interface IFormButtonsProps {
  visible?: boolean;
  submit?: string;
  showDebug?: boolean;
  handleSubmit: (e: any) => Promise<void>;
  ref?: any;
}

export const FormButtons: FC<IFormButtonsProps> = forwardRef((props, ref: any) => {
  const { visible = true, submit = "submit", showDebug = false, handleSubmit } = props;

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
      >
        <FormattedMessage id={`form.buttons.${submit}`} />
      </Button>
    </ButtonToolbar>
  );
});
