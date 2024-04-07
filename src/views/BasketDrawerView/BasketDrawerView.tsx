import { BasketDrawer } from "../../components";
import { useAppContext } from "../../context/AppContext";

const BasketDrawerView = () => {
  const [app, updateApp] = useAppContext();

  const closeDrawer = () => {
    updateApp("basketDrawerOpen", false);
  };

  const handleRemove = (index: number) => {
    updateApp(
      "basket",
      app!.basket.filter((_, i) => i !== index)
    );
  };

  return (
    <BasketDrawer
      open={app?.basketModalOpen}
      onClose={closeDrawer}
      onRemove={handleRemove}
      onMoveToOrderClick={closeDrawer}
      items={app?.basket}
    />
  );
};

export { BasketDrawerView };
