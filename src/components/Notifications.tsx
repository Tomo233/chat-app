import { useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DefaultUserImage from "../assets/default-user.png";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import { UserInfo } from "../services/authentication";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import Loader from "./Loader";

function Notifications() {
  const [isOpened, setIsOpened] = useState(false);
  const { data: users, loading } = useFirestoreCollection<UserInfo>("users");
  const { user, isLoading } = useCurrentUser();

  const filteredUsers = users?.filter((element) => element.id !== user?.id);

  return (
    <div className="relative">
      <button onClick={() => setIsOpened((cur) => !cur)}>
        <NotificationsNoneOutlinedIcon sx={{ fontSize: 35, color: "#fff" }} />
      </button>
      {isOpened && (
        <div className="absolute z-10 right-1 mt-8 bg-[#3d2f64] w-[380px] border border-secondaryPurple max-h-96 rounded-2xl p-2 overflow-y-auto">
          {isLoading || loading ? (
            <div className="p-20">
              <Loader fontSize="text-2xl" circularProgressSize={45} />
            </div>
          ) : (
            filteredUsers?.map((user) => {
              return (
                <div className="flex gap-5 items-center p-6 border-b border-secondaryPurple">
                  <img
                    src={user.photoURL || DefaultUserImage}
                    alt="DefaultUserImage Image"
                    className="h-12 rounded-3xl"
                  />
                  <h3 className="text-white">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-white">Hi there,How are you?</p>
                  <p className="text-white">9:00</p>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Notifications;
