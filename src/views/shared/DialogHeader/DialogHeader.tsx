import { Button } from "@/components";
import { FaWindowClose } from "react-icons/fa";

interface IDialogHeaderProps {
  children: any;
  onClose?: () => void;
}

const DialogHeader: React.FC<IDialogHeaderProps> = ({ children, onClose }) => (
  <div className="flex justify-between items-center p-4 bg-[var(--color-fourth)]">
    {children}
    <Button className="bg-transparent" onClick={onClose}>
      <FaWindowClose size={24} color="var(--color-secondary)" />
    </Button>
  </div>
);

export { DialogHeader };
