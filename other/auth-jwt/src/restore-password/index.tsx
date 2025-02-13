import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import { Grid2 } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { PasswordInput } from "@ethberry/mui-inputs-core";
import { PageHeader } from "@ethberry/mui-page-layout";
import { FormWrapper } from "@ethberry/mui-form";
import { ApiError, useApi } from "@ethberry/provider-api";

import { validationSchema } from "./validation";

interface IRestorePasswordDto {
  password: string;
  confirm: string;
  token: string;
}

export const RestorePassword: FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { formatMessage } = useIntl();

  const api = useApi();

  const handleSubmit = (values: IRestorePasswordDto, form: any): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/restore-password",
        method: "POST",
        data: values,
      })
      .then(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.passwordChanged" }), { variant: "success" });
        void navigate("/login");
      })
      .catch((e: ApiError) => {
        if (e.status === 400) {
          const errors = e.getLocalizedValidationErrors();

          Object.keys(errors).forEach(key => {
            form.setError(key, { type: "custom", message: errors[key] });
          });
        } else if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
          void navigate("/forgot-password");
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  return (
    <Grid2
      sx={{
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <PageHeader message="pages.guest.restorePassword" />
      <FormWrapper
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{
          password: "",
          confirm: "",
          token,
        }}
        testId="RestorePassword"
      >
        <PasswordInput name="password" autoComplete="new-password" />
        <PasswordInput name="confirm" autoComplete="new-password" />
      </FormWrapper>
    </Grid2>
  );
};
