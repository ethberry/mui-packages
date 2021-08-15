import React, { FC, useContext, useEffect } from "react";
import { useSnackbar } from "notistack";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Grid } from "@material-ui/core";
import { Facebook, GooglePlus } from "@gemunion/material-ui-icons-social-networks";

import { PasswordInput, TextInput } from "@gemunion/material-ui-inputs-core";
import { PageHeader } from "@gemunion/material-ui-page-header";
import { FormikForm } from "@gemunion/material-ui-form";
import { ApiContext, IJwt } from "@gemunion/provider-api";
import { UserContext } from "@gemunion/provider-user";
import { ButtonToolbar } from "@gemunion/material-ui-toolbar";
import { openUrlOnClick } from "@gemunion/popup";

import { validationSchema } from "./validation";
import useStyles from "./styles";

import { LoginButtons } from "./buttons";

interface ILoginDto {
  email: string;
  password: string;
}

export const SocialLogin: FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const user = useContext(UserContext);
  const api = useContext(ApiContext);

  const handleSubmit = (values: ILoginDto): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/login",
        method: "POST",
        data: values,
      })
      .then((json: IJwt) => {
        api.setToken(json);
        return user.sync("/dashboard");
      })
      .catch(e => {
        if (e.status) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  const onMessage = (event: MessageEvent): void => {
    if (event.origin === process.env.BE_URL) {
      api.setToken(event.data);
      void user.sync("/dashboard");
    }
  };

  useEffect(() => {
    void user.sync("/dashboard");
  }, [user.isAuthenticated()]);

  useEffect(() => {
    window.addEventListener("message", onMessage, false);

    return (): void => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <Grid container className={classes.section}>
      <Grid item sm={12}>
        <PageHeader message="pages.guest.login" />

        <FormikForm
          showButtons={false}
          showPrompt={false}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={{
            password: "",
            email: "",
          }}
        >
          <TextInput name="email" autoComplete="username" />
          <PasswordInput name="password" autoComplete="current-password" />
          <LoginButtons />
        </FormikForm>
        <ButtonToolbar justifyContent="center">
          <Button
            variant="outlined"
            startIcon={<GooglePlus />}
            type="button"
            onClick={openUrlOnClick(`${process.env.BE_URL}/auth/google`)}
          >
            <FormattedMessage id="form.buttons.google" />
          </Button>
          <Button
            variant="outlined"
            startIcon={<Facebook />}
            type="button"
            onClick={openUrlOnClick(`${process.env.BE_URL}/auth/facebook`)}
          >
            <FormattedMessage id="form.buttons.facebook" />
          </Button>
        </ButtonToolbar>
      </Grid>
    </Grid>
  );
};
