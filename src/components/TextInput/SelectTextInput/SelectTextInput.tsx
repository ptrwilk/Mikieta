import { FaChevronDown } from "react-icons/fa";
import { TextInputShared } from "../Shared/TextInputShared/TextInputShared";
import styles from "./SelectTextInput.module.css";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

export type SelectionOption = {
  index: number;
  value: string;
};

interface ISelectTextInputProps {
  placeholder?: string;
  caption?: string;
  value?: SelectionOption;
  items?: SelectionOption[];
  error?: boolean;
  onValueChange?: (value: SelectionOption) => void;
}

const SelectTextInput: React.FC<ISelectTextInputProps> = (props) => {
  const { items = [], value, error, onValueChange } = props;

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dropdownRef = useRef<any>();
  const wrapperRef = useRef<any>();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdownVisible(false);
  }, items);

  const handleClickOutside = (event: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target)
    ) {
      setDropdownVisible(false);
    }
  };

  const handleInputClick = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleItemClick = (index: number) => {
    onValueChange?.(items.find((x) => x.index === index)!);
  };

  return (
    <TextInputShared
      className={styles["SelectTextInput"]}
      {...props}
      value={value?.value}
      error={error}
      onValueChange={() => {}}
    >
      <>
        <div
          ref={wrapperRef}
          className={styles["Wrapper"]}
          onClick={handleInputClick}
        >
          <FaChevronDown className={styles["Icon-Arrow"]} size={14} />
        </div>
        {dropdownVisible && (
          <div ref={dropdownRef} className={styles["DropDown"]}>
            <ul>
              {items?.map(({ index, value: v }, key) => (
                <li
                  key={key}
                  className={classNames({
                    [styles["Selected"]]: index === value?.index,
                  })}
                  onClick={() => handleItemClick(index)}
                >
                  <p className={styles["Text"]}>{v}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    </TextInputShared>
  );
};

export { SelectTextInput };
