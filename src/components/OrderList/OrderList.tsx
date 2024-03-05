import styles from "./OrderList.module.css";
import pizza3 from "../../assets/images/pizza3.webp";
import { PizzaModel } from "../../types";
import classNames from "classnames";

interface IOrderListProps {
  className?: string;
  items?: PizzaModel[];
  onRemove?: (index: number) => void;
}

const OrderList: React.FC<IOrderListProps> = ({
  className,
  items = [],
  onRemove,
}) => {
  return (
    <ul className={classNames(styles["OrderList"], className)}>
      {items.map(({ name, price }, key) => (
        <li key={key}>
          <div className={styles["Product"]}>
            <img src={pizza3} />
            <div>
              <p className={styles["Name"]}>{name}</p>
              <p className={styles["Price"]}>{price.toFixed(2)} zł</p>
            </div>
          </div>
          <div className={styles["Details"]}>
            <div className={styles["Top"]}>
              <p className={styles["Size"]}>Rozmiar: Mała</p>
            </div>
            <div className={styles["Hr"]} />
            <div className={styles["Bottom"]}>
              <p className={styles["Remove"]} onClick={() => onRemove?.(key)}>
                Usuń
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { OrderList };
