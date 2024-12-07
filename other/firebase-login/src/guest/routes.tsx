import type { RouteObject } from "react-router";

import { FirebaseLogin } from "./login";

export const routes: Array<RouteObject> = [
  {
    path: "/login",
    element: <FirebaseLogin />,
  },
];
