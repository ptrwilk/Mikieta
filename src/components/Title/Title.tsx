import classNames from "classnames";
import { Button, Underline } from "..";
import styles from "./Title.module.css";

interface ITitleProps {
  className?: string;
}

const Title: React.FC<ITitleProps> = ({ className }) => {
  return (
    <div className={classNames(styles["Title"], className)}>
      <p className={styles["Text"]}>Stosujemy oryginalne włoskie składniki</p>
      <h1>Pyszna pizza prosto z pieca opalanego drewnem!</h1>
      <Underline big />
      <Button className={styles["Button"]} huge to="/menu">
        Zobacz Menu
      </Button>
    </div>
  );
};

export { Title };
