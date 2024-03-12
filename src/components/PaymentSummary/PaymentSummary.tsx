import classNames from "classnames";
import styles from "./PaymentSummary.module.css";
import { PizzaModel } from "../../types";
import pizza3 from "../../assets/images/pizza3.webp";
import { forwardRef } from "react";

interface IPaymentSummaryProps {
  className?: string;
  items?: PizzaModel[];
}

const PaymentSummary = forwardRef<any, IPaymentSummaryProps>(
  ({ className, items }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(styles["PaymentSummary"], className)}
      >
        <div className={styles["Header"]}>
          <ul>
            <li>Produkt</li>
            <li>Cena</li>
          </ul>
          <div className={styles["Hr"]} />
        </div>
        <ul className={styles["Products"]}>
          {items?.map(({ name, price }, key) => (
            <li key={key}>
              <div className={styles["Content"]}>
                <div className={styles["Product"]}>
                  <img src={pizza3} />
                  <p>{name}</p>
                </div>
                <p>{price.toFixed(2)} zł</p>
              </div>
              <div className={styles["Hr"]} />
            </li>
          ))}
        </ul>
        <div className={styles["Summary"]}>
          <div className={styles["Price"]}>
            <p>Cena:</p>
            <p>36.00 zł</p>
          </div>
          <div className={styles["Delivery"]}>
            <div>
              <p>Dostawa:</p>
              <p>36.00 zł</p>
            </div>
            <div className={styles["Hr"]} />
          </div>
          <div className={styles["Total"]}>
            <p>Suma:</p>
            <p>36.00 zł</p>
          </div>
        </div>
      </div>
    );
  }
);

export { PaymentSummary };
