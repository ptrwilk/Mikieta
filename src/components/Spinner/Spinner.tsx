import React from "react";
import styles from "./Spinner.module.css";
import classNames from "classnames";

interface ISpinnerProps {
  className?: string;
  children: any;
  size?: number;
  loading?: boolean;
}

const Spinner: React.FC<ISpinnerProps> = ({
  className,
  children,
  size = 25,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <div className={classNames(styles["Spinner"], className)}>
          <div className="opacity-0">{children}</div>
          <div
            className={classNames(styles["Spinner-AnimatedCircle"])}
            style={{ width: size, height: size }}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export { Spinner };
