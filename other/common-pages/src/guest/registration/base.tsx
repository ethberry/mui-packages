import { FC, useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { UserContext } from "@gemunion/provider-user";
import { PageHeader } from "@gemunion/mui-page-header";
import { FormikForm } from "@gemunion/mui-form";
import { ApiContext, IJwt, localizeErrors } from "@gemunion/provider-api";

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
        <FormikForm onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
          {children}
        </FormikForm>
      </Grid>
    </Grid>
  );
};
