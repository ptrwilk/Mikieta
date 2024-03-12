import styles from "./Radio.module.css";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

interface IRadioProps {
  checked?: boolean;
  text?: string;
  onChecked?: () => void;
}

const Radio: React.FC<IRadioProps> = ({ checked, text, onChecked }) => {
  return (
    <div className={styles["Radio"]}>
      {checked ? (
        <MdRadioButtonChecked
          className={styles["Icon"]}
          size={20}
          onClick={onChecked}
        />
      ) : (
        <MdRadioButtonUnchecked
          className={styles["Icon"]}
          size={20}
          onClick={onChecked}
        />
      )}
      <p>{text}</p>
    </div>
  );
};

export { Radio };
