import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa6";
import "./eventPicture.css";

const EventPicture = ({ event_picture, defaultImg, event, isUserHost }) => {
  const navigate = useNavigate();
  return (
    <div
      className="event-picture"
      style={{
        backgroundImage: `url(${event_picture ? event_picture : defaultImg})`,
        backgroundPosition: "center",
      }}
    >
      {isUserHost === true && (
        <div
          className="edit-event-button"
          onClick={() => {
            navigate(`/edit/${event._id}`, { state: { event: event } });
          }}
        >
          <p>Modifier l'évènement</p>
          <FaPen />
        </div>
      )}
    </div>
  );
};

export default EventPicture;
