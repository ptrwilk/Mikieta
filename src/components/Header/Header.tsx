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
          <p>O nas</p>
        </li>
        <li>
          <p>Menu</p>
        </li>
        <li>
          <a href="#contact">Kontakt</a>
        </li>
        {(app?.basket.length ?? 0) > 0 && (
          <li>
            <Basket amount={app?.basket.length} onClick={handleBasketClick} />
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
