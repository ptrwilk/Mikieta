import React, { PropsWithChildren } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "./CarouselButtons.module.css";

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const PrevButton: React.FC<PropType> = (props) => {
  const { disabled, onClick } = props;

  return (
    <button
      type="button"
      className={styles["CarouselButton"]}
      disabled={disabled}
      onClick={onClick}
    >
      <FaAngleLeft size={25} />
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { disabled, onClick } = props;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={styles["CarouselButton"]}
    >
      <FaAngleRight size={25} />
    </button>
  );
};
