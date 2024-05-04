import { FaWindowClose } from "react-icons/fa";
import {
  BasketInfo,
  Counter,
  Button,
  IDeliveryFormPropsRef,
  Modal,
} from "../../components";
import { useAppContext } from "../../context/AppContext";
import styles from "./ItemModalView.module.css";
import { FC, useEffect, useRef, useState } from "react";
import { PizzaModel } from "@/types";

interface IItemModalViewProps {}

const ItemModalView: FC<IItemModalViewProps> = () => {
  const [app, updateApp] = useAppContext();

  const closeModal = () => {
    updateApp("itemModalOpen", false);
  };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableContent = document.querySelector(
        `.${styles["ScrollableContent"]}`
      );
      if (scrollableContent) {
        const scrollTop = scrollableContent.scrollTop;
        setIsScrolled(scrollTop > 70);
        console.log("scrolling");
      }
    };

    const scrollableContent = document.querySelector(
      `.${styles["ScrollableContent"]}`
    );
    if (scrollableContent) {
      scrollableContent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableContent) {
        scrollableContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  //const { name, ingredients, quantity, price } = app!.itemSelected;
  const name = "Pizza";
  const ingredients = ["Pepperoni", "Mozzarella", "Tomato", "Oregano"];
  const quantity = 2;
  const price = 20;

  function onRemoveItem(): void {
    throw new Error("Function not implemented.");
  }

  function onAddItem(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Modal open={true} onClose={closeModal}>
      <div className={styles["ItemModalView"]}>
        <div className={styles["Content"]}>
          <Button onClick={closeModal} className={styles["CloseButton"]}>
            <FaWindowClose size={20} color="var(--color-secondary)" />
          </Button>
          <div
            className={`${styles["FixedHeader"]} ${
              isScrolled ? styles["Visible"] : ""
            }`}
          >
            <p>{name}</p>
          </div>
          <div className={styles["ScrollableContent"]}>
            <img src="https://www.garneczki.pl/blog/wp-content/uploads/2018/09/pizza-po-wiejsku-przepis.jpg" />
            <div className={styles["Items"]}>
              <div className={styles["ItemInfo"]}>
                <p className={styles["ItemName"]}>{name}</p>
                <p>{price}</p>
              </div>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
            </div>
          </div>
          <div className={styles["Buttons"]}>
            <Counter
              number={2}
              onMinusClick={onRemoveItem}
              onPlusClick={onAddItem}
            />
            <Button>Dodaj do koszyka {quantity * price}</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { ItemModalView };
