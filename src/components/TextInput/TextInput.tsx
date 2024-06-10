import { PhoneTextInput } from "./PhoneTextInput";
import { TextInputShared } from "./Shared/TextInputShared/TextInputShared";
import { ZipCodeTextInput } from "./ZipCodeTextInput";

interface ITextInputProps {
  className?: string;
  placeholder?: string;
  caption?: string;
  captionTop?: boolean;
  value?: string;
  type?: "zip-code" | "phone";
  error?: boolean;
  errorMessage?: string;
  star?: boolean;
  numeric?: boolean;
  onValueChange?: (value: string | undefined) => void;
  onErrorChange?: (error: boolean) => void;
  onBlur?: () => void;
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
