import { createRouter } from "@tanstack/react-router";
import { RootRoute } from "./__root";
import { HomeRoute } from "./home";
import { NotFoundRoute } from "./not-found";
import { TaskRoute } from "./tasks";
import { TaskDetailsRoute } from "./tasks/tasks.$id";
import { AuthRoute } from "./auth";
import { RegisterRoute } from "./auth/register";
import { LoginRoute } from "./auth/login";
import { TasksDashboardRoute } from "./tasks/dashboard";
import { TasksIndexRoute } from "./tasks/index.redirect";

const routeTree = RootRoute.addChildren([
  HomeRoute,

  TaskRoute.addChildren([TaskDetailsRoute, TasksDashboardRoute]),

  NotFoundRoute,

  AuthRoute.addChildren([RegisterRoute, LoginRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
