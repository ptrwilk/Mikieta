import classNames from "classnames";
import styles from "./TextInputShared.module.css";
import { useEffect } from "react";

interface ITextInputSharedProps {
  children?: any;
  className?: string;
  placeholder?: string;
  caption?: string;
  value?: string;
  error?: boolean;
  onValueChange?: (value: string | undefined) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: any) => void;
  onErrorChange?: (error: boolean) => void;
}

const TextInputShared: React.FC<ITextInputSharedProps> = ({
  children,
  className,
  placeholder,
  caption,
  value,
  error,
  onValueChange,
  onBlur,
  onFocus,
  onKeyDown,
  onErrorChange,
}) => {
  useEffect(() => {
    onErrorChange?.(error ?? false);
  }, [error]);

  const inputElement = (
    <input
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onValueChange?.(e.target.value as string)}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    ></input>
  );

  return (
    <div
      className={classNames(className, styles["TextInputShared"], {
        [styles["TextInputShared-error"]]: error,
      })}
    >
      {caption && <p className={styles["Caption"]}>{caption}</p>}
      {children ? (
        <div className={styles["Input-Wrapper"]}>
          {inputElement}
          {children}
        </div>
      ) : (
        inputElement
      )}
    </div>
  );
};

export { TextInputShared };
