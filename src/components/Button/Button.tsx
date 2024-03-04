import classNames from "classnames";
import styles from "./Button.module.css";

interface IButtonProps {
  children: any;
  className?: string;
  dark?: boolean;
  tab?: boolean;
  icon?: boolean;
  huge?: boolean;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({
  children,
  className,
  tab,
  onClick,
  dark = true,
  icon = false,
  huge = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles["Button"], className, {
        [styles["Button-light"]]: dark === false,
        [styles["Button-tab"]]: tab,
        [styles["Button-icon"]]: icon,
        [styles["Button-huge"]]: huge,
      })}
    >
      {children}
    </button>
  );
};

export { Button };
