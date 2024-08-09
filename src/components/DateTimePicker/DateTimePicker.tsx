import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TimePickerDemo } from "../ui/time-picker-demo";
import styles from "./DateTimePicker.module.css";
import classNames from "classnames";

interface IDateTimePickerProsp {
  caption?: string;
  date?: Date;
  error?: boolean;
  errorMessage?: string;
  onDateChange?: (date?: Date) => void;
}

const DateTimePicker: React.FC<IDateTimePickerProsp> = ({
  caption,
  date,
  error,
  errorMessage,
  onDateChange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild className={styles["DateTimePicker"]}>
        <div className="flex flex-col items-start">
          {caption && (
            <p
              className={classNames(styles["Caption"], {
                [styles["Caption-Error"]]: error,
              })}
            >
              {caption}
            </p>
          )}
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
          </Button>
          {errorMessage && error && (
            <p className={styles["ErrorMessage"]}>{errorMessage}</p>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDate={(e) => onDateChange?.(e)} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { DateTimePicker };
