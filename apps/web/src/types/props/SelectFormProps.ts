import type { PriorityTaskType } from "../PriorityTaskType";
import type { SelectType } from "../SelectStatusType";
import type { StatusTaskType } from "../StatusTaskType";

export type SelectFormProps<T extends StatusTaskType | PriorityTaskType> = {
  placeholder: string;
  label?: string;
  values: Array<SelectType<T>>;
  value: T;
  onValueChange: (value: string) => void;
};
