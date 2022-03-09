import { FC, Fragment } from "react";

import { useUser } from "@gemunion/provider-user";

import { SocialLogin } from "../../guest/social-login";

export const SocialProtected: FC = props => {
  const { children } = props;

  const user = useUser();

  if (!user.isAuthenticated()) {
    return <SocialLogin />;
  }

  return <Fragment>{children}</Fragment>;
};
