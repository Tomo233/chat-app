import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#6e54b5",
  boxShadow: 50,
  borderRadius: "15px",
  border: "none",
  outline: "none",
};

type ChatImageModalProps = {
  open: boolean;
  handleClose: () => void;
  fileURL: string;
};

export default function ChatImageModal({
  open,
  handleClose,
  fileURL,
}: ChatImageModalProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={fileURL} alt="Image" />
        </Box>
      </Modal>
    </div>
  );
}
