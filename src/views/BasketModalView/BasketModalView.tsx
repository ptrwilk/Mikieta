import { FaWindowClose } from "react-icons/fa";
import {
  BasketInfo,
  Button,
  IDeliveryFormPropsRef,
  Modal,
} from "../../components";
import { useAppContext } from "../../context/AppContext";
import styles from "./BasketModalView.module.css";
import { FC, useEffect, useRef, useState } from "react";
import { PizzaModel } from "@/types";

const BasketModalView: FC = () => {
  const [app, updateApp] = useAppContext();

  const [isBasketEmpty, setIsBasketEmpty] = useState(true);

  const deliveryFormRef = useRef<IDeliveryFormPropsRef>();

  useEffect(() => {
    setIsBasketEmpty(app?.basket.length === 0);
  }, [app?.basket.length]);

  const closeModal = () => {
    updateApp("basketModalOpen", false);
  };

  const handleClearBasket = () => {
    updateApp("basket", []);
  };

  const handleConfirm = () => {
    const hasErrors = deliveryFormRef.current?.getModel().hasErrors ?? false;

    if (!hasErrors) {
      //Proceed if no errors
    }
  };

  return (
    <Modal open={app!.basketModalOpen} onClose={closeModal}>
      <div className={styles["BasketModalView"]}>
        <img src="https://przepis3.umcs.stronazen.pl/wp-content/uploads/2023/12/zdrowa_pizza_przepis_justbefit_8-1-e1701706553588.webp" />
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
          <BasketInfo ref={deliveryFormRef} />
          <div className={styles["ButtonsContainer"]}>
            <div className={styles["Buttons"]}>
              <Button
                onClick={closeModal}
                className={styles["ContinueShoppingButton"]}
              >
                Kontynuuj zakupy
              </Button>
              <Button onClick={handleConfirm}>
                Do kasy |{" "}
                {app!.basket.reduce(
                  (totalPayment: number, item: PizzaModel) =>
                    totalPayment + item.quantity * item.price,
                  0
                )}
                {" zł"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { BasketModalView };
