import { Outlet, useLoaderData } from "react-router-dom";
import { Header, Hero } from "./components";
import { ContactView } from "./views/ContactView/ContactView";
import { AboutUsView } from "./views/AboutUsView/AboutUsView";

function App() {
  const filters = useLoaderData() as string[];

  return (
    <div
      style={{
        margin: "auto",
      }}
    >
      <Header />
      <Hero />
      <AboutUsView />
      <Outlet context={filters} />
      <ContactView />
    </div>
  );
}

export default App;
