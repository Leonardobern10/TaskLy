import type { SelectType } from "../SelectStatusType";

export type ControllerSelectProps<T> = {
  name: string;
  control: any;
  label?: string;
  placeholder: string;
  error?: any;
  rules?: any;
  values: Array<SelectType<T>>;
};
