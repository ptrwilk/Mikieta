import styles from "./Button.module.css";

interface IButtonProps {
  children: any;
}

const Button: React.FC<IButtonProps> = ({ children }) => {
  return <button className={styles["Button"]}>{children}</button>;
};

export { Button };
