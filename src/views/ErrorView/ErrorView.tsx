import { NavLink } from "react-router-dom";

const ErrorView = () => {
  return (
    <div className="flex flex-col items-center h-screen bg-slate-100">
      <div className="flex flex-col gap-4 px-4 mt-32 max-w-[500px]">
        <p className="text-center font-semibold text-[24px]">Mikieta</p>
        <p className="text-center font-bold text-[28px]">
          Przepraszamy, pod tym adresem strona nie istnieje :(
        </p>
        <p className="text-center font-bold text-[18px]">
          Prawdopodobnie wystąpił błąd w adresie lub strona nie została
          udostępniona.
        </p>
        <NavLink className="text-center underline mt-4" to="/">
          Przejdź do strony głównej
        </NavLink>
      </div>
    </div>
  );
};

export { ErrorView };
