import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import DefaultUserImage from "../../assets/default-user.png";
import Loader from "../../components/Loader";
import { UserInfo } from "../../services/authentication";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { createPortal } from "react-dom";
import { auth } from "../../firebaseConfig";
import { useParams } from "react-router-dom";
import { useSendMessage } from "./useSendMessages";
import { uploadFile } from "../../services/uploadFile";

type ForwardMessageDialogProps = {
  message: string;
  fileURL: string | null;
};

export default function ForwardMessageDialog({
  message,
  fileURL,
}: ForwardMessageDialogProps) {
  const [open, setOpen] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState<{
    [key: number]: boolean;
  }>({});
  const { data: users, isLoading } = useFirestoreCollection<UserInfo>("users");
  const { id } = useParams();
  const filteredUsers = users.filter(
    (user) => user.id !== auth.currentUser?.uid && user.id !== id
  );
  const { sendMessage, isPending } = useSendMessage();

  const handleClose = () => {
    setOpen(false);
    setDisabledButtons({});
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleForwardMessage = (index: number, receiverId: string) => {
    setDisabledButtons((prev) => ({ ...prev, [index]: true }));

    if (fileURL) {
      uploadFile(null, receiverId, fileURL);
    } else {
      sendMessage({
        message,
        forwardedToUserId: receiverId,
      });
    }
  };

  return (
    <>
      <button onClick={handleClickOpen} className="p-1.5">
        <ShortcutIcon fontSize="small" />
        <span>Forward</span>
      </button>

      {open &&
        createPortal(
          <Dialog
            open
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: "100%",
                maxWidth: "600px",
              },
            }}
          >
            <div className="bg-secondaryPurple text-white">
              <DialogTitle className="text-center">
                Forward Message To
              </DialogTitle>

              <List sx={{ pt: 0 }}>
                {isLoading ? (
                  <div className="p-9">
                    <Loader fontSize="text-3xl" circularProgressSize={40} />
                  </div>
                ) : (
                  filteredUsers.map((user, index) => {
                    const isDisabled = disabledButtons[index] || isPending;

                    return (
                      <ListItem
                        key={user.id}
                        disablePadding
                        className="w-96 border-b p-2 flex items-center gap-4"
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <img
                              src={user.photoURL || DefaultUserImage}
                              alt={`${user.firstName} ${user.lastName}`}
                            />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={`${user.firstName} ${user.lastName}`}
                        />

                        <button
                          className={`bg-primaryPurple text-white px-4 py-2 rounded ${
                            isDisabled && "cursor-not-allowed"
                          }`}
                          onClick={() => handleForwardMessage(index, user.id)}
                          disabled={isDisabled}
                        >
                          {isDisabled ? "Sent" : "Send"}
                        </button>
                      </ListItem>
                    );
                  })
                )}
              </List>
            </div>
          </Dialog>,
          document.body
        )}
    </>
  );
}
