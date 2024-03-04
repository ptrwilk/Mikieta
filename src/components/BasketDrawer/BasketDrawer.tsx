import { Button, Drawer } from "..";
import styles from "./BasketDrawer.module.css";
import pizza3 from "../../assets/images/pizza3.webp";
import { PizzaModel } from "../../types";
import { sum } from "../../helpers";
import { FaChevronRight } from "react-icons/fa";

interface IBasketDrawerProps {
  items?: PizzaModel[];
  open?: boolean;
  onClose?: () => void;
}

const BasketDrawer: React.FC<IBasketDrawerProps> = ({
  open,
  items = [],
  onClose,
}) => {
  return (
    <Drawer open={open}>
      <div className={styles["BasketDrawer"]}>
        <div className={styles["Content"]}>
          <Button className={styles["Btn-Arrow"]} icon onClick={onClose}>
            <FaChevronRight size={24} />
          </Button>
          <h3>Twoje zamówienie</h3>
          <div className={styles["Header"]}>
            <p className={styles["Text"]}>Produkt</p>
            <p className={styles["Text"]}>Cena</p>
          </div>
          <hr />
          <ul className={styles["Items"]}>
            {items.map(({ name, price }, key) => (
              <li key={key}>
                <div className={styles["Item"]}>
                  <div className={styles["Product"]}>
                    <img src={pizza3} />
                    <div>
                      <p className={styles["Title"]}>{name}</p>
                      <p className={styles["Text"]}>Rozmiar: Mała</p>
                    </div>
                  </div>
                  <div className={styles["Price"]}>
                    <p className={styles["Text"]}>{price.toFixed(2)} zł</p>
                    <p className={styles["Remove"]}>Usuń</p>
                  </div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
          <div className={styles["Summary"]}>
            <p className={styles["Text"]}>Całkowita cena</p>
            <p className={styles["Price"]}>
              {sum(items.map((x) => x.price))} zł
            </p>
          </div>
        </div>
        <Button className={styles["Button"]} huge>
          Przejdz do podsumowania
        </Button>
      </div>
    </Drawer>
  );
};

export { BasketDrawer };
