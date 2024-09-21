import React, { useState } from "react";

const TitleEvent = ({ title, setTitle }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Mon événement"
        value={title}
        onChange={(event) => {
          // Update the title field in formData
          setTitle((prevFormData) => ({
            ...prevFormData,
            title: event.target.value,
          }));
        }}
        maxLength={60}
        className="title-event"
      />
    </div>
  );
};

export default TitleEvent;
