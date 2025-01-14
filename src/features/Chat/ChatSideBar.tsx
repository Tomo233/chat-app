import { Link } from "react-router-dom";
import DefaultUserImage from "../../assets/default-user.png";
import Loader from "../../components/Loader";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { UserInfo } from "../../services/authentication";
import { useCurrentUser } from "../authentication/useCurrentUser";

function ChatSideBar() {
  const users = useFirestoreCollection<UserInfo>("users");
  const { user, isLoading } = useCurrentUser();

  if (isLoading) return <Loader />;

  const filteredUsers = users.filter((element) => element.id !== user?.id);

  return (
    <div>
      <input
        type="text"
        placeholder="Search Recent Chats"
        className="bg-primaryPurple w-96 h-14 pl-3 rounded-2xl outline-none text-white "
      />
      <div className="mt-8 bg-primaryPurple max-w-96 max-h-[650px]  rounded-2xl p-2 overflow-y-auto">
        {filteredUsers.map((item) => {
          return (
            <div key={item.id}>
              <Link
                to={`/chat/${item.id}`}
                className="flex gap-5 items-center p-6 border-b border-borderColor"
              >
                <img
                  src={item?.photoURL || DefaultUserImage}
                  alt="Profile Image"
                  className="h-12  rounded-full"
                />
                <h3 className="text-white">{item.firstName}</h3>
                <p className="text-white">Hi there,How are you?</p>
                <p className="text-white">9:00</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatSideBar;
