import styles from "./Counter.module.css";
import { IncreaseButton } from "./IncreaseButton";
import DecreaseButton from "./DecreaseButton";

interface ICounterProps {
  quantity?: number;
  onMinusClick?: () => void;
  onPlusClick?: () => void;
}

const Counter: React.FC<ICounterProps> = ({
  quantity: quantity,
  onMinusClick,
  onPlusClick,
}) => {
  return (
    <div className={styles["Counter"]}>
      <DecreaseButton onClick={onMinusClick} />
      <span className="text-xs text-gray-400">
        <div className={styles["CounterQuantity"]}>{quantity}</div>
      </span>
      <IncreaseButton onClick={onPlusClick} />
    </div>
  );
};

export { Counter };
