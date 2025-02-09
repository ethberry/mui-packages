import { FC } from "react";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { Grid2 } from "@mui/material";

import { PasswordInput, TextInput } from "@ethberry/mui-inputs-core";
import { PageHeader } from "@ethberry/mui-page-layout";
import { FormWrapper } from "@ethberry/mui-form";
import { ApiError } from "@ethberry/provider-api";
import type { ILoginDto, IUser } from "@ethberry/provider-user";
import { useUser } from "@ethberry/provider-user";
import { useDidMountEffect } from "@ethberry/react-hooks";

import { validationSchema } from "./validation";
import { LoginButtons } from "./buttons";

export const SystemLogin: FC = () => {
  const { formatMessage } = useIntl();

  const user = useUser<IUser>();

  const handleSubmit = async (values: ILoginDto): Promise<void> => {
    await user.logIn(values, "/dashboard").catch((e: ApiError) => {
      if (e.status) {
        enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
      } else {
        console.error(e);
        enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
      }
    });
  };

  useDidMountEffect(() => {
    void user.getProfile("/dashboard");
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
        <PageHeader message="pages.guest.login" />

        <FormWrapper
          showButtons={false}
          showPrompt={false}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={{
            password: "",
            email: "",
          }}
          testId="SystemLogin"
        >
          <TextInput name="email" autoComplete="username" />
          <PasswordInput name="password" autoComplete="current-password" />
          <LoginButtons />
        </FormWrapper>
      </Grid2>
    </Grid2>
  );
};

export const Login = SystemLogin;
