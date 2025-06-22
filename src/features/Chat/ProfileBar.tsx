import DefaultUserImage from "../../assets/default-user.png";
import { UserInfo } from "../../services/authentication";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function ProfileBar({ user }: { user: UserInfo | null }) {
  return (
    <div className="flex justify-between  border-b border-borderColor p-3 h-20">
      <div className="flex items-center gap-3">
        <img
          src={user?.photoURL || DefaultUserImage}
          alt="Profile Image"
          className="h-12 w-12 rounded-3xl"
        />
        <div className="pt-2">
          <h3 className="text-white text-lg">
            {user?.firstName} {user?.lastName}
          </h3>
          <p
            className={`font-bold  -tracking-tight ${
              user?.status === "Online"
                ? "text-secondaryPurple"
                : "text-borderColor"
            }`}
          >
            <FiberManualRecordIcon
              sx={{
                fontSize: "18px",
                paddingRight: "2px",
                paddingBottom: "1px",
              }}
            />
            <span>{user?.status}</span>
          </p>
        </div>
      </div>
      <button className="bg-backgroundColor text-white px-8  rounded-lg">
        View Profile
      </button>
    </div>
  );
}

export default ProfileBar;
