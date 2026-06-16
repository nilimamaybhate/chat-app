import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

function App() {
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
      console.log(
        "ERROR STATUS:",
        error.response?.status
      );
      console.log(
        "ERROR DATA:",
        error.response?.data
      );
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
      console.log(
        "NEW MESSAGE:",
        message
      );

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

        <div className="h-[500px] border rounded-lg p-4 overflow-y-auto mb-4 bg-gray-50">

          {messages.length === 0 ? (
            <p className="text-gray-500">
              No messages yet
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex mb-3 ${
                  msg.sender === currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl break-words ${
                    msg.sender === currentUserId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;