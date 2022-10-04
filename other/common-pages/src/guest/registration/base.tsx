import { FC, PropsWithChildren, useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { useUser } from "@gemunion/provider-user";
import { PageHeader } from "@gemunion/mui-page-layout";
import { FormWrapper } from "@gemunion/mui-form";
import { ApiError } from "@gemunion/provider-api";

export interface IRegistrationBaseProps {
  initialValues: any;
  validationSchema: any;
}

export const RegistrationBase: FC<PropsWithChildren<IRegistrationBaseProps>> = props => {
  const { children, initialValues, validationSchema } = props;

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const user = useUser();

  const handleSubmit = (values: any, form: any): Promise<void> => {
    return user
      .signUp(values)
      .then(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.created" }), { variant: "success" });
        navigate("/message/registration-successful");
      })
      .catch((e: ApiError) => {
        if (e.status === 400) {
          const errors = e.getLocalizedValidationErrors();

          Object.keys(errors).forEach(key => {
            form.setError(key, { type: "custom", message: errors[key] });
          });
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
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 64px)",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <Grid item sm={12}>
        <PageHeader message="pages.guest.registration" />
        <FormWrapper
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
          testId="RegistrationBase"
        >
          {children}
        </FormWrapper>
      </Grid>
    </Grid>
  );
};
