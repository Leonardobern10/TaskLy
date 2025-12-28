import { Controller } from "react-hook-form";
import { MultiSelect } from "../MultiSelect";

type ControllerMultiSelectProps = {
  name: string;
  control: any;
  label: string;
  options: any;
  placeholder: string;
};

const styles = {
  div: "flex flex-col gap-1",
  label: "text-sm",
};

export function ControllerMultiSelect({
  name,
  control,
  label,
  options,
  placeholder,
}: ControllerMultiSelectProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={styles.div}>
          <label className={styles.label}>{label}</label>
          <MultiSelect
            options={options}
            value={field.value || []}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        </div>
      )}
    />
  );
}
