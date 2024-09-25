import Message from "./Message";
import InputMessage from "./InputMessage";
import "./Chat.css";

const Chat = ({ chat, response, isUserHost, eventId }) => {
  // check if chat is empty or not an array
  if (!chat || !Array.isArray(chat.messages) || chat.messages.length === 0) {
    return (
      // if chat is empty, display a message
      // if user is not the host and hasn't responded, blur the feed
      // if user is not the host and has responded, display the feed
      <>
        <InputMessage
          eventId={eventId}
          isUserHost={isUserHost}
          typeChat={chat.type}
          response={response}
        />
        <div
          className={`chat-container ${
            !isUserHost && (response === null ? "blur-feed" : "")
          }`}
        >
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Aucun message
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <InputMessage
        eventId={eventId}
        isUserHost={isUserHost}
        typeChat={chat.type}
        response={response}
      />
      <div
        className={`chat-container ${
          !isUserHost && (response === null ? "blur-feed" : "")
        }`}
      >
        {chat.messages.map((message, index) => {
          return <Message key={index} message={message} />;
        })}
      </div>
    </>
  );
};

export default Chat;
