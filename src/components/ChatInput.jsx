import React, { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSend(newMessage);
    setNewMessage("");
  };

  return (
    <div className="d-flex p-2 border-top">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button className="btn btn-primary" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
