import { forwardRef } from "react";
import styles from "./BasketInfo.module.css";
import { PizzaModel, ProductType } from "../../types";
import { Divider, ModalRadio, Combobox, DeliveryForm, BasketItem } from "..";
import { FaShoppingBasket } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import { useCombobox, useRadio } from "@/hooks";
import { comboBoxOpeningHours } from "@/const";

enum DeliveryTimingOption {
  RightAway = "RightAway",
  HourSelection = "HourSelection",
}

enum DeliveryMethod {
  Delivery = "Delivery",
  TakeAway = "TakeAway",
  DinningIn = "DinningIn",
}

const BasketInfo = forwardRef((_, ref) => {
  const [app, updateApp] = useAppContext();

  const deliveryTiming = useRadio(
    [],
    [
      { value: DeliveryTimingOption.RightAway, label: "Jak najszybciej" },
      { value: DeliveryTimingOption.HourSelection, label: "Na godzinę..." },
    ]
  );

  const deliveryMethod = useRadio(
    [],
    [
      { value: DeliveryMethod.Delivery, label: "Dostawa" },
      { value: DeliveryMethod.TakeAway, label: "Odbiór własny" },
      { value: DeliveryMethod.DinningIn, label: "Zjem na miejscu" },
    ]
  );

  const openingHours = useCombobox(comboBoxOpeningHours);

  const addItem = (name: string, productType: ProductType) => {
    const updatedBasket: PizzaModel[] = app!.basket.map((item) => {
      if (item.name === name && item.productType === productType) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    updateApp("basket", updatedBasket);
  };

  const removeItem = (name: string, productType: ProductType) => {
    const updatedBasket = app!.basket.reduce((basket: PizzaModel[], item) => {
      if (item.name === name && item.productType === productType) {
        if (item.quantity > 1) {
          basket.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        basket.push(item);
      }
      return basket;
    }, []);

    updateApp("basket", updatedBasket);
  };

  return (
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
              onRemoveItem={() => removeItem(item.name, item.productType)}
              onAddItem={() => addItem(item.name, item.productType)}
            />
          </li>
        ))}
      </ul>
      <Divider />
      <p className="font-semibold text-lg">Opcje realizacji</p>
      <p className="mt-2 text-base">Zrealizuj zamówienie:</p>
      <ModalRadio {...deliveryTiming} />
      {deliveryTiming.selectedValue === DeliveryTimingOption.HourSelection && (
        <Combobox {...openingHours} />
      )}
      <p className="mt-4 text-base">Sposób realizacji:</p>
      <ModalRadio {...deliveryMethod} />
      {deliveryMethod.selectedValue === DeliveryMethod.Delivery && (
        <DeliveryForm ref={ref} />
      )}
    </div>
  );
});

export { BasketInfo };
