import { useEffect, useRef, useState } from "react";
import { PaymentOptions, PaymentSummary } from "../../components";
import { useAppContext } from "../../context/AppContext";
import { BreadcrumbShared } from "../shared/BreadcrumbShared/BreadcrumbShared";
import styles from "./PaymentView.module.css";
import { useScrollFollow } from "../../hooks/useScrollFollow";
import {
  DeliverySection,
  IDeliveryViewRef,
} from "./DeliverySection/DeliverySection";
import { useNavigate } from "react-router-dom";

const PaymentView = () => {
  const navigate = useNavigate();
  const [app] = useAppContext();

  const addressAndPaymentRef = useRef<any>();
  const paymentOptionsRef = useRef<any>();
  const deliveryViewRef = useRef<IDeliveryViewRef>();

  const [paymentSummaryHeight, setPaymentSummaryHeight] = useState(0);

  const { translateY } = useScrollFollow(
    paymentOptionsRef,
    paymentSummaryHeight,
    64
  );

  useEffect(() => {
    if (addressAndPaymentRef.current) {
      //TODO: the rects are set too late thats why this timeout
      setTimeout(() => {
        setPaymentSummaryHeight(
          addressAndPaymentRef.current.getBoundingClientRect().height
        );
      }, 100);
    }
  }, [app?.basket]);

  const handleConfirmClick = async () => {
    const hasErrors = deliveryViewRef.current!.hasErrors();

    if (!hasErrors) {
      const id = await (
        await fetch("http://localhost:5105/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        })
      ).json();

      navigate(`/delivery/${id}`);
    }
  };

  return (
    <div className={styles["PaymentView"]}>
      <BreadcrumbShared />
      <div className={styles["Content"]}>
        <div ref={addressAndPaymentRef} className={styles["AddressAndPayment"]}>
          <DeliverySection ref={deliveryViewRef} />
          <PaymentSummary
            className={styles["PaymentSummary"]}
            items={app?.basket}
          />
        </div>
        <div
          ref={paymentOptionsRef}
          className={styles["Payment-Section"]}
          style={{ transform: `translateY(${translateY}px)` }}
        >
          <div className={styles["Summary"]}>
            <h3>Opłata</h3>
            <div>
              <p>Produkty</p>
              <p className={styles["Price"]}>36.00 zł</p>
            </div>
            <div>
              <p>Dostawa</p>
              <p className={styles["Price"]}>36.00 zł</p>
            </div>
            <div className={styles["Hr"]} />
            <div>
              <p>Razem</p>
              <p className={styles["Price"]}>36.00 zł</p>
            </div>
          </div>
          <PaymentOptions
            className={styles["PaymentOptions"]}
            onConfirmClicked={handleConfirmClick}
          />
        </div>
      </div>
    </div>
  );
};

export { PaymentView };
