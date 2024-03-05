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
