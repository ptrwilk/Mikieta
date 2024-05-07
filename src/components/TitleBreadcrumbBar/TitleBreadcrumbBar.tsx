import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import styles from "./TitleBreadcrumbBar.module.css";
import classNames from "classnames";

type BreadcrumbModel = {
  text: string;
  link?: string;
};

interface ITitleBreadcrumbBarProps {
  className?: string;
  title: string;
  items: BreadcrumbModel[];
}

const TitleBreadcrumbBar: React.FC<ITitleBreadcrumbBarProps> = ({
  className,
  title,
  items,
}) => {
  return (
    <div className={classNames(styles["TitleBreadcrumbBar"], className)}>
      <h2>{title}</h2>
      <Breadcrumb className={styles["Breadcrumb"]}>
        {items.map(({ text, link }, key) => (
          <Fragment key={key}>
            <BreadcrumbItem>
              <BreadcrumbLink href={link}>{text}</BreadcrumbLink>
            </BreadcrumbItem>
            {key < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </Breadcrumb>
    </div>
  );
};

export { TitleBreadcrumbBar };
