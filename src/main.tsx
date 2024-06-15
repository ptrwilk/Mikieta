import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import "./styles/theme.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppContextProvider, useAppContext } from "./context/AppContext.tsx";
import { Layout } from "./Layout.tsx";
import { MenuView } from "./views/MenuView/MenuView.tsx";
import { CheckoutView } from "./views/CheckoutView/CheckoutView.tsx";
import { ReservationView } from "./views/ReservationView/ReservationView.tsx";
import { ContactView } from "./views/ContactView/ContactView.tsx";
import { DeliveryView } from "./views/DeliveryView/DeliveryView.tsx";
import { OrderView } from "./views/OrderView/OrderView.tsx";
import { get } from "./apihelper.tsx";
import { SettingModel } from "./types.ts";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
  },
  {
    element: (
      <Layout basketVisible name="Menu">
        <MenuView />
      </Layout>
    ),
    path: "/menu",
    loader: () => get("menu"),
  },
  {
    element: (
      <Layout name="Kasa">
        <CheckoutView />
      </Layout>
    ),
    path: "/kasa",
  },
  {
    element: (
      <Layout name="Rezerwacja">
        <ReservationView />
      </Layout>
    ),
    path: "/rezerwacja",
  },
  {
    element: (
      <Layout name="Kontakt">
        <ContactView />
      </Layout>
    ),
    path: "/kontakt",
  },
  {
    element: (
      <Layout name="Dostawa">
        <DeliveryView />
      </Layout>
    ),
    path: "/dostawa",
  },
  {
    element: (
      <Layout name="Zamówienie">
        <OrderView />
      </Layout>
    ),
    path: "/zamowienie/:zamowienieId",
  },
]);

const SettingsProvider = () => {
  const [_, updateApp] = useAppContext();

  useEffect(() => {
    (async () => {
      const res = (await get("setting")) as SettingModel;

      updateApp("settings", res);
    })();
  }, []);

  return <></>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
      <SettingsProvider />
    </AppContextProvider>
  </React.StrictMode>
);
