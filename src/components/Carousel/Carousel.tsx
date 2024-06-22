import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton } from "./CarouselButtons";
import { Counter, IncreaseButton } from "..";
import { usePrevNextButtons } from "./usePrevNextButtons";
import styles from "./Carousel.module.css";
import {
  PizzaModel,
  ProductModel,
  ProductType,
  getSubproductQuantityFromItemSelected,
} from "@/types";
import { useAppContext } from "@/context/AppContext";
import { useLoaderData } from "react-router-dom";

const TWEEN_FACTOR_BASE = 0.3;
const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  options?: EmblaOptionsType;
};

const CarouselComponent: React.FC<PropType> = (props) => {
  const { options } = props;

  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [previouslySelectedItemIds, setPreviouslySelectedItemIds] = useState<
    number[]
  >([]);

  const [app, updateApp] = useAppContext();
  useEffect(() => {
    const { itemSelected } = app!;

    if (itemSelected?.productType !== ProductType.Pizza) return;

    const pizzaSelected = app!.itemSelected as PizzaModel;
    if (!pizzaSelected.subproducts) return;
    const selectedItems = [
      ...pizzaSelected
        .subproducts!.filter((subproduct) => subproduct.quantity > 0)
        .map((subproduct) => subproduct.id),
    ];
    setSelectedItemIds(() => selectedItems);
    setPreviouslySelectedItemIds(() => selectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (getSubproductQuantityFromItemSelected(subproducts, 6) === undefined) {
  //     removeFromPreviouslySelectedItems(6);
  //     toggleItem(6);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [app!.itemSelected]);

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const items = ((useLoaderData() as ProductModel[]) || []).filter(
    (product) => product.productType === ProductType.Snack
  );

  //useEffect(() => {
  const getItemEdited = (): PizzaModel => {
    const itemEdited = structuredClone(app!.itemSelected) as PizzaModel;
    if (app!.itemSelected.productType === ProductType.Pizza) {
      const existingSubproducts = itemEdited.subproducts || [];
      const mergedSubproducts = items.map((snack) => {
        const existing = existingSubproducts.find((sub) => sub.id === snack.id);
        return existing ? { ...snack, ...existing } : snack;
      });
      itemEdited.subproducts = mergedSubproducts;
    }

    console.log("itemEdited", itemEdited);
    return itemEdited;
  };

  const { subproducts, ...rest } = getItemEdited();

  // getItemEdited();
  //}, [app, items]);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", tweenOpacity)
      .on("scroll", tweenOpacity);
  }, [emblaApi, setTweenFactor, tweenOpacity]);

  const addToPreviouslySelectedItems = (slideIndex: number) => {
    setPreviouslySelectedItemIds([...previouslySelectedItemIds, slideIndex]);
  };
  const removeFromPreviouslySelectedItems = (itemId: number) => {
    setPreviouslySelectedItemIds((prevIds) =>
      prevIds.filter((id) => id !== itemId)
    );
  };

  const toggleItem = useCallback((itemId: number) => {
    setSelectedItemIds((prevSelectedItems) => {
      const index = prevSelectedItems.indexOf(itemId);
      //console.log(index);
      let selectedItems = [];
      if (index === -1) {
        selectedItems = [...prevSelectedItems, itemId];
      } else {
        selectedItems = prevSelectedItems.filter((id) => id !== itemId);
      }
      return selectedItems;
    });
  }, []);

  const handleSlideClick = (
    slideIndex: number
  ): MouseEventHandler<HTMLDivElement> => {
    return () => {
      const isItemSelected = selectedItemIds.includes(slideIndex);

      const isItemPreviouslySelected =
        previouslySelectedItemIds.includes(slideIndex);

      const isItemNewlySelected = !isItemSelected && !isItemPreviouslySelected;

      const selectedItem = items.find((item) => item.id === slideIndex);

      if (isItemNewlySelected) {
        if (selectedItem) {
          //handleIncreaseItem(selectedItem);
          addToPreviouslySelectedItems(slideIndex);
        }
      }
      if (!isItemSelected && selectedItem) {
        handleIncreaseItem(selectedItem);
      }

      if (isItemSelected && selectedItem) {
        setQuantityToZero(selectedItem);
      }

      toggleItem(slideIndex);
    };
  };

  const setQuantityToZero = (item: ProductModel) => {
    const { itemSelected } = app!;
    const itemSelectedCopy = structuredClone(itemSelected) as PizzaModel;

    if (!itemSelectedCopy.subproducts) return;

    itemSelectedCopy.subproducts = itemSelectedCopy.subproducts.filter(
      (subproduct) =>
        !(
          subproduct.name === item.name &&
          subproduct.productType === item.productType
        )
    );

    updateApp({ itemSelected: itemSelectedCopy });
  };
  const decreaseItemCount = (item: ProductModel) => {
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
  const handleDecreaseItem = (item: ProductModel) => {
    if (
      getSubproductQuantityFromItemSelected(subproducts || [], item.id) === 1
    ) {
      removeFromPreviouslySelectedItems(item.id);
      toggleItem(item.id);
    }

    decreaseItemCount(item);
  };

  const handleIncreaseItem = (item: ProductModel) => {
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
    console.log("itemSelectedCopy", itemSelectedCopy);
    updateApp({ itemSelected: itemSelectedCopy });
  };
  return (
    <div>
      <div className={styles["Controls"]}>
        <span className={"uppercase text-xs"}>Nie żałuj sobie dobrego</span>
        <div className={styles["Buttons"]}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div className={styles["Viewport"]} ref={emblaRef}>
        <div className={styles["Container"]}>
          {items.map((item, index) => (
            <div
              className={
                selectedItemIds.includes(item.id)
                  ? styles["SelectedSlide"]
                  : styles["Slide"]
              }
              key={index}
              onClick={handleSlideClick(item.id)}
            >
              <img
                className={styles["Image"]}
                src={`https://picsum.photos/600/350?v=${index}`}
                alt="Your alt text"
              />
              <div className={styles["ProductInfo"]}>
                <div className={styles["ProductName"]}>{item.name}</div>
                <div className={styles["ProductPrice"]}>
                  {"+"}
                  {item.price}
                </div>
              </div>
              {selectedItemIds.includes(item.id) ? (
                <div
                  className={styles["Counter"]}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Counter
                    quantity={getSubproductQuantityFromItemSelected(
                      subproducts || [],
                      item.id
                    )}
                    onMinusClick={() => handleDecreaseItem(item)}
                    onPlusClick={() => handleIncreaseItem(item)}
                  ></Counter>
                </div>
              ) : (
                <div className={styles["AddButton"]}>
                  <IncreaseButton />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { CarouselComponent };
