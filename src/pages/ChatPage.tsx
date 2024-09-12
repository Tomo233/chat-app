import ChatSideBar from "../features/Chat/ChatSideBar";
import MainChat from "../features/Chat/MainChat";

function ChatPage() {
  return (
    <div className="flex gap-36">
      <ChatSideBar />
      <MainChat />
    </div>
  );
}

export default ChatPage;
