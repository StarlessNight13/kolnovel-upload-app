import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/animate-ui/radix/collapsible";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { TimePicker } from "./datetime/time-picker";

export function DatePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}) {
  /**
   * carry over the current time when a user clicks a new day
   * instead of resetting to 00:00
   */
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      setDate(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
  };

  return (
    <Collapsible>
      <div className="flex flex-row items-center gap-2">
        <Button
          size="icon"
          variant={date ? "default" : "outline"}
          onClick={() => setDate(undefined)}
        >
          <CalendarIcon />
        </Button>
        <CollapsibleTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP - HH:mm") : <span>Pick a date</span>}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
        />
        <div className="ml-4 p-3">
          <TimePicker setDate={setDate} date={date} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
