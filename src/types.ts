export type Guid = string;

export type PizzaModel = {
  id: Guid;
  name: string;
  price: number;
  ingredients: string[];
  productType: ProductType;
};

export enum ProductType {
  PizzaSmall,
  PizzaMedium,
  PizzaBig,
  Drink,
  Sauce,
  Snack,
}
