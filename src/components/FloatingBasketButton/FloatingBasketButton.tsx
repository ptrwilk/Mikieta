import { FaShoppingBasket } from "react-icons/fa";
import { Button } from "../../components";
import { useAppContext } from "../../context/AppContext";
import styles from "./FloatingBasketButton.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductModel } from "@/types";
import classNames from "classnames";

const FloatingBasketButton = () => {
  const [app, updateApp] = useAppContext();
  const [basketCount, setBasketCount] = useState<number>(0);
  const [isRockingAnimation, setIsRockingAnimation] = useState(false);
  const prevBasketLengthRef = useRef<number>(app?.basket?.length ?? 0);

  const computeBasketValue = useCallback((): number => {
    if (!app?.basket) return 0;
    return app.basket.reduce(
      (total: number, item: ProductModel) => total + (item.quantity ?? 0),
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
      className={classNames(styles["FloatingButton"], {
        [styles["RockingAnimation"]]: isRockingAnimation,
      })}
    >
      <span className={styles.NotificationNumber}>{basketCount}</span>
      <span className="text-lg">Koszyk</span>
      <FaShoppingBasket size={24} color="var(--color-primary)" />
    </Button>
  );
};

export { FloatingBasketButton };
