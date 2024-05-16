import React from "react";
import { FaMinus } from "react-icons/fa";
import { Button } from "..";
import styles from "./Counter.module.css";

interface IDecreaseButtonProps {
  onClick?: () => void;
}

const IncreaseButton: React.FC<IDecreaseButtonProps> = ({ onClick }) => {
  return (
    <Button icon={true} className={styles["DecreaseButton"]} onClick={onClick}>
      <FaMinus color="var(--color-sixth)" size={12} />
    </Button>
  );
};

export default IncreaseButton;
