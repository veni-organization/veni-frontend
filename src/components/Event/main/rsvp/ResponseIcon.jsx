import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";

import "./ResponseIcon.css";

const ResponseIcon = ({ response, handleUserResponse }) => {
  const changeResponse = (newChoice) => {
    handleUserResponse(newChoice);
  };

  return response ? (
    <div
      className="display-response-container"
      style={{
        border: "1px solid #56dbbb",
        boxShadow: "0px 0px 30px 0px #56dbbb33",
      }}
      onClick={() => changeResponse(false)}
    >
      <IoCheckmarkOutline size={26} color="#56dbbb" />
    </div>
  ) : (
    <div
      className="display-response-container"
      style={{
        border: "1px solid #ed4343",
        boxShadow: "0px 0px 30px 0px #ed434333",
      }}
      onClick={() => changeResponse(true)}
    >
      <IoCloseOutline size={26} color="#ed4343" />
    </div>
  );
};

export default ResponseIcon;
