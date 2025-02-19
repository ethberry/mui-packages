import { FC, PropsWithChildren, useEffect } from "react";
import { Grid2 } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { FormWrapper } from "@ethberry/mui-form";
import { PageHeader } from "@ethberry/mui-page-layout";
import { useUser } from "@ethberry/provider-user";
import { ApiError } from "@ethberry/provider-api";

export interface IRegistrationBaseProps {
  initialValues: any;
  validationSchema: any;
  successSignUpUrl?: string;
  profileRedirectUrl?: string;
}

export const RegistrationBase: FC<PropsWithChildren<IRegistrationBaseProps>> = props => {
  const {
    children,
    initialValues,
    validationSchema,
    successSignUpUrl = "/message/registration-successful",
    profileRedirectUrl = "/profile",
  } = props;

  const { formatMessage } = useIntl();

  const user = useUser<any>();

  const handleSubmit = (values: any, form: any): Promise<void> => {
    return user
      .signUp(values, successSignUpUrl)
      .then(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.created" }), { variant: "success" });
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
      void user.getProfile(profileRedirectUrl);
    }
  }, [user.isAuthenticated()]);

  return (
    <Grid2
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
      <Grid2 size={{ sm: 12 }}>
        <PageHeader message="pages.guest.registration" />
        <FormWrapper
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
          testId="RegistrationBase"
        >
          {children}
        </FormWrapper>
      </Grid2>
    </Grid2>
  );
};
