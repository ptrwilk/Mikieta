import styles from "./DayHourSpan.module.css";

interface IDayHourSpanProps {
  text: string;
  from: string;
  to: string;
  closed?: boolean;
}

const DayHourSpan: React.FC<IDayHourSpanProps> = ({
  text,
  from,
  to,
  closed,
}) => {
  return (
    <p className={styles["DayHourSpan"]}>
      {text}:
      <span>
        {/* Time that comes is expected to be in format 00:00:00 */}
        {closed
          ? "Nieczynne"
          : `${from.substring(0, 5)} - ${to.substring(0, 5)}`}
      </span>
    </p>
  );
};

export { DayHourSpan };
