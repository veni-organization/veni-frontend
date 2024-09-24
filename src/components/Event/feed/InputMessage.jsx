import { useRef, useState, useLayoutEffect } from "react";
import "./InputMessage.css";

const MIN_TEXTAREA_HEIGHT = 8;

const InputMessage = () => {
  const [contentMessage, setContentMessage] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setContentMessage(e.target.value);
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
    <div className="input-message-container">
      <textarea
        value={contentMessage}
        onChange={handleChange}
        placeholder="Écrire un message..."
        ref={textareaRef}
        className="input-message"
        style={{
          minHeight: MIN_TEXTAREA_HEIGHT,
          resize: "none",
        }}
      />
    </div>
  );
};

export default InputMessage;
