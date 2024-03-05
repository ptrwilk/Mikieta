import { BasketDrawer } from "../../components";
import { useAppContext } from "../../context/AppContext";

const BasketDrawerView = () => {
  const [app, updateApp] = useAppContext();

  const handleDrawerClose = () => {
    updateApp("basketDrawerOpen", false);
  };

  const handleRemove = (index: number) => {
    updateApp(
      "basket",
      app!.basket.filter((_, i) => i !== index)
    );
  };

  console.log(app?.basket);

  return (
    <BasketDrawer
      open={app?.basketDrawerOpen}
      onClose={handleDrawerClose}
      onRemove={handleRemove}
      items={app?.basket}
    />
  );
};

export { BasketDrawerView };
