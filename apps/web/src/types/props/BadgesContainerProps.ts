import type { PriorityTaskType } from "../PriorityTaskType";
import type { StatusTaskType } from "../StatusTaskType";

export type BadgesContainerProps = {
  priority: PriorityTaskType;
  status: StatusTaskType;
};
