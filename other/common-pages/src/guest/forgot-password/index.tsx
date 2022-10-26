import { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { Captcha } from "@gemunion/mui-inputs-captcha";
import { PageHeader } from "@gemunion/mui-page-layout";
import { FormWrapper } from "@gemunion/mui-form";
import { TextInput } from "@gemunion/mui-inputs-core";
import { useUser } from "@gemunion/provider-user";
import { ApiError, useApi } from "@gemunion/provider-api";

import { validationSchema } from "./validation";

interface IForgotPasswordDto {
  email: string;
  captcha: string;
}

export const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const user = useUser<any>();
  const api = useApi();

  const handleSubmit = (values: IForgotPasswordDto, form: any): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/forgot-password",
        method: "POST",
        data: values,
      })
      .then(() => {
        navigate("/message/forgot-successful");
      })
      .catch((e: ApiError) => {
        if (e.status === 400) {
          const errors = e.getLocalizedValidationErrors();

          Object.keys(errors).forEach(key => {
            form.setError(key, { type: "custom", message: errors[key] });
          });
        } else if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  useEffect(() => {
    if (user.isAuthenticated()) {
      void user.getProfile("/profile");
    }
  }, [user.isAuthenticated()]);

  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <Grid item sm={10}>
        <PageHeader message="pages.guest.forgotPassword" />
        <FormWrapper
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            email: "",
            captcha: "",
          }}
          testId="ForgotPassword"
        >
          <TextInput name="email" autoComplete="username" />
          <Captcha />
        </FormWrapper>
      </Grid>
    </Grid>
  );
};
