import classNames from "classnames";
import styles from "./ListItem.module.css";

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
      <a className={styles["Text"]} href={path}>
        {text}
      </a>
    </li>
  );
};

export { ListItem };
