import styles from "./DayHourSpan.module.css";

interface IDayHourSpanProps {
  text: string;
  from: string;
  to: string;
}

const DayHourSpan: React.FC<IDayHourSpanProps> = ({ text, from, to }) => {
  return (
    <p className={styles["DayHourSpan"]}>
      {text}:
      <span>
        {from} - {to}
      </span>
    </p>
  );
};

export { DayHourSpan };
