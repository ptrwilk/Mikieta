import { Outlet, useLoaderData } from "react-router-dom";
import { Header, Hero } from "./components";

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
    </div>
  );
}

export default App;
