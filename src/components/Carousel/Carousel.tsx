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
import { PizzaModel, ProductType } from "@/types";
import { useLoaderData } from "react-router-dom";
const TWEEN_FACTOR_BASE = 0.3;
const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  options?: EmblaOptionsType;
};

const CarouselComponent: React.FC<PropType> = (props) => {
  const { options } = props;
  const [selectedSnacks, setSelectedSnacks] = useState<number[]>([]);
  const toggleSnack = useCallback((snackId: number) => {
    setSelectedSnacks((prevSelectedSnacks) => {
      const index = prevSelectedSnacks.indexOf(snackId);
      if (index === -1) {
        return [...prevSelectedSnacks, snackId];
      } else {
        return prevSelectedSnacks.filter((id) => id !== snackId);
      }
    });
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const snacks = (useLoaderData() as PizzaModel[]).filter(
    (product) => product.productType === ProductType.Snack
  );
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

  function handleSlideClick(
    slideIndex: number
  ): MouseEventHandler<HTMLDivElement> {
    return () => {
      toggleSnack(slideIndex);
    };
  }
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
          {snacks.map((snack, index) => (
            <div
              className={
                selectedSnacks.indexOf(snack.id) !== -1
                  ? styles["SelectedSlide"]
                  : styles["Slide"]
              }
              key={index}
              onClick={handleSlideClick(snack.id)}
            >
              <img
                className={styles["Image"]}
                src={`https://picsum.photos/600/350?v=${index}`}
                alt="Your alt text"
              />
              <div className={styles["ProductInfo"]}>
                <div className={styles["ProductName"]}>{snack.name}</div>
                <div className={styles["ProductPrice"]}>
                  {"+"}
                  {snack.price}
                </div>
              </div>
              {selectedSnacks.indexOf(snack.id) !== -1 ? (
                <div className={styles["Counter"]}>
                  <Counter number={snacks.length}></Counter>
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
