import {
  FloatingBasketButton,
  Header,
  Hero,
  TitleBreadcrumbBar,
} from "./components";
import { BasketModalView } from "./views/BasketModalView/BasketModalView";
import { ItemModalView } from "./views/ItemModalView/ItemModalView";
import { MenuView } from "./views/MenuView/MenuView";
import { FooterView } from "./views/FooterView/FooterView";

interface ILayoutProps {
  children: any;
  name: string;
  basketVisible?: boolean;
}

const Layout: React.FC<ILayoutProps> = ({ children, name, basketVisible }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header style={{ marginTop: "3rem" }} orderButtonVisible={false} />
      <Hero className="flex-shrink-0" small>
        <div className="flex flex-col justify-end items-center h-full pb-8">
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
      </Hero>
      {children}
      {basketVisible && <FloatingBasketButton />}
      <FooterView className="mt-auto" />
      <BasketModalView />
      <ItemModalView />
    </div>
  );
};

export { Layout };
