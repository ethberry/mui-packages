import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import { Grid2 } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { getAuth, confirmPasswordReset } from "firebase/auth";

import { PasswordInput } from "@ethberry/mui-inputs-core";
import { PageHeader } from "@ethberry/mui-page-layout";
import { FormWrapper } from "@ethberry/mui-form";

import { validationSchema } from "./validation";
import { AUTH_ROUTES } from "../paths";

interface IRestorePasswordDto {
  password: string;
  confirm: string;
  token: string;
}

interface IRestorePasswordProps {
  successUpdateUrl?: string;
  errorUpdateUrl?: string;
}

export const RestorePassword: FC<IRestorePasswordProps> = props => {
  const { successUpdateUrl = AUTH_ROUTES.LOGIN, errorUpdateUrl = AUTH_ROUTES.FORGOT_PASSWORD } = props;

  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { formatMessage } = useIntl();

  const auth = getAuth();

  const handleSubmit = async (values: IRestorePasswordDto, form: any): Promise<void> => {
    try {
      if (!token) {
        throw Error();
      }
      await confirmPasswordReset(auth, token, values.password);
      enqueueSnackbar(formatMessage({ id: "snackbar.passwordChanged" }), { variant: "success" });
      void navigate(successUpdateUrl);
    } catch (e) {
      if (e.status === 400) {
        const errors = e.getLocalizedValidationErrors();

        Object.keys(errors).forEach(key => {
          form.setError(key, { type: "custom", message: errors[key] });
        });
      } else if (e.status) {
        enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        void navigate(errorUpdateUrl);
      } else {
        console.error(e);
        enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
      }
    }
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
        }}
        testId="RestorePassword"
      >
        <PasswordInput name="password" autoComplete="new-password" />
        <PasswordInput name="confirm" autoComplete="new-password" />
      </FormWrapper>
    </Grid2>
  );
};
