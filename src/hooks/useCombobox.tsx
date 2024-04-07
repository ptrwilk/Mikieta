import { useState } from "react";

type ComboboxModel = {
  value: string;
  label: string;
};

export const useCombobox = (
  options: ComboboxModel[],
  defaultValue?: string
) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const handleChange = (value?: string) => {
    setValue(value);
  };

  return {
    options: options,
    value: value,
    onChange: handleChange,
  };
};
