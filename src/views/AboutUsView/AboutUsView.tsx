import { AboutUsItem, Button, Section } from "../../components";
import styles from "./AboutUsView.module.css";
import classNames from "classnames";
import { MdAccessTime } from "react-icons/md";
import { PiCookingPot } from "react-icons/pi";
import { LuPhone } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { useAppContext } from "@/context/AppContext";
import { AboutUsDayHourAccordeon } from "../shared/AboutUsDayHourAccordeon/AboutUsDayHourAccordeon";

const AboutUsView = () => {
  const [app] = useAppContext();

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
                <p className="font-light">Mikieta</p>
                <p className="font-light">{app!.settings?.street}</p>
                <p className="font-light">
                  {app!.settings?.zipCode} {app!.settings?.city}
                </p>
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
                <p className="font-light">{app!.settings?.phone}</p>
              </div>
            }
          />
        </li>
        <li>
          <AboutUsDayHourAccordeon
            title="Godziny otwarcia"
            icon={<MdAccessTime size={100} />}
            hours={app!.settings?.openingHours}
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
