import styles from "./Drawer.module.css";

interface IDrawerProps {
  children: any;
  open?: boolean;
}

const Drawer: React.FC<IDrawerProps> = ({ children, open }) => {
  if (!open) {
    return null;
  }

  return <div className={styles["Drawer"]}>{children}</div>;
};

export { Drawer };
