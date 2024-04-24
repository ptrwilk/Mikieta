export type Validator<T> = {
  validate?: (value?: T) => boolean;
  validateZomo?: (value?: T) => string[];
  errorMessage?: string;
};

export const validatePhone = (value?: string) =>
  !!value &&
  /(^\+?\d{1,2}\s?\d{3}\s?\d{3}\s?\d{3}$)|(^\d{3}\s?\d{3}\s?\d{3}$)/.test(
    value
  );

export const validateEmail = (value?: string) =>
  !!value && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(value);
