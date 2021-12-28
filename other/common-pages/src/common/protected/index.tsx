import { FC, Fragment, useContext, useState, useEffect } from "react";

import { UserContext } from "@gemunion/provider-user";

import { Login } from "../../guest/login";

export const Protected: FC = props => {
  const { children } = props;

  const [isReady, setIsReady] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    const id = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(id);
  }, []);

  if (!isReady) {
    return null;
  }

  if (!user.isAuthenticated()) {
    return <Login />;
  }

  return <Fragment>{children}</Fragment>;
};
