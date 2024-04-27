import { useState } from "react";
import { validate } from "./helpers";
import { Validator } from "./types";

export const useInput = (
  validators?: Validator<string | undefined>[],
  defaultValue?: string | undefined,
  valueChangeCallback?: (value: string | undefined) => void
) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const [error, setError] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const updateError = (error?: boolean, errorMessage?: string) => {
    setError(error);
    setErrorMessage(errorMessage);
  };

  const checkError = (): boolean => {
    const { error: e, errorMessage } = validate(value, validators);
    updateError(e, errorMessage);

    return e;
  };

  const handleValueChange = (value?: string) => {
    const { error, errorMessage } = validate(value, validators);

    updateError(error, errorMessage);
    setValue(value);
    valueChangeCallback?.(value);
  };

  const handleErrorChange = (error: boolean) => setError(error);

  return {
    value: value,
    error: error,
    errorMessage: errorMessage,
    onValueChange: handleValueChange,
    onErrorChange: handleErrorChange,
    checkError: checkError,
  };
};
