import { useLocation, useParams } from "react-router-dom";
import { Breadcrumb } from "../../../components";
import styles from "./BreadcrumbShared.module.css";

const BreadcrumbShared = () => {
  const { pathname } = useLocation();

  const items =
    pathname === "/order"
      ? [
          { text: "Menu", path: "/" },
          { text: "Zamówienie", path: "/order" },
        ]
      : pathname === "/delivery"
      ? [
          { text: "Menu", path: "/" },
          { text: "Zamówienie", path: "/order" },
          { text: "Dostawa", path: "/delivery" },
        ]
      : [
          { text: "Menu", path: "/" },
          { text: "Zamówienie", path: "/order" },
          { text: "Dostawa", path: "/delivery" },
          { text: "Płatność", path: "/payment" },
        ];

  return <Breadcrumb items={items}></Breadcrumb>;
};

export { BreadcrumbShared };
