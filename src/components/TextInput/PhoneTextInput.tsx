import { method3 } from "../../helpers";
import { FormatTextInputShared } from "./Shared/FormatTextInputShared/FormatTextInputShared";

interface IPhoneTextInputProps {
  placeholder?: string;
  caption?: string;
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  onErrorChange?: (error: boolean) => void;
}

const PhoneTextInput: React.FC<IPhoneTextInputProps> = (props) => {
  const phoneRegex =
    /(^\+?$)|(^\+?\d{1,2}\s?\d{0,3}$)|(^\+?\d{1,2}\s?\d{3}\s?\d{0,3}$)|(^\+?\d{1,2}\s?\d{3}\s?\d{3}\s?\d{0,3}$)|(^\d{0,3}\s?$)|(^\d{3}\s?\d{1,3}\s?$)|(^\d{3}\s?\d{3}\s?\d{0,3}$)/;

  const displayRegex = /^\+\d{1,2}\s?\d{3}\s?\d{3}\s?\d{3}$/;

  return (
    <FormatTextInputShared
      {...props}
      canInvokeValueChange={(value?: string) => {
        if (!value) {
          return true;
        }

        return phoneRegex.test(value);
      }}
      getDisplayedValue={(value?: string) => {
        if (value) {
          const dValue = method3(value, [
            {
              triggerMasks: [
                "## ### ######",
                "## #########",
                "###########",
                "######## ###",
                "##### ### ###",
                "##### ######",
                "+## ### ######",
                "+## #########",
                "+###########",
                "+######## ###",
                "+##### ### ###",
                "+##### ######",
              ],
              destinationMask: "+## ### ### ###",
            },
            {
              triggerMasks: [
                "# ### ######",
                "# #########",
                "##########",
                "####### ###",
                "#### ### ###",
                "#### ######",
                "+# ### ######",
                "+# #########",
                "+##########",
                "+####### ###",
                "+#### ### ###",
                "+#### ######",
              ],
              destinationMask: "+# ### ### ###",
            },
            {
              triggerMasks: [
                "### ######",
                "#########",
                "#########",
                "###### ###",
                "### ### ###",
                "### ######",
              ],
              destinationMask: "+48 ### ### ###",
            },
          ]);

          return displayRegex.test(dValue) ? dValue : undefined;
        }

        return undefined;
      }}
    />
  );
};

export { PhoneTextInput };
