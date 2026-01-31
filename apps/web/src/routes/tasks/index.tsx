// routes/tasks/index.ts
import { createRoute, Outlet } from "@tanstack/react-router";
import { RootRoute } from "../__root";

export const TaskRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "tasks",

  component: () => {
    return <Outlet />;
  },
});
