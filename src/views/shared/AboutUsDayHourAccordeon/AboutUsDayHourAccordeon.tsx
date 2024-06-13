import { AboutUsItem, Accordeon, DayHourSpan } from "@/components";
import { SettingHoursModel } from "@/types";

interface IAboutUsDayHourAccordeonProps {
  title: string;
  icon: any;
  hours?: SettingHoursModel[];
}

const AboutUsDayHourAccordeon: React.FC<IAboutUsDayHourAccordeonProps> = ({
  title,
  icon,
  hours = [],
}) => {
  const days = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ];

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
              {days
                .filter((_, index) => index !== 0)
                .map((day, i) => (
                  <DayHourSpan
                    key={i}
                    text={day}
                    from={hours[i]?.from ?? ""}
                    to={hours[i]?.to ?? ""}
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
