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

export function DatePickerForm({
  selectedDate,
  setSelectedDate,
  label,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal cursor-pointer"
          >
            {selectedDate
              ? selectedDate.toLocaleDateString("pt-BR")
              : Date.now().toLocaleString("pt-BR")}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
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
