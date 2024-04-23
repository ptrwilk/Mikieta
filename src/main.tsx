import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import "./styles/theme.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.tsx";
import { PaymentView } from "./views/PaymentView/PaymentView.tsx";
import { DeliveryView } from "./views/DeliveryView/DeliveryView.tsx";
import { Layout } from "./Layout.tsx";
import { MenuView } from "./views/MenuView/MenuView.tsx";
import { CheckoutView } from "./views/CheckoutView/CheckoutView.tsx";
import { ReservationView } from "./views/ReservationView/ReservationView.tsx";
import { ContactView } from "./views/ContactView/ContactView.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <PaymentView />,
        path: "payment",
      },
      {
        element: <DeliveryView />,
        path: "delivery/:deliveryId",
        loader: ({ params: { deliveryId } }) => {
          return fetch(`http://localhost:5105/delivery/${deliveryId}`);
        },
      },
    ],
  },
  {
    element: (
      <Layout basketVisible name="Menu">
        <MenuView />
      </Layout>
    ),
    path: "/menu",
    loader: () => {
      return fetch("http://localhost:5105/menu");
    },
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
