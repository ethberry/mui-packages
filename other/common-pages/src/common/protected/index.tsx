import { FC, Fragment, useContext } from "react";

import { UserContext } from "@gemunion/provider-user";

import { Login } from "../../guest/login";

export const Protected: FC = props => {
  const { children } = props;

  const user = useContext(UserContext);

  if (!user.isAuthenticated()) {
    return <Login />;
  }

  return <Fragment>{children}</Fragment>;
};
