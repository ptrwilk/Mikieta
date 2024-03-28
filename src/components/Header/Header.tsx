import { Button } from "..";
import styles from "./Header.module.css";

const Header = () => {
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
