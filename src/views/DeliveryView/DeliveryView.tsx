import { Button, Message, Section, TextInput } from "@/components";
import styles from "./DeliveryView.module.css";
import { SubHeader } from "@/components/SubHeader/SubHeader";
import { useInput } from "@/hooks";
import { post } from "@/apihelper";
import { DeliveryCheckError, DeliveryModel } from "@/types";
import { useState } from "react";

const DeliveryView = () => {
  const REQUIRED_VALUE = "wartość wymagana";

  const street = useInput([
    {
      validate: (value) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
  ]);
  const homeNumber = useInput([
    {
      validate: (value) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
  ]);
  const city = useInput([
    {
      validate: (value) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
  ]);

  const [message, setMessage] = useState<
    { text: string; error: boolean } | undefined
  >();

  const handleConfirm = async () => {
    const inputs = [street, homeNumber, city];
    if ([...inputs.map((x) => x.checkError())].filter((x) => x).length > 0) {
      //error
    } else {
      const response = (await post("delivery/check", {
        street: street.value,
        homeNumber: homeNumber.value,
        city: city.value,
      } as DeliveryModel)) as boolean | DeliveryCheckError;

      if (typeof response !== "boolean") {
        setMessage({
          text: "Podany adres nie istnieje, lub nie jest wystarczająco dokładny",
          error: true,
        });
      } else {
        const canDeliver = response as boolean;

        if (canDeliver) {
          setMessage({
            //TODO: Create a ticket allowing to specify Cena dostawy
            text: "Dowozimy na twój adres. Cena dostawy: 4zł",
            error: false,
          });
        } else {
          setMessage({
            text: "Niestety nie dowozimy na podany adres. Skontakuj się z nami jeżeli masz wątpiwość: +44 333 111 222",
            error: true,
          });
        }
      }
    }
  };

  return (
    <Section className={styles["DeliveryView"]}>
      <SubHeader title="SPRAWDŹ GDZIE DOWOZIMY!" />
      <div className={styles["Form"]}>
        <TextInput caption="Ulica" star captionTop {...street} />
        <TextInput caption="Numer domu" star captionTop {...homeNumber} />
        <TextInput
          className={styles["City"]}
          caption="Miasto"
          star
          captionTop
          {...city}
        />
      </div>
      {message && (
        <Message
          className="mt-4 self-start"
          message={message.text}
          error={message.error}
        />
      )}
      <Button className={styles["Button"]} huge onClick={handleConfirm}>
        Sprawdź
      </Button>
    </Section>
  );
};

export { DeliveryView };
