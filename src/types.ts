export type Guid = string;

export type PizzaModel = {
  id: Guid;
  name: string;
  price: number;
  ingredients: string[];
  productType: ProductType;
  quantity: number;
  imageUrl?: string;
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

export type ProductQuantityModel = {
  productId: Guid;
  quantity: number;
};

export type OrderRequestModel = {
  productQuantities: ProductQuantityModel[];
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

export type OrderResponseModel = {
  sessionId?: string;
  url?: string;
  orderId?: Guid;
};

export type OrderStatusModel = {
  status: OrderStatusType;
  deliveryAt: Date;
  deliveryMethod: DeliveryMethod2;
};

export enum OrderStatusType {
  Waiting,
  Preparing,
  Ready,
}

export enum ProductType {
  PizzaSmall,
  PizzaMedium,
  PizzaBig,
  Drink,
  Sauce,
  Snack,
}

//TODO: ujednolicic zmienić ten enum na ponizszy
export enum DeliveryMethod {
  Delivery = "Delivery",
  TakeAway = "TakeAway",
  DinningIn = "DinningIn",
}

export enum DeliveryMethod2 {
  Delivery,
  TakeAway,
  DinningIn,
}

export enum PaymentMethod {
  Transfer = "Transfer",
  Cash = "Cash",
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
