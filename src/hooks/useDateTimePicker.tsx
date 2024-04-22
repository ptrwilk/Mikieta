import { useState } from "react";

export const useDateTimePicker = (defaultDate?: Date | undefined) => {
  const [date, setDate] = useState<Date | undefined>(defaultDate);

  const handleDateChange = (date?: Date) => {
    setDate(date);
  };

  return {
    date: date,
    onDateChange: handleDateChange,
  };
};
