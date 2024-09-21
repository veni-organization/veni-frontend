import "./Chat.css";
const Chat = ({ chat }) => {
  return chat.length === 0 ? (
    <div className="chat-container">
      <p style={{ textAlign: "center" }}>Aucun message</p>
    </div>
  ) : (
    <div className="chat-container">MESSAGES !</div>
  );
};

export default Chat;
