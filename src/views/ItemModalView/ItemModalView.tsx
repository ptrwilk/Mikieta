import { FaWindowClose } from "react-icons/fa";
import { CarouselComponent, Counter, Button, Modal } from "../../components";
import { useAppContext } from "../../context/AppContext";
import styles from "./ItemModalView.module.css";
import { FC, useEffect, useState, useRef } from "react";

interface IItemModalViewProps {}

const ItemModalView: FC<IItemModalViewProps> = () => {
  const [app, updateApp] = useAppContext();

  const closeModal = () => {
    updateApp({ itemModalOpen: false });
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollableContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (app?.itemModalOpen) {
      const handleScroll = () => {
        if (scrollableContentRef.current) {
          const scrollTop = scrollableContentRef.current.scrollTop;
          setIsScrolled(scrollTop > 70);
        }
      };

      const scrollableContent = scrollableContentRef.current;
      if (scrollableContent) {
        scrollableContent.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (scrollableContent) {
          scrollableContent.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, [app?.itemModalOpen]);

  const { name, ingredients, price, id } = app!.itemSelected;
  const quantity = app!.basket.find((x) => x.id === id)?.quantity;
  function onRemoveItem(): void {
    throw new Error("Function not implemented.");
  }

  function onAddItem(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Modal open={app!.itemModalOpen} onClose={closeModal}>
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
          <div
            className={styles["ScrollableContent"]}
            ref={scrollableContentRef}
          >
            <img
              className={styles["ItemImage"]}
              src="https://www.garneczki.pl/blog/wp-content/uploads/2018/09/pizza-po-wiejsku-przepis.jpg"
            />
            <div className={styles["Items"]}>
              <div className={styles["ItemInfo"]}>
                <p className={styles["ItemName"]}>{name}</p>
                <p>{price}</p>
              </div>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
              <p className={styles["Ingredients"]}> {ingredients.join(", ")}</p>
            </div>
            <CarouselComponent slides={[1, 2, 3, 4, 5]} />
          </div>
          <div className={styles["Buttons"]}>
            <Counter
              number={2}
              onMinusClick={onRemoveItem}
              onPlusClick={onAddItem}
            />
            <Button>
              Dodaj do koszyka {quantity ? quantity * price : price}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { ItemModalView };
