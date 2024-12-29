import DefaultUserImage from "../../assets/default-user.png";
import EditIcon from "@mui/icons-material/Edit";
import { auth } from "../../firebaseConfig";
import { useCurrentUser } from "../authentication/useCurrentUser";
import Loader from "../../components/Loader";
function AvatarSection() {
  const { user, isLoading } = useCurrentUser();

  const handleSignOut = () => {
    auth.signOut();
  };

  if (isLoading) return <Loader />;

  return (
    <section className="flex justify-between items-center border border-secondaryPurple rounded-lg p-3">
      <div className="flex items-center gap-5">
        <img
          src={user?.photoURL ? user.photoURL : DefaultUserImage}
          alt="User Image"
          className="h-20 rounded-full"
        />
        <h3 className="font-semibold">
          {user?.firstName} {user?.lastName}
        </h3>
      </div>
      <button
        className="border border-secondaryPurple px-9 py-3 flex gap-2 rounded-3xl"
        onClick={handleSignOut}
      >
        <EditIcon />
        Sign out
      </button>
    </section>
  );
}

export default AvatarSection;
