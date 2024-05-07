import styles from "./Logo.module.css";
import logo from "../../assets/images/miketalogo.png";
import classNames from "classnames";

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
      <a href="">
        <img src={logo} />
      </a>
    </div>
  );
};

export { Logo };
