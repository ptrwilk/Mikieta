import { useMediaQuery } from "react-responsive";
import { Button, Drawer, ListItem } from "..";
import styles from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation } from "react-router-dom";

interface IHeaderProps {
  style?: any;
  orderButtonVisible?: boolean;
}

const Header: React.FC<IHeaderProps> = ({
  style,
  orderButtonVisible = true,
}) => {
  const { pathname } = useLocation();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const items = [
    { text: "Start", path: "/" },
    { text: "Menu", path: "/menu" },
    { text: "Dostawa", path: "/dostawa" },
    { text: "Rezerwacja", path: "/rezerwacja" },
    { text: "Kontakt", path: "/kontakt" },
  ];

  return (
    <>
      <div className={styles.Header} style={style}>
        <p className={styles.Logo}>LOGO</p>
        {isMobile && (
          <Drawer
            trigger={
              <Button light>
                <GiHamburgerMenu size={34} />
              </Button>
            }
          >
            <ul className="mt-4">
              {items.map((item, key) => (
                <ListItem
                  key={key}
                  {...item}
                  selected={item.path === pathname}
                />
              ))}
              {pathname !== "/menu" && (
                <li className="flex justify-center mt-4">
                  <Button huge border to="/menu">
                    Zamów online
                  </Button>
                </li>
              )}
            </ul>
          </Drawer>
        )}
        {!isMobile && (
          <>
            <ul className={styles["Items"]}>
              {items.map(({ path, text }, key) => (
                <li key={key}>
                  <a href={path}>{text}</a>
                </li>
              ))}
            </ul>
            {orderButtonVisible && (
              <Button className={styles["Button"]} huge to="/menu">
                Zamów online
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export { Header };
