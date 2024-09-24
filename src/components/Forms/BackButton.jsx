import { IoIosArrowBack } from "react-icons/io";

import { useNavigate } from "react-router-dom";

import "./BackButton.css";

const BackButton = ({ step, setStep }) => {
  const navigate = useNavigate();
  return (
    <>
      {step > 1 ? (
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
      ) : (
        <button
          onClick={() => {
            navigate("/");
          }}
          className="back-button"
        >
          <IoIosArrowBack />
        </button>
      )}
    </>
  );
};

export default BackButton;
