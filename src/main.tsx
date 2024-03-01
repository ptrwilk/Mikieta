import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import "./styles/theme.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MenuView } from "./views/MenuView/MenuView.tsx";

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
        path: "pizza",
        loader: ({ request }) => {
          const url = new URL(request.url);
          const size = url.searchParams.get("size");

          return fetch(`http://localhost:5105/pizza?size=${size}`);
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
