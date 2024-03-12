import { forwardRef, useState } from "react";
import { Button, Radio } from "..";
import styles from "./PaymentOptions.module.css";
import classNames from "classnames";

interface IPaymentOptionsProps {
  className?: string;
  style?: any;
}

const PaymentOptions = forwardRef<any, IPaymentOptionsProps>(
  ({ className, style }, ref) => {
    const [selectedRadioIndex, setSelectedRadioIndex] = useState<
      number | undefined
    >(undefined);

    const radios = [
      { index: 0, text: "Odbiór osobisty" },
      { index: 1, text: "Płatność gotówką przy odbiorze" },
      { index: 2, text: "Płatność z góry Blikiem" },
    ];

    const handleRadioChecked = (index: number) => {
      setSelectedRadioIndex(index);
    };

    return (
      <div
        ref={ref}
        className={classNames(styles["PaymentOptions"], className)}
        style={style}
      >
        <h3>Opcje Płatności</h3>
        <ul className={styles["Radios"]}>
          {radios.map(({ index, text }, key) => (
            <li key={key}>
              <Radio
                text={text}
                checked={selectedRadioIndex === index}
                onChecked={() => handleRadioChecked(index)}
              />
            </li>
          ))}
        </ul>
        <Button className={styles["Button"]} huge>
          Zatwierdź
        </Button>
      </div>
    );
  }
);

export { PaymentOptions };
