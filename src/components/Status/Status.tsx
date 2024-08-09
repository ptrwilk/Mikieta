import classNames from "classnames";
import styles from "./Status.module.css";

interface IStatusProps {
  title?: string;
  text?: string;
  number?: number;
  selected?: boolean;
  error?: boolean;
}

const Status: React.FC<IStatusProps> = ({
  title,
  text,
  number,
  selected,
  error,
}) => {
  return (
    <div className={styles["Status"]}>
      <div
        className={classNames(styles["Content"], {
          [styles["Content-selected"]]: selected,
        })}
      >
        <div
          className={classNames(styles["Line"], { [styles["Error"]]: error })}
        />
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <div
              className={classNames(styles["Rectangle"], {
                [styles["Error"]]: error,
              })}
            >
              <p>{number}</p>
            </div>
            <p className={styles["Title"]}>{title}</p>
          </div>
          <p className={styles["Text"]}>{text}</p>
        </div>
      </div>
      <div className={styles["Hr"]}></div>
    </div>
  );
};

export { Status };
