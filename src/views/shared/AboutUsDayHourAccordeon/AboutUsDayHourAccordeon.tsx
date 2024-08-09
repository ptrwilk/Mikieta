import { AboutUsItem, Accordeon, DayHourSpan } from "@/components";
import { getDayIndex } from "@/helpers";
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

  const dayIndex = getDayIndex();

  return (
    <AboutUsItem
      title={title}
      icon={icon}
      content={
        <Accordeon
          trigger={() => (
            <DayHourSpan
              text="Dzisiaj"
              from={hours[dayIndex]?.from ?? ""}
              to={hours[dayIndex]?.to ?? ""}
            />
          )}
          content={
            <>
              {Object.keys(days).map((day, i) => (
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
