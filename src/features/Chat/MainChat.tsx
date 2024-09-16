import Profile from "../../assets/profile.png";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
function MainChat() {
  return (
    <section className="bg-buttonPurple rounded-2xl w-2/3 grid grid-rows-[100px_auto_100px]">
      {/* Profile */}
      <div className="flex justify-between border-b border-white p-3 h-20">
        <div className="flex gap-3">
          <img src={Profile} alt="Profile Image" className="h-12 rounded-3xl" />
          <div className="pt-2">
            <h3 className="text-white text-lg ">John Smith</h3>
            <p className="text-green-500">online</p>
          </div>
        </div>
        <button className="bg-[#2b2738] text-white px-8  rounded-lg">
          View Profile
        </button>
      </div>

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
            <div className="bg-[#2b2738] p-5 rounded-lg  max-w-72  break-words">
              <p>Hi there, How are you</p>
            </div>
          </div>
        </div>

        {/* Receiver */}
        <div className="flex gap-5 items-center text-white ">
          <div className="bg-[#2b2738] p-5 rounded-lg  max-w-72  break-words">
            <p>Hi there, How are you</p>
          </div>
        </div>
      </div>

      {/* Send Message Input and button  */}
      <div className="flex gap-5 px-10 items-end h-20 border-t pt-3  border-white">
        <input
          type="text"
          placeholder="Type a Message"
          className="w-full h-14 rounded-2xl pl-3"
        />
        <button>
          <SendRoundedIcon
            sx={{
              color: "#fff",
              fontSize: "3.5rem",
              background: "#2b2738",
              padding: "10px",
              borderRadius: "25px",
            }}
          />
        </button>
      </div>
    </section>
  );
}

export default MainChat;
