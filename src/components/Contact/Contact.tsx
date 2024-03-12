import styles from "./Contact.module.css";

interface IContactProps {
  icon?: any;
  title?: string;
  text1?: string;
  text2?: string;
}

const Contact: React.FC<IContactProps> = ({ icon, title, text1, text2 }) => {
  return (
    <div className={styles["Contact"]}>
      {icon}
      <div className={styles["TextContent"]}>
        <p className={styles["Title"]}>{title}</p>
        <p className={styles["Text1"]}>{text1}</p>
        <p className={styles["Text2"]}>{text2}</p>
      </div>
    </div>
  );
};

export { Contact };
