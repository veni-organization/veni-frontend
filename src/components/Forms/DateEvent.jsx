import { useState } from "react";
import { DatePicker } from "@vaadin/react-components/DatePicker";
import "./DateEvent.css";

function DateEvent({ date, setDate }) {
  const today = new Date().toISOString().split("T")[0];
  return (
    <DatePicker
      label="Start date"
      value={date}
      onChange={(event) => {
        // Update the title field in formData
        setDate((prevFormData) => ({
          ...prevFormData,
          date: event.target.value,
        }));
      }}
      min={today}
      placeholder={today}
    />
  );
}

export default DateEvent;
