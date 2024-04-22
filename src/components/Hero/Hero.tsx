import styles from "./Hero.module.css";
import pizza from "../../assets/pizza1.jpg";
import { Button, Underline } from "..";
import classNames from "classnames";

interface IHeroProps {
  small?: boolean;
  children?: any;
}

const Hero: React.FC<IHeroProps> = ({ small = false, children }) => {
  return (
    <div
      className={classNames(styles["Hero"], { [styles["Hero-Small"]]: small })}
    >
      <img src={pizza} alt="Hero" />
      <div className={styles["Background"]} />
      {small === false && (
        <div className={styles["Content"]}>
          <p className={styles["Text"]}>Przeknaj się jak smakuje...</p>
          <h1>Najlepsza pizza w Leszczynach</h1>
          <Underline big />
          <Button className={styles["Button"]} huge to="/menu">
            Zobacz Menu
          </Button>
        </div>
      )}
      {children}
    </div>
  );
};

export { Hero };
