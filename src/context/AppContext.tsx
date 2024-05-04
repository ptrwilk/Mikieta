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
    itemSelected: parse(localStorage.getItem("itemSelected")),
    itemModalOpen: false,
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
    if (stateKey === "itemSelected") {
      localStorage.setItem("itemSelected", JSON.stringify(newValue));
    }

    setState({ ...state, [stateKey]: newValue });
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
