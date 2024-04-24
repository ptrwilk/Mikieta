import {
  Button,
  Checkbox,
  Combobox,
  ModalRadio,
  Section,
  Switch,
  TextArea,
  TextInput,
} from "@/components";
import styles from "./CheckoutView.module.css";
import { useEffect, useState } from "react";
import {
  useCheckbox,
  useCombobox,
  useInput,
  useRadio,
  useTextArea,
} from "@/hooks";
import { useAppContext } from "@/context/AppContext";
import { convertTimeToDate, getEnumValue, sum } from "@/helpers";
import { comboBoxOpeningHours } from "@/const";
import { FaShoppingCart } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { DeliveryMethod, OrderRequestModel, PaymentMethod } from "@/types";
import { post } from "@/apihelper";
import { validateEmail, validatePhone } from "@/hooks/types";

enum DeliveryTimingOption {
  RightAway = "RightAway",
  HourSelection = "HourSelection",
}

const CheckoutView = () => {
  const [app, updateApp] = useAppContext();

  const isSmall = useMediaQuery({
    query: "(min-width: 650px)",
  });

  const [commentsVisible, setCommentsVisible] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const REQUIRED_VALUE = "wartość wymagana";

  const openingHours = useCombobox(comboBoxOpeningHours);
  const deliveryTiming = useRadio(
    [
      {
        validate: (value) => !!value,
        errorMessage: REQUIRED_VALUE,
      },
      {
        validateZomo: (value) =>
          value === DeliveryTimingOption.HourSelection && !openingHours.value
            ? [DeliveryTimingOption.HourSelection]
            : [],
        errorMessage: "godzina jest wymagana",
      },
    ],
    [
      { label: "Jak najszybciej", value: DeliveryTimingOption.RightAway },
      {
        label: "Wybierz godzinę",
        value: DeliveryTimingOption.HourSelection,
        child: <Combobox {...openingHours} />,
      },
    ],
    openingHours.value
  );

  const deliveryMethod = useRadio(
    [
      {
        validate: (value) => !!value,
        errorMessage: REQUIRED_VALUE,
      },
    ],
    [
      {
        label: "Dostawa",
        value: DeliveryMethod.Delivery,
      },
      {
        label: "Odbiór własny",
        value: DeliveryMethod.TakeAway,
      },
      {
        label: "Zjem na miejscu",
        value: DeliveryMethod.DinningIn,
      },
    ]
  );

  const [paymentSwitched, setPaymentSwitched] = useState(true);
  const paymentMethod = useRadio(
    [
      {
        validate: (value) => !!value,
        errorMessage: REQUIRED_VALUE,
      },
    ],
    [
      {
        label: "Blik",
        value: PaymentMethod.Blik,
      },
      {
        label: "Google Pay",
        value: PaymentMethod.GooglePay,
      },
    ]
  );

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
  const flatNumber = useInput();
  const floor = useInput();

  const name = useInput(
    [
      {
        validate: (value) => !!value,
        errorMessage: REQUIRED_VALUE,
      },
      {
        validate: (value) => /^\w+ \w+$/.test(value ?? ""),
        errorMessage: "jest nieprawidłowe",
      },
    ],
    app!.order.person.name,
    (value) =>
      updateApp("order", { person: { ...app!.order.person, name: value } })
  );

  const phone = useInput(
    [
      {
        validate: (value) => !!value,
        errorMessage: REQUIRED_VALUE,
      },
      {
        validate: validatePhone,
        errorMessage: "nieprawidłowy format numeru telefonu",
      },
    ],
    app!.order.person.phone,
    (value) =>
      updateApp("order", { person: { ...app!.order.person, phone: value } })
  );

  const email = useInput(
    [
      {
        validate: (value) => !!value,
        errorMessage: REQUIRED_VALUE,
      },
      {
        validate: validateEmail,
        errorMessage: "nieprawidłowy format adresu email",
      },
    ],
    app!.order.person.email,
    (value) =>
      updateApp("order", { person: { ...app!.order.person, email: value } })
  );

  const invoiceNeeded = useCheckbox();
  const nip = useInput([
    {
      validate: (value) => !!value,
      errorMessage: REQUIRED_VALUE,
    },
  ]);

  const rules = useCheckbox([
    {
      validate: (value) => value === true,
      errorMessage: "zaznacz zgodę",
    },
  ]);

  const byEmail = useCheckbox();
  const bySmsEtc = useCheckbox();

  const comments = useTextArea();

  useEffect(() => {
    if (name.value && phone.value && email.value) {
      name.checkError();
    }
  }, []);

  const handleConfirm = async () => {
    const inputs = [
      paymentMethod,
      deliveryTiming,
      deliveryMethod,
      name,
      phone,
      email,
      rules,
    ];

    const residence = [street, homeNumber, city];

    if (
      [
        ...inputs.map((x) => x.checkError()),
        invoiceNeeded.checked && nip.checkError(),
        ...residence.map(
          (x) =>
            deliveryMethod.selectedValue === DeliveryMethod.Delivery &&
            x.checkError()
        ),
      ].filter((x) => x).length > 0
    ) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);

      await post("order", {
        productIds: app!.basket.map((x) => x.id),
        deliveryTiming:
          deliveryTiming.selectedValue === DeliveryTimingOption.HourSelection
            ? convertTimeToDate(openingHours.value)
            : null,
        deliveryRightAway:
          deliveryTiming.selectedValue === DeliveryTimingOption.RightAway,
        deliveryMethod: getEnumValue(
          DeliveryMethod,
          deliveryMethod.selectedValue!
        ),
        paymentMethod: getEnumValue(
          PaymentMethod,
          paymentMethod.selectedValue!
        ),
        comments: comments.value,
        name: name.value,
        phone: phone.value,
        email: email.value,
        nip: nip.value,
        street: street.value,
        homeNumber: homeNumber.value,
        city: city.value,
        flatNumber: flatNumber.value,
        floor: floor.value,
        processingPersonalData:
          byEmail.checked || bySmsEtc.checked
            ? {
                email: byEmail.checked,
                sms: bySmsEtc.checked,
              }
            : null,
      } as OrderRequestModel);

      console.log("succcess");
    }
  };

  const OrderButton = () => (
    <Button className="w-full mt-6" huge onClick={handleConfirm}>
      Zamów i zapłać{" "}
      {sum(app!.basket.map((x) => x.quantity * x.price)).toFixed(2)} zł
    </Button>
  );

  return (
    <Section className={styles["CheckoutView"]}>
      <div className={styles["ContentForm"]}>
        <h4>Opcje realizacji</h4>
        <div className="flex flex-col gap-8 mt-2">
          <ModalRadio star border caption="Zamówienie na" {...deliveryTiming} />
          <Switch
            defaultSwitched={!deliveryMethod.selectedValue}
            star
            caption="Sposób realizacji"
            content={
              <p className="font-medium">
                {deliveryMethod.selectedValue === DeliveryMethod.Delivery
                  ? "Dostawa"
                  : deliveryMethod.selectedValue === DeliveryMethod.TakeAway
                  ? "Odbiór własny"
                  : "Zjem na miejscu"}
              </p>
            }
          >
            <ModalRadio border {...deliveryMethod}></ModalRadio>
          </Switch>
          {deliveryMethod.selectedValue === DeliveryMethod.Delivery && (
            <div className="grid grid-cols-1 gap-8">
              <div className="grid grid-cols-[1fr_150px] gap-8">
                <TextInput caption="Ulica" captionTop star {...street} />
                <TextInput
                  caption="Numer domu"
                  captionTop
                  star
                  {...homeNumber}
                />
              </div>
              <TextInput caption="Miasto" captionTop star {...city} />
              <div className="grid grid-cols-2 gap-8">
                <TextInput
                  caption="Numer mieszkania"
                  captionTop
                  {...flatNumber}
                />
                <TextInput caption="Piętro" captionTop {...floor} />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p>Uwagi do zamówienia</p>
            {!commentsVisible ? (
              <p
                className={styles["AddComments"]}
                onClick={() => setCommentsVisible(true)}
              >
                + Dodaj uwagi
              </p>
            ) : (
              <>
                <TextArea rows={5} {...comments} />
                <p className="text-right text-sm">Max 225 znaków</p>
              </>
            )}
          </div>
          <Switch
            switched={paymentSwitched}
            caption="Sposób płatności"
            captionHuge
            content={
              <p>
                {paymentMethod.selectedValue === PaymentMethod.Blik
                  ? "Blik"
                  : "Google Pay"}
              </p>
            }
            onSwitchChange={() => setPaymentSwitched((prev) => !prev)}
          >
            <div className="mt-2" onClick={() => setPaymentSwitched(false)}>
              <ModalRadio
                border
                {...paymentMethod}
                onValueChange={(value) => {
                  paymentMethod.onValueChange(value);
                  setPaymentSwitched(false);
                }}
              />
            </div>
          </Switch>
          <Switch
            defaultSwitched={
              !name.value ||
              name.error ||
              !phone.value ||
              phone.error ||
              !email.value ||
              email.error
            }
            caption="Dane kontaktowe"
            captionHuge
            content={
              <div>
                <p className={"font-bold"}>{name.value}</p>
                <p>{phone.value}</p>
                <p>{email.value}</p>
              </div>
            }
          >
            <div className="flex flex-col gap-8">
              <TextInput star captionTop caption="Imię i nazwisko" {...name} />
              <TextInput star captionTop caption="Tel. komórkowy" {...phone} />
              <TextInput star captionTop caption="Email" {...email} />
            </div>
          </Switch>
          <div className="flex flex-col gap-4">
            <Checkbox {...invoiceNeeded}>
              <p>Potrzebuję faktury</p>
            </Checkbox>
            {invoiceNeeded.checked && (
              <TextInput star captionTop caption="Numer NIP" {...nip} />
            )}
          </div>
          <hr />
          <div className="flex flex-col gap-4">
            <Checkbox {...rules}>
              <p>
                Potwierdzam zapoznanie się z treścią{" "}
                <a className={styles["Link"]}>Regulaminu</a> oraz{" "}
                <a className={styles["Link"]}>Polityki prywatności</a>.
                <span className={styles["Star"]}>*</span>
              </p>
            </Checkbox>
            <Checkbox
              checked={byEmail.checked || bySmsEtc.checked}
              onCheckChange={(checked) => {
                byEmail.setChecked(checked);
                bySmsEtc.setChecked(checked);
              }}
            >
              <p>
                (opcjonalnie) Zgadzam się na przetwarzanie moich danych
                osobowych w celu marketingu produktów i usług własnych oraz
                podmiotów współpracujących.{" "}
                <a className={styles["Link"]}>
                  Pokaż informacje o przetwarzaniu
                </a>
                .
              </p>
            </Checkbox>
            <Checkbox className="ml-12" {...byEmail}>
              <p>Za pośrednictwem email</p>
            </Checkbox>
            <Checkbox className="ml-12" {...bySmsEtc}>
              <p>Za pośrednictwem połączeń telefonicznych i SMS / MMS</p>
            </Checkbox>
          </div>
        </div>
        {!isSmall && <OrderButton />}
      </div>
      <div className={styles["ContentBasket"]}>
        <div className="flex items-center justify-between">
          <h4>Koszyk</h4>
          <p className={styles["Change"]}>(Zmień)</p>
        </div>
        {app!.basket.length === 0 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <FaShoppingCart size={22} color="var(--color-sixth)" />
            <p style={{ color: "var(--color-sixth)", fontWeight: 500 }}>
              Koszyk jest pusty
            </p>
          </div>
        )}
        <ul className={styles["Products"]}>
          {app!.basket.map(({ name, price, quantity }, key) => (
            <li key={key}>
              <p>{quantity > 1 ? `${quantity}x ${name}` : name}</p>
              <p className="flex-shrink-0">
                {(price * quantity).toFixed(2)} zł
              </p>
            </li>
          ))}
        </ul>
        {isSmall && (
          <>
            <hr className="mt-8" />
            {showErrorMessage && (
              <div className={styles["ErrorMessage"]}>
                <p>Popraw dane w formularzu!</p>
              </div>
            )}
            <OrderButton />
          </>
        )}
      </div>
    </Section>
  );
};

export { CheckoutView };
