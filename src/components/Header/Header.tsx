import { useMediaQuery } from "react-responsive";
import { Button, Drawer, ListItem } from "..";
import styles from "./Header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";

interface IHeaderProps {
  className?: string;
  style?: any;
}

const Header: React.FC<IHeaderProps> = ({ className, style }) => {
  const { pathname } = useLocation();

  const isMobile = useMediaQuery({ maxWidth: 800 });

  const items = [
    { text: "Start", path: "/" },
    { text: "Menu", path: "/menu" },
    { text: "Dostawa", path: "/dostawa" },
    { text: "Rezerwacja", path: "/rezerwacja" },
    { text: "Kontakt", path: "/kontakt" },
  ];

  return (
    <>
      <div className={classNames(styles["Header"], className)} style={style}>
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
            <ul className={classNames(styles["Items"])}>
              {items.map(({ path, text }, key) => (
                <li key={key}>
                  <NavLink to={path}>{text}</NavLink>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export { Header };
