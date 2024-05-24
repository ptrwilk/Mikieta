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
import { ProductModel, getSubproductQuantityFromItemSelected } from "@/types";
import { useAppContext } from "@/context/AppContext";

const TWEEN_FACTOR_BASE = 0.3;
const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  items: ProductModel[];
  options?: EmblaOptionsType;
  onDecreaseCarouselItem: (item: ProductModel) => void;
  onIncreaseCarouselItem: (item: ProductModel) => void;
  subproducts: ProductModel[];
};

const CarouselComponent: React.FC<PropType> = (props) => {
  const {
    items,
    options,
    onDecreaseCarouselItem,
    onIncreaseCarouselItem,
    subproducts = [],
  } = props;

  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [previouslySelectedItemIds, setPreviouslySelectedItemIds] = useState<
    number[]
  >([]);

  const [app] = useAppContext();

  useEffect(() => {
    if (app?.itemModalOpen) {
      setSelectedItemIds(
        app.itemSelected.subproducts
          .filter((subproduct) => subproduct.quantity > 0)
          .map((subproduct) => subproduct.id)
      );
    }
  }, [app?.itemModalOpen, app?.itemSelected]);

  const toggleItem = useCallback((itemId: number) => {
    setSelectedItemIds((prevSelectedItems) => {
      const index = prevSelectedItems.indexOf(itemId);
      let selectedItems = [];
      if (index === -1) {
        selectedItems = [...prevSelectedItems, itemId];
      } else {
        selectedItems = prevSelectedItems.filter((id) => id !== itemId);
      }
      return selectedItems;
    });
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

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

  const handleSlideClick = (
    slideIndex: number
  ): MouseEventHandler<HTMLDivElement> => {
    return () => {
      const isItemSelected = selectedItemIds.includes(slideIndex);
      const isItemPreviouslySelected =
        previouslySelectedItemIds.includes(slideIndex);
      const isItemNewlySelected = !isItemSelected && !isItemPreviouslySelected;

      if (isItemNewlySelected) {
        const selectedItem = items.find((item) => item.id === slideIndex);
        if (selectedItem) {
          onIncreaseCarouselItem(selectedItem);
          addToPreviouslySelectedItems(slideIndex);
        }
      }

      toggleItem(slideIndex);
    };
  };

  return (
    <div className={styles["Carousel"]}>
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
                      subproducts,
                      item.id
                    )}
                    onMinusClick={() => onDecreaseCarouselItem(item)}
                    onPlusClick={() => onIncreaseCarouselItem(item)}
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
