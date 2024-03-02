import classNames from "classnames";
import styles from "./TreeView.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

type SubItemModel = {
  name: string;
  path: string;
};

type ItemModel = {
  name: string;
  subItems?: SubItemModel[];
};

interface ITreeViewProps {
  className?: any;
  items?: ItemModel[];
  defaultSubItemSelected?: SubItemModel;
}

const TreeView: React.FC<ITreeViewProps> = ({
  className,
  items = [],
  defaultSubItemSelected,
}) => {
  const [selectedSubItemName, setSelectedSubItemName] = useState(
    defaultSubItemSelected?.name
  );

  const handleSubItemClick = ({ name }: SubItemModel) => {
    setSelectedSubItemName(name);
  };

  return (
    <div className={className}>
      {items.map(({ name, subItems }, key) => (
        <ul key={key} className={classNames(styles["TreeView"])}>
          <li
            className={classNames([
              {
                [styles["TreeViewItem-selected"]]: items.find(({ subItems }) =>
                  subItems?.some(({ name }) => name === selectedSubItemName)
                ),
              },
            ])}
          >
            {name}
          </li>
          <ul className={styles["SubItems"]}>
            {subItems?.map((subItem, key) => (
              <li
                key={key}
                className={classNames([
                  {
                    [styles["SubItem-selected"]]:
                      subItem.name === selectedSubItemName,
                  },
                ])}
                onClick={() => handleSubItemClick(subItem)}
              >
                <Link to={subItem.path}>{subItem.name}</Link>
              </li>
            ))}
          </ul>
        </ul>
      ))}
    </div>
  );
};

export { TreeView };
