import { FC, useEffect, useLayoutEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { auth } from "firebaseui";
import { EmailAuthProvider, getAuth, sendEmailVerification } from "firebase/auth";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";

import "firebaseui/dist/firebaseui.css";

import firebase from "@gemunion/firebase";
import { useApi } from "@gemunion/provider-api";
import { useLicense } from "@gemunion/provider-license";
import { useUser } from "@gemunion/provider-user";

import { useStyles } from "./styles";

export const FirebaseLogin: FC = () => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const license = useLicense();

  const [showMessage, setShowMessage] = useState<boolean>(false);

  const user = useUser();
  const api = useApi();
  const navigate = useNavigate();

  const handleMainPageClick = () => {
    navigate("/");
  };

  useLayoutEffect(() => {
    const authFb = getAuth(firebase);
    const ui = auth.AuthUI.getInstance() || new auth.AuthUI(authFb);
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: data => {
          if (data.additionalUserInfo.isNewUser) {
            const actionCodeSettings = {
              url: `${window.location.origin}/login`,
            };
            void sendEmailVerification(authFb.currentUser!, actionCodeSettings).then(() => {
              enqueueSnackbar(formatMessage({ id: `snackbar.registered` }), { variant: "info" });
              setShowMessage(true);
            });
          } else {
            void authFb.currentUser
              ?.getIdToken(true)
              .then(async accessToken => {
                const now = Date.now();
                api.setToken({
                  accessToken,
                  accessTokenExpiresAt: now + 1000 * 60 * 60,
                  refreshToken: "",
                  refreshTokenExpiresAt: now + 1000 * 60 * 60,
                });
                return user.getProfile("/dashboard");
              })
              .catch(console.error);
          }
          return false;
        },
        uiShown: () => {
          // document.getElementById("loader").style.display = "none";
        },
      },
      signInFlow: "popup",
      signInOptions: [
        {
          // Leave the lines as is for the providers you want to offer your users.
          provider: EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
      ],
    });
    return () => {
      void ui.delete();
    };
  }, []);

  useEffect(() => {
    return () => setShowMessage(false);
  }, []);

  if (!license.isValid()) {
    return null;
  }

  return (
    <Grid container className={classes.section}>
      <Grid item sm={12}>
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
    </Grid>
  );
};

export const Login = FirebaseLogin;
