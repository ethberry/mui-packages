import { FC, Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "@gemunion/provider-user";

export const Protected: FC = props => {
  const { children } = props;

  const navigate = useNavigate();
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
    navigate("/message/not-authorized");

    return null;
  }

  return <Fragment>{children}</Fragment>;
};
