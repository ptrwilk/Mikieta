import { FaMinus, FaPlus } from "react-icons/fa";
import { Button } from "..";
import styles from "./Counter.module.css";

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
      <Button
        icon={true}
        className={styles["DecreaseButton"]}
        onClick={onMinusClick}
      >
        <FaMinus color="var(--color-sixth)" size={12} />
      </Button>
      <span className="text-xs text-gray-400">{number}</span>
      <Button
        icon={true}
        className={styles["IncreaseButton"]}
        onClick={onPlusClick}
      >
        <FaPlus size={12} />
      </Button>
    </div>
  );
};

export { Counter };
