import { PizzaModel, ProductModel, translateProductType } from "@/types";
import styles from "./BasketItem.module.css";
import { FaEdit } from "react-icons/fa";
import { Button } from "../Button/Button";
import { useAppContext } from "@/context/AppContext";
interface IBasketItemProps {
  item?: ProductModel | PizzaModel;
  onRemoveItem?: () => void;
  onAddItem?: () => void;
}

const BasketItem: React.FC<IBasketItemProps> = ({
  item,
  onRemoveItem,
  onAddItem,
}) => {
  const [app, updateApp] = useAppContext();
  const { price, name, productType, ingredients = [], quantity } = item || {};
  const subproducts = (item as PizzaModel)?.subproducts || [];

  const editProduct = (): void => {
    if (item != undefined) {
      const updatedItem = { ...item, isEditing: true };

      updateApp({
        itemModalOpen: true,
        itemSelected: updatedItem,
        basketModalOpen: false,
      });
    }
  };

  return (
    <div className={styles["BasketItem"]}>
      <div className={styles["ProductDetails"]}>
        <p className={styles["Name"]}>
          {name} <span>{`(${translateProductType(productType!)})`}</span>
        </p>
        <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
        <ul className={styles["Subproducts"]}>
          {" "}
          {subproducts.map((subproduct, key) => {
            return (
              <li key={key}>
                + {subproduct.quantity}x {subproduct.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles["Right"]}>
        <p className={styles["Price"]}>{price! * quantity!} zł</p>
        <Button onClick={editProduct} className={styles["EditButton"]}>
          <FaEdit size={20} color="var(--color-secondary)" />
        </Button>
      </div>
    </div>
  );
};

export { BasketItem };
