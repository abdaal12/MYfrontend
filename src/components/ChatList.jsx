import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const ChatList = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get(`${API}/chat`);
        setChats(data);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="container py-3">
      <h4 className="mb-3">Your Conversations</h4>
      <ul className="list-group">
        {chats.map((chat) => (
          <Link
            to={`/chat/${chat._id}`}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            key={chat._id}
          >
            <div>{chat.participantName}</div>
            <small className="text-muted">{chat.lastMessageTime}</small>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
