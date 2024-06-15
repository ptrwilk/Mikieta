import { SubHeader } from "@/components/SubHeader/SubHeader";
import styles from "./ContactView.module.css";
import { AboutUsItem, Map, Section } from "@/components";
import { Phone } from "lucide-react";
import { MdAccessTime, MdOutlineHome } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { AboutUsDayHourAccordeon } from "../shared/AboutUsDayHourAccordeon/AboutUsDayHourAccordeon";
import { useAppContext } from "@/context/AppContext";

const ContactView = () => {
  const [app] = useAppContext();

  return (
    <Section className={styles["ContactView"]}>
      <SubHeader
        header="Masz pytania?"
        title="SKONTAKTUJ SIĘ Z NAMI"
        description="Napisz lub zadzwoń do nas!"
      />
      <ul className={styles["Items"]}>
        <li>
          <AboutUsItem
            title="Dane adresowe"
            icon={
              <div className={styles["Circle"]}>
                <MdOutlineHome color="var(--color-secondary)" size={35} />
              </div>
            }
            content={
              <div className="text-center">
                <p className="font-light">Mikieta</p>
                <p className="font-light">
                  {app!.settings?.street}, {app!.settings?.zipCode}{" "}
                  {app!.settings?.city}
                </p>
              </div>
            }
          />
        </li>
        <li>
          <AboutUsItem
            title="Dane kontaktowe"
            icon={
              <div className={styles["Circle"]}>
                <Phone color="var(--color-secondary)" size={30} />
              </div>
            }
            content={
              <p className="font-light">Telefon: {app!.settings?.phone}</p>
            }
          />
        </li>
        <li>
          <AboutUsDayHourAccordeon
            title="Godziny otwarcia"
            icon={
              <div className={styles["Circle"]}>
                <MdAccessTime color="var(--color-secondary)" size={30} />
              </div>
            }
            hours={app!.settings?.openingHours}
          />
        </li>
        <li>
          <AboutUsDayHourAccordeon
            title="Godziny Dostawy"
            icon={
              <div className={styles["Circle"]}>
                <GrDeliver color="var(--color-secondary)" size={30} />
              </div>
            }
            hours={app!.settings?.deliveryHours}
          />
        </li>
      </ul>
      <div className={styles["Map"]}>
        <p>Mapa dojazdu</p>
        <Map />
      </div>
    </Section>
  );
};

export { ContactView };
