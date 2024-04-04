import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import "./styles/theme.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext.tsx";
import { PaymentView } from "./views/PaymentView/PaymentView.tsx";
import { DeliveryView } from "./views/DeliveryView/DeliveryView.tsx";
import { MenuLayout } from "./MenuLayout.tsx";

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
    element: <MenuLayout />,
    path: "/menu",
    loader: () => {
      return fetch("http://localhost:5105/menu");
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
