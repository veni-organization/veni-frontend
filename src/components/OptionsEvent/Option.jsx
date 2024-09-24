import React from "react";
import Toggle from "./Toggle";
import "./Option.css";

const Option = ({ label, labelDesc, checked, setChecked }) => {
  return (
    <div className="option-container">
      <div className="option-labels">
        <h3>{label}</h3>
        <p>{labelDesc}</p>
      </div>
      <Toggle checked={checked} setChecked={setChecked} />
    </div>
  );
};

export default Option;
