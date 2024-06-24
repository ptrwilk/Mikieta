import { Border, Button, CounterSecond, Modal } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { DialogHeader } from "../shared/DialogHeader/DialogHeader";
import pizzaImg from "../../assets/images/pizza.jpg";
import { productToPrice } from "@/helpers";
import styles from "./PurchaseDetailsModalView.module.css";
import { useState } from "react";

const PurchaseDetailsModalView = () => {
  const [app, updateApp] = useAppContext();

  const { name, ingredients, imageUrl } = app!.purchaseModel || {};

  const [quantity, setQuantity] = useState(1);

  const close = () => {
    updateApp("purchaseModel", undefined);
    setQuantity(1);
  };

  const addToBasket = () => {
    const product = app!.purchaseModel!;
    const existingProduct = app!.basket.find((item) => item.id === product.id);

    const updatedBasked = existingProduct
      ? app!.basket.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity! + quantity }
            : item
        )
      : [...app!.basket, { ...product, quantity: quantity }];

    updateApp("basket", updatedBasked);

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
        <div className="flex justify-between gap-4 p-4 bg-[var(--color-fourth)]">
          <CounterSecond
            quantity={quantity}
            onIncrease={() => setQuantity((prev) => prev + 1)}
            onDecrease={() => setQuantity((prev) => prev - 1)}
          />
          <Button huge onClick={addToBasket}>
            Dodaj do koszyka +{" "}
            {productToPrice({
              ...app!.purchaseModel!,
              quantity: quantity,
            }).toFixed(2)}{" "}
            zł
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export { PurchaseDetailsModalView };
