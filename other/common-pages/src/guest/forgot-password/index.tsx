import { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { Captcha } from "@gemunion/mui-inputs-captcha";
import { PageHeader } from "@gemunion/mui-page-header";
import { FormikForm } from "@gemunion/mui-form";
import { TextInput } from "@gemunion/mui-inputs-core";
import { useUser } from "@gemunion/provider-user";
import { localizeErrors, useApi } from "@gemunion/provider-api";

import { validationSchema } from "./validation";
import { useStyles } from "./styles";

interface IForgotPasswordDto {
  email: string;
  captcha: string;
}

export const ForgotPassword: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const user = useUser();
  const api = useApi();

  const handleSubmit = (values: IForgotPasswordDto, formikBag: any): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/forgot-password",
        method: "POST",
        data: values,
      })
      .then(() => {
        navigate("/message/forgot-successful");
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
      <Grid item sm={10}>
        <PageHeader message="pages.guest.forgotPassword" />
        <FormikForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            email: "",
            captcha: "",
          }}
        >
          <TextInput name="email" autoComplete="username" />
          <Captcha />
        </FormikForm>
      </Grid>
    </Grid>
  );
};
