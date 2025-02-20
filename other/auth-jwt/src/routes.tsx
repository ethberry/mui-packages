import type { RouteObject } from "react-router";

import { Registration } from "./registration";
import { SystemLogin } from "./system-login";
import { ForgotPassword } from "./forgot-password";
import { RestorePassword } from "./restore-password";
import { VerifyEmail } from "./verify-email";
import { ResendVerificationEmail } from "./resend-verification-email";
import { AUTH_ROUTES } from "./paths";

export const routes: Array<RouteObject> = [
  {
    path: AUTH_ROUTES.REGISTRATION,
    element: <Registration />,
  },
  {
    path: AUTH_ROUTES.LOGIN,
    element: <SystemLogin />,
  },
  {
    path: AUTH_ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: AUTH_ROUTES.RESTORE_PASSWORD,
    element: <RestorePassword />,
  },
  {
    path: AUTH_ROUTES.VERIFY_EMAIL,
    element: <VerifyEmail />,
  },
  {
    path: AUTH_ROUTES.RESEND_EMAIL,
    element: <ResendVerificationEmail />,
  },
];
