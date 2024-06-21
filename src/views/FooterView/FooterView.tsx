import { Button, Logo } from "../../components";
import styles from "./FooterView.module.css";
import { FaFacebookF } from "react-icons/fa";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

interface IFooterViewProps {
  className?: string;
}

const FooterView: React.FC<IFooterViewProps> = ({ className }) => {
  const [app] = useAppContext();

  return (
    <div className={classNames(className, styles["FooterView"])} id="contact">
      <ul>
        <li className={styles["Logo"]}>
          <Logo />
        </li>
        <li>
          <div className={classNames(styles["Content"], styles["Content-2"])}>
            <p>
              {app!.settings?.street}, {app!.settings?.zipCode}{" "}
              {app!.settings?.city}
            </p>
            <p>Telefon: {app!.settings?.phone}</p>
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
                <NavLink to={app!.settings?.facebook ?? ""} target="_blank">
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
          <NavLink to={app?.settings?.adminWebsiteUrl ?? ""}>
            Panel Restauratora
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export { FooterView };
