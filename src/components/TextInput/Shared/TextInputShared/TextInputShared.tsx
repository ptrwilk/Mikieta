import classNames from "classnames";
import styles from "./TextInputShared.module.css";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";

interface ITextInputSharedProps {
  children?: any;
  className?: string;
  placeholder?: string;
  caption?: string;
  captionTop?: boolean;
  value?: string;
  error?: boolean;
  errorMessage?: string;
  star?: boolean;
  numeric?: boolean;
  onValueChange?: (value: string | undefined) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: any) => void;
  onErrorChange?: (error: boolean) => void;
}

const TextInputShared: React.FC<ITextInputSharedProps> = ({
  className,
  placeholder,
  caption,
  captionTop,
  value,
  error,
  errorMessage,
  star,
  numeric,
  onValueChange,
  onBlur,
  onFocus,
  onKeyDown,
  onErrorChange,
}) => {
  useEffect(() => {
    onErrorChange?.(error ?? false);
  }, [error]);

  return (
    <div
      className={classNames(className, styles["TextInputShared"], {
        [styles["TextInputShared-Top"]]: captionTop,
      })}
    >
      <p
        className={classNames(styles["Caption"], {
          [styles["Caption-Error"]]: error,
        })}
      >
        {caption}
        {star && <span className={styles["Star"]}>*</span>}
      </p>
      <Input
        type={numeric ? "number" : "text"}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onValueChange?.(e.target.value as string)}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
      {errorMessage && error && (
        <p className={styles["ErrorMessage"]}>{errorMessage}</p>
      )}
    </div>
  );
};

export { TextInputShared };
