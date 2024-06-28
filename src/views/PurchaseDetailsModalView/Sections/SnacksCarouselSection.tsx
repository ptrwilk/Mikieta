import { CounterSecond } from "@/components";
import EmblaCarousel from "@/components/ui/EmblaCarousel/EmblaCarousel";
import { ProductModel } from "@/types";
import src from "../../../assets/images/snack.jpg";

interface ISnacksCarouselSectionProps {
  snacks: ProductModel[];
  onIncrease: (item: ProductModel) => void;
  onDecrease: (item: ProductModel) => void;
}

const SnacksCarouselSection: React.FC<ISnacksCarouselSectionProps> = ({
  snacks,
  onIncrease,
  onDecrease,
}) => {
  return (
    <EmblaCarousel
      caption="NIE ŻAŁUJ SOBIE DOBREGO"
      items={snacks}
      render={(item: ProductModel) => (
        <div className="flex flex-col flex-grow p-4 border">
          <img
            className="w-full h-[150px] object-fill"
            src={item.imageUrl ?? src}
          />
          <div className="flex justify-between gap-4 mt-2 mb-4">
            <p className="font-medium">{item.name}</p>
            <p className="shrink-0">{item.price?.toFixed(2)} zł</p>
          </div>
          <CounterSecond
            className="self-end mt-auto"
            minValue={0}
            minValueVisilbe={false}
            quantity={item.quantity}
            onIncrease={() => onIncrease(item)}
            onDecrease={() => onDecrease(item)}
          />
        </div>
      )}
    />
  );
};

export { SnacksCarouselSection };
