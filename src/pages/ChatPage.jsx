import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import axios from "axios";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

const ChatPage = () => {
  const { otherUserId } = useParams(); // From URL like /chat/:otherUserId
  const userId = localStorage.getItem("userId"); // from auth
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  // 1. First - Access or Create Chat between user and otherUser
  useEffect(() => {
    const createOrGetChat = async () => {
      try {
        const { data } = await axios.post(
          "/chat",
          { userId: otherUserId }, // this is the receiver
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setChatId(data._id);

        // 2. Join the socket room
        socket.connect();
        socket.emit("joinRoom", data._id);
      } catch (error) {
        console.error("Failed to get or create chat:", error);
      }
    };

    createOrGetChat();

    return () => {
      socket.disconnect();
    };
  }, [otherUserId]);

  // 3. Fetch previous messages
  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`/message/${chatId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMessages(data);
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    };

    fetchMessages();
  }, [chatId]);

  // 4. Listen for incoming messages via socket
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSend = async (text) => {
    const message = {
      sender: userId,
      text,
      timestamp: new Date(),
    };

    try {
      socket.emit("sendMessage", { roomId: chatId, message });
      setMessages((prev) => [...prev, message]);

      // Save to DB
      await axios.post(
        "/message",
        {
          chatId,
          content: text,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="container mt-3">
      <ChatWindow messages={messages} userId={userId} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
