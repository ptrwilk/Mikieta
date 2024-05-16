import React from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "..";
import styles from "./IncreaseButton.module.css";

interface IIncreaseButtonProps {
  onClick?: () => void;
}

const IncreaseButton: React.FC<IIncreaseButtonProps> = ({ onClick }) => {
  return (
    <Button icon={true} className={styles["IncreaseButton"]} onClick={onClick}>
      <FaPlus size={12} />
    </Button>
  );
};

export { IncreaseButton };
