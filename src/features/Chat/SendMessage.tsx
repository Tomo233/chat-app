import { BaseSyntheticEvent, useEffect, useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { useSearchParams } from "react-router-dom";
import { useSendMessage } from "./useSendMessages";
import { useMessageById } from "./useMessageById";
import { useEditMessage } from "./useEditMessage";
import Image from "../../assets/phone.png";

function SendMessage() {
  const [message, setMessage] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const messageId = searchParams.get("messageId");
  const { sendMessage, isPending } = useSendMessage();
  const { editingMessage, isLoading } = useMessageById();
  const { editMessage, isEditingMessage } = useEditMessage();

  const handleSendMessage = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    sendMessage({ message });
    setMessage("");
  };

  const handleEditMessage = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    editMessage(message);
    handleStopEditing();
  };

  const handleMessages = (e: BaseSyntheticEvent) => {
    if (isEditing) {
      handleEditMessage(e);
    } else {
      handleSendMessage(e);
    }
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
      }
      `}
    >
      <form className="w-full" onSubmit={(e) => handleMessages(e)}>
        {isEditing && (
          <div className="flex justify-between pt-1 w-3/4 mx-auto  text-white">
            <p>Edit Message</p>
            <button type="button" onClick={handleStopEditing}>
              <CloseIcon fontSize="medium" />
            </button>
          </div>
        )}
        {false && (
          <div className="flex items-center pl-24 pt-1">
            <div className="flex gap-3 relative">
              <div className="relative">
                <img src={Image} alt="Sample" className="w-12 rounded-lg" />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center rounded-lg" />
                <CloseIcon
                  sx={{
                    color: "white",
                    top: "0",
                    right: "-10px",
                    position: "absolute",
                    backgroundColor: "#59498b",
                    borderRadius: "10px",
                    fontSize: 17,
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-5 px-10 py-5 items-center">
          <UploadFileIcon sx={{ color: "white", fontSize: 40 }} />
          <input
            type="text"
            placeholder="Send Message"
            className="w-full h-14 rounded-xl pl-3 outline-none"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            required
          />
          <button disabled={isPending || isLoading || isEditingMessage}>
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
