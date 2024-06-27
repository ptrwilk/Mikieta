import { Button } from "@/components";
import classNames from "classnames";
import { FaWindowClose } from "react-icons/fa";

interface IDialogHeaderProps {
  className?: string;
  children: any;
  onClose?: () => void;
}

const DialogHeader: React.FC<IDialogHeaderProps> = ({
  className,
  children,
  onClose,
}) => (
  <div
    className={classNames(
      className,
      "flex justify-between items-center p-4 bg-[var(--color-fourth)]"
    )}
  >
    {children}
    <Button className="bg-transparent" onClick={onClose}>
      <FaWindowClose size={24} color="var(--color-secondary)" />
    </Button>
  </div>
);

export { DialogHeader };
