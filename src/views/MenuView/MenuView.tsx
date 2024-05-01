import { useLoaderData } from "react-router-dom";
import { Accordeon, MenuItem, Section } from "../../components";
import styles from "./MenuView.module.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PizzaModel, ProductType } from "@/types";
import { SubHeader } from "@/components/SubHeader/SubHeader";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";

const MenuView = () => {
  const products = useLoaderData() as PizzaModel[];

  const isMobile = useMediaQuery({ maxWidth: 920 });

  const MenuItems = (productType: ProductType) => (
    <ul className={styles["Items"]}>
      {products
        .filter((x) => x.productType === productType)
        .map((product, key) => (
          <li key={key}>
            <MenuItem product={product} />
            <div className={styles["Hr"]} />
          </li>
        ))}
    </ul>
  );

  const items = [
    { value: "PizzaSmall", text: "Pizza 32 CM.", type: ProductType.PizzaSmall },
    {
      value: "PizzaMedium",
      text: "Pizza 40 CM.",
      type: ProductType.PizzaMedium,
    },
    { value: "PizzaBig", text: "Pizza 50 CM.", type: ProductType.PizzaBig },
    { value: "Sauce", text: "Sosy do pizzy", type: ProductType.Sauce },
    { value: "Drink", text: "Napoje", type: ProductType.Drink },
    { value: "Snack", text: "Przekąski", type: ProductType.Snack },
  ];

  return (
    <Section className={styles["MenuView"]}>
      <SubHeader header="Dowiedz się więcej" title="O NASZYM MENU" />
      {isMobile && (
        <ul className={classNames(styles["Tabs"], "flex flex-col gap-4")}>
          {items.map(({ text, type }, key) => (
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
                content={<>{MenuItems(type)}</>}
              />
            </li>
          ))}
        </ul>
      )}
      {!isMobile && (
        <Tabs className={styles["Tabs"]} defaultValue="PizzaSmall">
          <TabsList>
            {items.map(({ value, text }, key) => (
              <TabsTrigger key={key} value={value}>
                {text}
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map(({ value, type }, key) => (
            <TabsContent key={key} value={value}>
              {MenuItems(type)}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </Section>
  );
};

export { MenuView };
