export type Guid = string;

export type ProductModel = {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  productType: ProductType;
  quantity: number;
  subproducts: ProductModel[];
};

export type OrderModel = {
  person?: PersonModel;
  deliveryTiming?: DeliveryTimingOption;
  deliveryMethod?: DeliveryMethod;
  paymentMethod?: PaymentMethod;
  openingHour?: string;
  street?: string;
  houseNumber?: string;
  deliveryCity?: string;
  flatNumber?: string;
  floor?: string;
  invoiceNeeded?: boolean;
  nip?: string;
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
  street?: string;
  homeNumber?: string;
  city?: string;
  flatNumber?: string;
  floor?: string;
  processingPersonalData?: { email?: boolean; sms?: boolean };
};

export type ReservationRequestModel = {
  reservationDate: Date;
  numberOfPeople: number;
  phone: string;
  email: string;
  name: string;
  comments?: string;
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

export enum DeliveryTimingOption {
  RightAway = "RightAway",
  HourSelection = "HourSelection",
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

export const getProductQuantityFromBasket = (
  basket: ProductModel[],
  productId: number
): number | undefined => {
  return basket.find((x) => x.id === productId)?.quantity;
};

export const getSubproductQuantityFromItemSelected = (
  subproducts: ProductModel[],
  productId: number
): number | undefined => {
  return subproducts.find((x) => x.id === productId)?.quantity;
};
