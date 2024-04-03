import { Button } from "..";
import styles from "./Header.module.css";

interface IHeaderProps {
  style?: any;
  orderButtonVisible?: boolean;
}

const Header: React.FC<IHeaderProps> = ({
  style,
  orderButtonVisible = true,
}) => {
  return (
    <div className={styles.Header} style={style}>
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
      {orderButtonVisible && (
        <Button huge to="/menu">
          Zamów online
        </Button>
      )}
    </div>
  );
};

export { Header };
