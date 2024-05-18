import styles from "./MenuItem.module.css";
import pizza from "../../../src/assets/images/pizza3.webp";
import { ButtonShop } from "..";
import { PizzaModel } from "@/types";
import { useAppContext } from "@/context/AppContext";

interface IMenuItemProps {
  product: PizzaModel;
}

const MenuItem: React.FC<IMenuItemProps> = ({ product }) => {
  const [app, updateApp] = useAppContext();
  const { name, ingredients, price } = product;
  const handlePizzaClick = () => {
    updateApp({
      itemModalOpen: true,
      itemSelected: product,
    });
  };

  return (
    <div className={styles["MenuItem"]}>
      <img src={pizza} />
      <div className={styles["Content"]}>
        <div className={styles["Content-Text"]}>
          <p className={styles["Title"]}>{name}</p>
          <p className={styles["Ingredients"]}>{ingredients?.join(", ")}</p>
        </div>
        <ButtonShop
          className={styles["Button"]}
          price={price}
          onClick={handlePizzaClick}
          amount={app!.basket.find((x) => x.id === product.id)?.quantity}
        />
      </div>
    </div>
  );
};

export { MenuItem };
