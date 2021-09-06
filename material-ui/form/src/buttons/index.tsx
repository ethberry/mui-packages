import { FC } from "react";
import { useFormikContext } from "formik";
import { Button } from "@material-ui/core";
import { FormattedMessage } from "react-intl";

import { ButtonToolbar } from "@gemunion/material-ui-toolbar";

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
      <Button variant="contained" type="submit" color="primary" disabled={disabled}>
        <FormattedMessage id={`form.buttons.${submit}`} />
      </Button>
    </ButtonToolbar>
  );
};
