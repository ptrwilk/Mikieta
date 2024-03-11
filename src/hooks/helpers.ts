export const hasError = <T>(
  value: T | undefined,
  validators?: Validator<T>[]
) => {
  let hasError = false;

  if (validators) {
    for (var i = 0; i < validators.length; i++) {
      if (!validators[i].validate(value)) {
        hasError = true;
        break;
      }
    }
  }

  return hasError;
};
