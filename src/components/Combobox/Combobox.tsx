import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import classNames from "classnames";
import styles from "./Combobox.module.css";

type ComboboxModel = {
  value: string;
  label: string;
};

interface IComboboxProps {
  options?: ComboboxModel[];
  className?: string;
  value?: string;
  caption?: string;
  error?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

export const Combobox: React.FC<IComboboxProps> = ({
  className,
  options,
  value,
  caption,
  error,
  errorMessage,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classNames(className, styles["Combobox"])}>
      {caption && (
        <p
          className={classNames(styles["Caption"], {
            [styles["Caption-Error"]]: error,
          })}
        >
          {caption}
        </p>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={classNames(
              styles["Button"],
              { [styles["Button-Error"]]: error && !caption },
              "w-full justify-between"
            )}
          >
            {value
              ? options?.find((option) => option.value === value)?.value
              : "..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {errorMessage && (
          <p className={styles["ErrorMessage"]}>{errorMessage}</p>
        )}
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandGroup>
              <CommandList>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setOpen(false);
                      onChange?.(currentValue);
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        value === option.value ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {option.value}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
