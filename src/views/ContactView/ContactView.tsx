import { SubHeader } from "@/components/SubHeader/SubHeader";
import styles from "./ContactView.module.css";
import {
  AboutUsItem,
  Accordeon,
  DayHourSpan,
  Map,
  Section,
} from "@/components";
import { Phone } from "lucide-react";
import { MdAccessTime, MdOutlineHome } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";

const ContactView = () => {
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
                <p className="font-light">Jakaś 4/5, 44-444 Costam</p>
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
            content={<p className="font-light">Telefon: +44 123 144 555</p>}
          />
        </li>
        <li>
          <AboutUsItem
            title="Godziny Otwarcia"
            icon={
              <div className={styles["Circle"]}>
                <MdAccessTime color="var(--color-secondary)" size={30} />
              </div>
            }
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
            title="Godziny Dostawy"
            icon={
              <div className={styles["Circle"]}>
                <GrDeliver color="var(--color-secondary)" size={30} />
              </div>
            }
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
      </ul>
      <div className={styles["Map"]}>
        <p>Mapa dojazdu</p>
        <Map />
      </div>
    </Section>
  );
};

export { ContactView };
