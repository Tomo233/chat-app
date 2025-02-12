import AvatarSection from "./AvatarSection";
import PersonalInformation from "./PersonalInformation";
import Loader from "../../components/Loader";
import { useCurrentUser } from "../authentication/useCurrentUser";

function Settings() {
  const { user, isLoading } = useCurrentUser();

  console.log(user);

  return (
    <div className="grid gap-y-8 text-white bg-primaryPurple p-6">
      <h2 className="font-bold text-3xl">My Profile</h2>
      {isLoading ? (
        <div className="flex justify-center items-center p-28">
          <Loader />
        </div>
      ) : (
        <>
          <AvatarSection user={user!} />
          <PersonalInformation user={user!} />
        </>
      )}
    </div>
  );
}

export default Settings;
