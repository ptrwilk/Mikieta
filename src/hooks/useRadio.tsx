import { useState } from "react";
import { validate } from "./helpers";

type RadioModel = {
  value: string;
  label: string;
  child?: any;
};

export const useRadio = (
  validators?: Validator<string | undefined>[],
  options?: RadioModel[],
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
    if (!error) {
      const { error: e, errorMessage } = validate(value, validators);
      updateError(e, errorMessage);

      return e;
    }

    return error;
  };

  const handleChange = (value?: string) => {
    const { error, errorMessage } = validate(value, validators);

    updateError(error, errorMessage);
    setValue(value);
  };

  return {
    options: options,
    error: error,
    errorMessage: errorMessage,
    selectedValue: value,
    onValueChange: handleChange,
    checkError: checkError,
  };
};
