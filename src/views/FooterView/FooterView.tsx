import { Button, Logo } from "../../components";
import styles from "./FooterView.module.css";
import { FaFacebookF } from "react-icons/fa";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

interface IFooterViewProps {
  className?: string;
}

const FooterView: React.FC<IFooterViewProps> = ({ className }) => {
  return (
    <div className={classNames(className, styles["FooterView"])} id="contact">
      <ul>
        <li className={styles["Logo"]}>
          <Logo />
        </li>
        <li>
          <div className={classNames(styles["Content"], styles["Content-2"])}>
            <p>Jakaś 2/4, 44-123 Zabrze</p>
            <p>Telefon: 333 111 222</p>
            <p className={styles["Location"]}>
              <NavLink to="">Mapa dojazdu</NavLink>
            </p>
          </div>
        </li>
        <li>
          <div className={classNames(styles["Content"], styles["Content-3"])}>
            <p>Obserwuj nas na:</p>
            <ul>
              <li>
                <NavLink to="">
                  <FaFacebookF />
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={classNames(styles["Content"], styles["Content-4"])}>
            <p>Gotówka, karta lub szybki przelew</p>
            <Button huge to="/menu">
              Zamów online
            </Button>
          </div>
        </li>
      </ul>
      <div className={styles["Bottom"]}>
        <div className={styles["Hr"]} />
        <div className={styles["Text"]}>
          <NavLink to="">Regulamin</NavLink>
          <div className={styles["Separator"]} />
          <NavLink to="">Polityka prywatności</NavLink>
          <div className={styles["Separator"]} />
          <NavLink to="">Zgody marketingowe</NavLink>
          <div className={styles["Separator"]} />
          <NavLink to={import.meta.env.VITE_ADMIN_PANEL_URL}>
            Panel Restauratora
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export { FooterView };
