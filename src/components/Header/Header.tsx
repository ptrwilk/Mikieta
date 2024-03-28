import { Basket, Button } from "..";
import { useAppContext } from "../../context/AppContext";
import styles from "./Header.module.css";

const Header = () => {
  const [app, updateApp] = useAppContext();

  const handleBasketClick = () => {
    updateApp("basketDrawerOpen", !app?.basketDrawerOpen);
  };

  return (
    <div className={styles.Header}>
      <p className={styles.Logo}>LOGO</p>
      <ul>
        <li>
          <p>Start</p>
        </li>
        <li>
          <p>Menu</p>
        </li>
        <li>
          <p>Dostawa</p>
        </li>
        <li>
          <p>Rezerwacja</p>
        </li>
        <li>
          <a href="#contact">Kontakt</a>
        </li>
      </ul>
      <Button huge>Zamów online</Button>
    </div>
  );
};

export { Header };
