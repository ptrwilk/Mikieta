import { Outlet, useLoaderData } from "react-router-dom";
import { BasketDrawer, Drawer, Header, Hero } from "./components";
import { BasketDrawerView } from "./views/BasketDrawerView/BasketDrawerView";

function App() {
  const filters = useLoaderData() as string[];

  return (
    <div
      style={{
        margin: "auto",
        maxWidth: 1440,
      }}
    >
      <Header />
      <Hero />
      <Outlet context={filters} />
      <BasketDrawerView />
    </div>
  );
}

export default App;
