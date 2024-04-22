import { useState } from "react";

export const useTextArea = (defaultValue?: string | undefined) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const handleValueChange = (value?: string) => {
    setValue(value);
  };

  return {
    value: value,
    onValueChange: handleValueChange,
  };
};
