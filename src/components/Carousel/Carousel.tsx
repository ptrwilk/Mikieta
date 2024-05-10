import styles from "./Carousel.module.css";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const CarouselComponent: React.FC = () => {
  return (
    <Carousel className={styles["Main"]}>
      <div className={styles["Buttons"]}>
        <CarouselPrevious size="icon">
          <FaAngleLeft size={18} className={styles["ContactIcon"]} />
        </CarouselPrevious>
        <CarouselNext size="icon">
          <FaAngleRight size={18} className={styles["ContactIcon"]} />
        </CarouselNext>
      </div>
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
export { CarouselComponent };
