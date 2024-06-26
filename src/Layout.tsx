import { useMediaQuery } from "react-responsive";
import {
  FloatingBasketButton,
  Header,
  Hero,
  Logo,
  Section,
  TitleBreadcrumbBar,
} from "./components";
import { BasketModalView } from "./views/BasketModalView/BasketModalView";
import { FooterView } from "./views/FooterView/FooterView";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PurchaseDetailsModalView } from "./views/PurchaseDetailsModalView/PurchaseDetailsModalView";

interface ILayoutProps {
  children: any;
  name: string;
  basketVisible?: boolean;
}

const Layout: React.FC<ILayoutProps> = ({ children, name, basketVisible }) => {
  const isMobile = useMediaQuery({ maxWidth: 800 });

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen">
      <Hero className="flex-shrink-0" small>
        <Section className="px-4 h-full">
          <Logo
            className={classNames(
              "absolute",
              { "my-16": !isMobile },
              { "my-8": isMobile }
            )}
            small={isMobile}
          />
          <div className="flex flex-col justify-center items-center h-full">
            <Header className={classNames({ "self-end": isMobile })} />
            <TitleBreadcrumbBar
              title={name}
              items={[
                {
                  text: "Start",
                  link: "/",
                },
                {
                  text: name,
                },
              ]}
            />
          </div>
        </Section>
      </Hero>
      {children}
      {basketVisible && <FloatingBasketButton />}
      <FooterView className="mt-auto" />
      <BasketModalView />
      <PurchaseDetailsModalView />
    </div>
  );
};

export { Layout };
