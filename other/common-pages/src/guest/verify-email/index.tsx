import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { Grid } from "@mui/material";

import { ProgressOverlay } from "@gemunion/mui-progress";
import { useUser } from "@gemunion/provider-user";
import { useApi } from "@gemunion/provider-api";

import { useStyles } from "./styles";

export const VerifyEmail: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  const { formatMessage } = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const user = useUser();
  const api = useApi();

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
          navigate("/resend-verification-email");
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
