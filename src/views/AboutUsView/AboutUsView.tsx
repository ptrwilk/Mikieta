import {
  AboutUsItem,
  Accordeon,
  Button,
  DayHourSpan,
  Section,
} from "../../components";
import styles from "./AboutUsView.module.css";
import classNames from "classnames";
import { MdAccessTime } from "react-icons/md";
import { PiCookingPot } from "react-icons/pi";
import { LuPhone } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";

const AboutUsView = () => {
  return (
    <div className={styles["AboutUsView"]}>
      <Section variant="ul">
        <li>
          <AboutUsItem
            title="Gdzie jesteśmy?"
            icon={<GrLocation size={100} />}
            content={
              <div
                className={classNames(styles["Content"], styles["Content-1"])}
              >
                <p>Mikieta</p>
                <p>Jakaś 4/5</p>
                <p>44-123 Gdynia</p>
              </div>
            }
          />
        </li>
        <li>
          <AboutUsItem
            title="Zadzwoń do nas"
            icon={<LuPhone size={100} />}
            content={
              <div
                className={classNames(styles["Content"], styles["Content-2"])}
              >
                <p>+48 514 222 111</p>
              </div>
            }
          />
        </li>
        <li>
          <AboutUsItem
            title={"Godziny otwarcia"}
            icon={<MdAccessTime size={100} />}
            content={
              <Accordeon
                trigger={() => (
                  <DayHourSpan text="Dzisiaj" from="11:00" to="23:00" />
                )}
                content={
                  <>
                    <DayHourSpan text="Wtorek" from="11:00" to="23:00" />
                    <DayHourSpan text="Środa" from="11:00" to="23:00" />
                    <DayHourSpan text="Czwartek" from="11:00" to="23:00" />
                    <DayHourSpan text="Piątek" from="11:00" to="23:00" />
                    <DayHourSpan text="Sobota" from="11:00" to="23:00" />
                    <DayHourSpan text="Niedziela" from="11:00" to="23:00" />
                  </>
                }
              />
            }
          />
        </li>
        <li>
          <AboutUsItem
            title={"Zamów online"}
            icon={<PiCookingPot size={100} />}
            content={
              <div
                className={classNames(styles["Content"], styles["Content-4"])}
              >
                <Button huge to="/menu">
                  Zobacz Menu
                </Button>
              </div>
            }
          />
        </li>
      </Section>
    </div>
  );
};

export { AboutUsView };
