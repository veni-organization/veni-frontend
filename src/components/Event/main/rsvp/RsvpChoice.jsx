import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";

import "./RsvpChoice.css";

const RsvpChoice = ({ handleUserResponse }) => {
  return (
    <div className="rsvp-choice-container">
      <div className="rsvp-choice-info">
        Informez l'hôte si vous participez pour accédez aux messages.
      </div>
      <div className="choices-container">
        <div
          className="response-choice-container"
          onClick={() => {
            handleUserResponse(false);
          }}
        >
          <IoCloseOutline size={46} color="#ed4343" />
        </div>
        <div
          className="response-choice-container"
          onClick={() => {
            handleUserResponse(true);
          }}
        >
          <IoCheckmarkOutline size={46} color="#56dbbb" />
        </div>
      </div>
    </div>
  );
};

export default RsvpChoice;
