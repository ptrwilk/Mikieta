import { useLoaderData, useOutletContext } from "react-router-dom";
import { Button, PizzaCard, TextInput, TreeView } from "../../components";
import styles from "./MenuView.module.css";
import { useState } from "react";
import { PizzaModel } from "../../types";

const MenuView = () => {
  const filters = useOutletContext() as string[];
  const pizzas = useLoaderData() as PizzaModel[];

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterElementSelected = (value: string) => {
    setSelectedFilters([...selectedFilters, value]);
  };

  const handleFilterElementClicked = (value: string) => {
    setSelectedFilters([...selectedFilters].filter((x) => x !== value));
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
      <TreeView className={styles["TreeView"]} />
      <ul className={styles["PizzaCards"]}>
        {pizzas.map(({ name, price, ingredients }, key) => (
          <li key={key}>
            <PizzaCard name={name} price={price} ingredients={ingredients} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { MenuView };
