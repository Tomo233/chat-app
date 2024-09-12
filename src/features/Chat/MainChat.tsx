import Profile from "../../assets/profile.png";

function MainChat() {
  return (
    <div className="bg-buttonPurple rounded-2xl grid grid-cols-2 place-items-start">
      <div className="flex gap-5 items-center text-white p-10">
        <div>
          <img src={Profile} alt="Profile Image" className="h-12 rounded-3xl" />
          <p className="text-white text-center">9:00</p>
        </div>
        <div className="bg-[#2b2738] p-5 rounded-lg">
          <p>Hi there, How are you</p>
        </div>
      </div>
      <div className="flex gap-5 items-center text-white p-10 pt-32">
        <div className="bg-[#2b2738] p-5 rounded-lg">
          <p>Hi there, How are you</p>
        </div>
      </div>
      <div className="flex gap-5 items-center text-white p-10">
        <div>
          <img src={Profile} alt="Profile Image" className="h-12 rounded-3xl" />
          <p className="text-white text-center">9:00</p>
        </div>
        <div className="bg-[#2b2738] p-5 rounded-lg">
          <p>Hi there, How are you</p>
        </div>
      </div>
      <div className="flex gap-5 items-center text-white p-10 pt-32">
        <div className="bg-[#2b2738] p-5 rounded-lg">
          <p>Hi there, How are you</p>
        </div>
      </div>
    </div>
  );
}

export default MainChat;
