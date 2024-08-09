import classNames from "classnames";
import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../Spinner/Spinner";

interface IButtonProps {
  children: any;
  className?: string;
  tab?: boolean;
  icon?: boolean;
  huge?: boolean;
  light?: boolean;
  to?: string;
  disabled?: boolean;
  border?: boolean;
  loading?: boolean;
  absolute?: boolean;
  circle?: boolean;
  size?: number;
  onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({
  children,
  className,
  tab,
  onClick,
  icon = false,
  huge = false,
  light = false,
  disabled = false,
  border = false,
  loading,
  absolute = false,
  circle,
  size,
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
      onClick={disabled || loading ? undefined : handleClick}
      style={
        size !== undefined ? { width: `${size}px`, height: `${size}px` } : {}
      }
      className={classNames(
        styles["Button"],
        { relative: !absolute },
        { absolute: absolute },
        className,
        {
          [styles["Button-tab"]]: tab,
          [styles["Button-icon"]]: icon,
          [styles["Button-huge"]]: huge,
          [styles["Button-light"]]: light,
          [styles["Button-disabled"]]: disabled,
          [styles["Button-Border"]]: border,
          [styles["Button-Loading"]]: loading,
          [styles["Button-Circle"]]: circle,
        }
      )}
    >
      <Spinner loading={loading} size={huge ? 40 : 25}>
        {children}
      </Spinner>
    </button>
  );
};

export { Button };
