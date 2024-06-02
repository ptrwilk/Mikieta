import { PizzaModel } from "./types";

type Groupable = {
  [key: string]: any;
};

export function groupBy<T extends Groupable>(
  items: T[],
  keyFunction: (item: T) => any
): T[][] {
  const groups: Record<string, T[]> = {};
  items?.forEach((item) => {
    const key = keyFunction(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });

  return Object.values(groups);
}

export const sum = (numbers: number[]) => {
  const res = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  return res;
};

export const method2 = (
  value: string,
  triggerMasks: string[],
  destinationMask: string
) => {
  triggerMasks.forEach((mask) => {
    const newValue = replaceWithMask(value, mask, destinationMask);

    if (newValue !== value) {
      value = newValue;
      return;
    }
  });

  return value;
};

export const method3 = (
  value: string,
  rules: { triggerMasks: string[]; destinationMask: string }[]
) => {
  rules.forEach((rule) => {
    const newValue = method2(value, rule.triggerMasks, rule.destinationMask);

    if (newValue !== value) {
      value = newValue;
      return;
    }
  });

  return value;
};

export const countDigits = (str: string): number => {
  const matches = str.match(/\d/g); // Match all digits in the string
  return matches ? matches.length : 0; // Return the count of digits
};

export const countCharacters = (str: string, character: string): number => {
  const escapedCharacter = character.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
  const regex = new RegExp(escapedCharacter, "g"); // Create a dynamic regex
  const matches = str.match(regex); // Match all occurrences of 'character'
  return matches ? matches.length : 0; // Return the count
};

export const isDigit = (str: string): boolean => {
  return /^\d$/.test(str);
};

export const maskMatch = (value: string, mask: string): boolean => {
  if (value.length !== mask.length) {
    return false;
  }

  const valueDigits = countDigits(value);
  const maskDigitCount = countCharacters(mask, "#");

  if (valueDigits !== maskDigitCount) {
    return false;
  }

  const valueArray = value.split("");
  const maskArray = mask.split("");

  for (var i = 0; i < valueArray.length; i++) {
    if (maskArray[i] === "#" && !isDigit(valueArray[i])) {
      return false;
    }

    if (maskArray[i] !== "#" && maskArray[i] !== valueArray[i]) {
      return false;
    }
  }

  return true;
};

export const replaceWithMask = (
  value: string,
  triggerMask: string,
  destinationMask: string
): string => {
  if (!maskMatch(value, triggerMask)) {
    return value;
  }

  const triggerMaskDigits = countCharacters(triggerMask, "#");
  const destinationMaskDigits = countCharacters(destinationMask, "#");

  if (triggerMaskDigits !== destinationMaskDigits) {
    return value;
  }

  const valueArray = value.split("");
  const maskArray = triggerMask.split("");

  const values: string[] = [];
  for (var i = 0; i < valueArray.length; i++) {
    if (maskArray[i] === "#" && isDigit(valueArray[i])) {
      values.push(valueArray[i]);
    }
  }

  const destinationMaskArray = destinationMask.split("");

  let result = "";
  for (var i = 0, j = 0; i < destinationMaskArray.length; i++) {
    if (destinationMaskArray[i] === "#") {
      result += values[j];
      j++;
    } else {
      result += destinationMaskArray[i];
    }
  }

  return result;
};

export function convertTimeToDate(timeString: string | undefined) {
  if (timeString === undefined) {
    return undefined;
  }

  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export function getEnumValue<T extends string>(
  enumObj: any,
  value: T
): keyof typeof enumObj | undefined {
  const keys = Object.keys(enumObj) as Array<keyof typeof enumObj>;
  const index = keys.findIndex((key) => enumObj[key] === value);
  return index;
}

export const isNill = (value: any) => value === undefined || value === null;

export const productToPrice = (product: PizzaModel) => {
  return (
    (product.price +
      sum(
        product.ingredients.map((x) =>
          isNill(product.pizzaType) ? 0 : x.prices[product.pizzaType!]
        )
      )) *
    (product.quantity || 1)
  );
};
