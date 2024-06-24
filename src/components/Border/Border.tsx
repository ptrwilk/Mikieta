interface IBorderProps {
  children?: any;
}

const Border: React.FC<IBorderProps> = ({ children }) => {
  return children ? (
    <div>
      <div className="bg-border h-[1px] w-full" />
      {children}
      <div className="bg-border h-[1px] w-full" />
    </div>
  ) : (
    <div className="bg-border h-[1px] w-full" />
  );
};

export { Border };
