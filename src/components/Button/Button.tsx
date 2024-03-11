import classNames from "classnames";
import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";

interface IButtonProps {
  children: any;
  className?: string;
  dark?: boolean;
  tab?: boolean;
  icon?: boolean;
  huge?: boolean;
  light?: boolean;
  to?: string;
  disabled?: boolean;
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
  light = false,
  disabled = false,
  to,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }

    onClick?.();
  };

  return (
    <button
      onClick={disabled ? undefined : handleClick}
      className={classNames(styles["Button"], className, {
        [styles["Button-light"]]: dark === false,
        [styles["Button-tab"]]: tab,
        [styles["Button-icon"]]: icon,
        [styles["Button-huge"]]: huge,
        //TODO: refactor this
        [styles["Button-light2"]]: light,
        [styles["Button-disabled"]]: disabled,
      })}
    >
      {children}
    </button>
  );
};

export { Button };
