import { IoIosArrowBack } from "react-icons/io";

import "./BackButton.css";

const BackButton = ({ step, setStep }) => {
  return (
    <button
      // This function get back to the previous step
      onClick={() => {
        if (step) {
          setStep(step - 1);
        }
      }}
      className="back-button"
    >
      <IoIosArrowBack />
    </button>
  );
};

export default BackButton;
