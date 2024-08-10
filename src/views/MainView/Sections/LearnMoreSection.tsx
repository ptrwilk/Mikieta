import { SubHeader } from "@/components/SubHeader/SubHeader";
import pizza from "../../../assets/images/pizza3.jpg";
import { Button } from "@/components";

const LearnMoreSection = () => {
  return (
    <div className="relative">
      <div className="flex justify-end sm:w-[55%] w-[95%] pl-8 py-12">
        <div className="flex flex-col max-w-[600px] py-8 pr-8 bg-white">
          <SubHeader left header="Dowiedz się więcej" title="O NAS" />
          <p className="mt-8">
            Pizzeria Amalio zaprasza wszystkich smakoszy prawdziwej włoskiej
            pizzy do spróbowania jedynej w okolicy pizzy z pieca opalanego
            drewnem. Zapraszamy do przytulnego wnętrza, gdzie na Państwa oczach
            przygotujemy i upieczemy pizzę w tradycyjnym piecu. Pizza, której
            można skosztować w naszym lokalu jest wytwarzana z najlepszych
            włoskich składników według tradycyjnej włoskiej receptury. W naszym
            menu znajdziecie Państwo typowe włoskie przekąski, pizze, wykwintne
            pasty, lasagne, tortellini, dania mięsne a także lody i desery.
          </p>
          <p className="mt-4">
            Serdecznie zapraszamy do naszego wyjątkowego ogródka znajdującego
            się na tarasie z pięknym widokiem na cała panoramę.
          </p>
          <Button className="self-start mt-8" huge to="/menu">
            Zobacz Menu
          </Button>
        </div>
      </div>
      <div className="flex absolute top-0 right-0 left-[45%] bottom-0 z-[-1]">
        <img className="w-full object-cover" src={pizza} />
      </div>
    </div>
  );
};

export { LearnMoreSection };
