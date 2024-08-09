import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface IAccordeonProps {
  trigger?: (expanded?: boolean) => any;
  content?: any;
}

const Accordeon: React.FC<IAccordeonProps> = ({ trigger, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      type="single"
      collapsible
      onValueChange={() => setExpanded((prev) => !prev)}
      value={expanded ? "item-1" : ""}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="pt-0">
          {trigger?.(expanded)}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export { Accordeon };
