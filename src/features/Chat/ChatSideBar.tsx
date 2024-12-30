import Profile from "../../assets/profile.png";
import Loader from "../../components/Loader";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { UserInfo } from "../../services/authentication";
import { useCurrentUser } from "../authentication/useCurrentUser";

function ChatSideBar() {
  const users = useFirestoreCollection<UserInfo>("users");
  const { user, isLoading } = useCurrentUser();

  const filteredUsers = users.filter((element) => element.id !== user?.id);

  if (isLoading) return <Loader />;

  return (
    <div>
      <input
        type="text"
        placeholder="Search Contacts"
        className="bg-primaryPurple w-96 h-14 pl-3 rounded-2xl outline-none text-white "
      />
      <div className="mt-8 bg-primaryPurple max-w-96 max-h-[650px]  rounded-2xl p-2 overflow-y-auto">
        {filteredUsers.map((item) => {
          return (
            <div
              className="flex gap-5 items-center p-6 border-b border-borderColor"
              key={item.id}
            >
              <img
                src={Profile}
                alt="Profile Image"
                className="h-12 rounded-3xl"
              />
              <h3 className="text-white">{item.firstName}</h3>
              <p className="text-white">Hi there,How are you?</p>
              <p className="text-white">9:00</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatSideBar;
