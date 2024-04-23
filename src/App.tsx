import { Outlet, useLoaderData } from "react-router-dom";
import { Header, Hero } from "./components";
import { AboutUsView } from "./views/AboutUsView/AboutUsView";
import { FooterView } from "./views/FooterView/FooterView";

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
      <FooterView />
    </div>
  );
}

export default App;
