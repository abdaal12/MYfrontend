import React, { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const ChatPage = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [user] = useState(JSON.parse(localStorage.getItem("userInfo")));
  
  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(`${API}/chat/${receiverId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMessages(data);
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [receiverId]);

  const handleSend = async (text) => {
    try {
      const { data } = await axios.post(`${API}/chat/send`, {
        to: receiverId,
        message: text
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMessages(prev => [...prev, data]);
    } catch (err) {
      console.error("Message send failed", err);
    }
  };

  return (
    <div className="container py-4">
      <h5>Chat with Seller</h5>
      <ChatWindow messages={messages} userId={user._id} />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
