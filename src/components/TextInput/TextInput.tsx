import { useState } from "react";
import styles from "./TextInput.module.css";
import classNames from "classnames";

interface ITextInputProps {
  placeholder?: string;
  prompts?: string[];
  onSelect?: (value: string) => void;
}

const TextInput: React.FC<ITextInputProps> = ({
  placeholder,
  prompts = [],
  onSelect,
}) => {
  const [promptVisible, setPromptVisible] = useState(false);
  const [value, setValue] = useState<string | undefined>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredPrompts = prompts.filter((x) => x.includes(value ?? ""));

  const handleChange = (e: any) => {
    const v = e.target.value as string;

    setValue(v);
    setPromptVisible(v.length !== 0);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e: any) => {
    switch (e.key) {
      case "Enter":
        var v = filteredPrompts[selectedIndex];

        setValue(v);
        setPromptVisible(false);
        onSelect?.(v);
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

    setValue(v);
    onSelect?.(v);
  };

  const handleBlur = () => {
    setPromptVisible(false);
  };

  const handleFocus = () => {
    setPromptVisible(value?.length !== 0);
  };

  return (
    <div className={styles["TextInput"]}>
      <input
        placeholder={placeholder}
        value={value ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      ></input>
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

export { TextInput };
