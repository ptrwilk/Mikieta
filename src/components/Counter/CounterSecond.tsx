import classNames from "classnames";
import { Button as ComponentButton } from "../Button/Button";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface ICounterSecondProps {
  className?: string;
  quantity?: number;
  disabled?: boolean;
  minValue?: number;
  minValueVisilbe?: boolean;
  onDecrease?: () => void;
  onIncrease?: () => void;
}

const CounterSecond: React.FC<ICounterSecondProps> = ({
  className,
  quantity = 0,
  minValue = 1,
  minValueVisilbe = true,
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

  const visible = minValueVisilbe || (!minValueVisilbe && quantity > minValue);

  return (
    <div className={classNames(className, "flex items-center gap-4")}>
      {visible && (
        <>
          <Button disabled={quantity <= minValue} onClick={onDecrease}>
            <FaMinus />
          </Button>
          <p className="font-semibold">{quantity}</p>
        </>
      )}
      <Button onClick={onIncrease}>
        <FaPlus />
      </Button>
    </div>
  );
};

export { CounterSecond };
