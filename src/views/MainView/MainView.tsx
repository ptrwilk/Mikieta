import { useMediaQuery } from "react-responsive";
import {
  Button,
  Header,
  Hero,
  Logo,
  Map,
  Section,
  Title,
} from "../../components";
import { SubHeader } from "../../components/SubHeader/SubHeader";
import { AboutUsView } from "../AboutUsView/AboutUsView";
import { FooterView } from "../FooterView/FooterView";
import classNames from "classnames";
import { LearnMoreSection } from "./Sections/LearnMoreSection";

function MainView() {
  const isMobile = useMediaQuery({ maxWidth: 800 });

  return (
    <>
      <Hero>
        <Section className="flex flex-col justify-center h-full px-4">
          <div className="flex justify-between mt-32">
            <Logo />
            <Header className={classNames({ "mx-auto": !isMobile })} />
            {!isMobile && (
              <Button className="self-start flex-shrink-0" huge to="/menu">
                Zamów online
              </Button>
            )}
          </div>
          <Title className="flex-grow" />
        </Section>
      </Hero>
      <AboutUsView />
      <LearnMoreSection />
      <div className="flex flex-col gap-12 mt-24 mb-24">
        <SubHeader
          header="Masz jakiekolwiek pytania?"
          title="NAWIĄŻ Z NAMI KONTAKT"
          description="Napisz do nas lub zadzwoń!"
        />
        <Map />
      </div>
      <FooterView />
    </>
  );
}

export default MainView;
