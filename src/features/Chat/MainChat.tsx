import Profile from "../../assets/profile.png";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
function MainChat() {
  return (
    <section className="bg-buttonPurple rounded-2xl">
      <div className="grid grid-cols-2 place-items-start mt-8 max-h-[720px] overflow-auto">
        <div className="flex gap-5 items-center text-white p-10">
          <div>
            <img
              src={Profile}
              alt="Profile Image"
              className="h-12 rounded-3xl"
            />
            <p className="text-white text-center">9:00</p>
          </div>
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-white p-10 pt-32 pl-24">
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-white p-10">
          <div>
            <img
              src={Profile}
              alt="Profile Image"
              className="h-12 rounded-3xl"
            />
            <p className="text-white text-center">9:00</p>
          </div>
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-white p-10 pt-32 pl-24">
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-white p-10">
          <div>
            <img
              src={Profile}
              alt="Profile Image"
              className="h-12 rounded-3xl"
            />
            <p className="text-white text-center">9:00</p>
          </div>
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-white p-10 pt-32 pl-24">
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-white p-10">
          <div>
            <img
              src={Profile}
              alt="Profile Image"
              className="h-12 rounded-3xl"
            />
            <p className="text-white text-center">9:00</p>
          </div>
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-white p-10 pt-32 pl-24">
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-white p-10">
          <div>
            <img
              src={Profile}
              alt="Profile Image"
              className="h-12 rounded-3xl"
            />
            <p className="text-white text-center">9:00</p>
          </div>
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-white p-10 pt-32 pl-24">
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-white p-10">
          <div>
            <img
              src={Profile}
              alt="Profile Image"
              className="h-12 rounded-3xl"
            />
            <p className="text-white text-center">9:00</p>
          </div>
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
        <div className="flex gap-5 items-center text-white p-10 pt-32 pl-24">
          <div className="bg-[#2b2738] p-5 rounded-lg">
            <p>Hi there, How are you</p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 px-10 pb-5">
        <input
          type="text"
          placeholder="Type a Message"
          className="w-full rounded-2xl pl-3"
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
