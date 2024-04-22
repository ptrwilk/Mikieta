import classNames from "classnames";
import styles from "./Underline.module.css";

interface IUnderlineProps {
  big?: boolean;
}

const Underline: React.FC<IUnderlineProps> = ({ big }) => {
  return (
    <div
      className={classNames(
        { [styles["Underline"]]: !big },
        { [styles["Underline-Big"]]: big }
      )}
    ></div>
  );
};

export { Underline };
