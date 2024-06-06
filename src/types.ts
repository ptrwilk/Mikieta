export type Guid = string;

export type PizzaModel = {
  id: Guid;
  name: string;
  price: number;
  ingredients: IngredientModel[];
  productType: ProductType;
  pizzaType?: PizzaType | null;
  quantity?: number;
  imageUrl?: string;
  description?: string;
};

export type DeliveryModel = {
  street: string;
  homeNumber: string;
  city: string;
};

export type DeliveryCheckError = {
  errorType: DeliveryCheckErrorType;
  message: string;
};

export type IngredientModel = {
  id?: Guid;
  name: string;
  priceSmall: number;
  priceMedium: number;
  priceLarge: number;
  prices: number[];
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

export enum DeliveryCheckErrorType {
  LocationNotFound,
}

export enum OrderStatusType {
  Waiting,
  Preparing,
  Ready,
}

export enum ProductType {
  Pizza,
  Drink,
  Sauce,
  Snack,
}

export enum PizzaType {
  Small,
  Medium,
  Large,
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

export const translateProductType = (
  productType: ProductType,
  pizzaType?: PizzaType | null
): string => {
  switch (productType) {
    case ProductType.Pizza:
      switch (pizzaType) {
        case PizzaType.Small:
          return "mała";
        case PizzaType.Medium:
          return "średnia";
        case PizzaType.Large:
          return "duża";
        default:
          return "Unknown pizza type";
      }
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
