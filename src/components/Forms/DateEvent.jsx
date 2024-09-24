import { useState } from "react";
import "./DateEvent.css";

function DateEvent({ date, setDate }) {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="event-date-block">
      <label htmlFor="event-date-form">Date de début</label>
      <input
        type="date"
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
        id="event-date-form"
        className="event-date-form"
      />
    </div>
  );
}

export default DateEvent;
