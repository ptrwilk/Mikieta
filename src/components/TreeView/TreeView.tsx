import classNames from "classnames";
import styles from "./TreeView.module.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { groupBy } from "../../helpers";

type SubItemModel = {
  name: string;
  path: string;
  index?: number;
  parent?: ItemModel;
};

type ItemModel = {
  name: string;
  path: string;
  subItems?: SubItemModel[];
};

interface ITreeViewProps {
  className?: any;
  items?: ItemModel[];
}

const TreeView: React.FC<ITreeViewProps> = ({ className, items = [] }) => {
  const location = useLocation();

  const [myItems, _] = useState(
    items.map((x) => {
      x.subItems!.forEach((z) => {
        z.parent = x;
      });

      return x;
    })
  );

  const getLocation = () => {
    return location.pathname === "/"
      ? { pathname: "/pizza", search: "?crust=thin&size=small" }
      : location;
  };

  const isSelected = (item: ItemModel | SubItemModel) => {
    return isSubItemModel(item)
      ? getLocation().search.includes(item.path)
      : getLocation().pathname.includes(item.path);
  };

  function isSubItemModel(item: any): item is SubItemModel {
    return "parent" in item;
  }

  const getSelectedItems = () => {
    const selectedItems: (ItemModel | SubItemModel)[] = [];

    myItems.forEach((myItem) => {
      if (isSelected(myItem)) {
        selectedItems.push(myItem);

        myItem.subItems!.forEach((subItem) => {
          if (isSelected(subItem)) {
            selectedItems.push(subItem);
          }
        });
      }
    });

    return selectedItems;
  };

  const subItemToPath = (item: SubItemModel) => {
    const parent = item.parent!;

    const getSubItemSelectedSibling = (currentSubItem: SubItemModel) => {
      const sub = getSelectedItems()
        .filter(isSubItemModel)
        .find(
          (x) =>
            x.parent?.name === parent.name && x.index !== currentSubItem.index
        );

      return sub;
    };

    const getSubItemSibling = (currentSubItem: SubItemModel) => {
      return currentSubItem.parent?.subItems?.find(
        (x) => x.index !== currentSubItem.index
      );
    };

    const selectedSibling = getSubItemSelectedSibling(item);

    const sibling = getSubItemSibling(item);

    if (selectedSibling) {
      return `/${parent.path}?${item.path}&${selectedSibling.path}`;
    } else if (sibling) {
      return `/${parent.path}?${item.path}&${sibling.path}`;
    } else {
      return `/${parent.path}?${item.path}`;
    }
  };

  return (
    <div className={className}>
      {myItems.map((myItem, key) => (
        <ul
          key={key}
          className={classNames(styles["TreeView"], {
            [styles["margin-top"]]: key !== 0,
          })}
        >
          <li
            className={classNames([
              {
                [styles["TreeViewItem-selected"]]: isSelected(myItem),
              },
            ])}
          >
            {myItem.name}
          </li>
          {groupBy(myItem.subItems!, ({ index }) => index).map((x, xKey) => (
            <ul key={xKey} className={styles["SubItems"]}>
              {x?.map((subItem, key) => (
                <li
                  key={key}
                  className={classNames([
                    {
                      [styles["SubItem-selected"]]: isSelected(subItem),
                    },
                  ])}
                >
                  <Link to={subItemToPath(subItem)}>{subItem.name}</Link>
                </li>
              ))}
            </ul>
          ))}
        </ul>
      ))}
    </div>
  );
};

export { TreeView };
