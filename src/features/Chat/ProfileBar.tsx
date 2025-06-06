import DefaultUserImage from "../../assets/default-user.png";
import { UserInfo } from "../../services/authentication";

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
          <p className="text-green-500">online</p>
        </div>
      </div>
      <button className="bg-backgroundColor text-white px-8  rounded-lg">
        View Profile
      </button>
    </div>
  );
}

export default ProfileBar;
