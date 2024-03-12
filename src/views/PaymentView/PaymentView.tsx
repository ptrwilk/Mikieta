import { useEffect, useRef, useState } from "react";
import { PaymentOptions, PaymentSummary } from "../../components";
import { useAppContext } from "../../context/AppContext";
import { BreadcrumbShared } from "../shared/BreadcrumbShared/BreadcrumbShared";
import styles from "./PaymentView.module.css";
import { useScrollFollow } from "../../hooks/useScrollFollow";

const PaymentView = () => {
  const [app] = useAppContext();

  const paymentSummaryRef = useRef<any>();
  const paymentOptionsRef = useRef<any>();

  const [paymentSummaryHeight, setPaymentSummaryHeight] = useState(0);

  const { translateY } = useScrollFollow(
    paymentOptionsRef,
    paymentSummaryHeight
  );

  useEffect(() => {
    if (paymentSummaryRef.current) {
      //TODO: the rects are set too late thats why this timeout
      setTimeout(() => {
        setPaymentSummaryHeight(
          paymentSummaryRef.current.getBoundingClientRect().height
        );
      }, 100);
    }
  }, [app?.basket]);

  return (
    <div className={styles["PaymentView"]}>
      <BreadcrumbShared />
      <div className={styles["Content"]}>
        <PaymentSummary
          ref={paymentSummaryRef}
          className={styles["PaymentSummary"]}
          items={app?.basket}
        />
        <PaymentOptions
          ref={paymentOptionsRef}
          className={styles["PaymentOptions"]}
          style={{ transform: `translateY(${translateY}px)` }}
        />
      </div>
    </div>
  );
};

export { PaymentView };
