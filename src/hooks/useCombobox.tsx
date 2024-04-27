import { useState } from "react";
import { Validator } from "./types";
import { validate } from "./helpers";

type ComboboxModel = {
  value: string;
  label: string;
};

export const useCombobox = (
  validators?: Validator<string | undefined>[],
  options?: ComboboxModel[],
  defaultValue?: string
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

  const handleChange = (value?: string) => {
    const { error, errorMessage } = validate(value, validators);

    updateError(error, errorMessage);
    setValue(value);
  };

  return {
    options: options,
    value: value,
    error: error,
    errorMessage: errorMessage,
    onChange: handleChange,
    checkError: checkError,
  };
};
