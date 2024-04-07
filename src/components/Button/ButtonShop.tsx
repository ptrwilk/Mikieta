import classNames from "classnames";
import { Button } from "..";
import styles from "./ButtonShop.module.css";
import { FaShoppingCart } from "react-icons/fa";

interface IButtonShopProps {
  className?: string;
  amount?: number;
  price?: number;
  onClick?: () => void;
}

const ButtonShop: React.FC<IButtonShopProps> = ({
  className,
  amount = 0,
  price,
  onClick,
}) => {
  return (
    <Button
      huge
      className={classNames(className, styles["ButtonShop"])}
      onClick={onClick}
    >
      <div className={styles["Content"]}>
        <FaShoppingCart size={14} />
        <p>{price?.toFixed(2)} zł</p>
        {amount !== 0 && (
          <div className={styles["Circle"]}>
            <p className={styles["Amount"]}>{amount}</p>
          </div>
        )}
      </div>
    </Button>
  );
};

export { ButtonShop };
