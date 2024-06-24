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
import {
  DeliveryMethod,
  DeliveryResponseModel,
  DeliveryTimingOption,
  OrderModel,
  ProductModel,
} from "@/types";
import { useCombobox, useInput, useRadio } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { getDayIndex, getTimeIntervals, productToPrice } from "@/helpers";
import { post } from "@/apihelper";
import { DeliveryMessage } from "../shared/DeliveryMessage";
import { DialogHeader } from "../shared/DialogHeader/DialogHeader";

const BasketModalView: FC = () => {
  const [app, updateApp] = useAppContext();

  const navigate = useNavigate();

  const REQUIRED_VALUE = "wartość wymagana";

  const [message, setMessage] = useState<DeliveryResponseModel | undefined>();

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

  const getHours = (deliveryMethod?: DeliveryMethod) => {
    return getTimeIntervals(
      ((deliveryMethod === DeliveryMethod.TakeAway
        ? app!.settings?.openingHours
        : app!.settings?.deliveryHours) ?? [])[getDayIndex()]
    ).map((x) => ({
      label: x,
      value: x,
    }));
  };

  const openingHours = useCombobox(
    [
      {
        validate: (value) =>
          !!value ||
          deliveryTiming.selectedValue === DeliveryTimingOption.RightAway,
        errorMessage: REQUIRED_VALUE,
      },
    ],
    getHours(app!.order.deliveryMethod),
    app!.order.openingHour,
    (value) =>
      updateApp("order", {
        ...app!.order,
        openingHour: value,
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
    ],
    undefined,
    app!.order.deliveryMethod,
    (value) => {
      if (value === DeliveryMethod.Delivery) {
        onAddressChange(app!.order);
      } else {
        setMessage(undefined);
      }

      const hours = getHours(value as DeliveryMethod);
      var containsHours = hours.some((x) => x.value === app!.order.openingHour);

      updateApp("order", {
        ...app!.order,
        deliveryMethod: value as any,
        openingHour: !containsHours ? undefined : app!.order.openingHour,
      });
    }
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
    (value) => {
      updateApp("order", { ...app!.order, street: value });
    },
    () => {
      if (deliveryMethod.selectedValue === DeliveryMethod.Delivery) {
        onAddressChange(app!.order);
      }
    }
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
    (value) => {
      updateApp("order", { ...app!.order, houseNumber: value });
    },
    () => {
      if (deliveryMethod.selectedValue === DeliveryMethod.Delivery) {
        onAddressChange(app!.order);
      }
    }
  );

  const deliveryCity = useInput(
    [
      {
        validate: (value) =>
          !!value || deliveryMethod.selectedValue !== DeliveryMethod.Delivery,
        errorMessage: REQUIRED_VALUE,
      },
    ],
    app!.order.deliveryCity,
    (value) => {
      updateApp("order", { ...app!.order, deliveryCity: value });
    },
    () => {
      if (deliveryMethod.selectedValue === DeliveryMethod.Delivery) {
        onAddressChange(app!.order);
      }
    }
  );

  const [isBasketEmpty, setIsBasketEmpty] = useState(true);

  useEffect(() => {
    setIsBasketEmpty(app?.basket.length === 0);
  }, [app?.basket.length]);

  useEffect(() => {
    if (
      app?.order &&
      deliveryMethod.selectedValue === DeliveryMethod.Delivery
    ) {
      onAddressChange(app!.order);
    }
  }, []);

  const onAddressChange = async ({
    street,
    deliveryCity,
    houseNumber,
  }: OrderModel) => {
    const model = { street, city: deliveryCity, homeNumber: houseNumber };

    updateApp("loading", true);
    const response = (await post(
      "delivery/check",
      model
    )) as DeliveryResponseModel;
    updateApp("loading", false);

    setMessage(response.hasError ? response : undefined);
  };

  const closeModal = () => {
    updateApp("basketModalOpen", false);
  };

  const handleClearBasket = () => {
    updateApp("basket", []);
  };

  const addItem = (item: ProductModel) => {
    const updatedBasket: ProductModel[] = app!.basket.map((product) => {
      if (item.id === product.id) {
        return { ...product, quantity: product.quantity! + 1 };
      }
      return product;
    });

    updateApp("basket", updatedBasket);
  };

  const removeItem = (item: ProductModel) => {
    const updatedBasket = app!.basket.reduce(
      (basket: ProductModel[], product) => {
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
    const messageError = {
      checkError: () => message?.hasError,
    };
    const inputs = [
      openingHours,
      deliveryTiming,
      deliveryMethod,
      street,
      houseNumber,
      deliveryCity,
      messageError,
    ];
    if ([...inputs.map((x) => x.checkError())].filter((x) => x).length > 0) {
    } else {
      closeModal();
      navigate("/kasa");
    }
  };

  return (
    <Modal
      className={styles["BasketModalView"]}
      open={app!.basketModalOpen}
      onClose={closeModal}
    >
      <div className={styles["BasketModalView-Content"]}>
        <img src="https://przepis3.umcs.stronazen.pl/wp-content/uploads/2023/12/zdrowa_pizza_przepis_justbefit_8-1-e1701706553588.webp" />
        <div className={styles["Content"]}>
          <div className={styles["ScrollableContent"]}>
            <DialogHeader onClose={closeModal}>
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
            </DialogHeader>
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
                <div>
                  <div className={styles["Delivery"]}>
                    <TextInput
                      className={styles["DeliveryCities"]}
                      caption="Miejscowość"
                      placeholder="Miejscowość..."
                      {...deliveryCity}
                    />
                    <TextInput
                      className={styles["Street"]}
                      caption="Ulica"
                      placeholder="Ulica..."
                      {...street}
                    />
                    <TextInput
                      caption="Nr domu"
                      placeholder="Nr domu..."
                      {...houseNumber}
                    />
                  </div>
                  <DeliveryMessage className="mt-4" message={message} />
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
            <Button
              onClick={handleConfirm}
              disabled={app!.basket.length === 0}
              loading={app!.loading}
            >
              Do kasy |{" "}
              {app!.basket.reduce(
                (totalPayment: number, item: ProductModel) =>
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
