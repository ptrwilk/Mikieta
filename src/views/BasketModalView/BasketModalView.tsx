import { FaShoppingBasket, FaWindowClose } from "react-icons/fa";
import {
  BasketItem,
  Button,
  Combobox,
  Divider,
  Modal,
  ModalRadio,
  TextInput,
} from "../../components";
import { useAppContext } from "../../context/AppContext";
import styles from "./BasketModalView.module.css";
import { FC, useEffect, useState } from "react";
import { DeliveryMethod, DeliveryTimingOption, PizzaModel } from "@/types";
import { useCombobox, useInput, useRadio } from "@/hooks";
import { comboBoxOpeningHours } from "@/const";
import { useNavigate } from "react-router-dom";
import { productToPrice } from "@/helpers";

const BasketModalView: FC = () => {
  const [app, updateApp] = useAppContext();

  const navigate = useNavigate();

  const REQUIRED_VALUE = "wartość wymagana";

  const deliveryTiming = useRadio(
    [
      {
        validate: (value) => !!value,
        errorMessage: REQUIRED_VALUE,
      },
    ],
    [
      { value: DeliveryTimingOption.RightAway, label: "Jak najszybciej" },
      { value: DeliveryTimingOption.HourSelection, label: "Na godzinę..." },
    ],
    undefined,
    app!.order.deliveryTiming,
    (value) =>
      updateApp("order", {
        ...app!.order,
        deliveryTiming: value as any,
      })
  );
  const deliveryMethod = useRadio(
    [
      {
        validate: (value) => !!value,
        errorMessage: REQUIRED_VALUE,
      },
    ],
    [
      { value: DeliveryMethod.Delivery, label: "Dostawa" },
      { value: DeliveryMethod.TakeAway, label: "Odbiór własny" },
      { value: DeliveryMethod.DinningIn, label: "Zjem na miejscu" },
    ],
    undefined,
    app!.order.deliveryMethod,
    (value) =>
      updateApp("order", {
        ...app!.order,
        deliveryMethod: value as any,
      })
  );

  const openingHours = useCombobox(
    [
      {
        validate: (value) =>
          !!value ||
          deliveryTiming.selectedValue === DeliveryTimingOption.RightAway,
        errorMessage: REQUIRED_VALUE,
      },
    ],
    comboBoxOpeningHours,
    app!.order.openingHour,
    (value) =>
      updateApp("order", {
        ...app!.order,
        openingHour: value,
      })
  );

  const street = useInput(
    [
      {
        validate: (value) =>
          !!value || deliveryMethod.selectedValue !== DeliveryMethod.Delivery,
        errorMessage: REQUIRED_VALUE,
      },
    ],
    app!.order.street,
    (value) =>
      updateApp("order", {
        ...app!.order,
        street: value,
      })
  );

  const houseNumber = useInput(
    [
      {
        validate: (value) =>
          !!value || deliveryMethod.selectedValue !== DeliveryMethod.Delivery,
        errorMessage: REQUIRED_VALUE,
      },
    ],
    app!.order.houseNumber,
    (value) =>
      updateApp("order", {
        ...app!.order,
        houseNumber: value,
      })
  );

  const deliveryCities = useCombobox(
    [
      {
        validate: (value) =>
          !!value || deliveryMethod.selectedValue !== DeliveryMethod.Delivery,
        errorMessage: REQUIRED_VALUE,
      },
    ],
    [
      { value: "Czerwionka", label: "Czerwionka" },
      { value: "Leszczyny", label: "Leszczyny" },
      { value: "Rybnik", label: "Rybnik" },
    ],
    app!.order.deliveryCity,
    (value) =>
      updateApp("order", {
        ...app!.order,
        deliveryCity: value,
      })
  );

  const [isBasketEmpty, setIsBasketEmpty] = useState(true);

  useEffect(() => {
    setIsBasketEmpty(app?.basket.length === 0);
  }, [app?.basket.length]);

  const closeModal = () => {
    updateApp("basketModalOpen", false);
  };

  const handleClearBasket = () => {
    updateApp("basket", []);
  };

  const addItem = (item: PizzaModel) => {
    const updatedBasket: PizzaModel[] = app!.basket.map((product) => {
      if (item.id === product.id) {
        return { ...product, quantity: product.quantity! + 1 };
      }
      return product;
    });

    updateApp("basket", updatedBasket);
  };

  const removeItem = (item: PizzaModel) => {
    const updatedBasket = app!.basket.reduce(
      (basket: PizzaModel[], product) => {
        if (item.id === product.id) {
          if (product.quantity! > 1) {
            basket.push({ ...product, quantity: product.quantity! - 1 });
          }
        } else {
          basket.push(product);
        }
        return basket;
      },
      []
    );

    updateApp("basket", updatedBasket);
  };

  const handleConfirm = () => {
    const inputs = [
      openingHours,
      deliveryTiming,
      deliveryMethod,
      street,
      houseNumber,
      deliveryCities,
    ];
    if ([...inputs.map((x) => x.checkError())].filter((x) => x).length > 0) {
    } else {
      closeModal();
      navigate("/kasa");
    }
  };

  return (
    <Modal open={app!.basketModalOpen} onClose={closeModal}>
      <div className={styles["BasketModalView"]}>
        <img src="https://przepis3.umcs.stronazen.pl/wp-content/uploads/2023/12/zdrowa_pizza_przepis_justbefit_8-1-e1701706553588.webp" />
        <div className={styles["Content"]}>
          <div className={styles["ScrollableContent"]}>
            <div className={styles["Header"]}>
              <div className="flex items-center px-1 gap-3">
                <p className={styles["Title"]}>Koszyk</p>
                {!isBasketEmpty && (
                  <p
                    onClick={handleClearBasket}
                    className="cursor-pointer text-xs text-secondary hover:text-green-700 underline"
                  >
                    Wyczyść
                  </p>
                )}
              </div>
              <Button onClick={closeModal} className={styles["CloseButton"]}>
                <FaWindowClose size={24} color="var(--color-secondary)" />
              </Button>
            </div>
            <div className={styles["BasketInfo"]}>
              {app!.basket.length === 0 && (
                <div className={styles["EmptyBasketInfo"]}>
                  <FaShoppingBasket size={24} color="var(--color-sixth)" />
                  <p>Koszyk jest pusty</p>
                </div>
              )}
              <ul className={styles["Products"]}>
                {app?.basket.map((item, key) => (
                  <li key={key}>
                    <BasketItem
                      item={item}
                      onRemoveItem={() => removeItem(item)}
                      onAddItem={() => addItem(item)}
                    />
                  </li>
                ))}
              </ul>
              <Divider />
              <p className="font-semibold text-lg">Opcje realizacji</p>
              <p className="mt-2 text-base">Zrealizuj zamówienie:</p>
              <ModalRadio {...deliveryTiming} />
              {deliveryTiming.selectedValue ===
                DeliveryTimingOption.HourSelection && (
                <Combobox {...openingHours} />
              )}
              <p className="mt-4 text-base">Sposób realizacji:</p>
              <ModalRadio {...deliveryMethod} />
              {deliveryMethod.selectedValue === DeliveryMethod.Delivery && (
                <div className={styles["Delivery"]}>
                  <Combobox
                    className={styles["DeliveryCities"]}
                    caption="Miejscowość"
                    {...deliveryCities}
                  />
                  <TextInput
                    className={styles["Street"]}
                    caption="Ulica"
                    placeholder="Twoja ulica..."
                    {...street}
                  />
                  <TextInput
                    caption="Nr domu"
                    placeholder="Twója nr domu..."
                    {...houseNumber}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles["Buttons"]}>
            <Button
              onClick={closeModal}
              className={styles["ContinueShoppingButton"]}
            >
              Kontynuuj zakupy
            </Button>
            <Button onClick={handleConfirm} disabled={app!.basket.length === 0}>
              Do kasy |{" "}
              {app!.basket.reduce(
                (totalPayment: number, item: PizzaModel) =>
                  totalPayment + productToPrice(item),
                0
              )}
              {" zł"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { BasketModalView };
