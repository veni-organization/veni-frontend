import React, { useState } from "react";

const TitleEvent = () => {
  const [title, setTitle] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Mon événement"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        maxLength={60}
      />
    </div>
  );
};

export default TitleEvent;
