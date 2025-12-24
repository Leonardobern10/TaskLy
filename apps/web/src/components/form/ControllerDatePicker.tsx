import { Controller } from "react-hook-form";
import { DatePickerForm } from "./DatePickerForm";
import type { ControllerDatePickerProps } from "@/types/props/ControllerDatePickerProps";
import TextError from "../TextError";

const styles = {
  div: "flex flex-col gap-2",
};

export function ControllerDatePicker({
  name,
  control,
  label,
  error,
}: ControllerDatePickerProps) {
  return (
    <div className={styles.div}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePickerForm
            selectedDate={field.value}
            setSelectedDate={(date) => field.onChange(date)}
            label={label}
          />
        )}
      />

      {error && <TextError error={error} />}
    </div>
  );
}
