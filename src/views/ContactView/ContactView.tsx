import { MdEmail } from "react-icons/md";
import { Contact } from "../../components";
import styles from "./ContactView.module.css";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const ContactView = () => {
  return (
    <ul className={styles["ContactView"]} id="contact">
      <li>
        <Contact
          icon={<MdEmail size={50} />}
          title="Email"
          text1="Napisz do nas!"
          text2="pizza@pizza.com"
        />
      </li>
      <li>
        <Contact
          icon={<FaPhone size={42} />}
          title="Telefon"
          text1="Skontaktuj się z nami!"
          text2="+48 555 444 222"
        />
      </li>
      <li>
        <Contact
          icon={<FaLocationDot size={42} />}
          title="Adres"
          text1="Zapraszamy do odwiedzenia nas!"
          text2="ul. Jakas 1, Gliwice 44-100"
        />
      </li>
    </ul>
  );
};

export { ContactView };
