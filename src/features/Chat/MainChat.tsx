import Profile from "../../assets/profile.png";
import ProfileBar from "./ProfileBar";
import SendMessage from "./SendMessage";
function MainChat() {
  return (
    <section className="bg-primaryPurple rounded-2xl w-2/3 grid grid-rows-[100px_auto_100px]">
      {/* Profile */}
      <ProfileBar />
      <div className="grid grid-cols-2 place-items-center gap-4 max-h-[550px] overflow-auto place-content-start">
        {/* Sender */}
        <div className="flex gap-5 items-end  text-white p-10">
          <div>
            <img
              src={Profile}
              alt="Profile Image"
              className="h-12 rounded-3xl"
            />
            <p className="text-white text-center">9:00</p>
          </div>
          <div className="grid gap-3">
            <div className="bg-backgroundColor p-5 rounded-lg  max-w-72  break-words">
              <p>Hi there, How are you</p>
            </div>
          </div>
        </div>

        {/* Receiver */}
        <div className="grid gap-3  text-white ">
          <div className="bg-backgroundColor p-5 rounded-lg  max-w-72  break-words">
            <p>Hi there, How are you</p>
          </div>
        </div>
      </div>

      {/* Send Message Input and button  */}
      <SendMessage />
    </section>
  );
}

export default MainChat;
