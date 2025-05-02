import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";

interface Option {
  cat: string;
  series: string;
  text: string;
}

interface AccordionSelectProps {
  options: Option[];
  value: Option | null;
  onValueChange: (value: Option | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function NovelSelector({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  disabled,
}: AccordionSelectProps) {
  const [open, setOpen] = React.useState(false);

  const triggerLable = React.useMemo(() => {
    if (value) {
      return options.find((option) => option.cat === value.cat)?.text;
    }
    return placeholder;
  }, [value, placeholder, options]);

  return (
    <Accordion type="single" collapsible value={open ? "novel" : undefined}>
      <AccordionItem value="novel" disabled={disabled}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open !== undefined}
          className={cn(
            "w-full justify-between mb-2",
            value && "data-[placeholder=false]:text-muted-foreground",
            disabled && "cursor-not-allowed opacity-50"
          )}
          disabled={disabled}
          onClick={() => setOpen(!open)}
        >
          {triggerLable}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        <AccordionContent className="p-0 border-t">
          <Command className="rounded-t-none">
            <CommandInput
              placeholder="Search options..."
              disabled={disabled}
              autoFocus
            />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.series}
                    value={option.text}
                    onSelect={() => {
                      onValueChange(
                        option.series === value?.series ? null : option
                      );
                      setOpen(!open);
                    }}
                    className="aria-selected:border-primary"
                    aria-selected={option.series === value?.series}
                    disabled={disabled}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        option.series === value?.series
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.text}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
