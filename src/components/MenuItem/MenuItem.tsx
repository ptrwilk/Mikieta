import styles from "./MenuItem.module.css";
import pizza from "../../../src/assets/images/pizza3.webp";
import { ButtonShop } from "..";

interface IMenuItemProps {
  name?: string;
  ingredients?: string[];
  size?: number;
  price?: number;
}

const MenuItem: React.FC<IMenuItemProps> = ({
  name,
  ingredients,
  size,
  price,
}) => {
  return (
    <div className={styles["MenuItem"]}>
      <img src={pizza} />
      <div className={styles["Content"]}>
        <p className={styles["Title"]}>{name}</p>
        <p className={styles["Ingredients"]}>{ingredients?.join(", ")}</p>
        {size && <p className={styles["Size"]}>{size} cm</p>}
      </div>
      <ButtonShop className={styles["Button"]} price={price} />
    </div>
  );
};

export { MenuItem };
