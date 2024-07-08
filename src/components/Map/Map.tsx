import classNames from "classnames";
import styles from "./Map.module.css";

interface IMapProps {
  className?: string;
}

const Map: React.FC<IMapProps> = ({ className }) => {
  return (
    <div className={classNames(className, styles["Map"])}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2556.990889936145!2d18.620610077436414!3d50.1426022715351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711498547261d35%3A0xc43296cb183aca7d!2sKsi%C4%99dza%20Adolfa%20Pojdy%205%2C%2044-238%20Czerwionka-Leszczyny!5e0!3m2!1sen!2spl!4v1720455795645!5m2!1sen!2spl"
        height="450"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export { Map };
