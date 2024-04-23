import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface IAccordeonProps {
  trigger?: any;
  content?: any;
}

const Accordeon: React.FC<IAccordeonProps> = ({ trigger, content }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="pt-0">{trigger}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export { Accordeon };
