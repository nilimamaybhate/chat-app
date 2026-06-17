function MessageBubble({
  message,
  currentUserId,
}) {
  const isMine =
    message.sender === currentUserId;

  return (
    <div
      className={`flex mb-3 ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-xl ${
          isMine
            ? "bg-blue-500 text-white"
            : "bg-gray-300"
        }`}
      >
        <p>{message.text}</p>

        <p className="text-xs mt-1 opacity-70">
          {new Date(
            message.createdAt
          ).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

export default MessageBubble;