import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";

const API = import.meta.env.VITE_API_URL;

const ChatPage = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(`${API}/chat/${chatId}`, config);
        setMessages(res.data.messages);
        setRecipientName(res.data.participantName);
        setUserId(res.data.currentUserId); // for detecting own message
      } catch (error) {
        console.error("Fetch chat error:", error);
      }
    };

    fetchChat();
  }, [chatId]);

  const handleSend = async (messageText) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const res = await axios.post(`${API}/chat/${chatId}/message`, {
        content: messageText,
      }, config);

      setMessages((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Send message error:", error);
    }
  };

  return (
    <div className="container py-3">
      <div className="card">
        <div className="card-header bg-primary text-white fw-bold">
          Chat with {recipientName}
        </div>

        <div className="card-body" style={{ height: "60vh", overflowY: "auto" }}>
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg} isOwn={msg.sender === userId} />
          ))}
        </div>

        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
