import styles from "./Logo.module.css";
import logo from "../../assets/images/miketalogo.png";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

interface ILogoProps {
  className?: string;
  small?: boolean;
}

const Logo: React.FC<ILogoProps> = ({ className, small }) => {
  return (
    <div
      className={classNames(
        styles["Logo"],
        { [styles["Logo-Small"]]: small },
        className
      )}
    >
      <NavLink to="/">
        <img src={logo} />
      </NavLink>
    </div>
  );
};

export { Logo };
