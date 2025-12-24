"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ALERTS } from "@/utils/alerts";

type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
}: MultiSelectProps) {
  const toggleItem = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item));
    } else {
      onChange([...value, item]);
    }
    console.log(value);
  };

  const styles = {
    button: "w-full justify-between",
    chevrons: "w-4 h-4 opacity-50",
    popoverContent: "p-0 w-75",
    options: (value: string[], opt: Option) =>
      cn(
        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
        value.includes(opt.value)
          ? "bg-primary text-primary-foreground"
          : "opacity-50"
      ),
    check: "h-3 w-3",
  };

  const selected =
    value.length > 0
      ? `${value.length} selecionado(s)`
      : (placeholder ?? "Selecionar");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={styles.button}>
          {selected}
          <ChevronsUpDown className={styles.chevrons} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={styles.popoverContent}>
        <Command>
          <CommandList>
            <CommandEmpty>{ALERTS.withoutResults}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={() => toggleItem(opt.value)}
                >
                  <div className={styles.options(value, opt)}>
                    {value.includes(opt.value) && (
                      <Check className={styles.check} />
                    )}
                  </div>
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
