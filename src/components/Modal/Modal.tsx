import { useEffect } from "react";
import styles from "./Modal.module.css";

interface IModalProps {
  open?: boolean;
  onClose?: () => void;
  children: any;
}

const Modal: React.FC<IModalProps> = ({ open, children, onClose }) => {
  useEffect(() => {
    // When the modal is open, add a class to body to prevent scrolling
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className={styles["Modal"]} onClick={onClose}>
      <div className={styles["Content"]} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export { Modal };
