import {
  useLoaderData,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { Button, PizzaCard, TextInput, TreeView } from "../../components";
import styles from "./MenuView.module.css";
import { useState } from "react";
import { PizzaModel } from "../../types";
import { useAppContext } from "../../context/AppContext";

const MenuView = () => {
  const [app, updateApp] = useAppContext();

  const filters = useOutletContext() as string[];
  const pizzas = useLoaderData() as PizzaModel[];
  const [searchParams] = useSearchParams();

  const size = searchParams.get("size");

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const treeViewItems = [
    {
      name: "Pizza",
      subItems: [
        { name: "Mała", path: "/pizza?size=small" },
        { name: "Średnia", path: "/pizza?size=medium" },
        { name: "Duża", path: "/pizza?size=big" },
      ],
    },
  ];

  const handleFilterElementSelected = (value: string) => {
    setSelectedFilters([...selectedFilters, value]);
  };

  const handleFilterElementClicked = (value: string) => {
    setSelectedFilters([...selectedFilters].filter((x) => x !== value));
  };

  const handlePizzaClick = (pizza: PizzaModel) => {
    const newBasket = [...app!.basket, pizza];

    updateApp("basket", newBasket);
  };

  return (
    <div className={styles["MenuView"]}>
      <h2>MENU</h2>
      <ul className={styles["FilterTabs"]}>
        {selectedFilters.map((content, key) => (
          <li key={key}>
            <Button tab onClick={() => handleFilterElementClicked(content)}>
              {content}
            </Button>
          </li>
        ))}
      </ul>
      <TextInput
        placeholder="Filtruj"
        prompts={filters.filter((item) => !selectedFilters.includes(item))}
        onSelect={handleFilterElementSelected}
      />
      <TreeView
        className={styles["TreeView"]}
        defaultSubItemSelected={
          size
            ? treeViewItems[0].subItems.find(
                (x) => x.path === `/pizza?size=${size}`
              )
            : treeViewItems[0].subItems[0]
        }
        items={treeViewItems}
      />
      <ul className={styles["PizzaCards"]}>
        {pizzas.map((pizza, key) => (
          <li key={key}>
            <PizzaCard
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              onClick={() => handlePizzaClick(pizza)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { MenuView };
