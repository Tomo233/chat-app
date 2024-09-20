import Profile from "../../assets/profile.png";

function ChatSideBar() {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Contacts"
        className="bg-primaryPurple w-96 h-14 pl-3 rounded-2xl outline-none text-white "
      />
      <div className="mt-8 bg-primaryPurple max-w-96 rounded-2xl p-2">
        <div className="flex gap-5 items-center p-6 border-b border-borderColor">
          <img src={Profile} alt="Profile Image" className="h-12 rounded-3xl" />
          <h3 className="text-white">John Smith</h3>
          <p className="text-white">Hi there,How are you?</p>
          <p className="text-white">9:00</p>
        </div>
        <div className="flex gap-5 items-center p-6 border-b border-borderColor">
          <img src={Profile} alt="Profile Image" className="h-12 rounded-3xl" />
          <h3 className="text-white">John Smith</h3>
          <p className="text-white">Hi there,How are you?</p>
          <p className="text-white">9:00</p>
        </div>
        <div className="flex gap-5 items-center p-6 border-b border-borderColor">
          <img src={Profile} alt="Profile Image" className="h-12 rounded-3xl" />
          <h3 className="text-white">John Smith</h3>
          <p className="text-white">Hi there,How are you?</p>
          <p className="text-white">9:00</p>
        </div>
        <div className="flex gap-5 items-center p-6 border-b border-borderColor">
          <img src={Profile} alt="Profile Image" className="h-12 rounded-3xl" />
          <h3 className="text-white">John Smith</h3>
          <p className="text-white">Hi there,How are you?</p>
          <p className="text-white">9:00</p>
        </div>
        <div className="flex gap-5 items-center p-6 border-b border-borderColor">
          <img src={Profile} alt="Profile Image" className="h-12 rounded-3xl" />
          <h3 className="text-white">John Smith</h3>
          <p className="text-white">Hi there,How are you?</p>
          <p className="text-white">9:00</p>
        </div>
        <div className="flex gap-5 items-center p-6 border-b border-borderColor">
          <img src={Profile} alt="Profile Image" className="h-12 rounded-3xl" />
          <h3 className="text-white">John Smith</h3>
          <p className="text-white">Hi there,How are you?</p>
          <p className="text-white">9:00</p>
        </div>
      </div>
    </div>
  );
}

export default ChatSideBar;
