import React, { FC, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { Grid } from "@material-ui/core";

import { ProgressOverlay } from "@gemunion/material-ui-progress";
import { UserContext } from "@gemunion/provider-user";
import { ApiContext } from "@gemunion/provider-api";

import useStyles from "./styles";

export const VerifyEmail: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const { formatMessage } = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const user = useContext(UserContext);
  const api = useContext(ApiContext);

  useEffect(() => {
    void api
      .fetchJson({
        url: "/auth/email-verification",
        data: params,
        method: "POST",
      })
      .then(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.verification" }), { variant: "success" });
        return user.sync("/profile");
      })
      .catch(e => {
        if (e.status) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
          history.push("/resend-verification-email");
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  }, []);

  return (
    <Grid className={classes.popup}>
      <ProgressOverlay isLoading={true} />
    </Grid>
  );
};
