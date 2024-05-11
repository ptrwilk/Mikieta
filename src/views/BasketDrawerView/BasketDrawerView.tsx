import { BasketDrawer } from "../../components";
import { useAppContext } from "../../context/AppContext";

const BasketDrawerView = () => {
  const [app, updateApp] = useAppContext();

  const closeDrawer = () => {};

  const handleRemove = (index: number) => {
    updateApp(
      "basket",
      app!.basket.filter((_, i) => i !== index)
    );
  };

  return (
    <BasketDrawer
      onClose={closeDrawer}
      onRemove={handleRemove}
      onMoveToOrderClick={closeDrawer}
      items={app?.basket}
    />
  );
};

export { BasketDrawerView };
