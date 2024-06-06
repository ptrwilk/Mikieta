import classNames from "classnames";
import styles from "./Message.module.css";

interface IMessageProps {
  className?: string;
  message?: string;
  error?: boolean;
}

const Message: React.FC<IMessageProps> = ({ className, message, error }) => {
  return (
    <div
      className={classNames(className, styles["Message"], {
        [styles["Message-Error"]]: error,
      })}
    >
      <p>{message}</p>
    </div>
  );
};

export { Message };
