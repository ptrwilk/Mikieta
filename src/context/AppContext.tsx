import { createContext, useContext, useState } from "react";
import { PizzaModel } from "../types";

type AppState = {
  basket: PizzaModel[];
  basketModalOpen: boolean;
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
    basketModalOpen: false,
  });

  const updateState = <K extends keyof AppState>(
    stateKey: K,
    newValue: AppState[K]
  ) => {
    if (stateKey === "basket") {
      localStorage.setItem("basket", JSON.stringify(newValue));
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
