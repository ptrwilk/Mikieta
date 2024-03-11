import { FormatTextInputShared } from "./Shared/FormatTextInputShared/FormatTextInputShared";

interface IZipCodeTextInputProps {
  placeholder?: string;
  caption?: string;
  value?: string;
  error?: boolean;
  onValueChange?: (value: string | undefined) => void;
  onErrorChange?: (error: boolean) => void;
}

const ZipCodeTextInput: React.FC<IZipCodeTextInputProps> = (props) => {
  const zipCodeRegex = /^(\d{1}(?!\-)|\d{2}(-?\d{0,3})?)?$/;
  const displayZipCodeRegex = /^(\d{5})|(\d{2}-\d{3})$/;

  return (
    <FormatTextInputShared
      {...props}
      canInvokeValueChange={(value?: string) => {
        if (!value) {
          return true;
        }

        return zipCodeRegex.test(value);
      }}
      getDisplayedValue={(value?: string) => {
        if (value && displayZipCodeRegex.test(value)) {
          if (value[2] !== "-") {
            return value.substring(0, 2) + "-" + value.substring(2);
          } else {
            return value;
          }
        }

        return undefined;
      }}
    />
  );
};

export { ZipCodeTextInput };
