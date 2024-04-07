import { FaWindowClose } from "react-icons/fa";
import { BasketModal, Button } from "../../components";
import { useAppContext } from "../../context/AppContext";
import styles from "./BasketModalView.module.css";
import { FC, useEffect, useState } from "react";
import { PizzaModel } from "@/types";

const BasketModalView: FC = () => {
  const [app, updateApp] = useAppContext();

  const closeModal = () => {
    updateApp("basketModalOpen", false);
  };

  const [isBasketEmpty, setIsBasketEmpty] = useState<boolean>(true);

  useEffect(() => {
    // When the modal is open, add a class to body to prevent scrolling
    if (app?.basketModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [app?.basketModalOpen]);

  useEffect(() => {
    setIsBasketEmpty(app?.basket.length === 0);
  }, [app?.basket.length]);

  const handleClearBasket = () => {
    updateApp("basket", [] as PizzaModel[]);
  };

  if (!app?.basketModalOpen) {
    return null;
  }
  return (
    <div className={styles["overlay"]} onClick={closeModal}>
      <div className={styles["content"]} onClick={(e) => e.stopPropagation()}>
        <div
          className={styles["image"]}
          style={{
            backgroundImage: `url(${"https://przepis3.umcs.stronazen.pl/wp-content/uploads/2023/12/zdrowa_pizza_przepis_justbefit_8-1-e1701706553588.webp"})`,
          }}
        />
        <div className={styles["scrollable-content"]}>
          <div className={styles["content-wrapper"]}>
            <div className={styles["header"]}>
              <div className="flex items-baseline">
                <div className={styles["title"]}>Koszyk</div>
                {!isBasketEmpty && (
                  <div
                    onClick={handleClearBasket}
                    className="cursor-pointer text-xs text-secondary hover:text-green-700 underline "
                  >
                    Wyczyść
                  </div>
                )}
              </div>

              <Button onClick={closeModal} className={styles["close-button"]}>
                <FaWindowClose size={24} color="var(--color-secondary)" />
              </Button>
            </div>

            <BasketModal open={app?.basketModalOpen} />
          </div>
          <div className={styles["fixed-button-container"]}>
            <Button
              onClick={closeModal}
              className={styles["continue-shopping-button"]}
            >
              Kontynuuj zakupy
            </Button>
            <Button
              disabled={isBasketEmpty}
              className={styles["checkout-button"]}
            >
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
  );
};

export { BasketModalView };
