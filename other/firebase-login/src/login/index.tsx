import { FC, useLayoutEffect } from "react";
import { Grid } from "@mui/material";
import { auth } from "firebaseui";
import { EmailAuthProvider, getAuth, sendEmailVerification } from "firebase/auth";
import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";

import "firebaseui/dist/firebaseui.css";

import firebase from "@gemunion/firebase";
import { useApi } from "@gemunion/provider-api";
import { useUser } from "@gemunion/provider-user";

import { useStyles } from "./styles";

export const FirebaseLogin: FC = () => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const user = useUser();
  const api = useApi();

  useLayoutEffect(() => {
    const authFb = getAuth(firebase);
    const ui = auth.AuthUI.getInstance() || new auth.AuthUI(authFb);
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: data => {
          if (data.additionalUserInfo.isNewUser) {
            void sendEmailVerification(authFb.currentUser!).then(() => {
              enqueueSnackbar(formatMessage({ id: `snackbar.registered` }), { variant: "info" });
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

  return (
    <Grid container className={classes.section}>
      <Grid item sm={12}>
        <div id="firebaseui-auth-container" />
      </Grid>
    </Grid>
  );
};
