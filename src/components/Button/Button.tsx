import classNames from "classnames";
import styles from "./Button.module.css";

interface IButtonProps {
  children: any;
  dark?: boolean;
  tab?: boolean;
}

const Button: React.FC<IButtonProps> = ({ children, tab, dark = true }) => {
  return (
    <button
      className={classNames(styles["Button"], {
        [styles["Button-light"]]: dark === false,
        [styles["Button-tab"]]: tab,
      })}
    >
      {children}
    </button>
  );
};

export { Button };
