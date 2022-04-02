import { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { useUser } from "@gemunion/provider-user";
import { PageHeader } from "@gemunion/mui-page-header";
import { FormikForm } from "@gemunion/mui-form";
import { IJwt, ApiError, useApi } from "@gemunion/provider-api";

import { useStyles } from "./styles";

export interface IRegistrationBaseProps {
  initialValues: any;
  validationSchema: any;
}

export const RegistrationBase: FC<IRegistrationBaseProps> = props => {
  const { children, initialValues, validationSchema } = props;

  const navigate = useNavigate();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const user = useUser();
  const api = useApi();

  const handleSubmit = (values: any, formikBag: any): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/signup",
        method: "POST",
        data: values,
      })
      .then((json: IJwt) => {
        api.setToken(json);
        enqueueSnackbar(formatMessage({ id: "snackbar.created" }), { variant: "success" });
        navigate("/message/registration-successful");
      })
      .catch((e: ApiError) => {
        if (e.status === 400) {
          formikBag.setErrors(e.getLocalizedValidationErrors());
        } else if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };

  useEffect(() => {
    if (user.isAuthenticated()) {
      void user.getProfile("/profile");
    }
  }, [user.isAuthenticated()]);

  return (
    <Grid container className={classes.section}>
      <Grid item sm={12}>
        <PageHeader message="pages.guest.registration" />
        <FormikForm onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
          {children}
        </FormikForm>
      </Grid>
    </Grid>
  );
};
