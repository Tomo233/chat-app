import DefaultUserImage from "../../assets/default-user.png";
import ProfileBar from "./ProfileBar";
import SendMessage from "./SendMessage";
import { useParams } from "react-router-dom";
import { useGetUserById } from "../authentication/useGetUserById";
import Loader from "../../components/Loader";
import { useChatMessages } from "./useChatMessages";
import { auth } from "../../firebaseConfig";
import NoConversation from "./NoConversation";

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
  if (!id) return <NoConversation />;

  return (
    <div className="bg-primaryPurple rounded-2xl w-2/3 grid grid-rows-[100px_auto_100px]">
      <ProfileBar />

      <div className="h-[500px] overflow-auto p-5">
        {chats.map((msg, index) => {
          const isLastMessageByUser =
            index === chats.length - 1 ||
            chats?.at(index + 1)?.senderId !== msg?.senderId;

          return (
            <div
              key={index}
              className={`flex gap-5 items-end text-white mb-3
          ${!isLastMessageByUser && "pl-[67px]"}
            ${
              msg?.senderId === auth.currentUser?.uid
                ? "place-self-end"
                : "place-self-start"
            }
            
            `}
            >
              {msg.receiverId === auth.currentUser?.uid &&
                isLastMessageByUser && (
                  <div>
                    <img
                      src={user?.photoURL || DefaultUserImage}
                      alt="DefaultUserImage Image"
                      className="h-12 rounded-3xl"
                    />
                    <p className="text-white text-center">9:00</p>
                  </div>
                )}

              <div className="bg-backgroundColor p-5 rounded-lg  max-w-72  break-words">
                <p>{msg?.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Send Message Input and button */}
      <SendMessage />
    </div>
  );
}

export default MainChat;
