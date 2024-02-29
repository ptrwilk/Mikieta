import classNames from "classnames";
import styles from "./TreeView.module.css";

interface ITreeViewProps {
  className?: any;
}

const TreeView: React.FC<ITreeViewProps> = ({ className }) => {
  return (
    <ul className={classNames(styles["TreeView"], className)}>
      <li>Pizza</li>
      <ul>
        <li>Mała</li>
        <li>Średnia</li>
        <li>Duża</li>
      </ul>
    </ul>
  );
};

export { TreeView };
