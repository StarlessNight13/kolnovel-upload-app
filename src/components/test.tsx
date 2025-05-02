import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as React from "react";

import { Button } from "@/components/ui/button";
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

interface Option {
  value: string;
  text: string;
}

interface AccordionSelectProps {
  options: Option[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function AccordionSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select an option...",
  disabled,
}: AccordionSelectProps) {
  const [open, setOpen] = React.useState(false); // Added state for aria-expanded

  const triggerLable = React.useMemo(() => {
    if (value) {
      return options.find((option) => option.value === value)?.text;
    }
    return placeholder;
  }, [value, placeholder, options]);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" disabled={disabled}>
        <AccordionTrigger>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open !== undefined}
            className={cn(
              "w-[200px] justify-between",
              value && "data-[placeholder=false]:text-muted-foreground",
              disabled && "cursor-not-allowed opacity-50"
            )}
            disabled={disabled}
            onClick={() => setOpen(!open)}
          >
            {triggerLable}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </AccordionTrigger>
        <AccordionContent className="p-0 border-t">
          <Command>
            <CommandInput placeholder="Search options..." disabled={disabled} />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                    }}
                    disabled={disabled}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
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
