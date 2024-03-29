import classNames from "classnames";
import styles from "./AboutUsItem.module.css";

interface IAboutUsItemProps {
  className?: string;
  icon: any;
  content: any;
}

const AboutUsItem: React.FC<IAboutUsItemProps> = ({
  className,
  icon,
  content,
}) => {
  return (
    <div className={classNames(className, styles["AboutUsItem"])}>
      {icon}
      <p className={styles["Title"]}>Gdzie jesteśmy?</p>
      {content}
    </div>
  );
};

export { AboutUsItem };
