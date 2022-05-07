import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useUser } from "@gemunion/provider-user";

import { FirebaseLogin } from "../../guest/login";

export interface IFirebaseProtectedProps {
  children?: ReactNode;
}

export const FirebaseProtected: FC<IFirebaseProtectedProps> = props => {
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

  return children ? <Fragment>{children}</Fragment> : <Outlet />;
};

export const Protected = FirebaseProtected;
