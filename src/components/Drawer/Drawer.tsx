import { useEffect, useState } from "react";
import { Drawer as UIDrawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { useLocation } from "react-router-dom";

interface IDrawerProps {
  children: any;
  trigger?: any;
}

const Drawer: React.FC<IDrawerProps> = ({ children, trigger }) => {
  const location = useLocation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <UIDrawer direction="right" open={open} onOpenChange={(x) => setOpen(x)}>
      <DrawerTrigger asChild>
        <div onClick={() => setOpen(true)}>{trigger}</div>
      </DrawerTrigger>
      <DrawerContent className="ml-auto w-72 border-none rounded-none h-full bg-[--color-secondary]">
        {children}
      </DrawerContent>
    </UIDrawer>
  );
};

export { Drawer };
