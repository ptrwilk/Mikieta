import classNames from "classnames";
import { Button as ComponentButton } from "../Button/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface ICounterSecondProps {
  quantity: number;
  onDecrease?: () => void;
  onIncrease?: () => void;
}

const CounterSecond: React.FC<ICounterSecondProps> = ({
  quantity,
  onDecrease,
  onIncrease,
}) => {
  const Button = ({
    children,
    disabled,
    onClick,
  }: {
    children: any;
    disabled?: boolean;
    onClick?: () => void;
  }) => {
    return (
      <ComponentButton
        onClick={onClick}
        disabled={disabled}
        className={classNames(
          "bg-[var(--color-eight)] text-[var(--color-black)]"
        )}
      >
        {children}
      </ComponentButton>
    );
  };

  return (
    <div className="flex items-center gap-4">
      <Button disabled={quantity <= 1} onClick={onDecrease}>
        <FaMinus />
      </Button>
      <p className="font-semibold">{quantity}</p>
      <Button onClick={onIncrease}>
        <FaPlus />
      </Button>
    </div>
  );
};

export { CounterSecond };
