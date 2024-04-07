import styles from "./ModalRadio.module.css";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ModalRadioProps {
  options: Array<{ value: string; label: string }>;
  selectedValue: any;
  onValueChange: (value: any) => void;
}

const ModalRadio: React.FC<ModalRadioProps> = ({
  options,
  selectedValue,
  onValueChange,
}) => {
  return (
    <RadioGroup defaultValue={selectedValue} onValueChange={onValueChange}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center space-x-2 ${styles.RadioItem} ${
            selectedValue === option.value ? styles.selected : ""
          }`}
        >
          <RadioGroupItem value={option.value} id={`radio-${option.value}`} />
          <span>{option.label}</span>
        </label>
      ))}
    </RadioGroup>
  );
};

export { ModalRadio };
