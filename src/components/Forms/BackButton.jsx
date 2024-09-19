import { IoIosArrowBack } from "react-icons/io";

import "./BackButton.css";

const BackButton = ({ step, setStep }) => {
  return (
    <button
      onClick={() => {
        setStep(step - 1);
      }}
      className="back-button"
    >
      <IoIosArrowBack />
    </button>
  );
};

export default BackButton;
