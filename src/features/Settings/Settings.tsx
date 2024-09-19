import DefaultUserImage from "../../assets/default-user.png";

function Settings() {
  return (
    <div className="grid gap-y-8   text-white bg-primaryPurple p-6">
      <h2 className="font-bold text-3xl ">My Profile</h2>
      <section className="flex justify-between items-center border border-secondaryPurple rounded-lg p-3">
        <div className="flex items-center">
          <img src={DefaultUserImage} alt="User Image" className="h-24" />
          <div>
            <h3 className="font-semibold">John Smith</h3>
            <p>London, UK</p>
          </div>
        </div>
        <button>Edit</button>
      </section>
      <section className="border border-secondaryPurple rounded-lg p-3">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl py-7">Personal Information</h2>
          <button>Edit</button>
        </div>
        <div className="grid grid-cols-2 gap-y-6">
          <div>
            <p>First Name</p>
            <p className="font-medium">John</p>
          </div>
          <div>
            <p>Last Name</p>
            <p className="font-medium">Smith</p>
          </div>

          <div>
            <p>Email</p>
            <p className="font-medium">johnsmith@gmail.com</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p>+30290301930139</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;
