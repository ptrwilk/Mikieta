import { createContext, useContext, useState } from "react";
import { OrderModel, PizzaModel } from "../types";

type AppState = {
  basket: PizzaModel[];
  order: OrderModel;
  basketModalOpen: boolean;
  itemSelected: PizzaModel;
  itemModalOpen: boolean;
};

const AppContext = createContext<
  [AppState | null, (updates: Partial<AppState>) => void]
>([null, () => {}]);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState<AppState>({
    basket: parse(localStorage.getItem("basket")) ?? [],
    order: parse(localStorage.getItem("order")) ?? {
      person: {},
    },
    basketModalOpen: false,
    itemSelected: parse(localStorage.getItem("itemSelected")),
    itemModalOpen: false,
  });

  const updateState = (updates: Partial<AppState>) => {
    const newState = { ...state, ...updates };

    if (updates.basket !== undefined) {
      localStorage.setItem("basket", JSON.stringify(newState.basket));
    }
    if (updates.order !== undefined) {
      localStorage.setItem("order", JSON.stringify(newState.order));
    }
    if (updates.itemSelected !== undefined) {
      localStorage.setItem(
        "itemSelected",
        JSON.stringify(newState.itemSelected)
      );
    }

    setState(newState);
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
