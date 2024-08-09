import { TextInputShared } from "./Shared/TextInputShared/TextInputShared";

interface ITextInputProps {
  className?: string;
  placeholder?: string;
  caption?: string;
  captionTop?: boolean;
  value?: string;
  error?: boolean;
  errorMessage?: string;
  star?: boolean;
  numeric?: boolean;
  onValueChange?: (value: string | undefined) => void;
  onErrorChange?: (error: boolean) => void;
  onBlur?: () => void;
}

const TextInput: React.FC<ITextInputProps> = (props) => {
  return <TextInputShared {...props} />;
};

export { TextInput };
