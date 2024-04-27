import classNames from "classnames";
import styles from "./ModalRadio.module.css";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ModalRadioProps {
  options?: Array<{ value: string; label: string; child?: any }>;
  selectedValue: any;
  border?: boolean;
  caption?: string;
  error?: boolean;
  errorMessage?: string;
  errorValues?: string[];
  star?: boolean;
  onValueChange: (value: any) => void;
}

const ModalRadio: React.FC<ModalRadioProps> = ({
  options,
  selectedValue,
  border,
  caption,
  error,
  errorMessage,
  errorValues,
  star,
  onValueChange,
}) => {
  return (
    <RadioGroup
      className={styles["RadioGroup"]}
      value={selectedValue}
      onValueChange={onValueChange}
    >
      {caption && (
        <p>
          {caption}
          {star && <span className={styles["Star"]}>*</span>}
        </p>
      )}
      {options?.map((option) => (
        <label
          key={option.value}
          className={classNames(styles["Label"], {
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
          <span>{option.label}</span>
          {option.child && selectedValue === option.value && (
            <div className={styles["Child"]}>{option.child}</div>
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
