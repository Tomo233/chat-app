function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
      <div className="text-4xl mb-2">💬</div>
      <p className="text-lg font-semibold">No messages yet</p>
      <p className="text-sm">Start the conversation by sending a message!</p>
    </div>
  );
}

export default EmptyChat;
