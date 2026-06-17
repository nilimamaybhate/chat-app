function MessageInput({
  text,
  setText,
  sendMessage,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 border rounded-lg px-4 py-2"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-5 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;