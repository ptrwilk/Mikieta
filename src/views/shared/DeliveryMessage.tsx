import { Message } from "@/components";
import { useAppContext } from "@/context/AppContext";
import { DeliveryCheckErrorType, DeliveryResponseModel } from "@/types";

interface IDeliveryMessageProps {
  className?: string;
  message?: DeliveryResponseModel;
}

const DeliveryMessage: React.FC<IDeliveryMessageProps> = ({
  className,
  message,
}) => {
  const [app] = useAppContext();

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
      ? `Niestety nie dowozimy na podany adres. Skontaktuj się z nami jeżeli masz wątpiwość: ${
          app!.settings?.phone
        }.`
      : `Dowozimy na twój adres. Cena dostawy: ${message.deliveryPrice?.toFixed(
          2
        )} zł`;

  return <Message className={className} error={error} message={text}></Message>;
};

export { DeliveryMessage };
