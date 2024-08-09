import classNames from "classnames";
import styles from "./Section.module.css";

interface ISectionProps {
  className?: string;
  children: any;
  variant?: "div" | "ul";
}

const Section: React.FC<ISectionProps> = ({
  className,
  children,
  variant = "div",
}) => {
  return variant === "ul" ? (
    <ul className={classNames(className, styles["Section"])}>{children}</ul>
  ) : (
    <div className={classNames(className, styles["Section"])}>{children}</div>
  );
};

export { Section };
