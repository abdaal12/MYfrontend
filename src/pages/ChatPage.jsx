import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import axios from "axios";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

const ChatPage = () => {
  const { otherUserId } = useParams(); // from route `/chat/:otherUserId`
  const userId = localStorage.getItem("userId"); // adjust based on your auth
  const roomId = [userId, otherUserId].sort().join("_");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    // Load previous messages
    axios.get(`/api/chat/room/${roomId}`).then((res) => {
      setMessages(res.data.messages);
    });
  }, [roomId]);

  const handleSend = (text) => {
    const message = { sender: userId, text, timestamp: new Date() };
    socket.emit("sendMessage", { roomId, message });
    setMessages((prev) => [...prev, message]);

    // Save to DB too
    axios.post(`/api/chat/message`, {
      roomId,
      message,
    });
  };

  return (
    <div className="container mt-3">
      <ChatWindow messages={messages} userId={userId} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
