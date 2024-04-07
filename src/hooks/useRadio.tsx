import { useState } from "react";

type RadioModel = {
  value: string;
  label: string;
};

export const useRadio = (options: RadioModel[], defaultValue?: string) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const handleChange = (value?: string) => {
    setValue(value);
  };

  return {
    options: options,
    selectedValue: value,
    onValueChange: handleChange,
  };
};
