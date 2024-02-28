import classNames from "classnames";
import styles from "./Button.module.css";

interface IButtonProps {
  children: any;
  dark?: boolean;
}

const Button: React.FC<IButtonProps> = ({ children, dark = true }) => {
  return (
    <button
      className={classNames(styles["Button"], {
        [styles["Button-light"]]: dark === false,
      })}
    >
      {children}
    </button>
  );
};

export { Button };
