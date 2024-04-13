import {
  FloatingBasketButton,
  Header,
  Hero,
  TitleBreadcrumbBar,
} from "./components";
import { BasketModalView } from "./views/BasketModalView/BasketModalView";

interface ILayoutProps {
  children: any;
  name: string;
  basketVisible?: boolean;
}

const Layout: React.FC<ILayoutProps> = ({ children, name, basketVisible }) => {
  return (
    <div>
      <Header style={{ marginTop: "3rem" }} orderButtonVisible={false} />
      <Hero small>
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
      <BasketModalView />
    </div>
  );
};

export { Layout };
