import { useState } from "react";
import { SelectionOption } from "../components";
import { validate } from "./helpers";

export const useSelect = (validators?: Validator<SelectionOption>[]) => {
  const [value, setValue] = useState<SelectionOption | undefined>();
  const [error, setError] = useState<boolean>();

  const checkError = (): boolean => {
    if (!error) {
      const e = validate(value, validators);
      setError(e);

      return e;
    }

    return false;
  };

  const handleValueChange = (value?: SelectionOption) => {
    const error = validate(value, validators);

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
