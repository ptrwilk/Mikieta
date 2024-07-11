import { AboutUsItem, Accordeon, DayHourSpan } from "@/components";
import { ClosureModel, DayOfTheWeek, SettingHoursModel } from "@/types";

interface IAboutUsDayHourAccordeonProps {
  title: string;
  icon: any;
  hours?: SettingHoursModel[];
  closures?: ClosureModel[];
}

const AboutUsDayHourAccordeon: React.FC<IAboutUsDayHourAccordeonProps> = ({
  title,
  icon,
  hours = [],
  closures = [],
}) => {
  const days: { [K in DayOfTheWeek]: string } = {
    Monday: "Poniedziałek",
    Tuesday: "Wtorek",
    Wednesday: "Środa",
    Thursday: "Czwartek",
    Friday: "Piątek",
    Saturday: "Sobota",
    Sunday: "Niedziela",
  };

  return (
    <AboutUsItem
      title={title}
      icon={icon}
      content={
        <Accordeon
          trigger={() => (
            //TODO: to nie dziala wcale, zostało przeoczone, trzeba utorzyć ticket
            <DayHourSpan text="Dzisiaj" from="11:00" to="23:00" />
          )}
          content={
            <>
              {Object.keys(days)
                .filter((_, index) => index !== 0)
                .map((day, i) => (
                  <DayHourSpan
                    key={i}
                    text={days[day as DayOfTheWeek]}
                    from={hours[i]?.from ?? ""}
                    to={hours[i]?.to ?? ""}
                    closed={closures.some((x) => x.closedOn === day)}
                  />
                ))}
            </>
          }
        />
      }
    />
  );
};

export { AboutUsDayHourAccordeon };
