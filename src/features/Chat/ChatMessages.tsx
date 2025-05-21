import Loader from "../../components/Loader";
import { auth } from "../../firebaseConfig";
import { ChatDataProps } from "./useChatMessages";
import DefaultUserImage from "../../assets/default-user.png";
import { UserInfo } from "../../services/authentication";
import EmptyChat from "./EmptyChat";
import MessageMenu from "./MessageMenu";
import { useState } from "react";

type ChatMessagesProps = {
  chats: ChatDataProps[];
  user: UserInfo | null;
  isLoadingChats: boolean;
};

function ChatMessages({ chats, isLoadingChats, user }: ChatMessagesProps) {
  const [isHovered, setIsHovered] = useState<number | null>();

  if (isLoadingChats) return <Loader />;

  if (chats.length === 0) return <EmptyChat />;
  return (
    <div className="h-[500px] w-full">
      {chats.map((msg, index) => {
        const isLastMessageByUser =
          index === chats.length - 1 ||
          chats?.at(index + 1)?.senderId !== msg?.senderId;

        return (
          <div
            key={index}
            className={`flex gap-2 items-end text-white pb-1 
             ${!isLastMessageByUser && "pl-14"}
            ${
              msg?.senderId === auth.currentUser?.uid
                ? "place-self-end"
                : "place-self-start"
            }
            `}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
          >
            {msg.receiverId === auth.currentUser?.uid &&
              isLastMessageByUser && (
                <img
                  src={user?.photoURL || DefaultUserImage}
                  alt="DefaultUserImage Image"
                  className="h-12 rounded-3xl"
                />
              )}

            <div>
              {msg.edited && (
                <p
                  className={`text-sm ${
                    msg.receiverId === user?.id ? "text-end" : "text-start"
                  } text-secondaryPurple font-semibold`}
                >
                  edited
                </p>
              )}
              <div
                className={`flex items-center ${
                  msg.senderId !== auth.currentUser!.uid &&
                  isHovered === index &&
                  "flex-row-reverse"
                }`}
              >
                {isHovered === index && <MessageMenu message={msg} />}
                <div className="bg-backgroundColor p-4 rounded-lg max-w-64 break-words">
                  <p>{msg?.message}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
