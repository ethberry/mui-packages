import { FC, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Grid2 } from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";

import { PasswordInput, TextInput } from "@ethberry/mui-inputs-core";
import { ButtonToolbar, PageHeader } from "@ethberry/mui-page-layout";
import { FormWrapper } from "@ethberry/mui-form";
import { ApiError, useApi } from "@ethberry/provider-api";
import { useUser } from "@ethberry/provider-user";
import type { ILoginDto, IUser } from "@ethberry/provider-user";
import { openUrlOnClick } from "@ethberry/popup";
import { useDidMountEffect } from "@ethberry/react-hooks";

import { validationSchema } from "./validation";
import { LoginButtons } from "./buttons";

export const SocialLogin: FC = () => {
  const { formatMessage } = useIntl();

  const user = useUser<IUser>();
  const api = useApi();

  /* javascript-obfuscator:disable */
  const baseUrl = process.env.BE_URL;
  /* javascript-obfuscator:enable */

  const handleSubmit = async (values: ILoginDto): Promise<void> => {
    await user.logIn(values, "/dashboard").catch((e: ApiError) => {
      api.setToken(null);
      if (e.status) {
        enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
      } else {
        console.error(e);
        enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
      }
    });
  };

  const onMessage = (event: MessageEvent): void => {
    if (event.origin === baseUrl) {
      api.setToken(event.data);
      void user.getProfile("/dashboard");
    }
  };

  useDidMountEffect(() => {
    void user.getProfile("/dashboard");
  }, [user.isAuthenticated()]);

  useEffect(() => {
    window.addEventListener("message", onMessage, false);

    return (): void => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <Grid2
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 64px)",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <Grid2 size={{ sm: 12 }}>
        <PageHeader message="pages.guest.login" />

        <FormWrapper
          showButtons={false}
          showPrompt={false}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={{
            password: "",
            email: "",
          }}
          testId="SocialLogin"
        >
          <TextInput name="email" autoComplete="username" />
          <PasswordInput name="password" autoComplete="current-password" />
          <LoginButtons />
        </FormWrapper>
        <ButtonToolbar justifyContent="center">
          <Button
            variant="outlined"
            startIcon={<Google />}
            type="button"
            onClick={openUrlOnClick(`${baseUrl}/auth/google`)}
            data-testid="LoginWithGoogleButton"
          >
            <FormattedMessage id="form.buttons.google" />
          </Button>
          <Button
            variant="outlined"
            startIcon={<Facebook />}
            type="button"
            onClick={openUrlOnClick(`${baseUrl}/auth/facebook`)}
            data-testid="LoginWithFacebookButton"
          >
            <FormattedMessage id="form.buttons.facebook" />
          </Button>
        </ButtonToolbar>
      </Grid2>
    </Grid2>
  );
};
