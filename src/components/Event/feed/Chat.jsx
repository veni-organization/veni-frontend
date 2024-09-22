import Message from "./Message";
import "./Chat.css";

const Chat = ({ chat }) => {
  console.log("NUMBER MESSAGE ==> ", chat);
  // check if chat is empty or not an array
  if (!chat || !Array.isArray(chat.messages) || chat.messages.length === 0) {
    return (
      <div className="chat-container">
        <p style={{ textAlign: "center" }}>Aucun message</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {chat.messages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </div>
  );
};

export default Chat;
