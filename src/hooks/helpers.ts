import { Validator } from "./types";

export const validate = <T>(
  value: T | undefined,
  validators?: Validator<T>[]
): { error: boolean; errorMessage?: string; errorValues?: string[] } => {
  let hasError = false;
  let errorMessage: string | undefined = undefined;
  const errorValuesResult: string[] = [];

  if (validators) {
    for (var i = 0; i < validators.length; i++) {
      const error = validators[i].validate?.(value);
      const errorValues = validators[i].validateZomo?.(value);
      if (error === false) {
        hasError = true;
        errorMessage = validators[i].errorMessage;
        break;
      }
      if (errorValues !== undefined) {
        errorValues.forEach((x) => {
          errorValuesResult.push(x);
        });

        errorMessage = validators[i].errorMessage;
      }
    }
  }

  return {
    error: hasError,
    errorMessage: errorMessage,
    errorValues: errorValuesResult,
  };
};
