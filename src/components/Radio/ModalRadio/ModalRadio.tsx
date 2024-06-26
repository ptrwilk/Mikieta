import classNames from "classnames";
import styles from "./ModalRadio.module.css";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Option = {
  value: string;
  label: string;
  child?: any;
  description?: string;
};

interface ModalRadioProps {
  options?: Option[];
  className?: string;
  selectedValue: any;
  border?: boolean;
  caption?: string;
  captionBold?: boolean;
  childRight?: boolean;
  childAlwaysVisible?: boolean;
  error?: boolean;
  errorMessage?: string;
  errorValues?: string[];
  star?: boolean;
  onValueChange: (value: any) => void;
}

const ModalRadio: React.FC<ModalRadioProps> = ({
  options,
  className,
  selectedValue,
  border,
  caption,
  captionBold,
  childRight,
  childAlwaysVisible,
  error,
  errorMessage,
  errorValues,
  star,
  onValueChange,
}) => {
  return (
    <RadioGroup
      className={classNames(styles["RadioGroup"], className)}
      value={selectedValue}
      onValueChange={onValueChange}
    >
      {caption && (
        <p className={classNames({ "font-semibold": captionBold })}>
          {caption}
          {star && <span className={styles["Star"]}>*</span>}
        </p>
      )}
      {options?.map((option) => (
        <label
          key={option.value}
          className={classNames(styles["Label"], {
            [styles["Label-WithChild"]]: !!option.child,
            [styles["Label-Border"]]: border,
            [styles["Label-Selected"]]:
              border && selectedValue === option.value,
            [styles["Label-Error"]]:
              border && (error || errorValues?.some((x) => x === option.value)),
          })}
        >
          <RadioGroupItem
            value={option.value}
            id={`radio-${option.value}`}
            className={classNames({
              [styles["RadioItem-Error"]]:
                !border &&
                (error || errorValues?.some((x) => x === option.value)),
            })}
          />
          <div className="relative">
            <span>{option.label}</span>
            <p className="absolute font-light text-xs bottom-[-15px]">
              {option.description}
            </p>
          </div>
          {option.child &&
            (childAlwaysVisible || selectedValue === option.value) && (
              <div
                className={classNames(
                  { [styles["Child"]]: !childRight },
                  { [styles["Child-Right"]]: childRight }
                )}
              >
                {option.child}
              </div>
            )}
        </label>
      ))}
      {errorMessage && (error || (errorValues?.length ?? 0) > 0) && (
        <p className={styles["ErrorMessage"]}>{errorMessage}</p>
      )}
    </RadioGroup>
  );
};

export { ModalRadio };
