// routes/tasks/index.ts
import { createRoute, Outlet } from "@tanstack/react-router";
import { RootRoute } from "../__root";
import { useNotifications } from "@/hooks/useNotifications";

export const TaskRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "tasks",

  component: () => {
    useNotifications();
    return <Outlet />;
  },
});
