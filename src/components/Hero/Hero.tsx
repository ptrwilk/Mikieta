import styles from "./Hero.module.css";
import pizza from "../../assets/pizza1.jpg";
import { Button } from "..";

const Hero = () => {
  return (
    <div className={styles["Hero"]}>
      <img src={pizza} alt="Hero" />
      <div className={styles["Background"]} />
      <div className={styles["Content"]}>
        <h1>
          Smakowite pizze
          <br />
          dostępne w naszej
          <br />
          restauracji
        </h1>
        <p>
          Zasmakuj w wyjątkowych pizzach, stworzonych z pasją i najlepszych
          <br />
          składników. Nasza restauracja to idealne miejsce dla miłośników pizzy.
        </p>
        <div className={styles["Buttons"]}>
          <Button>Zamów</Button>
          <Button dark={false}>Zarezerwuj</Button>
        </div>
      </div>
    </div>
  );
};

export { Hero };
