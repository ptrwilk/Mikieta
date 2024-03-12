import {
  Button,
  SelectTextInput,
  SelectionOption,
  TextInput,
} from "../../components";
import { BreadcrumbShared } from "../shared/BreadcrumbShared/BreadcrumbShared";
import styles from "./DeliveryView.module.css";
import { useInput } from "../../hooks";
import { useSelect } from "../../hooks/useSelect";
import { useNavigate } from "react-router-dom";

const DeliveryView = () => {
  const navigate = useNavigate();

  const notEmpty = {
    validate: (value?: string) => Boolean(value),
  };

  const street = useInput([notEmpty]);
  const city = useInput([notEmpty]);
  const zipCode = useInput([notEmpty]);
  const name = useInput([notEmpty]);
  const phone = useInput([notEmpty]);
  const delivery = useSelect([
    {
      validate: (value?: SelectionOption) => Boolean(value?.value),
    },
  ]);

  const inputs = [street, city, zipCode, name, phone, delivery];

  const handleMoveToPaymentClick = () => {
    let error = inputs.map((x) => x.checkError()).filter((x) => x).length > 0;

    if (!error) {
      navigate("/payment");
    }
  };

  return (
    <div className={styles["DeliveryView"]}>
      <BreadcrumbShared />
      <div className={styles["Inputs"]}>
        <TextInput caption="Ulica" placeholder="Jakaś 25" {...street} />
        <TextInput caption="Miasto" placeholder="Gliwice" {...city} />
        <TextInput
          caption="Kod pocztowy"
          placeholder="44-444"
          type="zip-code"
          {...zipCode}
        />
        <TextInput caption="Imię" placeholder="Janusz" {...name} />
        <TextInput
          caption="Numer telefonu"
          placeholder="514123456"
          type="phone"
          {...phone}
        />
        <SelectTextInput
          caption="Godzina dostawy"
          placeholder="00:00"
          items={[
            { index: 0, value: "00:30" },
            { index: 1, value: "01:00" },
            { index: 2, value: "01:30" },
            { index: 3, value: "02:00" },
            { index: 4, value: "02:30" },
            { index: 5, value: "03:00" },
            { index: 6, value: "03:30" },
            { index: 7, value: "04:00" },
            { index: 8, value: "04:30" },
            { index: 9, value: "05:00" },
          ]}
          {...delivery}
        />
      </div>
      <Button
        className={styles["Button"]}
        huge
        onClick={handleMoveToPaymentClick}
      >
        Przejdź do płatności
      </Button>
    </div>
  );
};

export { DeliveryView };
