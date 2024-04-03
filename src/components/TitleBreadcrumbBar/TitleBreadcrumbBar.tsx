import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import styles from "./TitleBreadcrumbBar.module.css";

type BreadcrumbModel = {
  text: string;
  link?: string;
};

interface ITitleBreadcrumbBarProps {
  title: string;
  items: BreadcrumbModel[];
}

const TitleBreadcrumbBar: React.FC<ITitleBreadcrumbBarProps> = ({
  title,
  items,
}) => {
  return (
    <div className={styles["TitleBreadcrumbBar"]}>
      <h2>{title}</h2>
      <Breadcrumb className={styles["Breadcrumb"]}>
        {items.map(({ text, link }, key) => (
          <BreadcrumbItem>
            <BreadcrumbLink href={link}>{text}</BreadcrumbLink>
            {key < items.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  );
};

export { TitleBreadcrumbBar };
