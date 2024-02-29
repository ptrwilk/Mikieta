import styles from "./PizzaCard.module.css";
import pizza from "../../assets/images/pizza2.jpg";

interface IPizzaCardProps {
  name?: string;
  ingredients?: string[];
  price?: number;
}

const PizzaCard: React.FC<IPizzaCardProps> = ({ name, ingredients, price }) => {
  return (
    <div className={styles["PizzaCard"]}>
      <img src={pizza} />
      <div>
        <p className={styles["Name"]}>{name}</p>
        <p className={styles["Ingredients"]}>{ingredients?.join(", ")}</p>
      </div>
      <p className={styles["Price"]}>{price?.toFixed(2)} zł</p>
    </div>
  );
};

export { PizzaCard };
