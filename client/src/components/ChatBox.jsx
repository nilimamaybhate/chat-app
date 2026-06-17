import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function ChatBox({
  messages,
  currentUserId,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="h-[500px] border rounded-lg p-4 overflow-y-auto mb-4 bg-gray-50">
      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            currentUserId={currentUserId}
          />
        ))
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatBox;