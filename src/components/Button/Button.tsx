import classNames from "classnames";
import styles from "./Button.module.css";

interface IButtonProps {
  children: any;
  dark?: boolean;
  tab?: boolean;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({
  children,
  tab,
  onClick,
  dark = true,
}) => {
  return (
    <button
      onClick={onClick}
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
