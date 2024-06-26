import { Border, Button, CounterSecond, Modal, ModalRadio } from "@/components";
import { updateBasket, useAppContext } from "@/context/AppContext";
import { DialogHeader } from "../shared/DialogHeader/DialogHeader";
import pizzaImg from "../../assets/images/pizza.jpg";
import { productToPrice } from "@/helpers";
import styles from "./PurchaseDetailsModalView.module.css";
import { PizzaType } from "@/types";

const PurchaseDetailsModalView = () => {
  const [app, updateApp] = useAppContext();

  const { name, ingredients, imageUrl, pizzaSizePrice, quantity, pizzaType } =
    app!.purchaseModel || {};

  const Price = ({ type }: { type: PizzaType }) => (
    <p>
      {pizzaSizePrice &&
        `${productToPrice({
          ...app!.purchaseModel!,
          pizzaType: type,
        }).toFixed(2)} zł`}
    </p>
  );

  const sizes = [
    {
      value: PizzaType.Small,
      label: "Pizza 32 cm",
      child: <Price type={PizzaType.Small} />,
    },
    {
      value: PizzaType.Medium,
      label: "Pizza 40 cm",
      child: <Price type={PizzaType.Medium} />,
    },
    {
      value: PizzaType.Large,
      label: "Pizza 50 cm",
      child: <Price type={PizzaType.Large} />,
    },
  ];

  const close = () => {
    updateApp("purchaseModel", undefined);
  };

  const addToBasket = () => {
    updateBasket(app!, updateApp, app!.purchaseModel!);

    close();
  };

  if (!app!.purchaseModel) {
    return null;
  }

  return (
    <Modal
      className="items-start"
      open={app!.purchaseModel !== undefined}
      onClose={close}
    >
      <div className={styles["PurchaseDetailsModalView"]}>
        <DialogHeader onClose={close}>
          <p className="font-semibold text-[18px]">{name}</p>
        </DialogHeader>
        <img className="w-full" src={imageUrl ?? pizzaImg} />
        <Border />
        <div className="p-4">
          <div className="flex justify-between">
            <p className="font-semibold">{name}</p>
            <p>{productToPrice(app!.purchaseModel!).toFixed(2)} zł</p>
          </div>
          <p className="text-[14px] mt-2">
            {ingredients?.map((x) => x.name).join(", ")}
          </p>
        </div>
        <Border />
        <div className="p-4">
          <ModalRadio
            childAlwaysVisible
            childRight
            captionBold
            caption="Rozmiar"
            options={sizes}
            onValueChange={(value) =>
              updateApp("purchaseModel", {
                ...app!.purchaseModel!,
                pizzaType: value,
              })
            }
            selectedValue={pizzaType}
          />
        </div>
        <div className="flex justify-between gap-4 p-4 bg-[var(--color-fourth)]">
          <CounterSecond
            quantity={quantity}
            onIncrease={() =>
              updateApp("purchaseModel", {
                ...app!.purchaseModel!,
                quantity: quantity! + 1,
              })
            }
            onDecrease={() =>
              updateApp("purchaseModel", {
                ...app!.purchaseModel!,
                quantity: quantity! - 1,
              })
            }
          />
          <Button huge onClick={addToBasket}>
            Dodaj do koszyka + {productToPrice(app!.purchaseModel).toFixed(2)}{" "}
            zł
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { PurchaseDetailsModalView };
