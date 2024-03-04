import { BasketDrawer } from "../../components";
import { useAppContext } from "../../context/AppContext";

const BasketDrawerView = () => {
  const [app, updateApp] = useAppContext();

  const handleDrawerClose = () => {
    updateApp("basketDrawerOpen", false);
  };

  console.log(app?.basket);

  return (
    <BasketDrawer
      open={app?.basketDrawerOpen}
      onClose={handleDrawerClose}
      items={app?.basket}
    />
  );
};

export { BasketDrawerView };
