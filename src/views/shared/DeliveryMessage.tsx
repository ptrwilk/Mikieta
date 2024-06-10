import { Message } from "@/components";
import { DeliveryCheckErrorType, DeliveryResponseModel } from "@/types";

interface IDeliveryMessageProps {
  className?: string;
  message?: DeliveryResponseModel;
}

const DeliveryMessage: React.FC<IDeliveryMessageProps> = ({
  className,
  message,
}) => {
  if (message === undefined) {
    return null;
  }

  const error = message.hasError;
  const text =
    message.hasError &&
    message.errorType === DeliveryCheckErrorType.LocationNotFound
      ? "Podany adres nie istnieje, lub nie jest wystarczająco dokładny"
      : message.hasError &&
        message.errorType === DeliveryCheckErrorType.OutOfDeliveryRange
      ? "Niestety nie dowozimy na podany adres. Skontakuj się z nami jeżeli masz wątpiwość: +44 333 111 222"
      : `Dowozimy na twój adres. Cena dostawy: ${message.deliveryPrice?.toFixed(
          2
        )} zł`;

  return <Message className={className} error={error} message={text}></Message>;
};

export { DeliveryMessage };
