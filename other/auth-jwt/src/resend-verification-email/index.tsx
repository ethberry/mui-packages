import { FC } from "react";
import { useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";
import { Grid2 } from "@mui/material";
import { useIntl } from "react-intl";

import { Captcha } from "@ethberry/mui-inputs-captcha";
import { PageHeader } from "@ethberry/mui-page-layout";
import { TextInput } from "@ethberry/mui-inputs-core";
import { FormWrapper } from "@ethberry/mui-form";
import { ApiError, useApi } from "@ethberry/provider-api";

import { validationSchema } from "./validation";

interface IResendVerificationEmailDto {
  email: string;
  captcha: string;
}

interface IResendVerificationEmailProps {
  fetchUrl?: string;
  successResendUrl?: string;
}

export const ResendVerificationEmail: FC<IResendVerificationEmailProps> = props => {
  const { fetchUrl = "/auth/resend-email-verification", successResendUrl = "/message/resend-successful" } = props;

  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const api = useApi();

  const handleSubmit = (values: IResendVerificationEmailDto, form: any): Promise<void> => {
    return api
      .fetchJson({
        url: fetchUrl,
        method: "POST",
        data: values,
      })
      .then(() => {
        void navigate(successResendUrl);
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

  return (
    <Grid2
      container
      sx={{
        alignItems: "center",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <Grid2 size={{ sm: 10 }}>
        <PageHeader message="pages.guest.resendVerificationEmail" />

        <FormWrapper
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            email: "",
            captcha: "",
          }}
          testId="ResendVerificationEmail"
        >
          <TextInput name="email" autoComplete="username" />
          <Captcha />
        </FormWrapper>
      </Grid2>
    </Grid2>
  );
};
