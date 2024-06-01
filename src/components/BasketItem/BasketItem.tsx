import { PizzaModel, translateProductType } from "@/types";
import { Counter } from "..";
import styles from "./BasketItem.module.css";

interface IBasketItemProps {
  item?: PizzaModel;
  onRemoveItem?: () => void;
  onAddItem?: () => void;
}

const BasketItem: React.FC<IBasketItemProps> = ({
  item,
  onRemoveItem,
  onAddItem,
}) => {
  const {
    price,
    name,
    productType,
    pizzaType,
    ingredients = [],
    quantity,
  } = item || {};
  return (
    <div className={styles["BasketItem"]}>
      <div className={styles["ProductDetails"]}>
        <p className={styles["Name"]}>
          {name}{" "}
          <span>{`(${translateProductType(productType!, pizzaType)})`}</span>
        </p>
        <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
      </div>
      <div className={styles["Right"]}>
        <p className={styles["Price"]}>{price! * quantity!} zł</p>
        <Counter
          number={quantity}
          onMinusClick={onRemoveItem}
          onPlusClick={onAddItem}
        />
      </div>
    </div>
  );
};

export { BasketItem };
