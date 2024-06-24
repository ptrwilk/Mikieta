import { useLoaderData } from "react-router-dom";
import { Accordeon, MenuItem, Section } from "../../components";
import styles from "./MenuView.module.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductModel, PizzaType, ProductType } from "@/types";
import { SubHeader } from "@/components/SubHeader/SubHeader";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";
import { useAppContext } from "@/context/AppContext";

const MenuView = () => {
  const [app, updateApp] = useAppContext();
  const products = useLoaderData() as ProductModel[];

  const isMobile = useMediaQuery({ maxWidth: 920 });

  const handleClick = (product: ProductModel) => {
    updateApp("purchaseModel", product);
  };

  const MenuItems = (productType: ProductType, pizzaType: PizzaType | null) => {
    return (
      <ul className={styles["Items"]}>
        {products
          .filter(
            (x) => x.productType === productType && x.pizzaType === pizzaType
          )
          .map((product, key) => (
            <li key={key}>
              <MenuItem
                product={product}
                onClick={() => handleClick(product)}
              />
              <div className={styles["Hr"]} />
            </li>
          ))}
      </ul>
    );
  };

  const items = [
    {
      productType: ProductType.Pizza,
      pizzaType: PizzaType.Small,
      text: "Pizza",
      index: "0",
    },
    {
      productType: ProductType.Sauce,
      pizzaType: null,
      text: "Sosy do pizzy",
      index: "1",
    },
    {
      productType: ProductType.Drink,
      pizzaType: null,
      text: "Napoje",
      index: "2",
    },
    {
      productType: ProductType.Snack,
      pizzaType: null,
      text: "Przekąski",
      index: "3",
    },
  ];

  return (
    <Section className={styles["MenuView"]}>
      <SubHeader header="Dowiedz się więcej" title="O NASZYM MENU" />
      {isMobile && (
        <ul className={classNames(styles["Tabs"], "flex flex-col gap-4")}>
          {items.map(({ text, productType, pizzaType }, key) => (
            <li key={key}>
              <Accordeon
                trigger={(expanded) => (
                  <p
                    className={classNames(
                      { "text-red-700": expanded },
                      "uppercase font-semibold text-xl"
                    )}
                  >
                    {text}
                  </p>
                )}
                content={<>{MenuItems(productType, pizzaType)}</>}
              />
            </li>
          ))}
        </ul>
      )}
      {!isMobile && (
        <Tabs className={styles["Tabs"]} defaultValue="0">
          <TabsList>
            {items.map(({ index, text }, key) => (
              <TabsTrigger key={key} value={index}>
                {text}
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map(({ productType, pizzaType, index }, key) => (
            <TabsContent key={key} value={index}>
              {MenuItems(productType, pizzaType)}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </Section>
  );
};

export { MenuView };
