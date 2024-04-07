import { forwardRef, useImperativeHandle } from "react";
import { Combobox, TextInput } from "..";
import { useCombobox, useInput } from "@/hooks";

type DeliveryFormModel = {
  hasErrors: boolean;
  street?: string;
  houseNumber?: string;
  deliveryCity?: string;
};

export interface IDeliveryFormPropsRef {
  getModel: () => DeliveryFormModel;
}

const DeliveryForm = forwardRef((_, ref) => {
  const street = useInput([
    {
      validate: (value) => {
        return (value?.length ?? 0) > 3;
      },
    },
  ]);

  const houseNumber = useInput([
    {
      validate: (value) => {
        return (value?.length ?? 0) > 2;
      },
    },
  ]);

  const deliveryCities = useCombobox([
    { value: "Czerwionka", label: "Czerwionka" },
    { value: "Leszczyny", label: "Leszczyny" },
    { value: "Rybnik", label: "Rybnik" },
  ]);

  useImperativeHandle<any, IDeliveryFormPropsRef>(
    ref,
    () => {
      return {
        getModel() {
          return {
            hasErrors:
              [street, houseNumber].map((x) => x.checkError()).filter((x) => x)
                .length > 0,
            street: street.value,
            deliveryCity: deliveryCities.value,
            houseNumber: houseNumber.value,
          };
        },
      };
    },
    [street, houseNumber, deliveryCities]
  );

  return (
    <div className="grid grid-cols-3 gap-6">
      <Combobox
        className="col-span-3"
        caption="Miejscowość"
        {...deliveryCities}
      />
      <TextInput
        className="col-span-2"
        caption="Ulica"
        placeholder="Twoja ulica..."
        {...street}
      />
      <TextInput
        caption="Nr domu"
        placeholder="Twója nr domu..."
        {...houseNumber}
      />
    </div>
  );
});

export { DeliveryForm };
