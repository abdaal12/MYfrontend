import React from "react";

const   MessageBubble = ({ message, isUser }) => {
  return (
    <div
      className={`d-flex mb-2 ${isUser ? "justify-content-end" : "justify-content-start"}`}
    >
      <div
        className={`p-2 px-3 rounded-3 shadow-sm ${
          isUser ? "bg-primary text-white" : "bg-light text-dark"
        }`}
        style={{ maxWidth: "70%" }}
      >
        <div style={{ wordBreak: "break-word" }}>{message}</div>
      </div>
    </div>
  );
};

export default  MessageBubble;
