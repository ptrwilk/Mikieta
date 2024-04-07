"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Combobox } from "..";
import styles from "./DeliveryForm.module.css";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";

const formSchema = z.object({
  city: z.string().min(1),
  street: z.string().min(3),
  houseNumber: z.string().min(1),
});
interface DeliveryFormProps {
  selectedStreet: string;
  selectedHouseNumber: string;
  selectedCity: string;
  onStreetChange: (street: string) => void;
  onHouseNumberChange: (houseNumber: string) => void;
  onCityChange: (city: string) => void;
}
export function DeliveryForm({
  selectedStreet,
  selectedHouseNumber,
  selectedCity,
  onStreetChange,
  onHouseNumberChange,
  onCityChange,
}: DeliveryFormProps) {
  const deliveryCities = [
    { value: "Czerwionka" },
    { value: "Leszczyny" },
    { value: "Rybnik" },
  ];
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      street: "",
      houseNumber: "",
    },
  });
  const comboboxRef = useRef<Combobox>(null);

  useEffect(() => {
    if (
      form.formState.errors.city &&
      Object.keys(form.formState.errors).length === 1
    ) {
      comboboxRef.current?.setOpen(true);
    }
  }, [form.formState.errors]);

  useEffect(() => {
    form.setValue("city", selectedCity);
  }, [selectedCity, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className={styles["colSpan0"]}>
              <FormLabel>Miejscowość</FormLabel>
              <FormControl>
                <Combobox
                  options={deliveryCities}
                  className="w-full"
                  ref={comboboxRef}
                  value={selectedCity}
                  onChange={(value) => {
                    onCityChange(value);
                    field.onChange({ target: { value } });
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className={`${styles.customFormItem}`}>
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className={styles["colSpan"]}>
                <FormLabel>Ulica</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Twoja ulica..."
                    {...field}
                    value={selectedStreet}
                    onChange={(event) => {
                      onStreetChange(event.target.value);
                      field.onChange(event);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="houseNumber"
            render={({ field }) => (
              <FormItem className={styles["colSpan2"]}>
                <FormLabel>Nr domu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Twój nr domu..."
                    {...field}
                    value={selectedHouseNumber}
                    onChange={(event) => {
                      onHouseNumberChange(event.target.value);
                      field.onChange(event);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
