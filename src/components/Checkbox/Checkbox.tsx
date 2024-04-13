import classNames from "classnames";
import styles from "./Checkbox.module.css";
import { FaCheck } from "react-icons/fa";

interface ICheckboxProps {
  className?: string;
  children?: any;
  checked?: boolean;
  error?: boolean;
  errorMessage?: string;
  onCheckChange?: (checked?: boolean) => void;
}

const Checkbox: React.FC<ICheckboxProps> = ({
  className,
  children,
  checked,
  error,
  errorMessage,
  onCheckChange,
}) => {
  return (
    <div
      className={classNames(className, styles["Checkbox"], {
        [styles["Checkbox-Error"]]: error,
      })}
    >
      <div
        className={styles["Content"]}
        onClick={() => onCheckChange?.(!checked)}
      >
        <div className={classNames(styles["Rectangle"])}>
          {checked && <FaCheck className={styles["Icon"]} size={16} />}
        </div>
        {children}
      </div>
      {errorMessage && error && (
        <p className={styles["ErrorMessage"]}>{errorMessage}</p>
      )}
    </div>
  );
};

export { Checkbox };
