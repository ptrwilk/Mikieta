import { createContext, useContext, useState } from "react";
import { OrderModel, ProductModel, SettingModel } from "../types";

type AppState = {
  basket: ProductModel[];
  order: OrderModel;
  basketModalOpen: boolean;
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
