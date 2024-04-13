import { Status } from "../../components";
import styles from "./DeliveryView.module.css";

const DeliveryView = () => {
  return (
    <div className={styles["DeliveryView"]}>
      <div className={styles["Thanks"]}>
        <h2>Dziękujemy za złożenie zamówienia!</h2>
        <p>Obserwuj status swojego zamówienia</p>
      </div>
      <div className={styles["Status-Title"]}>
        <h3>Status Zamówienia</h3>
        <div className={styles["Hr"]} />
      </div>
      <ul className={styles["Statuses"]}>
        <li>
          <Status
            number={1}
            title="Oczekiwanie!"
            text="Twoje zamówienie oczekuje na potwierdzenie"
            selected
          />
        </li>
        <li>
          <Status
            number={2}
            title="W przygotowaniu!"
            text="Twoje zamówienie jest w trakcie przygotowywania"
          />
        </li>
        <li>
          <Status
            number={3}
            title="Gotowe!"
            text="Jesteśmy w drodze do ciebie"
          />
        </li>
      </ul>
    </div>
  );
};

export { DeliveryView };
