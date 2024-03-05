import { Breadcrumb, Button, OrderList } from "../../components";
import { useAppContext } from "../../context/AppContext";
import styles from "./OrderView.module.css";

const OrderView = () => {
  const [app, updateApp] = useAppContext();

  const handleRemove = (index: number) => {
    updateApp(
      "basket",
      app!.basket.filter((_, i) => i !== index)
    );
  };

  return (
    <div className={styles["OrderView"]}>
      <Breadcrumb
        items={[
          { text: "Menu", path: "/" },
          { text: "Zamówienie", path: "/order" },
        ]}
      />
      <OrderList
        className={styles["OrderList"]}
        items={app?.basket}
        onRemove={handleRemove}
      />
      {app!.basket.length > 0 && (
        <div className={styles["Buttons"]}>
          <Button huge>Zamawiam na wynos</Button>
          <Button huge light>
            Rezersuję stolik
          </Button>
        </div>
      )}
    </div>
  );
};

export { OrderView };
