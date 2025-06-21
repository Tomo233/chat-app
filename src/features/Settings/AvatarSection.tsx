import DefaultUserImage from "../../assets/default-user.png";
import EditIcon from "@mui/icons-material/Edit";
import { UserInfo } from "../../services/authentication";
import { useSignOut } from "./useSignOut";
import Loader from "../../components/Loader";

function AvatarSection({ user }: { user: UserInfo }) {
  const { signOutUser, isSigningOut } = useSignOut();

  if (isSigningOut) {
    return <Loader />;
  }

  return (
    <section className="flex justify-between items-center border border-secondaryPurple rounded-lg p-3">
      <div className="flex items-center gap-5">
        <img
          src={user?.photoURL || DefaultUserImage}
          alt="User Image"
          className="h-20 w-20 rounded-full"
        />
        <h3 className="font-semibold">
          {user?.firstName} {user?.lastName}
        </h3>
      </div>
      <button
        className="border border-secondaryPurple px-9 py-3 flex gap-2 rounded-3xl"
        onClick={() => signOutUser(user.id)}
      >
        <EditIcon />
        Sign out
      </button>
    </section>
  );
}

export default AvatarSection;
