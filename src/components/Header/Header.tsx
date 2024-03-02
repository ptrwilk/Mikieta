import { Basket, Button } from "..";
import { useAppContext } from "../../context/AppContext";
import styles from "./Header.module.css";

const Header = () => {
  const [app] = useAppContext();

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
        {(app?.basket.length ?? 0) > 0 && (
          <li>
            <Basket amount={app?.basket.length} />
          </li>
        )}
        <li>
          <Button>Logowanie</Button>
        </li>
      </ul>
    </div>
  );
};

export { Header };
