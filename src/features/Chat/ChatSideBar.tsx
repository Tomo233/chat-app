import { Link } from "react-router-dom";
import DefaultUserImage from "../../assets/default-user.png";
import seenIcon from "../../assets/seen.png";
import notSeenIcon from "../../assets/not-seen.png";
import Loader from "../../components/Loader";
import { auth } from "../../firebaseConfig";
import { useRecentChatsData } from "./useRecentChatsData";

function ChatSideBar() {
  const { recentChatsData, isLoading } = useRecentChatsData();

  return (
    <div>
      <input
        type="text"
        placeholder="Search Recent Chats"
        className="bg-primaryPurple w-96 h-14 pl-3 rounded-2xl outline-none text-white"
      />
      <div className="mt-8 bg-primaryPurple max-w-96 max-h-[650px]  rounded-2xl p-2 overflow-y-auto">
        {recentChatsData?.length === 0 ? (
          <div className="p-20">
            <p className="text-white text-lg uppercase">No Prevoius chats</p>
          </div>
        ) : (
          <div>
            {isLoading ? (
              <div className="flex items-center p-20 justify-center">
                <Loader circularProgressSize={45} fontSize="text-3xl" />
              </div>
            ) : (
              recentChatsData?.map((item) => {
                const isSeen = false;

                let style: string = "";
                if (item.senderId !== auth.currentUser?.uid) {
                  style = isSeen
                    ? "font-normal -tracking-tighter"
                    : "font-semibold tracking-wider";
                }

                return (
                  <div key={item.id}>
                    <Link
                      to={`/chat/${item.id}`}
                      className={`flex gap-5 items-center justify-between p-6 border-b border-borderColor`}
                    >
                      <div className="flex justify-between gap-4">
                        <img
                          src={item?.photoURL || DefaultUserImage}
                          alt="Profile Image"
                          className="h-12 w-12 rounded-full"
                        />
                        <div>
                          <h3 className={`text-white text-xl ${style}`}>
                            {item.firstName}
                          </h3>
                          <p className={`text-white  text-md ${style}`}>
                            {item.message.length >= 12
                              ? `${item.message.slice(0, 12)}...`
                              : item.message}
                          </p>
                        </div>
                      </div>
                      <div className="grid place-items-center">
                        <p className={`text-white ${style}`}>{item.time}</p>
                        {auth.currentUser?.uid === item.receiverId ? (
                          !isSeen && (
                            <div className="bg-secondaryPurple  w-6 h-6 text-center text-white font-bold rounded-full">
                              1
                            </div>
                          )
                        ) : isSeen ? (
                          <img src={seenIcon} className="w-6" alt="" />
                        ) : (
                          <img src={notSeenIcon} className="w-6" alt="" />
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatSideBar;
