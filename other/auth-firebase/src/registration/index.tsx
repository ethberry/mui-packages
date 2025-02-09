import { FC, PropsWithChildren, useEffect } from "react";
import { Grid2 } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { FormWrapper } from "@ethberry/mui-form";
import { PageHeader } from "@ethberry/mui-page-layout";
import { useUser } from "@ethberry/provider-user";
import { PasswordInput, TextInput } from "@ethberry/mui-inputs-core";

import { validationSchema } from "./validation";

export const Registration: FC<PropsWithChildren> = () => {
  const { formatMessage } = useIntl();

  const user = useUser<any>();

  const handleSubmit = (values: any, form: any): Promise<void> => {
    form.reset(values, { keepValues: true });
    return user
      .signUp(values, "/message/registration-successful")
      .then(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.created" }), { variant: "success" });
      })
      .catch(e => {
        if (e.code === "auth/email-already-in-use") {
          enqueueSnackbar(formatMessage({ id: "snackbar.duplicateEmail" }), { variant: "error" });
        } else {
          console.error(e);
        }
      });
  };

  useEffect(() => {
    if (user.isAuthenticated()) {
      void user.getProfile("/profile");
    }
  }, [user.isAuthenticated()]);

  const initialValues = {
    email: "",
    displayName: "",
    password: "",
    confirm: "",
  };

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
          <TextInput name="email" />
          <TextInput name="displayName" />
          <PasswordInput name="password" autoComplete="new-password" />
          <PasswordInput name="confirm" autoComplete="new-password" />
        </FormWrapper>
      </Grid2>
    </Grid2>
  );
};
