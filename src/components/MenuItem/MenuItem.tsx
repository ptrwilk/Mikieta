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
    const existingPizza = app!.basket.find(
      (item) =>
        item.name === product.name && item.productType === product.productType
    );

    if (existingPizza) {
      const updatedBasket = app!.basket.map((item) => {
        if (item.name === product.name) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      updateApp("basket", updatedBasket);
    } else {
      updateApp("basket", [...app!.basket, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className={styles["MenuItem"]}>
      <img src={pizza} />
      <div className={styles["Content"]}>
        <p className={styles["Title"]}>{name}</p>
        <p className={styles["Ingredients"]}>{ingredients?.join(", ")}</p>
      </div>
      <ButtonShop
        className={styles["Button"]}
        price={price}
        onClick={() => handlePizzaClick()}
      />
    </div>
  );
};

export { MenuItem };
