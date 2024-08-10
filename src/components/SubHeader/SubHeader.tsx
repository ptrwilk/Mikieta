import classNames from "classnames";
import { Underline } from "..";
import styles from "./SubHeader.module.css";

interface ISubHeaderProps {
  header?: string;
  title?: string;
  description?: string;
  left?: boolean;
}

const SubHeader: React.FC<ISubHeaderProps> = ({
  header,
  title,
  description,
  left,
}) => {
  return (
    <div
      className={classNames(styles["SubHeader"], {
        [styles["SubHeader-Left"]]: left,
      })}
    >
      {header && (
        <p
          className={classNames(styles["Header"], {
            [styles["Header-Left"]]: left,
          })}
        >
          {header}
        </p>
      )}
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
