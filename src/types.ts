export type Guid = string;

export type PizzaModel = {
  id: Guid;
  name: string;
  price: number;
  ingredients: string[];
  productType: ProductType;
  quantity: number;
};

export enum ProductType {
  PizzaSmall,
  PizzaMedium,
  PizzaBig,
  Drink,
  Sauce,
  Snack,
}

export const translateProductType = (productType: ProductType): string => {
  switch (productType) {
    case ProductType.PizzaSmall:
      return "mała";
    case ProductType.PizzaMedium:
      return "średnia";
    case ProductType.PizzaBig:
      return "duża";
    case ProductType.Drink:
      return "drink";
    case ProductType.Sauce:
      return "sos";
    case ProductType.Snack:
      return "przekąska";
    default:
      return "Unknown product type";
  }
};
