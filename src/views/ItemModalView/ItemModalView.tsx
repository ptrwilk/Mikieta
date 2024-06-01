import { FaWindowClose } from "react-icons/fa";
import {
  CarouselComponent,
  Counter,
  Button,
  Modal,
  Checkbox,
} from "../../components";
import { useAppContext } from "../../context/AppContext";
import styles from "./ItemModalView.module.css";
import { FC, useEffect, useState, useRef } from "react";
import { PizzaModel, ProductModel, ProductType } from "@/types";
import { useLoaderData } from "react-router-dom";

interface IItemModalViewProps {}

const ItemModalView: FC<IItemModalViewProps> = () => {
  const [app, updateApp] = useAppContext();

  const closeModal = () => {
    updateApp({ itemModalOpen: false });
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(1);
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  const { name, ingredients, price, productType } = app!.itemSelected;

  useEffect(() => {
    if (app?.itemModalOpen) {
      setItemQuantity(1);
    }
  }, [app?.itemModalOpen]);

  useEffect(() => {
    if (!app?.itemModalOpen) {
      return;
    }

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
  }, [app?.itemModalOpen]);

  const snacks = ((useLoaderData() as ProductModel[]) || []).filter(
    (product) => product.productType === ProductType.Snack
  );
  const sauces = ((useLoaderData() as ProductModel[]) || []).filter(
    (product) => product.productType === ProductType.Sauce
  );

  const onDecreaseItemQuantity = (): void => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const onIncreaseItemQuantity = (): void => {
    setItemQuantity(itemQuantity + 1);
  };

  const onAddToBasketClicked = (): void => {
    closeModal();
    const { basket, itemSelected } = app!;

    const updatedBasket = [
      ...basket,
      { ...itemSelected, quantity: itemQuantity },
    ];

    updateApp({ basket: updatedBasket, itemModalOpen: false });
  };

  const decreaseCarouselItemQuantity = (item: ProductModel): void => {
    if (productType !== ProductType.Pizza) {
      return;
    }

    const { itemSelected } = app!;
    const itemSelectedCopy = structuredClone(itemSelected) as PizzaModel;

    const subproductIndex = itemSelectedCopy.subproducts?.findIndex(
      (subproduct) =>
        subproduct.name === item.name &&
        subproduct.productType === item.productType
    );

    if (subproductIndex === undefined) return;
    if (!itemSelectedCopy.subproducts) return;

    if (itemSelectedCopy.subproducts[subproductIndex]?.quantity > 1) {
      itemSelectedCopy.subproducts[subproductIndex] = {
        ...itemSelectedCopy.subproducts[subproductIndex],
        quantity: itemSelectedCopy.subproducts[subproductIndex].quantity - 1,
      };
    } else {
      itemSelectedCopy.subproducts = itemSelectedCopy.subproducts.filter(
        (subproduct) =>
          !(
            subproduct.name === item.name &&
            subproduct.productType === item.productType
          )
      );
    }

    updateApp({ itemSelected: itemSelectedCopy });
  };

  const increaseCarouselItemQuantity = (item: ProductModel): void => {
    if (productType !== ProductType.Pizza) {
      return;
    }

    const { itemSelected } = app!;
    const itemSelectedCopy = structuredClone(itemSelected) as PizzaModel;

    const subproductIndex = itemSelectedCopy.subproducts?.findIndex(
      (subproduct) =>
        subproduct.name === item.name &&
        subproduct.productType === item.productType
    );
    if (subproductIndex === undefined) return;

    if (subproductIndex !== -1 && itemSelectedCopy.subproducts) {
      itemSelectedCopy.subproducts[subproductIndex] = {
        ...itemSelectedCopy.subproducts[subproductIndex],
        quantity: itemSelectedCopy.subproducts[subproductIndex].quantity + 1,
      };
    } else {
      itemSelectedCopy.subproducts?.push({ ...item, quantity: 1 });
    }

    updateApp({ itemSelected: itemSelectedCopy });
  };
  function checkCheckbox(checked: boolean | undefined) {
    console.log(checked);
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
            </div>
            {/* <div className={styles["Carousel"]}>
              {sauces.map((sauce, index) => (
                <Checkbox
                  key={index}
                  onCheckChange={(checked) => {
                    checkCheckbox(checked);
                  }}
                  className="ml-12"
                >
                  <p>{sauce.name}</p>
                </Checkbox>
              ))}
            </div> */}
            {productType === ProductType.Pizza && (
              <div className={styles["Carousel"]}>
                <CarouselComponent
                  items={snacks}
                  onDecreaseCarouselItem={(item) =>
                    decreaseCarouselItemQuantity(item)
                  }
                  onIncreaseCarouselItem={(item) =>
                    increaseCarouselItemQuantity(item)
                  }
                  subproducts={
                    app!.itemSelected.productType === ProductType.Pizza
                      ? (app!.itemSelected as PizzaModel).subproducts || []
                      : []
                  }
                />
              </div>
            )}
          </div>
          <div className={styles["Buttons"]}>
            <Counter
              quantity={itemQuantity}
              onMinusClick={onDecreaseItemQuantity}
              onPlusClick={onIncreaseItemQuantity}
            />
            <Button onClick={() => onAddToBasketClicked()}>
              Dodaj do koszyka {itemQuantity ? itemQuantity * price : price}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { ItemModalView };
