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

const styles = {
  trigger: "w-full md:w-fit",
  label: "label-title",
  selectItem: "text-neutral-600 text-sm",
};

export default function SelectForm<
  T extends StatusTaskType | PriorityTaskType,
>({ placeholder, label, values, value, onValueChange }: SelectFormProps<T>) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={styles.trigger}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel className={styles.label}>{label}</SelectLabel>}
          {values.map((el: SelectType<T>) => (
            <SelectItem
              className={styles.selectItem}
              key={el.name}
              value={el.value}
            >
              {el.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
