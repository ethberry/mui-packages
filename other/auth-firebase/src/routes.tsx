import type { RouteObject } from "react-router";

import { Login } from "./login";
import { Registration } from "./registration";

export const routes: Array<RouteObject> = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
];
