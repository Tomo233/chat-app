import ChatSideBar from "../features/Chat/ChatSideBar";
import MainChat from "../features/Chat/MainChat";

function ChatPage() {
  return (
    <div className="flex justify-between">
      <ChatSideBar />
      <MainChat />
    </div>
  );
}

export default ChatPage;
