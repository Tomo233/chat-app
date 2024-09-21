import SendRoundedIcon from "@mui/icons-material/SendRounded";

function SendMessage() {
  return (
    <div className="flex gap-5 px-10 items-end h-20 border-t pt-3  border-borderColor">
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
            backgroundColor: "#2b2738",
            padding: "10px",
            borderRadius: "25px",
          }}
        />
      </button>
    </div>
  );
}

export default SendMessage;
