import classNames from "classnames";
import styles from "./Status.module.css";

interface IStatusProps {
  title?: string;
  text?: string;
  number?: number;
  selected?: boolean;
}

const Status: React.FC<IStatusProps> = ({ title, text, number, selected }) => {
  return (
    <div className={styles["Status"]}>
      <div
        className={classNames(styles["Content"], {
          [styles["Content-selected"]]: selected,
        })}
      >
        <div className={styles["Line"]} />
        <div className={styles["Rectangle"]}>
          <p>{number}</p>
        </div>
        <div className={styles["Text-Content"]}>
          <p className={styles["Title"]}>{title}</p>
          <p className={styles["Text"]}>{text}</p>
        </div>
      </div>
      <div className={styles["Hr"]}></div>
    </div>
  );
};

export { Status };
