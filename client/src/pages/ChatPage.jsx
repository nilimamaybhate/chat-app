import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const currentUserId =
    "6a2d2bfbcd8941fa70a6f54c";

  const receiverId =
    "6a2c06495c4bf79ef3a54ba3";

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTJkMmJmYmNkODk0MWZhNzBhNmY1NGMiLCJpYXQiOjE3ODEzNDg3NDQsImV4cCI6MTc4MTk1MzU0NH0.5mr39x3WyudecCF4DjIcNlLlgT3LyvZDmElIO-tp538";

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/messages/send",
        {
          receiverId,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  const loadMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMessages();

    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log(
        "Connected:",
        socket.id
      );

      socket.emit(
        "registerUser",
        currentUserId
      );
    });

    socket.on("newMessage", (message) => {
      setMessages((prev) => [
        ...prev,
        message,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-4">
          Chat App
        </h1>

        <ChatBox
          messages={messages}
          currentUserId={currentUserId}
        />

        <MessageInput
          text={text}
          setText={setText}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default ChatPage;