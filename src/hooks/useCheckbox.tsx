import { useState } from "react";
import { validate } from "./helpers";
import { Validator } from "./types";

export const useCheckbox = (
  validators?: Validator<boolean | undefined>[],
  defaultValue?: boolean,
  valueChangeCallback?: (value: boolean | undefined) => void
) => {
  const [checked, setChecked] = useState<boolean | undefined>(defaultValue);
  const [error, setError] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const updateError = (error?: boolean, errorMessage?: string) => {
    setError(error);
    setErrorMessage(errorMessage);
  };

  const handleChange = (checked?: boolean) => {
    const { error, errorMessage } = validate(checked, validators);

    updateError(error, errorMessage);
    setChecked(checked);
    valueChangeCallback?.(checked);
  };

  const handleCheckError = () => {
    const { error, errorMessage } = validate(checked, validators);

    updateError(error, errorMessage);

    return error;
  };

  return {
    checked: checked,
    error: error,
    errorMessage: errorMessage,
    checkError: handleCheckError,
    onCheckChange: handleChange,
    setChecked: (checked?: boolean) => setChecked(checked),
  };
};
