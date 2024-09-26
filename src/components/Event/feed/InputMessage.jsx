import { useRef, useState, useLayoutEffect, useContext } from "react";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import { AuthContext } from "../../../context/AuthContext";
import "./InputMessage.css";

const MIN_TEXTAREA_HEIGHT = 8;

const InputMessage = ({ eventId, isUserHost, typeChat, response }) => {
  const { token } = useContext(AuthContext);
  const [contentMessage, setContentMessage] = useState("");
  const textareaRef = useRef(null);

  const handleNewMessage = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/message${
          typeChat === "host" ? "/host" : ""
        }/${eventId}`,
        {
          content: contentMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setContentMessage("");
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useLayoutEffect(() => {
    if (textareaRef.current) {
      // Reset height - important to shrink on delete
      textareaRef.current.style.height = "inherit";
      // Set height
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`;
    }
  }, [contentMessage]);

  return (
    <>
      {(typeChat === "host" && isUserHost) ||
      (typeChat === "global" && response !== null) ? (
        <div className="input-message-container">
          <textarea
            value={contentMessage}
            onChange={(text) => setContentMessage(text.target.value)}
            placeholder="Écrire un message..."
            ref={textareaRef}
            className="input-message"
            style={{
              minHeight: MIN_TEXTAREA_HEIGHT,
              resize: "none",
            }}
          />
          <IoIosSend
            onClick={handleNewMessage}
            size={35}
            color={
              contentMessage.length >= 1 ? "white" : "rgba(255, 255, 255, 0.3)"
            }
            className="send-icon-message"
          />
        </div>
      ) : null}
    </>
  );
};

export default InputMessage;
