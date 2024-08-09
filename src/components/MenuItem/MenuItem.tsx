import styles from "./MenuItem.module.css";
import pizza from "../../../src/assets/images/pizza.jpg";
import sauce from "../../../src/assets/images/sauce.jpg";
import snack from "../../../src/assets/images/snack.jpg";
import drink from "../../../src/assets/images/drink.jpg";
import { ButtonShop } from "..";
import { ProductModel, ProductType } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { productToPrice, sum } from "@/helpers";

interface IMenuItemProps {
  product: ProductModel;
  onClick?: () => void;
}

const MenuItem: React.FC<IMenuItemProps> = ({ product, onClick }) => {
  const [app] = useAppContext();
  const { name, ingredients, imageUrl, description } = product;

  const img =
    product.productType === ProductType.Pizza
      ? pizza
      : product.productType === ProductType.Desert
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
          {description ? (
            <p>{description}</p>
          ) : (
            <p>{ingredients.map((x) => x.name).join(", ")}</p>
          )}
        </div>
        <ButtonShop
          className={styles["Button"]}
          price={productToPrice(product)}
          onClick={onClick}
          amount={sum(
            app!.basket
              .filter((x) => x.id === product.id)
              .map((x) => x.quantity ?? 0)
          )}
        />
      </div>
    </div>
  );
};

export { MenuItem };
