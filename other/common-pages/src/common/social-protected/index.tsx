import { FC, Fragment, useContext } from "react";

import { UserContext } from "@gemunion/provider-user";

import { SocialLogin } from "../../guest/social-login";

export const SocialProtected: FC = props => {
  const { children } = props;

  const user = useContext(UserContext);

  if (!user.isAuthenticated()) {
    return <SocialLogin />;
  }

  return <Fragment>{children}</Fragment>;
};
