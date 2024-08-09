import {
  Button,
  DateTimePicker,
  Section,
  TextArea,
  TextInput,
} from "@/components";
import styles from "./ReservationView.module.css";
import { useDateTimePicker, useInput, useTextArea } from "@/hooks";
import { validateEmail, validatePhone } from "@/hooks/types";
import { post } from "@/apihelper";
import { ReservationRequestModel } from "@/types";
import classNames from "classnames";
import { useState } from "react";
import { SubHeader } from "@/components/SubHeader/SubHeader";
import { useAppContext } from "@/context/AppContext";

const ReservationView = () => {
  const REQUIRED_VALUE = "wartość wymagana";

  const [app, updateApp] = useAppContext();
  const [thanksVisible, setThanksVisible] = useState(false);

  const reservation = useDateTimePicker(
    [
      {
        validate: (value: any) => !!value && value >= new Date(),
        errorMessage: "wymagana przyszła data",
      },
    ],
    new Date()
  );
  const numberOfPeople = useInput([
    {
      validate: (value: any) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
  ]);
  const phone = useInput([
    {
      validate: (value: any) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
    {
      validate: validatePhone,
      errorMessage: "nieprawidłowy format numeru telefonu",
    },
  ]);
  const email = useInput([
    {
      validate: (value: any) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
    {
      validate: validateEmail,
      errorMessage: "nieprawidłowy format adresu email",
    },
  ]);
  const name = useInput([
    {
      validate: (value: any) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
  ]);
  const comments = useTextArea();

  const handleConfirm = async () => {
    const inputs = [reservation, numberOfPeople, phone, email, name];

    if ([...inputs.map((x) => x.checkError())].filter((x) => x).length > 0) {
      //error
    } else {
      updateApp("loading", true);
      await post("reservation", {
        reservationDate: reservation.date,
        email: email.value,
        name: name.value,
        numberOfPeople: +numberOfPeople.value!,
        phone: phone.value,
        comments: comments.value,
      } as ReservationRequestModel);
      updateApp("loading", false);

      setThanksVisible(true);
    }
  };

  return (
    <Section
      className={classNames(
        { [styles["ReservationView"]]: !thanksVisible },
        { [styles["ReservationView-Thanks"]]: thanksVisible }
      )}
    >
      {thanksVisible ? (
        <>
          <h2 className="text-center">Dziekujemy za złożenie rezerwacji!</h2>
          <div className="max-w-[600px] mt-4">
            <p>
              Otrzymasz od nas informację zwrotną telefonicznie lub e-mailem w
              ciągu 24 godzin. Jeśli po tym czasie nie otrzymasz żadnej
              wiadomości, prosimy o kontakt pod numerem {app!.settings?.phone}{" "}
              lub adresem e-mail {app!.settings?.email}.
            </p>
          </div>
        </>
      ) : (
        <>
          <SubHeader
            title="ZAREZERWUJ STOLIK JUŻ TERAZ!"
            description="Wyślij do nas swoją rezerwację, potwierdzimy ją w ciągu 24h"
          />
          <p className="self-start mt-12">
            Potrzebujesz stolik na dzisiaj? Zadzwoń:{" "}
            <span className="font-bold">{app!.settings?.phone}</span>
          </p>
          <div className="flex flex-col gap-8 w-full mt-4">
            <DateTimePicker caption="Zarezerwuj stolik na" {...reservation} />
            <TextInput
              caption="Liczba osób"
              captionTop
              {...numberOfPeople}
              numeric
            />
            <TextInput caption="Telefon" captionTop {...phone} />
            <TextInput caption="E-mail" captionTop {...email} />
            <TextInput caption="Imię i nazwisko" captionTop {...name} />
            <TextArea caption="Uwagi..." rows={3} {...comments} />
            <Button
              className="self-start"
              huge
              onClick={handleConfirm}
              loading={app!.loading}
            >
              Wyślij rezerwację
            </Button>
          </div>
        </>
      )}
    </Section>
  );
};

export { ReservationView };
