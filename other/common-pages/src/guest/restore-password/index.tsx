import { FC, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { PasswordInput } from "@gemunion/mui-inputs-core";
import { PageHeader } from "@gemunion/mui-page-header";
import { FormikForm } from "@gemunion/mui-form";
import { ApiContext, localizeErrors } from "@gemunion/provider-api";

import { validationSchema } from "./validation";
import { useStyles } from "./styles";

interface IRestorePasswordDto {
  password: string;
  confirm: string;
  token: string;
}

export const RestorePassword: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { token } = useParams<"token">();
  const { formatMessage } = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const api = useContext(ApiContext);

  const handleSubmit = (values: IRestorePasswordDto, formikBag: any): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/restore-password",
        method: "POST",
        data: values,
      })
      .then(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.password-changed" }), { variant: "success" });
        navigate("/login");
      })
      .catch(e => {
        if (e.status === 400) {
          formikBag.setErrors(localizeErrors(e.message));
        } else if (e.status) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
          navigate("/forgot-password");
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  return (
    <Grid className={classes.section}>
      <PageHeader message="pages.guest.restorePassword" />
      <FormikForm
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{
          password: "",
          confirm: "",
          token,
        }}
      >
        <PasswordInput name="password" autoComplete="new-password" />
        <PasswordInput name="confirm" autoComplete="new-password" />
      </FormikForm>
    </Grid>
  );
};
