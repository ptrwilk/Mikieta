import styles from "./PizzaCard.module.css";
import pizza from "../../assets/images/pizza3.webp";

interface IPizzaCardProps {
  name?: string;
  ingredients?: string[];
  price?: number;
  onClick?: () => void;
}

const PizzaCard: React.FC<IPizzaCardProps> = ({
  name,
  ingredients,
  price,
  onClick,
}) => {
  return (
    <div
      className={styles["PizzaCard"]}
      title="Dodaj do koszyka"
      onClick={onClick}
    >
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
