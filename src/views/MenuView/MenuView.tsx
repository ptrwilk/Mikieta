import { Button, PizzaCard, TextInput, TreeView } from "../../components";
import styles from "./MenuView.module.css";

const MenuView = () => {
  const pizzas = [
    { name: "Margherita", price: 18, ingredients: ["ser", "sos pomidorowy"] },
    { name: "Margherita", price: 1.23, ingredients: ["ser"] },
    { name: "Margherita", price: 1.23, ingredients: ["ser"] },
    { name: "Margherita", price: 1.23, ingredients: ["ser"] },
  ];

  const filterTabs = ["ser", "pomidor"];

  return (
    <div className={styles["MenuView"]}>
      <h2>MENU</h2>
      <ul className={styles["FilterTabs"]}>
        {filterTabs.map((content, key) => (
          <li key={key}>
            <Button tab>{content}</Button>
          </li>
        ))}
      </ul>
      <TextInput
        placeholder="Filtruj"
        prompts={["ser", "kurczak", "kawa", "kawa2"]}
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
