import { useParams } from "react-router-dom";
import ChatSideBar from "../features/chat/ChatSideBar";
import EmptyChat from "../features/chat/EmptyChat";
import MainChat from "../features/chat/MainChat";

function ChatPage() {
  const { id } = useParams();

  return (
    <div className="flex justify-between">
      <ChatSideBar />
      {id ? <MainChat /> : <EmptyChat />}
    </div>
  );
}

export default ChatPage;
