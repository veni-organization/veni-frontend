import ProfileCard from "../../profile/ProfileCard";
import "./Message.css";

const Message = ({ message }) => {
  const date = new Date(message.creation_date);

  const datePart = date.toLocaleDateString("fr-FR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Europe/Paris",
  });

  const timePart = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  });

  const formattedDate = `${datePart} - ${timePart}`;

  return (
    <div className="message-container">
      <div className="message-details">
        {/* [] because ProfileCard take only an array of users */}
        <ProfileCard users={[message.author]} />
        <p style={{ fontSize: "12px" }}>{formattedDate}</p>
      </div>
      <div className="message-content">
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default Message;
