import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DatePickerProps } from "@/types/props/DatePickerProps";
import { useState } from "react";

const styles = {
  div: "flex flex-col gap-1",
  label: "text-sm md:text-lg font-medium", // classe css -> label-title
  button: "w-48 justify-between font-normal cursor-pointer",
  popoverContent: "w-auto overflow-hidden p-0",
};

export function DatePickerForm({
  selectedDate,
  setSelectedDate,
  label,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.div}>
      <Label htmlFor="date" className={styles.label}>
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className={styles.button}>
            {selectedDate
              ? selectedDate.toLocaleDateString("pt-BR")
              : new Date().toLocaleString("pt-BR")}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={styles.popoverContent} align="start">
          <Calendar
            startMonth={new Date(2025, 0)}
            endMonth={new Date(2026, 12)}
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              setSelectedDate(selectedDate!);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
