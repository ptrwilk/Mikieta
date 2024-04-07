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

interface IComboboxProps {
  options: { value: string }[];
  className?: string;
  value: string;
  onChange?: (value: string) => void;
}

interface IState {
  open: boolean;
  value: string;
}

export class Combobox extends React.Component<IComboboxProps, IState> {
  private triggerRef = React.createRef<HTMLButtonElement>();

  constructor(props: IComboboxProps) {
    super(props);
    this.state = {
      open: false,
      value: props.value,
    };
  }

  setOpen = (open: boolean) => {
    this.setState({ open });
  };

  setValue = (value: string) => {
    this.setState({ value }, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  };

  focusTrigger = () => {
    if (this.triggerRef.current) {
      this.triggerRef.current.focus();
    }
  };

  render() {
    const { open, value } = this.state;
    const { options, className } = this.props;
    return (
      <div className={className}>
        <Popover open={open} onOpenChange={this.setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
              ref={this.triggerRef}
            >
              {value
                ? options.find((option) => option.value === value)?.value
                : "..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandGroup>
                <CommandList>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        this.setValue(currentValue);
                        this.setOpen(false);
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
  }
}
