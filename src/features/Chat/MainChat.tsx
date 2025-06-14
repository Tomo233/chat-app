import ProfileBar from "./ProfileBar";
import SendMessage from "./SendMessage";
import Loader from "../../components/Loader";
import ChatMessages from "./ChatMessages";
import NoConversation from "./NoConversation";
import { useParams } from "react-router-dom";
import { useGetUserById } from "../authentication/useGetUserById";

function MainChat() {
  const { id } = useParams();
  const { user, isLoading } = useGetUserById();

  if (isLoading) {
    return (
      <div className="flex items-center mr-48">
        <Loader />
      </div>
    );
  }

  if (!id) return <NoConversation />;

  return (
    <div className="bg-primaryPurple rounded-2xl w-2/3 grid grid-rows-[100px_500px_auto] ">
      <ProfileBar user={user} />

      <div className="overflow-auto p-5 flex justify-center items-center">
        <ChatMessages user={user} />
      </div>

      {/* Send Message Input and button */}
      <SendMessage />
    </div>
  );
}

export default MainChat;
