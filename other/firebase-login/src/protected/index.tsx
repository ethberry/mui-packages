import { FC, Fragment, useEffect, useState } from "react";

import { useUser } from "@gemunion/provider-user";

import { FirebaseLogin } from "../login";

export const Protected: FC = props => {
  const { children } = props;

  const [isReady, setIsReady] = useState(false);
  const user = useUser();

  useEffect(() => {
    const id = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(id);
  }, []);

  if (!isReady) {
    return null;
  }

  if (!user.isAuthenticated()) {
    return <FirebaseLogin />;
  }

  return <Fragment>{children}</Fragment>;
};
