import { createContext, useContext, useState } from "react";
import { PizzaModel } from "../types";

type AppState = {
  basket: PizzaModel[];
  basketDrawerOpen: boolean;
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
    basket: [],
    basketDrawerOpen: false,
  });

  const updateState = <K extends keyof AppState>(
    stateKey: K,
    newValue: AppState[K]
  ) => {
    setState({ ...state, [stateKey]: newValue });
  };

  return (
    <AppContext.Provider value={[state, updateState]}>
      {children}
    </AppContext.Provider>
  );
};
