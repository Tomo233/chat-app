import ChatSideBar from "../features/chat/ChatSideBar";
import MainChat from "../features/chat/MainChat";

function ChatPage() {
  return (
    <div className="flex justify-between">
      <ChatSideBar />
      <MainChat />
    </div>
  );
}

export default ChatPage;
