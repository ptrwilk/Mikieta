import { Button, Section, TextInput } from "@/components";
import styles from "./DeliveryView.module.css";
import { SubHeader } from "@/components/SubHeader/SubHeader";
import { useInput } from "@/hooks";

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

  const handleConfirm = () => {
    const inputs = [street, homeNumber, city];
    if ([...inputs.map((x) => x.checkError())].filter((x) => x).length > 0) {
      //error
    } else {
      //success
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
      <Button className={styles["Button"]} huge onClick={handleConfirm}>
        Sprawdź
      </Button>
    </Section>
  );
};

export { DeliveryView };
