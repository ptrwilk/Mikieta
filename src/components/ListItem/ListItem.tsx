import classNames from "classnames";
import styles from "./ListItem.module.css";
import { NavLink } from "react-router-dom";

interface IListItemProps {
  text?: string;
  path?: string;
  selected?: boolean;
}

const ListItem: React.FC<IListItemProps> = ({ text, path, selected }) => {
  return (
    <li
      className={classNames(styles["ListItem"], {
        [styles["ListItem-Selected"]]: selected,
      })}
    >
      <NavLink className={styles["Text"]} to={path!}>
        {text}
      </NavLink>
    </li>
  );
};

export { ListItem };
