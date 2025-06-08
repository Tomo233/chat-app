import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import { useDeleteMessage } from "./useDeleteMessage";
import { ChatDataProps } from "./useChatMessages";
import { auth } from "../../firebaseConfig";
import ForwardMessageDialog from "./ForwardMessageDialog";
import { useSearchParams } from "react-router-dom";

type MessageMenuProps = {
  message: ChatDataProps;
};

export default function MessageMenu({ message }: MessageMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { deleteMessage, isPending } = useDeleteMessage();
  const [searchParams, setSearchParams] = useSearchParams();
  const date = new Date(message?.time.seconds * 1000);
  const formattedDate = `${date.getHours()}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMessageId = () => {
    searchParams.set("messageId", message.id);
    setSearchParams(searchParams);
    handleClose();
  };

  const handleDeleteMessage = () => {
    deleteMessage(message.id);
    handleClose();
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.message);

    toast("Copied to clipboard", {
      icon: "📋",
      style: {
        backgroundColor: "#3f3568",
        color: "#fff",
      },
    });
    handleClose();
  };

  const alignStyle = message.fileURL
    ? message.senderId === auth?.currentUser?.uid
      ? "right"
      : "left"
    : "top";

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color: "#fff",
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => {
          handleClose();
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              bgcolor: "#6e54b5",
              color: "#fff",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 2,
              pb: 0,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "& .MuiMenuItem-root:last-child": {
                mb: 0,
                pb: 0,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                [alignStyle]: 13,
                width: 10,
                height: 10,
                bgcolor: "#6e54b5",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <p className="text-center text-sm font-medium pb-1">{formattedDate}</p>
        <Box key="divider-1" sx={{ borderBottom: 1 }} />

        <ForwardMessageDialog
          message={message.message}
          fileURL={message.fileURL || null}
        />

        <Box key="divider-2" sx={{ borderBottom: 1 }} />

        {!message.fileURL && (
          <MenuItem onClick={() => handleCopyMessage()}>
            <ContentCopyIcon fontSize="small" />
            <span>Copy</span>
          </MenuItem>
        )}

        {message.senderId === auth?.currentUser?.uid && (
          <Box component="span">
            {!message.fileURL && (
              <Box sx={{ borderTop: 1, borderBottom: 1, pb: "5px" }}>
                <MenuItem onClick={handleMessageId}>
                  <EditIcon fontSize="small" />
                  <span>Edit</span>
                </MenuItem>
              </Box>
            )}
            <MenuItem onClick={handleDeleteMessage} disabled={isPending}>
              <DeleteIcon fontSize="small" />
              <span>Delete</span>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </div>
  );
}
