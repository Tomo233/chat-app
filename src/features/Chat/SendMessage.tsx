import SendRoundedIcon from "@mui/icons-material/SendRounded";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { BaseSyntheticEvent, useState } from "react";
import { useSendMessages } from "./useSendMessages";

function SendMessage() {
  const [message, setMessage] = useState<string>("");
  const { sendMessage } = useSendMessages();

  const handleSendMessage = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    sendMessage(message);
  };

  return (
    <form
      className="flex gap-5 px-10 items-center h-20 border-t pt-5 border-borderColor"
      onSubmit={handleSendMessage}
    >
      <UploadFileIcon sx={{ color: "white", fontSize: 40 }} />
      <input
        type="text"
        placeholder="Send Message"
        className="w-full h-14 rounded-2xl pl-3 outline-none"
        onChange={(e) => setMessage(e.target.value)}
        required
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
    </form>
  );
}

export default SendMessage;
