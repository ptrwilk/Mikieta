import {
  Button,
  DateTimePicker,
  Section,
  TextArea,
  TextInput,
  Underline,
} from "@/components";
import styles from "./ReservationView.module.css";
import { useDateTimePicker, useInput, useTextArea } from "@/hooks";
import { SubHeader } from "@/components/SubHeader/SubHeader";

const ReservationView = () => {
  const REQUIRED_VALUE = "wartość wymagana";

  const reservation = useDateTimePicker(new Date());
  const numberOfPeople = useInput([
    {
      validate: (value) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
  ]);
  const phone = useInput([
    {
      validate: (value) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
  ]);
  const email = useInput([
    {
      validate: (value) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
  ]);
  const name = useInput([
    {
      validate: (value) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
  ]);
  const comments = useTextArea();

  const handleConfirm = () => {
    const inputs = [numberOfPeople, phone, email, name];

    if ([...inputs.map((x) => x.checkError())].filter((x) => x).length > 0) {
      //error
    } else {
      //success
    }
  };

  return (
    <Section className={styles["ReservationView"]}>
      <SubHeader
        title="ZAREZERWUJ STOLIK JUŻ TERAZ!"
        description="Wyślij do nas swoją rezerwację, potwierdzimy ją w ciągu 24h"
      />
      <p className="self-start mt-12">
        Potrzebujesz stolik na dzisiaj? Zadzwoń:{" "}
        <span className="font-bold">333 111 222</span>
      </p>
      <div className="flex flex-col gap-8 w-full mt-4">
        <DateTimePicker caption="Zarezerwuj stolik na" {...reservation} />
        <TextInput caption="Liczba osób" captionTop {...numberOfPeople} />
        <TextInput caption="Telefon" captionTop {...phone} />
        <TextInput caption="E-mail" captionTop {...email} />
        <TextInput caption="Imię i nazwisko" captionTop {...name} />
        <TextArea caption="Uwagi..." rows={3} {...comments} />
        <Button className="self-start" huge onClick={handleConfirm}>
          Wyślij rezerwację
        </Button>
      </div>
    </Section>
  );
};

export { ReservationView };
