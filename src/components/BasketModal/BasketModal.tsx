import React, { useEffect, useMemo, useState } from "react";
import styles from "./BasketModal.module.css";
import { PizzaModel, ProductType, translateProductType } from "../../types";
import { Divider, ModalRadio, Combobox, Button, DeliveryForm } from "..";
import { FaPlus, FaMinus, FaShoppingBasket } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";

interface ModalProps {
  open?: boolean;
}

const BasketModal: React.FC<ModalProps> = () => {
  const [app, updateApp] = useAppContext();
  const deliveryTimingOptions = [
    { value: "right-away", label: "Jak najszybciej" },
    { value: "hour-selection", label: "Na godzinę..." },
  ];

  const deliveryMethods = [
    { value: "delivery", label: "Dostawa" },
    { value: "take-away", label: "Odbiór własny" },
    { value: "dinning-in", label: "Zjem na miejscu" },
  ];

  // brać w porozumieniu z kontakt/godziny otwarcia
  const openingHours = [
    { value: "10:00" },
    { value: "10:30" },
    { value: "11:00" },
    { value: "11:30" },
    { value: "12:00" },
    { value: "12:30" },
    { value: "13:00" },
    { value: "13:30" },
    { value: "14:00" },
    { value: "14:30" },
    { value: "15:00" },
    { value: "15:30" },
    { value: "16:00" },
    { value: "16:30" },
    { value: "17:00" },
    { value: "17:30" },
  ];

  const [selectedOpeningHour, setSelectedOpeningValue] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedStreet, setSelectedStreet] = useState<string>("");
  const [selectedHouseNumber, setSelectedHouseNumber] = useState<string>("");

  const [selectedDeliveryTimingOption, setDeliveryTimingOption] =
    useState<string>("");
  const [selectedDeliveryMethod, setDeliveryMethod] = useState<string>("");

  const [items, setItems] = useState<PizzaModel[]>(app!.basket);

  const basket = useMemo(() => app!.basket, [app]);

  useEffect(() => {
    setItems(basket);
  }, [basket]);

  const handleDeliveryTimingOptionChange = (option: string) => {
    setDeliveryTimingOption(option);
  };

  const handleDeliveryMethodChange = (option: string) => {
    setDeliveryMethod(option);
  };

  const handleStreetChange = (newValue: string) => {
    setSelectedStreet(newValue);
  };

  const handleHouseNumberChange = (newValue: string) => {
    setSelectedHouseNumber(newValue);
  };

  const handleCityChange = (newCity: string) => {
    setSelectedCity(newCity);
  };

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
    <div className={styles["basket-info"]}>
      {items.length === 0 && (
        <div className={styles["empty-basket-info"]}>
          <Button>
            <FaShoppingBasket size={24} color="#979797" />
          </Button>
          Koszyk jest pusty
        </div>
      )}
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <div className={styles.column}>
            <div>
              <span className={styles.name}>{item.name}</span>
              {"  "}
              <span className="text-sm">
                {"(" + translateProductType(item.productType) + ")"}
              </span>
            </div>
            <div className={styles.ingredients}>
              {item.ingredients.join(", ")}
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.price}>{item.price * item.quantity} zł</div>
            <div className={styles.quantityRow}>
              <Button onClick={() => removeItem(item.name, item.productType)}>
                <FaMinus size={10} color="#979797" />
              </Button>
              {item.quantity}
              <Button onClick={() => addItem(item.name, item.productType)}>
                <FaPlus size={10} color="#979797" />
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Divider />
      <div className="font-semibold text-lg">Opcje realizacji</div>
      <div className="mt-2 text-base">Zrealizuj zamówienie:</div>
      <div>
        <ModalRadio
          options={deliveryTimingOptions}
          selectedValue={selectedDeliveryTimingOption}
          onValueChange={handleDeliveryTimingOptionChange}
        />
      </div>
      {selectedDeliveryTimingOption === "hour-selection" && (
        <Combobox
          options={openingHours}
          value={selectedOpeningHour}
          onChange={(newValue: string) => setSelectedOpeningValue(newValue)}
        ></Combobox>
      )}
      <div className="mt-4 text-base">Sposób realizacji:</div>
      <div>
        <ModalRadio
          options={deliveryMethods}
          selectedValue={selectedDeliveryMethod}
          onValueChange={handleDeliveryMethodChange}
        />
      </div>
      {selectedDeliveryMethod === "delivery" && (
        <DeliveryForm
          selectedStreet={selectedStreet}
          onStreetChange={handleStreetChange}
          selectedHouseNumber={selectedHouseNumber}
          onHouseNumberChange={handleHouseNumberChange}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
        />
      )}
    </div>
  );
};

export { BasketModal };
