import { Drawer as UIDrawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

interface IDrawerProps {
  children: any;
  trigger?: any;
}

const Drawer: React.FC<IDrawerProps> = ({ children, trigger }) => {
  return (
    <UIDrawer direction="right">
      <DrawerTrigger asChild>
        <div>{trigger}</div>
      </DrawerTrigger>
      <DrawerContent className="ml-auto w-72 border-none rounded-none h-full bg-[--color-secondary]">
        {children}
      </DrawerContent>
    </UIDrawer>
  );
};

export { Drawer };
