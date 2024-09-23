import SendRoundedIcon from "@mui/icons-material/SendRounded";
import UploadFileIcon from "@mui/icons-material/UploadFile";
function SendMessage() {
  return (
    <div className="flex gap-5 px-10 items-center h-20 border-t pt-5  border-borderColor">
      <UploadFileIcon sx={{ color: "white", fontSize: 40 }} />
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
