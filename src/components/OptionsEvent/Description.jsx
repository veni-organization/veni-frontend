import { useState } from "react";
import "./Description.css";

const Description = () => {
  const [description, setDescription] = useState("");

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
        maxlength={360}
      ></textarea>
    </div>
  );
};

export default Description;
