import classNames from "classnames";
import styles from "./Map.module.css";

interface IMapProps {
  className?: string;
}

const Map: React.FC<IMapProps> = ({ className }) => {
  return (
    <div className={classNames(className, styles["Map"])}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2557.286687846871!2d18.6303916777885!3d50.13706847153389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711498753a44881%3A0x35b4dc187128805a!2sJuliana%20Tuwima%202%2C%2044-238%20Czerwionka-Leszczyny%2C%20Poland!5e0!3m2!1sen!2sus!4v1723199398229!5m2!1sen!2sus"
        height="450"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export { Map };
