import Toggle from "./Toggle";
import "./Option.css";

const Option = ({ label, labelDesc }) => {
  return (
    <div className="option-container">
      <div className="option-labels">
        <h3>{label}</h3>
        <p>{labelDesc}</p>
      </div>
      <Toggle checked={true} />
    </div>
  );
};
export default Option;
