import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { Grid } from "@mui/material";

import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useUser } from "@gemunion/provider-user";
import { ApiError, useApi } from "@gemunion/provider-api";

export const VerifyEmail: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { formatMessage } = useIntl();

  const user = useUser<any>();
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
        return user.getProfile("/profile");
      })
      .catch((e: ApiError) => {
        if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
          navigate("/resend-verification-email");
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  }, []);

  return (
    <Grid
      sx={{
        width: 400,
        margin: "auto",
      }}
    >
      <ProgressOverlay isLoading={true} />
    </Grid>
  );
};
