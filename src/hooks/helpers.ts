export const validate = <T>(
  value: T | undefined,
  validators?: Validator<T>[]
): { error: boolean; errorMessage?: string } => {
  let hasError = false;
  let errorMessage: string | undefined = undefined;

  if (validators) {
    for (var i = 0; i < validators.length; i++) {
      const error = validators[i].validate(value);
      if (!error) {
        hasError = true;
        errorMessage = validators[i].errorMessage;
        break;
      }
    }
  }

  return {
    error: hasError,
    errorMessage: errorMessage,
  };
};
