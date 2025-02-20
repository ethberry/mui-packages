import type { RouteObject } from "react-router";

import { Login } from "./login";
import { Registration } from "./registration";
import { ForgotPassword } from "./forgot-password";
import { AUTH_ROUTES } from "./paths";

export const routes: Array<RouteObject> = [
  {
    path: AUTH_ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: AUTH_ROUTES.REGISTRATION,
    element: <Registration />,
  },
  {
    path: AUTH_ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
];
