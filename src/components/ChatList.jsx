import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ChatList = ({ userId }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`/api/chat/user/${userId}`);
        setChats(res.data);
      } catch (err) {
        console.error("Failed to load chat list:", err);
      }
    };
    fetchChats();
  }, [userId]);

  return (
    <div className="border p-3 mb-4">
      <h5>Chats</h5>
      <ul className="list-group">
        {chats.map((chat) => {
          const otherUser = chat.members.find((id) => id !== userId);
          return (
            <Link to={`/chat/${otherUser}`} key={chat._id} className="list-group-item">
              Chat with {otherUser}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
