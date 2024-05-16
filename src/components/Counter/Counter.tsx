import styles from "./Counter.module.css";
import { IncreaseButton } from "./IncreaseButton";
import DecreaseButton from "./DecreaseButton";

interface ICounterProps {
  number?: number;
  onMinusClick?: () => void;
  onPlusClick?: () => void;
}

const Counter: React.FC<ICounterProps> = ({
  number,
  onMinusClick,
  onPlusClick,
}) => {
  return (
    <div className={styles["Counter"]}>
      <DecreaseButton onClick={onMinusClick} />
      <span className="text-xs text-gray-400">{number}</span>
      <IncreaseButton onClick={onPlusClick} />
    </div>
  );
};

export { Counter };
