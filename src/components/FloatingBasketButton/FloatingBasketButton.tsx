import { FaShoppingBasket } from "react-icons/fa";
import { Button } from "../../components";
import { useAppContext } from "../../context/AppContext";
import styles from "./FloatingBasketButton.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { PizzaModel } from "@/types";

const FloatingBasketButton = () => {
  const [app, updateApp] = useAppContext();
  const [basketCount, setBasketCount] = useState<number>(0);
  const [isRockingAnimation, setIsRockingAnimation] = useState(false);
  const prevBasketLengthRef = useRef<number>(app?.basket?.length ?? 0);

  const computeBasketValue = useCallback((): number => {
    if (!app?.basket) return 0;
    return app.basket.reduce(
      (total: number, item: PizzaModel) => total + item.quantity,
      0
    );
  }, [app?.basket]);

  useEffect(() => {
    setBasketCount(computeBasketValue());
  }, [computeBasketValue]);

  useEffect(() => {
    if (!app?.basketModalOpen) {
      const basketLength = app?.basket?.length ?? 0;
      if (basketLength > prevBasketLengthRef.current) {
        setIsRockingAnimation(true);
        const timer = setTimeout(() => {
          setIsRockingAnimation(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
      prevBasketLengthRef.current = basketLength;
    }
  }, [app?.basket, app?.basketModalOpen]);

  useEffect(() => {
    if (!app?.basketModalOpen) {
      setIsRockingAnimation(true);
      const timer = setTimeout(() => {
        setIsRockingAnimation(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [app?.basketModalOpen]);

  function showBasket(): void {
    updateApp("basketModalOpen", true);
  }

  return (
    <Button
      onClick={showBasket}
      className={`${styles["floating-button"]} ${
        isRockingAnimation ? styles["rockingAnimation"] : ""
      }`}
    >
      <span className={styles.notificationNumber}>{basketCount}</span>
      <span className="text-lg">Koszyk</span>
      <FaShoppingBasket size={24} color="#fff" />
    </Button>
  );
};

export { FloatingBasketButton };
