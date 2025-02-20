import { FC, useEffect } from "react";
import { Grid2 } from "@mui/material";
import { useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { PageHeader } from "@ethberry/mui-page-layout";
import { FormWrapper } from "@ethberry/mui-form";
import { TextInput } from "@ethberry/mui-inputs-core";
import { useUser } from "@ethberry/provider-user";
import { ApiError } from "@ethberry/provider-api";

import { validationSchema } from "./validation";

interface IForgotPasswordDto {
  email: string;
}

interface IForgotPasswordProps {
  resetEmailUrl?: string;
  successSendUrl?: string;
  profileRedirectUrl?: string;
}

export const ForgotPassword: FC<IForgotPasswordProps> = props => {
  const {
    resetEmailUrl = `${process.env.BE_URL}/restore-password`,
    successSendUrl = "/message/forgot-successful",
    profileRedirectUrl = "/profile",
  } = props;

  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const auth = getAuth();

  const user = useUser<any>();

  const handleSubmit = (values: IForgotPasswordDto, form: any): Promise<void> => {
    return sendPasswordResetEmail(auth, values.email, { url: resetEmailUrl })
      .then(() => {
        void navigate(successSendUrl);
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
      void user.getProfile(profileRedirectUrl);
    }
  }, [user.isAuthenticated()]);

  return (
    <Grid2
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <Grid2 size={{ sm: 10 }}>
        <PageHeader message="pages.guest.forgotPassword" />
        <FormWrapper
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            email: "",
          }}
          testId="ForgotPassword"
        >
          <TextInput name="email" autoComplete="username" />
        </FormWrapper>
      </Grid2>
    </Grid2>
  );
};
