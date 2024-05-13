import React, { PropsWithChildren } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
      className={`rounded-3xl ${
        disabled
          ? "text-muted"
          : "text-secondary hover:bg-destructive hover:text-white duration-200 delay-80 "
      }`}
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
      className={`rounded-3xl ${
        disabled
          ? "text-muted"
          : "text-secondary hover:bg-destructive hover:text-white duration-200 delay-80 "
      }`}
    >
      <FaAngleRight size={25} />
    </button>
  );
};
