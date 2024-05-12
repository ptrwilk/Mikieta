import { useEffect, useState } from "react";
import { validate } from "./helpers";
import { Validator } from "./types";

type RadioModel = {
  value: string;
  label: string;
  child?: any;
  description?: string;
};

export const useRadio = (
  validators?: Validator<string | undefined>[],
  options?: RadioModel[],
  valueChangeTrigger?: any,
  defaultValue?: string,
  valueChangeCallback?: (value: string | undefined) => void
) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const [error, setError] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [errorValues, setErrorValues] = useState<string[]>([]);

  useEffect(() => {
    if (valueChangeTrigger) {
      checkError();
    }
  }, [valueChangeTrigger]);

  const updateError = (
    error?: boolean,
    errorMessage?: string,
    errorValues?: string[]
  ) => {
    setError(error);
    setErrorMessage(errorMessage);
    setErrorValues(errorValues ?? []);
  };

  const checkError = (): boolean => {
    if (!error) {
      const {
        error: e,
        errorMessage,
        errorValues,
      } = validate(value, validators);
      updateError(e, errorMessage, errorValues);
      return e || (errorValues?.length ?? 0) > 0;
    }

    return error;
  };

  const handleChange = (value?: string) => {
    const { error, errorMessage, errorValues } = validate(value, validators);

    updateError(error, errorMessage, errorValues);
    setValue(value);
    valueChangeCallback?.(value);
  };

  return {
    options: options,
    error: error,
    errorMessage: errorMessage,
    selectedValue: value,
    onValueChange: handleChange,
    checkError: checkError,
    errorValues: errorValues,
  };
};
