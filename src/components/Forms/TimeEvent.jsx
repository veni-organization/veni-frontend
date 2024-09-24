import React, { useState } from "react";
import { TimePicker } from "@vaadin/react-components/TimePicker";
import "./TimeEvent.css";

const TimeEvent = ({ label, time, setTime, type }) => {
  return (
    <div className="time-event-block">
      <label htmlFor="time-event-form">Heure de début</label>
      <input
        type={type}
        label={label}
        value={time}
        onChange={(event) => {
          // Update the title field in formData
          setTime((prevFormData) => ({
            ...prevFormData,
            time: event.target.value,
          }));
        }}
        className="time-event-form"
      />
      {/* {console.log(time)} */}
    </div>
  );
};

export default TimeEvent;
