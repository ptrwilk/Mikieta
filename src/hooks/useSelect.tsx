import { useState } from "react";
import { SelectionOption } from "../components";
import { hasError } from "./helpers";

export const useSelect = (validators?: Validator<SelectionOption>[]) => {
  const [value, setValue] = useState<SelectionOption | undefined>();
  const [error, setError] = useState<boolean>();

  const checkError = (): boolean => {
    if (!error) {
      const e = hasError(value, validators);
      setError(e);

      return e;
    }

    return false;
  };

  const handleValueChange = (value?: SelectionOption) => {
    const error = hasError(value, validators);

    setError(error);
    setValue(value);
  };

  const handleErrorChange = (error: boolean) => setError(error);

  return {
    value: value,
    error: error,
    onValueChange: handleValueChange,
    onErrorChange: handleErrorChange,
    checkError: checkError,
  };
};
