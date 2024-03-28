import styles from "./Hero.module.css";
import pizza from "../../assets/pizza1.jpg";
import { Button } from "..";

const Hero = () => {
  return (
    <div className={styles["Hero"]}>
      <img src={pizza} alt="Hero" />
      <div className={styles["Background"]} />
      <div className={styles["Content"]}>
        <p>Przeknaj się jak smakuje...</p>
        <h1>Najlepsza pizza w Leszczynach</h1>
        <div className={styles["Line"]} />
        <Button className={styles["Button"]} huge>
          Zobacz Menu
        </Button>
      </div>
    </div>
  );
};

export { Hero };
