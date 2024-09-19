import { useState } from "react";
import { DatePicker } from "@vaadin/react-components/DatePicker";
import "./DateEvent.css";

function DateEvent() {
  const [date, setDate] = useState();

  const today = new Date().toISOString().split("T")[0];
  return (
    <DatePicker
      label="Start date"
      value={date}
      onChange={(event) => setDate(event.target.value)}
      min={today}
    />
  );
}

export default DateEvent;
