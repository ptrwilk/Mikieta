import { useLoaderData } from "react-router-dom";
import { MenuItem, Section } from "../../components";
import styles from "./MenuView.module.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PizzaModel, ProductType } from "@/types";

const MenuView = () => {
  const products = useLoaderData() as PizzaModel[];

  const MenuItems = (productType: ProductType) => (
    <ul className={styles["Items"]}>
      {products
        .filter((x) => x.productType === productType)
        .map((product, key) => (
          <li key={key}>
            <MenuItem {...product} />
            <div className={styles["Hr"]} />
          </li>
        ))}
    </ul>
  );

  return (
    <Section className={styles["MenuView"]}>
      <div className={styles["Info"]}>
        <p>Dowiedz się więcej</p>
        <h3>O Naszym Menu</h3>
        <div className={styles["Line"]} />
      </div>
      <Tabs className={styles["Tabs"]} defaultValue="PizzaSmall">
        <TabsList>
          <TabsTrigger value="PizzaSmall">Pizza 32 CM.</TabsTrigger>
          <TabsTrigger value="PizzaMedium">Pizza 40 CM.</TabsTrigger>
          <TabsTrigger value="PizzaBig">Pizza 50 CM.</TabsTrigger>
          <TabsTrigger value="Sauce">Sosy do pizzy</TabsTrigger>
          <TabsTrigger value="Drink">Napoje</TabsTrigger>
          <TabsTrigger value="Snack">Przekąski</TabsTrigger>
        </TabsList>
        <TabsContent value="PizzaSmall">
          {MenuItems(ProductType.PizzaSmall)}
        </TabsContent>
        <TabsContent value="PizzaMedium">
          {MenuItems(ProductType.PizzaMedium)}
        </TabsContent>
        <TabsContent value="PizzaBig">
          {MenuItems(ProductType.PizzaBig)}
        </TabsContent>
        <TabsContent value="Sauce">{MenuItems(ProductType.Sauce)}</TabsContent>
        <TabsContent value="Drink">{MenuItems(ProductType.Drink)}</TabsContent>
        <TabsContent value="Snack">{MenuItems(ProductType.Snack)}</TabsContent>
      </Tabs>
    </Section>
  );
};

export { MenuView };
