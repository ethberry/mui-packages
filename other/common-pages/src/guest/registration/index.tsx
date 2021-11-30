import { FC, useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { PasswordInput, TextInput } from "@gemunion/mui-inputs-core";
import { UserContext } from "@gemunion/provider-user";
import { Captcha } from "@gemunion/mui-inputs-captcha";
import { PageHeader } from "@gemunion/mui-page-header";
import { FormikForm } from "@gemunion/mui-form";
import { ApiContext, IJwt, localizeErrors } from "@gemunion/provider-api";

import { useStyles } from "./styles";
import { validationSchema } from "./validation";
import { emptyUser } from "./utils";

export const Registration: FC = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const user = useContext(UserContext);
  const api = useContext(ApiContext);

  const handleSubmit = (values: any, formikBag: any): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/signup",
        method: "POST",
        data: values,
      })
      .then((json: IJwt) => {
        if (json.accessToken) {
          api.setToken(json);
        }
        enqueueSnackbar(formatMessage({ id: "snackbar.created" }), { variant: "success" });
        navigate("/message/registration-successful");
      })
      .catch(e => {
        if (e.status === 400) {
          formikBag.setErrors(localizeErrors(e.message));
        } else if (e.status) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  useEffect(() => {
    if (user.isAuthenticated()) {
      void user.sync("/profile");
    }
  }, [user.isAuthenticated()]);

  return (
    <Grid container className={classes.section}>
      <Grid item sm={12}>
        <PageHeader message="pages.guest.registration" />
        <FormikForm onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={emptyUser}>
          <TextInput name="email" />
          <TextInput name="firstName" />
          <TextInput name="lastName" />
          <PasswordInput name="password" autoComplete="new-password" />
          <PasswordInput name="confirm" autoComplete="new-password" />
          <Captcha />
        </FormikForm>
      </Grid>
    </Grid>
  );
};
