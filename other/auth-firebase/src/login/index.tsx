import { FC, ComponentType } from "react";
import { useIntl } from "react-intl";
import { Grid2 } from "@mui/material";
import { matchPath, useLocation } from "react-router";
import { enqueueSnackbar } from "notistack";
import { getAuth, signInWithCustomToken } from "firebase/auth";

import { useApi } from "@ethberry/provider-api";
import firebase from "@ethberry/firebase";
import { PasswordInput, TextInput } from "@ethberry/mui-inputs-core";
import { PageHeader } from "@ethberry/mui-page-layout";
import { FormWrapper } from "@ethberry/mui-form";
import type { ILoginDto, IUser } from "@ethberry/provider-user";
import { useUser } from "@ethberry/provider-user";
import { useDidMountEffect } from "@ethberry/react-hooks";

import { validationSchema } from "./validation";
import { LoginButtons } from "./buttons";

export interface IFirebaseLoginButtonProps {
  onTokenVerified: (token: string) => Promise<void>;
}

export interface IFirebaseLoginProps {
  buttons?: Array<ComponentType<IFirebaseLoginButtonProps>>;
  profileRedirectUrl?: string;
}

export const Login: FC<IFirebaseLoginProps> = props => {
  const { buttons, profileRedirectUrl = "/dashboard" } = props;

  const { formatMessage } = useIntl();
  const location = useLocation();
  const user = useUser<IUser>();
  const auth = getAuth(firebase);
  const api = useApi();

  const handleSubmit = async (values: ILoginDto): Promise<void> => {
    const isLoginPage = !!matchPath(location.pathname, "/login");
    await user.logIn(values, isLoginPage ? void 0 : location.pathname).catch(e => {
      console.error(e);
      if (e.code === "auth/user-not-found") {
        enqueueSnackbar(formatMessage({ id: "snackbar.incorrectCredentials" }), { variant: "error" });
      } else {
        console.error(e);
      }
    });
  };

  const handleTokenVerified = async (token: string) => {
    if (!token) {
      return;
    }

    const userCredentials = await signInWithCustomToken(auth, token);
    return userCredentials.user.getIdToken(true).then(accessToken => {
      const now = Date.now();
      api.setToken({
        accessToken,
        accessTokenExpiresAt: now + 1000 * 60 * 60,
        refreshToken: "",
        refreshTokenExpiresAt: now + 1000 * 60 * 60,
      });
    });
  };

  useDidMountEffect(() => {
    void user.getProfile(profileRedirectUrl);
  }, [user.isAuthenticated()]);

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
          testId="SystemLogin"
        >
          <TextInput name="email" autoComplete="username" />
          <PasswordInput name="password" autoComplete="current-password" />
          <LoginButtons />
          {buttons?.map((Button, i) => <Button key={i} onTokenVerified={handleTokenVerified} />)}
        </FormWrapper>
      </Grid2>
    </Grid2>
  );
};
