import classNames from "classnames";
import { Underline } from "..";
import styles from "./SubHeader.module.css";

interface ISubHeaderProps {
  header?: string;
  title?: string;
  description?: string;
}

const SubHeader: React.FC<ISubHeaderProps> = ({
  header,
  title,
  description,
}) => {
  return (
    <div className={styles["SubHeader"]}>
      {header && <p className={styles["Header"]}>{header}</p>}
      <h3 className="font-medium text-center">{title}</h3>
      <Underline
        className={classNames(
          { "mt-4": description },
          { "mt-2": !description }
        )}
      />
      {description && <p className="mt-3 text-center">{description}</p>}
    </div>
  );
};

export { SubHeader };
