import styles from "./Hero.module.css";
import pizza from "../../assets/pizza1.jpg";
import { Button, Title, Underline } from "..";
import classNames from "classnames";

interface IHeroProps {
  className?: string;
  small?: boolean;
  children?: any;
}

const Hero: React.FC<IHeroProps> = ({ className, small = false, children }) => {
  return (
    <div
      className={classNames(className, styles["Hero"], {
        [styles["Hero-Small"]]: small,
      })}
    >
      <img src={pizza} alt="Hero" />
      <div className={styles["Background"]} />
      {children}
    </div>
  );
};

export { Hero };
