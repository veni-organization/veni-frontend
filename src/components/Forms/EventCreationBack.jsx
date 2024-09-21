import { Navigate, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./BackButton.css";

const EventCreationBack = ({ step, setStep }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        if (step === 1) {
          navigate("/");
        } else setStep(step - 1);
      }}
      className="back-button"
    >
      <IoIosArrowBack />
    </button>
  );
};

export default EventCreationBack;
