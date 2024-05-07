import { Button, Logo } from "../../components";
import styles from "./FooterView.module.css";
import { FaFacebookF } from "react-icons/fa";
import classNames from "classnames";

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
              <a href="">Mapa dojazdu</a>
            </p>
          </div>
        </li>
        <li>
          <div className={classNames(styles["Content"], styles["Content-3"])}>
            <p>Obserwuj nas na:</p>
            <ul>
              <li>
                <a href="">
                  <FaFacebookF />
                </a>
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
          <a href="">Regulamin</a>
          <div className={styles["Separator"]} />
          <a href="">Polityka prywatności</a>
          <div className={styles["Separator"]} />
          <a href="">Zgody marketingowe</a>
          <div className={styles["Separator"]} />
          <a href={import.meta.env.VITE_ADMIN_PANEL_URL}>Panel Restauratora</a>
        </div>
      </div>
    </div>
  );
};

export { FooterView };
