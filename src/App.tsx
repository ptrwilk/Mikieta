import { Outlet, useLoaderData } from "react-router-dom";
import { BasketDrawer, Drawer, Header, Hero } from "./components";
import { BasketDrawerView } from "./views/BasketDrawerView/BasketDrawerView";
import { ContactView } from "./views/ContactView/ContactView";

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
      <ContactView />
      <BasketDrawerView />
    </div>
  );
}

export default App;
