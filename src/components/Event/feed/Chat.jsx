import Message from "./Message";
import "./Chat.css";

const Chat = ({ chat, response }) => {
  // check if chat is empty or not an array
  if (!chat || !Array.isArray(chat.messages) || chat.messages.length === 0) {
    return (
      <div className={`chat-container ${response === null ? "blur-feed" : ""}`}>
        <p style={{ textAlign: "center", marginTop: "20px" }}>Aucun message</p>
      </div>
    );
  }

  return (
    <div className={`chat-container ${response === null ? "blur-feed" : ""}`}>
      {chat.messages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </div>
  );
};

export default Chat;
