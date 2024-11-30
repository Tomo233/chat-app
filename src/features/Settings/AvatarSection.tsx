import DefaultUserImage from "../../assets/default-user.png";
import EditIcon from "@mui/icons-material/Edit";
import { auth } from "../../firebaseConfig";
function AvatarSection() {
  return (
    <section className="flex justify-between items-center border border-secondaryPurple rounded-lg p-3">
      <div className="flex items-center">
        <img src={DefaultUserImage} alt="User Image" className="h-24" />
        <h3 className="font-semibold">John Smith</h3>
      </div>
      <button
        className="border border-secondaryPurple px-9 py-3 flex gap-2 rounded-3xl"
        onClick={() => {
          auth.signOut();
        }}
      >
        <EditIcon />
        Sign out
      </button>
    </section>
  );
}

export default AvatarSection;
