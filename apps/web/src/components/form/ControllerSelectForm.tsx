import { Controller } from "react-hook-form";
import SelectForm from "./SelectForm";
import type { ControllerSelectProps } from "@/types/props/ControllerSelectProps";
import TextError from "../TextError";

const styles = {
  div: "flex flex-col gap-1",
  label: "text-sm md:text-lg font-medium text-neutral-800",
};

export function ControllerSelect<T>({
  name,
  control,
  label,
  placeholder,
  error,
  rules,
  values,
}: ControllerSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className={styles.div}>
          <label className={styles.label}>{label}</label>
          <SelectForm
            placeholder={placeholder}
            label={label}
            values={values}
            value={field.value}
            onValueChange={field.onChange}
          />
          {error && <TextError error={error} />}
        </div>
      )}
    />
  );
}
