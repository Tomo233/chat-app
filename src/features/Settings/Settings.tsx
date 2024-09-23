import AvatarSection from "./AvatarSection";
import PersonalInformation from "./PersonalInformation";

function Settings() {
  return (
    <div className="grid gap-y-8 text-white bg-primaryPurple p-6">
      <h2 className="font-bold text-3xl">My Profile</h2>
      <AvatarSection />
      <PersonalInformation />
    </div>
  );
}

export default Settings;
