import { useState } from "react";
import "./Description.css";

const Description = ({ description, setDescription }) => {
  return (
    <div className="description-container">
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        placeholder="Décris ton événement..."
        rows={4}
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        maxLength={360}
      ></textarea>
    </div>
  );
};

export default Description;
