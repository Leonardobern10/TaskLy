import type { OrderParams } from "./OrderOptionsEnum";
import type { PriorityTaskType } from "./PriorityTaskType";
import type { StatusTaskType } from "./StatusTaskType";

export type FilterFormValues = {
  status: StatusTaskType | "";
  priority: PriorityTaskType | "";
  order: OrderParams | "";
};
