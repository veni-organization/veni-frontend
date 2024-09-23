import { FaCheck, FaXmark } from "react-icons/fa6";
import "./ResponseIcon.css";

const ResponseIcon = ({ response, handleUserResponse }) => {
  const changeResponse = (newChoice) => {
    handleUserResponse(newChoice);
  };

  return response ? (
    <div
      className="display-response-container"
      style={{ border: "2px solid #56dbbb" }}
      onClick={() => changeResponse(false)}
    >
      <FaCheck size={26} color="#56dbbb" />
    </div>
  ) : (
    <div
      className="display-response-container"
      style={{ border: "2px solid #ed4343" }}
      onClick={() => changeResponse(true)}
    >
      <FaXmark size={26} color="#ed4343" />
    </div>
  );
};

export default ResponseIcon;
