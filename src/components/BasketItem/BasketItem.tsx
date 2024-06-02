import { PizzaModel, translateProductType } from "@/types";
import { Counter } from "..";
import styles from "./BasketItem.module.css";
import { productToPrice } from "@/helpers";

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
    name,
    productType,
    pizzaType,
    description,
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
        {description ? (
          <p className={styles["Description"]}>{description}</p>
        ) : (
          <p className={styles["Ingredients"]}>
            {ingredients.map((x) => x.name).join(", ")}
          </p>
        )}
      </div>
      <div className={styles["Right"]}>
        <p className={styles["Price"]}>{productToPrice(item!)} zł</p>
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
