import Message from "./Message";
import "./Chat.css";

const Chat = ({ chat, response, isUserHost }) => {
  // check if chat is empty or not an array
  if (!chat || !Array.isArray(chat.messages) || chat.messages.length === 0) {
    return (
      // if chat is empty, display a message
      // if user is not the host and hasn't responded, blur the feed
      // if user is not the host and has responded, display the feed
      <div
        className={`chat-container ${
          !isUserHost && (response === null ? "blur-feed" : "")
        }`}
      >
        <p style={{ textAlign: "center", marginTop: "20px" }}>Aucun message</p>
      </div>
    );
  }

  return (
    <div
      className={`chat-container ${
        !isUserHost && (response === null ? "blur-feed" : "")
      }`}
    >
      {chat.messages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </div>
  );
};

export default Chat;
