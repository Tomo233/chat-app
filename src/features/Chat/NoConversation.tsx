import { useNavigate } from "react-router-dom";
import { useRecentChatsData } from "./useRecentChatsData";

function NoConversation() {
  const { recentChatsData } = useRecentChatsData();
  const navigate = useNavigate();

  return (
    <div className="bg-primaryPurple rounded-2xl w-2/3 h-96 flex justify-center items-center">
      <div className="text-center">
        {recentChatsData?.length === 0 ? (
          <div>
            <div className="text-4xl mb-2">💬</div>
            <h2 className="text-white font-semibold text-3xl text-center uppercase pb-2 -tracking-tighter">
              Nothing here
            </h2>
            <p className="text-white text-sm pb-6 -tracking-tighter">
              You have no conversations yet. Start one!
            </p>
            <button
              className="bg-secondaryPurple px-10 py-3 text-white rounded-md font-medium"
              onClick={() => navigate("/contacts")}
            >
              Start a chat
            </button>
          </div>
        ) : (
          <h2 className="text-white font-semibold text-3xl text-center uppercase">
            No conversation is opened
          </h2>
        )}
      </div>
    </div>
  );
}

export default NoConversation;
