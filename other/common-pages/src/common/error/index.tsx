import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Alert } from "@material-ui/lab";
import { useParams } from "react-router";

import useStyles from "./styles";

export const Error: FC = () => {
  const classes = useStyles();
  const params = useParams<{ error: string }>();
  return (
    <Alert className={classes.text} severity="error">
      <FormattedMessage id={`errors.${params.error}`} />
    </Alert>
  );
};
