import { useState } from "react";
import styles from "./FilterTextInput.module.css";
import classNames from "classnames";
import { TextInputShared } from "../Shared/TextInputShared/TextInputShared";

interface IFilterTextInputProps {
  placeholder?: string;
  prompts?: string[];
  caption?: string;
  onSelect?: (value: string) => void;
}

const FilterTextInput: React.FC<IFilterTextInputProps> = ({
  placeholder,
  prompts = [],
  caption,
  onSelect,
}) => {
  const [promptVisible, setPromptVisible] = useState(false);
  const [value, setValue] = useState<string | undefined>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredPrompts = prompts.filter((x) => x.includes(value ?? ""));

  const handleChange = (v: string | undefined) => {
    setValue(v);
    setPromptVisible(v?.length !== 0);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e: any) => {
    switch (e.key) {
      case "Enter":
        var v = filteredPrompts[selectedIndex];

        setValue(undefined);
        setPromptVisible(false);
        if (v) {
          onSelect?.(v);
        }
        break;

      case "ArrowDown":
        setSelectedIndex((prev) =>
          prev < filteredPrompts.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
    }
  };

  const onItemClick = () => {
    var v = filteredPrompts[selectedIndex];

    setValue(undefined);
    onSelect?.(v);
  };

  const handleBlur = () => {
    setPromptVisible(false);
  };

  const handleFocus = () => {
    setPromptVisible((value?.length ?? 0) !== 0);
  };

  return (
    <div className={styles["FilterTextInput"]}>
      <TextInputShared
        placeholder={placeholder}
        caption={caption}
        value={value ?? ""}
        onValueChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      {promptVisible && filteredPrompts.length > 0 && (
        <ul className={styles["Prompt"]}>
          {filteredPrompts.map((content, key) => (
            <li
              onMouseEnter={() => setSelectedIndex(key)}
              onMouseDown={onItemClick}
              className={classNames({
                [styles["Selected"]]: key === selectedIndex,
              })}
              key={key}
            >
              {content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { FilterTextInput };
