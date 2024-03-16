import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import "./styles/theme.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MenuView } from "./views/MenuView/MenuView.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";
import { PaymentView } from "./views/PaymentView/PaymentView.tsx";
import { DeliveryView } from "./views/DeliveryView/DeliveryView.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    loader: () => {
      return fetch("http://localhost:5105");
    },
    children: [
      {
        element: <MenuView />,
        path: "/",
        loader: () => {
          return fetch("http://localhost:5105/pizza?size=small");
        },
      },
      {
        element: <MenuView />,
        path: ":pizza",
        loader: ({ request }) => {
          const url = new URL(request.url);

          return fetch(`http://localhost:5105${url.pathname}${url.search}`);
        },
      },
      {
        element: <PaymentView />,
        path: "payment",
      },
      {
        element: <DeliveryView />,
        path: "delivery",
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
