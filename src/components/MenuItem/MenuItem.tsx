import styles from "./MenuItem.module.css";
import pizza from "../../../src/assets/images/pizza.jpg";
import sauce from "../../../src/assets/images/sauce.jpg";
import snack from "../../../src/assets/images/snack.jpg";
import drink from "../../../src/assets/images/drink.jpg";
import { ButtonShop } from "..";
import { PizzaModel, ProductType } from "@/types";
import { useAppContext } from "@/context/AppContext";

interface IMenuItemProps {
  product: PizzaModel;
}

const MenuItem: React.FC<IMenuItemProps> = ({ product }) => {
  const [app, updateApp] = useAppContext();
  const { name, ingredients, price, imageUrl } = product;
  const handlePizzaClick = () => {
    const existingPizza = app!.basket.find((item) => item.id === product.id);

    const updatedBasked = existingPizza
      ? app!.basket.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...app!.basket, { ...product, quantity: 1 }];

    updateApp("basket", updatedBasked);
  };

  const img =
    product.productType === ProductType.Pizza
      ? pizza
      : product.productType === ProductType.Snack
      ? snack
      : product.productType === ProductType.Drink
      ? drink
      : sauce;

  return (
    <div className={styles["MenuItem"]}>
      <img src={imageUrl ?? img} />
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
