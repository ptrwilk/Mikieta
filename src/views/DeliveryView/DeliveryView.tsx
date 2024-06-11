import { Button, Section, TextInput } from "@/components";
import styles from "./DeliveryView.module.css";
import { SubHeader } from "@/components/SubHeader/SubHeader";
import { useInput } from "@/hooks";
import { post } from "@/apihelper";
import { DeliveryModel, DeliveryResponseModel } from "@/types";
import { useState } from "react";
import { DeliveryMessage } from "../shared/DeliveryMessage";
import { useAppContext } from "@/context/AppContext";

const DeliveryView = () => {
  const REQUIRED_VALUE = "wartość wymagana";

  const [app, updateApp] = useAppContext();

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

  const [message, setMessage] = useState<DeliveryResponseModel | undefined>();

  const handleConfirm = async () => {
    const inputs = [street, homeNumber, city];
    if ([...inputs.map((x) => x.checkError())].filter((x) => x).length > 0) {
      //error
    } else {
      updateApp("loading", true);
      const response = (await post("delivery/check", {
        street: street.value,
        homeNumber: homeNumber.value,
        city: city.value,
      } as DeliveryModel)) as DeliveryResponseModel;
      updateApp("loading", false);

      setMessage(response);
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
          caption="Miejscowość"
          star
          captionTop
          {...city}
        />
      </div>
      <DeliveryMessage className="mt-4 self-start" message={message} />
      <Button
        className={styles["Button"]}
        huge
        onClick={handleConfirm}
        loading={app!.loading}
      >
        Sprawdź
      </Button>
    </Section>
  );
};

export { DeliveryView };
