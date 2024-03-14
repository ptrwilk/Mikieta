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

const PaymentView = () => {
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

  const handleConfirmClick = () => {
    const hasErrors = deliveryViewRef.current!.hasErrors();
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
        <PaymentOptions
          ref={paymentOptionsRef}
          className={styles["PaymentOptions"]}
          style={{ transform: `translateY(${translateY}px)` }}
          onConfirmClicked={handleConfirmClick}
        />
      </div>
    </div>
  );
};

export { PaymentView };
