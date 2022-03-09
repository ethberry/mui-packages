import { FC } from "react";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { Grid } from "@mui/material";
import { useIntl } from "react-intl";

import { Captcha } from "@gemunion/mui-inputs-captcha";
import { PageHeader } from "@gemunion/mui-page-header";
import { TextInput } from "@gemunion/mui-inputs-core";
import { FormikForm } from "@gemunion/mui-form";
import { localizeErrors, useApi } from "@gemunion/provider-api";

import { useStyles } from "./styles";
import { validationSchema } from "./validation";

interface IResendVerificationEmailDto {
  email: string;
  captcha: string;
}

export const ResendVerificationEmail: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const api = useApi();

  const handleSubmit = (values: IResendVerificationEmailDto, formikBag: any): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/resend-email-verification",
        method: "POST",
        data: values,
      })
      .then(() => {
        navigate("/message/resend-successful");
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

  return (
    <Grid container className={classes.section}>
      <Grid item sm={10}>
        <PageHeader message="pages.guest.resendVerificationEmail" />

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
