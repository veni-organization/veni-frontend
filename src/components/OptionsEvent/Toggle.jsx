import React from "react";
import "./Toggle.css";

const Toggle = ({ checked, setChecked }) => {
  const handleToggle = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={handleToggle} />
      <span className="slider round"></span>
      {console.log("checked?", checked)}
    </label>
  );
};

export default Toggle;
