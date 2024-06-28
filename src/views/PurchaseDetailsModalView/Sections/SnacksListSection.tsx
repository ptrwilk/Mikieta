import { ProductModel } from "@/types";
import src from "../../../assets/images/snack.jpg";
import { CounterSecond } from "@/components";
import { useState } from "react";

interface ISnacksListSectionProps {
  snacks: ProductModel[];
  onIncrease: (item: ProductModel) => void;
  onDecrease: (item: ProductModel) => void;
}

const SnacksListSection: React.FC<ISnacksListSectionProps> = ({
  snacks,
  onIncrease,
  onDecrease,
}) => {
  const [hasLimit, setHasLimit] = useState(true);
  return (
    <div>
      <p className="font-semibold">NIE ŻAŁUJ SOBIE DOBREGO</p>
      <ul className="mt-4">
        {snacks
          .filter((_, index) => index < 3 || !hasLimit)
          .map((item, key) => (
            <li className="flex flex-col p-4 border" key={key}>
              <div className="flex gap-4">
                <img
                  className="w-[150px] h-[100px] object-fill"
                  src={item.imageUrl ?? src}
                />
                <p className="font-medium">{item.name}</p>
              </div>
              <div className="flex mt-4 justify-between items-center">
                <p>{item.price?.toFixed(2)} zł</p>
                <CounterSecond
                  minValueVisilbe={false}
                  minValue={0}
                  quantity={item.quantity}
                  onIncrease={() => onIncrease(item)}
                  onDecrease={() => onDecrease(item)}
                />
              </div>
            </li>
          ))}
      </ul>
      {hasLimit && (
        <p
          className="text-center mt-2 font-semibold underline cursor-pointer"
          onClick={() => setHasLimit(false)}
        >
          Pokaż więcej produktów
        </p>
      )}
    </div>
  );
};

export { SnacksListSection };
