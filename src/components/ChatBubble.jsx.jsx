import React from "react";

const ChatBubble = ({ message, isOwn }) => {
  return (
    <div className={`d-flex mb-2 ${isOwn ? "justify-content-end" : "justify-content-start"}`}>
      <div
        className={`p-2 rounded shadow-sm ${isOwn ? "bg-success text-white" : "bg-light"}`}
        style={{ maxWidth: "70%" }}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatBubble;
