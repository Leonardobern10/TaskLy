import type { OrderParams } from "../OrderOptionsEnum";
import type { PriorityTaskType } from "../PriorityTaskType";
import type { StatusTaskType } from "../StatusTaskType";

export type TaskFilters = {
  priority?: PriorityTaskType;
  status?: StatusTaskType;
  title?: string;
  order?: OrderParams;
};
