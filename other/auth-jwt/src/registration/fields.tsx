import { FC, Fragment } from "react";

import { PasswordInput, TextInput } from "@ethberry/mui-inputs-core";
import { Captcha } from "@ethberry/mui-inputs-captcha";

export const DefaultRegistrationFields: FC = () => {
  return (
    <Fragment>
      <TextInput name="email" />
      <TextInput name="displayName" />
      <PasswordInput name="password" autoComplete="new-password" />
      <PasswordInput name="confirm" autoComplete="new-password" />
      <Captcha />
    </Fragment>
  );
};
