import { Button } from "..";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.Header}>
      <p className={styles.Logo}>LOGO</p>
      <ul>
        <li>
          <p>O nas</p>
        </li>
        <li>
          <p>Menu</p>
        </li>
        <li>
          <p>Kontakt</p>
        </li>
        <li>
          <Button>Logowanie</Button>
        </li>
      </ul>
    </div>
  );
};

export { Header };
