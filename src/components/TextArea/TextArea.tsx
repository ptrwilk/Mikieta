import { Textarea } from "../ui/textarea";
import styles from "./TextArea.module.css";

interface ITextAreaProps {
  caption?: string;
  rows?: number;
  value?: string;
  onValueChange?: (value: string | undefined) => void;
}

const TextArea: React.FC<ITextAreaProps> = ({
  caption,
  rows = 5,
  value,
  onValueChange,
}) => {
  return (
    <div className={styles["TextArea"]}>
      {caption && <p className={styles["Caption"]}>{caption}</p>}
      <Textarea
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onValueChange?.(e.target.value as string)}
      />
    </div>
  );
};

export { TextArea };
