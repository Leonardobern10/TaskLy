// routes/tasks/index.redirect.ts
import { createRoute } from "@tanstack/react-router";
import { TaskRoute } from "./index";

export const TasksIndexRoute = createRoute({
  getParentRoute: () => TaskRoute,
  path: "/",
});
