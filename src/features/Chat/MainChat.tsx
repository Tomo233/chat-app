import ProfileBar from "./ProfileBar";
import SendMessage from "./SendMessage";
import { useParams } from "react-router-dom";
import EmptyChat from "./EmptyChat";
import { useGetUserById } from "../authentication/useGetUserById";
import Loader from "../../components/Loader";
import { useChatMessages } from "./useChatMessages";
import ChatMessages from "./ChatMessages";

function MainChat() {
  const { id } = useParams();
  const { user, isLoading } = useGetUserById();
  const { chats, isLoading: isLoadingChatsContent } = useChatMessages();

  if (isLoading) {
    return (
      <div className="flex items-center mr-48">
        <Loader />
      </div>
    );
  }
  if (!id) return <EmptyChat />;

  return (
    <div className="bg-primaryPurple rounded-2xl w-2/3 grid grid-rows-[100px_auto_100px]">
      <ProfileBar user={user} />

      <div className="h-[500px] overflow-auto p-5 flex justify-center items-center">
        <ChatMessages
          chats={chats}
          isLoadingChats={isLoadingChatsContent}
          user={user}
        />
      </div>

      {/* Send Message Input and button */}
      <SendMessage />
    </div>
  );
}

export default MainChat;
