import classNames from "classnames";
import styles from "./Underline.module.css";

interface IUnderlineProps {
  className?: string;
  big?: boolean;
}

const Underline: React.FC<IUnderlineProps> = ({ className, big }) => {
  return (
    <div
      className={classNames(
        className,
        { [styles["Underline"]]: !big },
        { [styles["Underline-Big"]]: big }
      )}
    ></div>
  );
};

export { Underline };
