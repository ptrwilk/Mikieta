import classNames from "classnames";
import styles from "./PaymentSummary.module.css";
import { ProductModel } from "../../types";
import pizza3 from "../../assets/images/pizza3.webp";
import { forwardRef } from "react";

interface IPaymentSummaryProps {
  className?: string;
  items?: ProductModel[];
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
      </div>
    );
  }
);

export { PaymentSummary };
