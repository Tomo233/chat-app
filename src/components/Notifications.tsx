import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Profile from "../assets/profile.png";
import { useState } from "react";

function Notifications() {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpened((cur) => !cur)}>
        <NotificationsNoneOutlinedIcon sx={{ fontSize: 35, color: "#fff" }} />
      </button>
      {isOpened && (
        <div className="absolute right-1  mt-8 bg-primaryPurple w-[380px] border border-secondaryPurple  max-h-96  rounded-2xl p-2 overflow-y-auto">
          <div className="flex gap-5 items-center p-6 border-b border-borderColor">
            <img
              src={Profile}
              alt="Profile Image"
              className="h-12 rounded-3xl"
            />
            <h3 className="text-white">John Smith</h3>
            <p className="text-white">Hi there,How are you?</p>
            <p className="text-white">9:00</p>
          </div>
          <div className="flex gap-5 items-center p-6 border-b border-borderColor">
            <img
              src={Profile}
              alt="Profile Image"
              className="h-12 rounded-3xl"
            />
            <h3 className="text-white">John Smith</h3>
            <p className="text-white">Hi there,How are you?</p>
            <p className="text-white">9:00</p>
          </div>
          <div className="flex gap-5 items-center p-6 border-b border-borderColor">
            <img
              src={Profile}
              alt="Profile Image"
              className="h-12 rounded-3xl"
            />
            <h3 className="text-white">John Smith</h3>
            <p className="text-white">Hi there,How are you?</p>
            <p className="text-white">9:00</p>
          </div>
          <div className="flex gap-5 items-center p-6 border-b border-borderColor">
            <img
              src={Profile}
              alt="Profile Image"
              className="h-12 rounded-3xl"
            />
            <h3 className="text-white">John Smith</h3>
            <p className="text-white">Hi there,How are you?</p>
            <p className="text-white">9:00</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
