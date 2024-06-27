import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay,
} from "./EmblaCarouselSelectedSnapDisplay";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";

type PropType = {
  caption: string;
  items: any[];
  render: (item: any) => any;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { caption, items, render } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  return (
    <section className="embla">
      <div className="embla__controls">
        <p className="font-semibold">{caption}</p>
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {items.map((item, index) => (
            <div className="embla__slide" key={index}>
              {render(item)}
            </div>
          ))}
        </div>
      </div>

      <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} />
    </section>
  );
};

export default EmblaCarousel;
