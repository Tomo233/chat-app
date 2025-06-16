import { Link } from "react-router-dom";
import DefaultUserImage from "../../assets/default-user.png";
import Loader from "../../components/Loader";
import { useRecentChatsData } from "./useRecentChatsData";

function ChatSideBar() {
  const { recentChatsData, isLoadingChatsData } = useRecentChatsData();

  return (
    <div>
      <input
        type="text"
        placeholder="Search Recent Chats"
        className="bg-primaryPurple w-96 h-14 pl-3 rounded-2xl outline-none text-white "
      />
      <div className="mt-8 bg-primaryPurple max-w-96 max-h-[650px]  rounded-2xl p-2 overflow-y-auto">
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
                  className="flex gap-5 items-center p-6 border-b border-borderColor"
                >
                  <img
                    src={item?.photoURL || DefaultUserImage}
                    alt="Profile Image"
                    className="h-12 w-12  rounded-full"
                  />
                  <h3 className="text-white">{item.firstName}</h3>
                  <p className="text-white">{item.message}</p>
                  <p className="text-white">{item.time}</p>
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
