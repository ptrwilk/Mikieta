export type Guid = string;

export type PizzaModel = {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  productType: ProductType;
  quantity: number;
};

export type OrderModel = {
  person: PersonModel;
};

export type PersonModel = {
  name?: string;
  phone?: string;
  email?: string;
};

export type OrderRequestModel = {
  productIds: number[];
  deliveryTiming?: Date;
  deliveryRightAway?: boolean;
  deliveryMethod: DeliveryMethod;
  comments?: string;
  paymentMethod: PaymentMethod;
  name: string;
  phone: string;
  email: string;
  nip?: string;
  processingPersonalData?: { email?: boolean; sms?: boolean };
};

export enum ProductType {
  PizzaSmall,
  PizzaMedium,
  PizzaBig,
  Drink,
  Sauce,
  Snack,
}

export enum DeliveryMethod {
  Delivery = "Delivery",
  TakeAway = "TakeAway",
  DinningIn = "DinningIn",
}

export enum PaymentMethod {
  Blik = "Blik",
  GooglePay = "GooglePay",
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
