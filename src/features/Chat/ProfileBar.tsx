import Profile from "../../assets/profile.png";

function ProfileBar() {
  return (
    <div className="flex justify-between border-b border-borderColor p-3 h-20">
      <div className="flex gap-3">
        <img src={Profile} alt="Profile Image" className="h-12 rounded-3xl" />
        <div className="pt-2">
          <h3 className="text-white text-lg ">John Smith</h3>
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
