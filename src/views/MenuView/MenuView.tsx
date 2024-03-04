import { useLoaderData, useOutletContext } from "react-router-dom";
import { Button, PizzaCard, TextInput, TreeView } from "../../components";
import styles from "./MenuView.module.css";
import { useState } from "react";
import { PizzaModel } from "../../types";
import { useAppContext } from "../../context/AppContext";

const MenuView = () => {
  const [app, updateApp] = useAppContext();

  const filters = useOutletContext() as string[];
  const pizzas = useLoaderData() as PizzaModel[];

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const treeViewItems = [
    {
      name: "Pizza",
      path: "pizza",
      subItems: [
        { name: "Mała", path: "size=small", index: 0 },
        { name: "Średnia", path: "size=medium", index: 0 },
        { name: "Duża", path: "size=big", index: 0 },
        { name: "Cieńka", path: "crust=thin", index: 1 },
        { name: "Gruba", path: "crust=thick", index: 1 },
      ],
    },
    {
      name: "Napoje",
      path: "drink",
      subItems: [
        { name: "Piwo", path: "type=beer", index: 0 },
        { name: "Grzaniec", path: "type=mulled-wine", index: 0 },
        { name: "Pozostałe", path: "type=other", index: 0 },
      ],
    },
    //TODO: remove subItems and make parent selection working
    {
      name: "Przekąski",
      path: "snack",
    },
    //TODO: remove subItems and make parent selection working
    {
      name: "Sosy",
      path: "sauce",
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
      <TreeView className={styles["TreeView"]} items={treeViewItems} />
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
