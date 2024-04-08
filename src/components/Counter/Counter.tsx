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
      <Button className={styles["DecreaseButton"]} onClick={onMinusClick}>
        <FaMinus size={8} color="var(--color-sixth)" />
      </Button>
      <span className="text-xs">{number}</span>
      <Button className={styles["IncreaseButton"]} onClick={onPlusClick}>
        <FaPlus size={8} />
      </Button>
    </div>
  );
};

export { Counter };
