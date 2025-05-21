import { BaseSyntheticEvent, useEffect, useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { useSearchParams } from "react-router-dom";
import { useSendMessage } from "./useSendMessages";
import { useMessageById } from "./useMessageById";

function SendMessage() {
  const [message, setMessage] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const messageId = searchParams.get("messageId");
  const { sendMessage, isPending } = useSendMessage();
  const { editingMessage, isLoading } = useMessageById();

  const handleSendMessage = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    sendMessage({ message });
    setMessage("");
  };

  const handleStopEditing = () => {
    setIsEditing(false);
    setMessage("");
    searchParams.delete("messageId");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!editingMessage || !editingMessage.message) return;

    setMessage(editingMessage.message);
    setIsEditing(true);
  }, [messageId, editingMessage]);

  return (
    <div
      className={`border-t border-borderColor grid ${
        isEditing ? "place-items-start" : "place-items-center"
      }`}
    >
      <form className="w-full" onSubmit={(e) => handleSendMessage(e)}>
        {isEditing && (
          <div className="flex justify-between pt-1 w-3/4 mx-auto  text-white">
            <p>Edit Message</p>
            <button onClick={handleStopEditing}>
              <CloseIcon fontSize="medium" />
            </button>
          </div>
        )}
        <div className="flex gap-5 px-10 pt-1 items-center">
          <UploadFileIcon sx={{ color: "white", fontSize: 40 }} />
          <input
            type="text"
            placeholder="Send Message"
            className="w-full h-14 rounded-2xl pl-3 outline-none"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            required
          />
          <button disabled={isPending || isLoading}>
            <SendRoundedIcon
              sx={{
                color: "#fff",
                fontSize: "3.5rem",
                backgroundColor: message ? "#6e54b5" : "#2b2738",
                padding: "10px",
                borderRadius: "25px",
              }}
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendMessage;
