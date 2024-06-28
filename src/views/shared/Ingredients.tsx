import { IngredientModel } from "@/types";
import classNames from "classnames";

interface IIngredientsProps {
  ingredients?: IngredientModel[];
}

const Ingredients: React.FC<IIngredientsProps> = ({ ingredients }) => {
  if (ingredients === undefined) {
    return null;
  }

  return (
    <ul className="flex gap-1">
      {ingredients?.map((item, index) => (
        <li className="flex" key={index}>
          <p
            className={classNames("text-[14px]", {
              "line-through text-[var(--color-error)]": item.removed,
            })}
          >
            {item.name}
          </p>
          {index < ingredients.length - 1 && <span>,</span>}
        </li>
      ))}
    </ul>
  );
};

export { Ingredients };
