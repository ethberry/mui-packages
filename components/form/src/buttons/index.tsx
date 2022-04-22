import { FC } from "react";
import { useFormikContext } from "formik";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { ButtonToolbar } from "@gemunion/mui-toolbar";

interface IFormButtonsProps {
  visible?: boolean;
  submit?: string;
}

export const FormButtons: FC<IFormButtonsProps> = props => {
  const { visible = true, submit = "submit" } = props;
  const formik = useFormikContext();

  const disabled = formik.isSubmitting || (!formik.isValid && formik.dirty);

  if (!visible) {
    return null;
  }

  return (
    <ButtonToolbar>
      <Button variant="contained" type="submit" color="primary" disabled={disabled} data-testid="formSubmitButton">
        <FormattedMessage id={`form.buttons.${submit}`} />
      </Button>
    </ButtonToolbar>
  );
};
