import { FaChevronRight } from "react-icons/fa";
import styles from "./Breadcrumb.module.css";
import { Link } from "react-router-dom";

type BreadcrumbModel = {
  text: string;
  path: string;
};

interface IBreadcrumbProps {
  items?: BreadcrumbModel[];
}

const Breadcrumb: React.FC<IBreadcrumbProps> = ({ items = [] }) => {
  return (
    <ul className={styles["Breadcrumb"]}>
      {items.map(({ text, path }, key) => (
        <li key={key}>
          <div className={styles["Content"]}>
            <Link className={styles["Text"]} to={path}>
              {text}
            </Link>
            {items.length - 1 !== key && <FaChevronRight size={12} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export { Breadcrumb };
