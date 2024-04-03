import { Header, Hero, TitleBreadcrumbBar } from "./components";

const MenuLayout = () => {
  return (
    <div>
      <Header style={{ marginTop: "3rem" }} orderButtonVisible={false} />
      <Hero small>
        <div className="flex flex-col justify-end items-center h-full pb-8">
          <TitleBreadcrumbBar
            title="Menu"
            items={[
              {
                text: "Start",
                link: "/",
              },
              {
                text: "Menu",
              },
            ]}
          />
        </div>
      </Hero>
    </div>
  );
};

export { MenuLayout };
