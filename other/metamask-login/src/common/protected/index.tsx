import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useUser } from "@gemunion/provider-user";

import { MetamaskLogin } from "../../guest/login";

export interface IMetamaskProtectedProps {
  children?: ReactNode;
}

export const MetamaskProtected: FC<IMetamaskProtectedProps> = props => {
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
    return <MetamaskLogin />;
  }

  return children ? <Fragment>{children}</Fragment> : <Outlet />;
};

export const Protected = MetamaskProtected;
