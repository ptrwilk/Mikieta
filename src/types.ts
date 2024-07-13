export type Guid = string;

export type ClosureModel = {
  closedOn: DayOfTheWeek;
};

export type SettingModel = {
  street?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  facebook?: string;
  deliveryPrice?: number;
  deliveryRange?: number;
  email?: string;
  adminWebsiteUrl: string;
  openingHours: SettingHoursModel[];
  deliveryHours: SettingHoursModel[];
  closures: ClosureModel[];
};

export type SettingHoursModel = {
  from: string;
  to: string;
};

export type ProductModel = {
  id: Guid;
  name: string;
  price?: number;
  ingredients: IngredientModel[];
  additionalIngredients?: IngredientModel[];
  productType: ProductType;
  pizzaType?: PizzaType | null;
  quantity?: number;
  imageUrl?: string;
  description?: string;
  pizzaSizePrice: { [key in PizzaType]: number };
};

export type DeliveryModel = {
  street: string;
  homeNumber: string;
  city: string;
};

export type DeliveryResponseModel = {
  errorType?: DeliveryCheckErrorType;
  errorMessage?: string;
  hasError: boolean;
  deliveryPrice?: number;
};

export type IngredientModel = {
  id?: Guid;
  name: string;
  priceSmall: number;
  priceMedium: number;
  priceLarge: number;
  prices: number[];
  removed?: boolean;
  quantity?: number;
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

export type RemovedIngredientModel = {
  ingredientId: Guid;
};

export type AdditionalIngredientModel = {
  ingredientId: Guid;
  quantity: number;
};

export type ProductQuantityModel = {
  productId: Guid;
  quantity: number;
  pizzaType?: PizzaType;
  removedIngredients?: RemovedIngredientModel[];
  additionalIngredients?: AdditionalIngredientModel[];
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
  orderNumber: number;
  deliveryAt: Date;
  deliveryMethod: DeliveryMethod;
  canClearBasket: boolean;
};

export enum DayOfTheWeek {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export enum DeliveryCheckErrorType {
  LocationNotFound = "LocationNotFound",
  OutOfDeliveryRange = "OutOfDeliveryRange",
}

export enum OrderStatusType {
  Cancelled = "Cancelled",
  Waiting = "Waiting",
  Preparing = "Preparing",
  Ready = "Ready",
}

export enum ProductType {
  Pizza = "Pizza",
  Drink = "Drink",
  Sauce = "Sauce",
  Snack = "Snack",
}

export enum PizzaType {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

export enum DeliveryMethod {
  Delivery = "Delivery",
  TakeAway = "TakeAway",
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
