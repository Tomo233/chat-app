import { Link } from "react-router-dom";
import { useRecentChatsData } from "./useRecentChatsData";
import DefaultUserImage from "../../assets/default-user.png";
import Icon from "../../assets/seen.png";
import Loader from "../../components/Loader";

function ChatSideBar() {
  const { recentChatsData, isLoadingChatsData } = useRecentChatsData();

  console.log(recentChatsData);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Recent Chats"
        className="bg-primaryPurple w-96 h-14 pl-3 rounded-2xl outline-none text-white "
      />
      <div className="mt-8 bg-primaryPurple max-w-96 max-h-[650px]  rounded-2xl p-2 overflow-y-auto">
        {recentChatsData?.length === 0 && (
          <div className="p-20">
            <p className="text-white text-lg uppercase">No Prevoius chats</p>
          </div>
        )}

        {isLoadingChatsData ? (
          <div className="flex items-center p-20 justify-center">
            <Loader circularProgressSize={45} fontSize="text-3xl" />
          </div>
        ) : (
          recentChatsData?.map((item) => {
            return (
              <div key={item.id}>
                <Link
                  to={`/chat/${item.id}`}
                  className="flex gap-5 items-center justify-between p-6 border-b border-borderColor"
                >
                  <div className="flex justify-between gap-4">
                    <img
                      src={item?.photoURL || DefaultUserImage}
                      alt="Profile Image"
                      className="h-12 w-12  rounded-full"
                    />
                    <div>
                      <h3 className="text-white text-xl font-medium -tracking-tighter">
                        {item.firstName}
                      </h3>
                      <p className="text-[#cfcbcb] text-sm -tracking-tighter">
                        {item.message.length >= 20
                          ? `${item.message.slice(0, 20)}...`
                          : item.message}
                      </p>
                    </div>
                  </div>
                  <div className="grid place-items-center">
                    <p className="text-white -tracking-tighter">{item.time}</p>
                    <img src={Icon} className="w-6" alt="" />
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ChatSideBar;
