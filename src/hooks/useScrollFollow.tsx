import { useEffect, useState } from "react";

export const useScrollFollow = (
  componentRef: any,
  maxHeight: number,
  offset: number
) => {
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    let lastScrollTop = 0;
    const step = 50;

    const handleScroll = () => {
      const componentRect = componentRef.current.getBoundingClientRect();
      const maxTranslateY = maxHeight - componentRect.height;
      const currentScroll = window.scrollY;
      const top = componentRect.top - offset;

      if (top < 0 && currentScroll > lastScrollTop) {
        const next = Math.floor((top * -1) / step) + 1;

        setTranslateY((prev) => {
          const res = prev + next * step;
          if (res > maxTranslateY) {
            return maxTranslateY;
          }

          return res;
        });
      } else if (currentScroll < lastScrollTop && top > step) {
        const next = Math.floor(top / step);

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
  }, [componentRef.current, maxHeight]);

  return { translateY };
};
