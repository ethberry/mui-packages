import { FC, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { auth } from "firebaseui";
import {
  EmailAuthProvider,
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";

import "firebaseui/dist/firebaseui.css";

import firebase from "@gemunion/firebase";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { useLicense } from "@gemunion/provider-license";
import { useUser } from "@gemunion/provider-user";

import { MetamaskButton } from "./metamask";
import { KeplrButton } from "./keplr";

export enum PROVIDERS {
  email = "email",
  google = "google",
  facebook = "facebook",
}

export const providersStore = {
  [PROVIDERS.email]: {
    provider: EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: false,
  },
  [PROVIDERS.google]: GoogleAuthProvider.PROVIDER_ID,
  [PROVIDERS.facebook]: FacebookAuthProvider.PROVIDER_ID,
};

export interface IFirebaseLogin {
  providers?: PROVIDERS[];
  withMetamask?: boolean;
  withKeplr?: boolean;
}

export const FirebaseLogin: FC<IFirebaseLogin> = props => {
  const { providers = [PROVIDERS.email], withMetamask = false, withKeplr = false } = props;
  const { formatMessage } = useIntl();

  const license = useLicense();

  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [showMetamask, setShowMetamask] = useState<boolean>(withMetamask);
  const [showKeplr, setShowKeplr] = useState<boolean>(withKeplr);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const user = useUser<any>();
  const navigate = useNavigate();

  const signInOptions = useMemo(() => providers.map(name => providersStore[name]), [providers]);

  const handleMainPageClick = () => {
    navigate("/");
  };

  useLayoutEffect(() => {
    const authFb = getAuth(firebase);
    const ui = auth.AuthUI.getInstance() || new auth.AuthUI(authFb);
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: data => {
          setShowMetamask(false);
          setShowKeplr(false);
          if (data.additionalUserInfo.isNewUser && !data.additionalUserInfo.profile.verified_email) {
            const actionCodeSettings = {
              url: `${window.location.origin}/login`,
            };
            void sendEmailVerification(authFb.currentUser!, actionCodeSettings).then(() => {
              enqueueSnackbar(formatMessage({ id: `snackbar.registered` }), { variant: "info" });
              setShowMessage(true);
            });
          } else {
            setIsLoggingIn(true);
            void user.logIn().catch(() => {
              setIsLoggingIn(false);
            });
          }
          return false;
        },
        signInFailure: error => {
          setIsLoggingIn(false);
          console.error("error", error);
        },
        uiShown: () => {
          // document.getElementById("loader").style.display = "none";
        },
      },
      signInFlow: "popup",
      signInOptions,
    });
    return () => {
      if (auth.AuthUI.getInstance() && ui) {
        void ui.delete();
      }
    };
  }, []);

  useEffect(() => {
    return () => setShowMessage(false);
  }, []);

  if (!license.isValid()) {
    return null;
  }

  const hasWalletLogin = withMetamask || withKeplr;

  return (
    <ProgressOverlay isLoading={isLoggingIn}>
      <Grid
        container
        spacing={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 64px)",
          maxWidth: hasWalletLogin ? 900 : 500,
          margin: "0 auto",
          textAlign: "center",
          "& #firebaseui-auth-container": {
            transition: "all 1s ease-out",
            mb: 2,
          },
        }}
      >
        <Grid item xs={12} sm={hasWalletLogin ? 6 : 12}>
          {showMessage && (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <FormattedMessage id="pages.guest.confirmation" />

              <Box mt={2}>
                <Button
                  onClick={handleMainPageClick}
                  variant="contained"
                  color="primary"
                  data-testid="LoginMainPageButton"
                  endIcon={<NavigateNext />}
                >
                  <FormattedMessage id="form.buttons.mainPage" />
                </Button>
              </Box>
            </Box>
          )}
          <div id="firebaseui-auth-container" />
        </Grid>
        {hasWalletLogin ? (
          <Grid item xs={12} sm={6}>
            {withMetamask && showMetamask ? <MetamaskButton /> : null}
            {withKeplr && showKeplr ? <KeplrButton /> : null}
          </Grid>
        ) : null}
      </Grid>
    </ProgressOverlay>
  );
};

export const Login = FirebaseLogin;
