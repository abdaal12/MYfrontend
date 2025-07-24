import React from "react";

const ChatWindow = ({ messages, userId }) => {
  return (
    <div className="border rounded p-3 mb-3" style={{ height: "400px", overflowY: "scroll" }}>
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 d-flex ${msg.sender === userId ? "justify-content-end" : "justify-content-start"}`}
        >
          <div className={`p-2 rounded ${msg.sender === userId ? "bg-success text-white" : "bg-light"}`}>
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
