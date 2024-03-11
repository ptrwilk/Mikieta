import { useState } from "react";
import { hasError } from "./helpers";

export const useInput = (validators?: Validator<string | undefined>[]) => {
  const [value, setValue] = useState<string | undefined>();
  const [error, setError] = useState<boolean>();

  const checkError = (): boolean => {
    if (!error) {
      const e = hasError(value, validators);
      setError(e);

      return e;
    }

    return error;
  };

  const handleValueChange = (value?: string) => {
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
