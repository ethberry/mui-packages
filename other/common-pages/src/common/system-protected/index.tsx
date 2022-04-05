import { FC, Fragment, useState, useEffect } from "react";

import { useUser } from "@gemunion/provider-user";

import { SystemLogin } from "../../guest/system-login";

export const SystemProtected: FC = props => {
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
    return <SystemLogin />;
  }

  return <Fragment>{children}</Fragment>;
};

export const Protected = SystemProtected;
