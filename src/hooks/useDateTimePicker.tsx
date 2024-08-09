import { useState } from "react";
import { validate } from "./helpers";
import { Validator } from "./types";

export const useDateTimePicker = (
  validators?: Validator<Date | undefined>[],
  defaultDate?: Date | undefined
) => {
  const [date, setDate] = useState<Date | undefined>(defaultDate);
  const [error, setError] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const updateError = (error?: boolean, errorMessage?: string) => {
    setError(error);
    setErrorMessage(errorMessage);
  };

  const checkError = (): boolean => {
    if (!error) {
      const { error: e, errorMessage } = validate(date, validators);
      updateError(e, errorMessage);

      return e;
    }

    return error;
  };

  const handleDateChange = (date?: Date) => {
    const { error, errorMessage } = validate(date, validators);

    updateError(error, errorMessage);
    setDate(date);
  };

  return {
    date: date,
    error: error,
    errorMessage: errorMessage,
    onDateChange: handleDateChange,
    checkError: checkError,
  };
};
