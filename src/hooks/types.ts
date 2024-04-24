type Validator<T> = {
  validate?: (value?: T) => boolean;
  validateZomo?: (value?: T) => string[];
  errorMessage?: string;
};
