import { FC, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { Grid } from "@mui/material";

import { PasswordInput, TextInput } from "@gemunion/mui-inputs-core";
import { PageHeader } from "@gemunion/mui-page-header";
import { FormikForm } from "@gemunion/mui-form";
import { ApiError, IJwt, useApi } from "@gemunion/provider-api";
import { useUser } from "@gemunion/provider-user";
import { useDidMountEffect } from "@gemunion/react-hooks";

import { validationSchema } from "./validation";
import { useStyles } from "./styles";
import { LoginButtons } from "./buttons";

interface ILoginDto {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const user = useUser();
  const api = useApi();

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
      .catch((e: ApiError) => {
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
    if (event.origin === process.env.BE_URL) {
      api.setToken(event.data);
      void user.sync("/dashboard");
    }
  };

  useDidMountEffect(() => {
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
      </Grid>
    </Grid>
  );
};
