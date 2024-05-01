import { Header, Hero, Map } from "./components";
import { SubHeader } from "./components/SubHeader/SubHeader";
import { AboutUsView } from "./views/AboutUsView/AboutUsView";
import { FooterView } from "./views/FooterView/FooterView";

function App() {
  return (
    <div style={{}}>
      <Header />
      <Hero />
      <AboutUsView />
      <div className="flex flex-col gap-12 mt-24 mb-24">
        <SubHeader
          header="Masz pytania?"
          title="SKONTAKTUJ SIĘ Z NAMI"
          description="Napisz lub zadzwoń do nas!"
        />
        <Map />
      </div>
      <FooterView />
    </div>
  );
}

export default App;
