import { FaShoppingBasket } from "react-icons/fa";
import { Button } from "..";
import styles from "./Basket.module.css";

interface IBasketProps {
  amount?: number;
  onClick?: () => void;
}

const Basket: React.FC<IBasketProps> = ({ onClick, amount = 0 }) => {
  return (
    <Button className={styles["Basket"]} icon onClick={onClick}>
      <div className={styles["Content"]}>
        <FaShoppingBasket size={25} />
        {amount > 0 && (
          <div className={styles["Amount"]}>
            <p>{amount}</p>
          </div>
        )}
      </div>
    </Button>
  );
};

export { Basket };
