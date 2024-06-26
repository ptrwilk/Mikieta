import { createContext, useContext, useState } from "react";
import { OrderModel, ProductModel, SettingModel } from "../types";

type AppState = {
  basket: ProductModel[];
  order: OrderModel;
  basketModalOpen: boolean;
  purchaseModel?: ProductModel;
  loading: boolean;
  settings?: SettingModel;
};

const AppContext = createContext<
  [
    AppState | null,
    updateState: <K extends keyof AppState>(
      stateKey: K,
      newValue: AppState[K]
    ) => void
  ]
>([null, () => {}]);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState<AppState>({
    basket: parse(localStorage.getItem("basket")) ?? [],
    order: parse(localStorage.getItem("order")) ?? {
      person: {},
    },
    basketModalOpen: false,
    loading: false,
  });

  const updateState = <K extends keyof AppState>(
    stateKey: K,
    newValue: AppState[K]
  ) => {
    if (stateKey === "basket") {
      localStorage.setItem("basket", JSON.stringify(newValue));
    }
    if (stateKey === "order") {
      localStorage.setItem("order", JSON.stringify(newValue));
    }
    setState((prev) => ({ ...prev, [stateKey]: newValue }));
  };

  return (
    <AppContext.Provider value={[state, updateState]}>
      {children}
    </AppContext.Provider>
  );
};

const parse = (value: string | null) => {
  if (value == null) {
    return undefined;
  }

  return JSON.parse(value);
};

export const updateBasket = (
  app: AppState,
  updateApp: <K extends keyof AppState>(
    stateKey: K,
    newValue: AppState[K]
  ) => void,
  product: ProductModel,
  type: "add" | "remove" = "add"
) => {
  const equals = (item1: ProductModel, item2: ProductModel) =>
    item1.id === item2.id && item1.pizzaType === item2.pizzaType;
  const existingProduct = app!.basket.find((item) => equals(item, product));

  let updatedBasked: ProductModel[] = [];

  if (type === "add") {
    updatedBasked = existingProduct
      ? app!.basket.map((item) =>
          equals(item, product)
            ? { ...item, quantity: item.quantity! + product.quantity! }
            : item
        )
      : [...app!.basket, { ...product, quantity: product!.quantity }];
  } else {
    updatedBasked = app!.basket.reduce((basket: ProductModel[], item) => {
      if (equals(item, product)) {
        if (item.quantity! > 1) {
          basket.push({ ...item, quantity: item.quantity! - 1 });
        }
      } else {
        basket.push(item);
      }
      return basket;
    }, []);
  }

  updateApp("basket", updatedBasked);
};
