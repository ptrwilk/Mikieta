import classNames from "classnames";
import styles from "./Map.module.css";

interface IMapProps {
  className?: string;
}

const Map: React.FC<IMapProps> = ({ className }) => {
  return (
    <div className={classNames(className, styles["Map"])}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81734.12890023208!2d18.97296089784045!3d50.19495078282119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716ce2336a1ccd1%3A0xb9af2a350559fabb!2sKatowice!5e0!3m2!1sen!2spl!4v1713868192952!5m2!1sen!2spl"
        height="450"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export { Map };
