import ProfileCard from "../../profile/ProfileCard";
import "./Message.css";

const Message = ({ message }) => {
  return (
    <div className="message-container">
      <div className="message-details">
        {/* [] because ProfileCard take only an array of users */}
        <ProfileCard users={[message.author]} />
        <p>{message.creation_date}</p>
      </div>
      <div className="message-content">
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default Message;
