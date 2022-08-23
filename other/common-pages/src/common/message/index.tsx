import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";

import { Alert, Box } from "@mui/material";

import { useStyles } from "./styles";

export const Message: FC = () => {
  const classes = useStyles();
  const { message } = useParams<{ message: string }>();
  return (
    <Box className={classes.wrapper}>
      <Alert className={classes.text} severity="warning">
        <FormattedMessage id={`messages.${message as string}`} />
      </Alert>
    </Box>
  );
};
