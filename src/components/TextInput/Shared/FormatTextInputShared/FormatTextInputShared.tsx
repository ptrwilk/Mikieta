import { useEffect, useState } from "react";
import { TextInputShared } from "../TextInputShared/TextInputShared";

interface IFormatTextInputSharedProps {
  placeholder?: string;
  caption?: string;
  value?: string;
  error?: boolean;
  onValueChange?: (value: string | undefined) => void;
  onErrorChange?: (error: boolean) => void;
  canInvokeValueChange?: (value: string | undefined) => boolean;
  getDisplayedValue?: (value: string | undefined) => string | undefined;
}

const FormatTextInputShared: React.FC<IFormatTextInputSharedProps> = ({
  placeholder,
  caption,
  value,
  error: defaultError,
  onValueChange,
  onErrorChange,
  canInvokeValueChange,
  getDisplayedValue,
}) => {
  const [displayedValue, setDisplayedValue] = useState<string | undefined>();
  const [error, setError] = useState(defaultError);

  useEffect(() => {
    setError(defaultError);
  }, [defaultError]);

  const handleChange = (value?: string) => {
    if (canInvokeValueChange?.(value)) onValueChange?.(value);
  };

  const handleBlur = () => {
    const dValue = getDisplayedValue?.(value);

    setError(
      defaultError || ((value?.length ?? 0) > 0 && dValue === undefined)
    );
    setDisplayedValue(dValue);
  };

  const handleFocus = () => {
    setDisplayedValue(undefined);
  };

  return (
    <TextInputShared
      placeholder={placeholder}
      caption={caption}
      value={displayedValue ?? value}
      error={error}
      onValueChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onErrorChange={onErrorChange}
    />
  );
};

export { FormatTextInputShared };
