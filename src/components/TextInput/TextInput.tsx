import { PhoneTextInput } from "./PhoneTextInput";
import { TextInputShared } from "./Shared/TextInputShared/TextInputShared";
import { ZipCodeTextInput } from "./ZipCodeTextInput";

interface ITextInputProps {
  placeholder?: string;
  caption?: string;
  value?: string;
  type?: "zip-code" | "phone";
  error?: boolean;
  onValueChange?: (value: string | undefined) => void;
  onErrorChange?: (error: boolean) => void;
}

const TextInput: React.FC<ITextInputProps> = (props) => {
  const { type } = props;

  return type === "zip-code" ? (
    <ZipCodeTextInput {...props} />
  ) : type === "phone" ? (
    <PhoneTextInput {...props} />
  ) : (
    <TextInputShared {...props} />
  );
};

export { TextInput };
