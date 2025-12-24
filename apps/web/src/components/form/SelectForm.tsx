import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { StatusTaskType } from "@/types/StatusTaskType";
import type { PriorityTaskType } from "@/types/PriorityTaskType";
import type { SelectType } from "@/types/SelectStatusType";
import type { SelectFormProps } from "@/types/props/SelectFormProps";

export default function SelectForm<
  T extends StatusTaskType | PriorityTaskType,
>({ placeholder, label, values, value, onValueChange }: SelectFormProps<T>) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {values.map((el: SelectType<T>) => (
            <SelectItem key={el.name} value={el.value}>
              {el.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
