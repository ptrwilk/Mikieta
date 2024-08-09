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
      <Button onClick={onMinusClick}>
        <FaMinus size={10} color="var(--color-sixth)" />
      </Button>
      {number}
      <Button onClick={onPlusClick}>
        <FaPlus size={10} color="var(--color-sixth)" />
      </Button>
    </div>
  );
};

export { Counter };
