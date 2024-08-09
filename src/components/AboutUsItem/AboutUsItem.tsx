import classNames from "classnames";
import styles from "./AboutUsItem.module.css";

interface IAboutUsItemProps {
  className?: string;
  title?: string;
  icon: any;
  content: any;
}

const AboutUsItem: React.FC<IAboutUsItemProps> = ({
  className,
  title,
  icon,
  content,
}) => {
  return (
    <div className={classNames(className, styles["AboutUsItem"])}>
      {icon}
      <p className={styles["Title"]}>{title}</p>
      {content}
    </div>
  );
};

export { AboutUsItem };
