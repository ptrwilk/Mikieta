import { useEffect, useState } from "react";
import styles from "./Switch.module.css";
import classNames from "classnames";

interface ISwitchProps {
  caption?: string;
  captionHuge?: boolean;
  content?: any;
  children?: any;
  switched?: boolean;
  defaultSwitched?: boolean;
  star?: boolean;
  onSwitchChange?: () => void;
}

const Switch: React.FC<ISwitchProps> = ({
  caption,
  content,
  captionHuge,
  children,
  switched: s = false,
  defaultSwitched,
  star,
  onSwitchChange,
}) => {
  const [switched, setSwitched] = useState(s ?? defaultSwitched);

  useEffect(() => {
    setSwitched(s);
  }, [s]);

  useEffect(() => {
    if (defaultSwitched) {
      setSwitched(defaultSwitched);
    }
  }, [defaultSwitched]);

  return (
    <div className={styles["Switch"]}>
      {caption && (
        <p
          className={classNames(styles["Caption"], {
            [styles["Caption-Huge"]]: captionHuge,
          })}
        >
          {caption}
          {star && <span className={styles["Star"]}>*</span>}
        </p>
      )}
      {switched === false ? (
        <div className={styles["Content"]}>
          {content}
          <p
            className={styles["Text"]}
            onClick={() =>
              onSwitchChange ? onSwitchChange() : setSwitched(true)
            }
          >
            Zmień
          </p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export { Switch };
