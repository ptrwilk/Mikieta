type Validator<T> = {
  validate: (value?: T) => boolean;
  errorMessage?: string;
};
