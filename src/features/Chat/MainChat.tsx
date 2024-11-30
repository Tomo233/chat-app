import { useState } from "react";
import Profile from "../../assets/profile.png";
import ProfileBar from "./ProfileBar";
import SendMessage from "./SendMessage";

function MainChat() {
  const [messages] = useState([
    { status: "sender", message: "Hi there I'm sender" },
    { status: "sender", message: "Hi there I'm sender again" },
    { status: "receiver", message: "Hi there I'm receiver" },
    { status: "receiver", message: "Hi there I'm sender again" },
    { status: "sender", message: "Hi there I'm sender once more 15" },
    { status: "receiver", message: "Hi there I'm sender again" },
    { status: "receiver", message: "Hi there I'm sender again" },
    { status: "receiver", message: "Hi there I'm sender again" },
    { status: "sender", message: "Hi there I'm sender once more 15" },
    { status: "receiver", message: "Hi there I'm receiver again" },
  ]);

  return (
    <div className="bg-primaryPurple rounded-2xl w-2/3 grid grid-rows-[100px_auto_100px]">
      {/* Profile */}
      <ProfileBar />

      <div className="max-h-[550px] overflow-auto p-5">
        {messages.map((msg, index) => {
          const isLastMessageByUser =
            index === messages.length - 1 ||
            messages[index + 1].status !== msg.status;

          return (
            <div
              key={index}
              className={`flex gap-5 items-end text-white mb-3 ${
                msg.status === "sender" ? "justify-start" : "justify-end"
              }
              ${!isLastMessageByUser && "pl-[67px]"}
              `}
            >
              {msg.status === "sender" && isLastMessageByUser && (
                <div>
                  <img
                    src={Profile}
                    alt="Profile Image"
                    className="h-12 rounded-3xl"
                  />
                  <p className="text-white text-center">9:00</p>
                </div>
              )}

              <div className="bg-backgroundColor p-5 rounded-lg  max-w-72  break-words">
                <p>Hi there, How are you</p>
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
