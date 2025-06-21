import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { useChatMessages } from "./useChatMessages";
import { UserInfo } from "../../services/authentication";
import EmptyChat from "./EmptyChat";
import MessageMenu from "./MessageMenu";
import Loader from "../../components/Loader";
import DefaultUserImage from "../../assets/default-user.png";
import ChatImageModal from "./ChatImageModal";
import { useParams } from "react-router-dom";
import { useGetMessagesSeen } from "./useGetMessagesSeen";

function ChatMessages({ user }: { user: UserInfo | null }) {
  const { chatsMessages, isLoading: isLoadingChatsMessages } =
    useChatMessages();
  const [isHovered, setIsHovered] = useState<number | null>();
  const [open, setOpen] = useState(false);
  const { id: receiverId } = useParams();
  const { getMessageSeen, isPending } = useGetMessagesSeen();

  useEffect(() => {
    getMessageSeen(chatsMessages);
  }, [receiverId, chatsMessages]);

  if (isLoadingChatsMessages || isPending) return <Loader />;

  if (chatsMessages.length === 0) return <EmptyChat />;

  return (
    <div className="h-[500px] w-full">
      {chatsMessages.map((msg, index) => {
        const isLastMessageByUser =
          index === chatsMessages.length - 1 ||
          chatsMessages?.at(index + 1)?.senderId !== msg?.senderId;
        const isUserReceiver = msg.receiverId === auth.currentUser?.uid;

        return (
          <div
            key={index}
            className={`flex gap-2 items-end text-white pb-1  ${
              !isLastMessageByUser && "pl-14"
            }
            ${isUserReceiver ? "place-self-start" : "place-self-end"}
            `}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
          >
            {isUserReceiver && isLastMessageByUser && (
              <img
                src={user?.photoURL || DefaultUserImage}
                alt="DefaultUserImage Image"
                className="h-12 w-12 rounded-3xl"
              />
            )}

            <div
              className={`grid  ${
                isUserReceiver ? "place-items-start" : "place-items-end"
              }`}
            >
              {msg.edited && (
                <p
                  className={`text-sm text-secondaryPurple font-semibold ${
                    isUserReceiver ? "text-end" : "text-start"
                  }`}
                >
                  edited
                </p>
              )}
              <div
                className={`flex items-center ${
                  isUserReceiver && isHovered === index && "flex-row-reverse"
                }
                `}
              >
                {isHovered == index && <MessageMenu message={msg} />}

                {msg.message && (
                  <div className="bg-backgroundColor p-4 rounded-lg max-w-64 break-words">
                    <p>{msg.message}</p>
                  </div>
                )}

                {msg.fileURL && (
                  <div>
                    <ChatImageModal
                      fileURL={msg.fileURL}
                      open={open}
                      handleClose={() => setOpen(false)}
                    />
                    <div
                      className="bg-secondaryPurple rounded-md cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      <img
                        src={msg.fileURL}
                        alt="Image"
                        className="max-w-64 max-h-80 rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>

              {false && (
                <p
                  className={`text-sm text-secondaryPurple font-semibold text-end pr-2`}
                >
                  seen
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
