import { useEffect, useState } from "react";

export const useScrollFollow = (componentRef: any, maxHeight: number) => {
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    let lastScrollTop = 0;
    const step = 50;
    const maxTranslateY =
      maxHeight - componentRef.current.getBoundingClientRect().height;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const componentRect = componentRef.current.getBoundingClientRect();

      if (componentRect.top < 0 && currentScroll > lastScrollTop) {
        const next = Math.floor((componentRect.top * -1) / step) + 1;

        setTranslateY((prev) => {
          const res = prev + next * step;
          if (res > maxTranslateY) {
            return maxTranslateY;
          }

          return res;
        });
      } else if (currentScroll < lastScrollTop && componentRect.top > step) {
        const next = Math.floor(componentRect.top / step);

        setTranslateY((prev) => {
          const res = prev - next * step;

          if (prev === maxTranslateY) {
            return Math.floor(maxTranslateY / step) * step;
          }

          return res < 0 ? 0 : res;
        });
      }
      lastScrollTop = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [maxHeight]);

  return { translateY };
};
