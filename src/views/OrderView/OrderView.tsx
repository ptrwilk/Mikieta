import { Section, Status } from "@/components";
import styles from "./OrderView.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { OrderStatusModel, OrderStatusType } from "@/types";
import { get } from "@/apihelper";
import { format } from "date-fns";
import { useSignalR } from "ptrwilk-packages";

const OrderView = () => {
  const { zamowienieId } = useParams();

  const [status, setStatus] = useState<OrderStatusModel | undefined>();

  const updateStatus = async () => {
    const model = (await get(
      `order/${zamowienieId}/status`
    )) as OrderStatusModel;

    setStatus(model);
  };

  useSignalR(
    {
      url: `${import.meta.env.VITE_API_URL}/messageHub`,
      invoke: { methodName: "Join", args: [+zamowienieId!] },
    },
    [
      {
        methodName: "OrderChanged",
        callback: () => {
          updateStatus();
        },
      },
    ]
  );

  useEffect(() => {
    updateStatus();
  }, []);

  const items = [
    {
      number: 1,
      title: "Oczekiwanie!",
      text: "Twoje zamówienie oczekuje na potwierdzenie",
      status: OrderStatusType.Waiting,
    },
    {
      number: 2,
      title: "W przygotowaniu!",
      text: "Twoje zamówienie jest w trakcie przygotowywania",
      status: OrderStatusType.Preparing,
    },
    {
      number: 3,
      title: "Gotowe!",
      text: "Jesteśmy w drodze do ciebie",
      status: OrderStatusType.Ready,
    },
  ];

  return (
    <Section className={styles["OrderView"]}>
      <div className={styles["Thanks"]}>
        <h2>Dziękujemy za złożenie zamówienia!</h2>
        {status !== undefined && status!.status !== OrderStatusType.Waiting && (
          <p>
            Twoje zamówienie będzie dostarczone o{" "}
            {format(status!.deliveryAt, "HH:mm")}
          </p>
        )}
      </div>
      <div className={styles["Status-Title"]}>
        <h3>Status Zamówienia</h3>
        <div className={styles["Hr"]} />
      </div>
      <ul className={styles["Statuses"]}>
        {items.map((item, key) => (
          <li key={key}>
            <Status {...item} selected={item.status === status?.status} />
          </li>
        ))}
      </ul>
    </Section>
  );
};

export { OrderView };
