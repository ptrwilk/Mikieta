import { Header, Hero } from "./components";
import { MenuView } from "./views/MenuView/MenuView";

function App() {
  return (
    <div
      style={{
        margin: "auto",
        maxWidth: 1440,
      }}
    >
      <Header />
      <Hero />
      <MenuView />
    </div>
  );
}

export default App;
