import React, { useState } from "react";
import { TimePicker } from "@vaadin/react-components/TimePicker";
import "./TimeEvent.css";

const TimeEvent = ({ label }) => {
  const [time, setTime] = useState();

  return (
    <TimePicker
      label={label}
      value={time}
      onChange={(event) => setTime(event.target.value)}
    />
  );
};

export default TimeEvent;
