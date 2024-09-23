import { FaCheck, FaXmark } from "react-icons/fa6";
import "./ResponseIcon.css";
const ResponseIcon = ({ response, setResponse }) => {
  return response ? (
    <div
      className="display-response-container"
      style={{ border: "2px solid #56dbbb" }}
    >
      <FaCheck size={34} color="#56dbbb" />
    </div>
  ) : (
    <div
      className="display-response-container"
      style={{ border: "2px solid #ed4343" }}
    >
      <FaXmark size={34} color="#ed4343" />
    </div>
  );
};

export default ResponseIcon;
