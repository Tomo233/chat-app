import { createPortal } from "react-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PopUp({
  isEditing,
  handleClose,
}: {
  isEditing: "saving" | "not-editing" | "editing";
  handleClose: () => void;
}) {
  return createPortal(
    <Dialog
      open={isEditing === "saving" ? true : false}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { backgroundColor: "#3f3568", color: "white" },
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const email = formJson.email;
          console.log(email);
          handleClose();
        },
      }}
    >
      <DialogTitle>Enter Your Password</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "white" }}>
          To change personal information, please enter your current password
          here. We will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="password"
          label="Password"
          type="text"
          fullWidth
          variant="standard"
          slotProps={{
            input: {
              sx: {
                color: "white",
                "&::placeholder": { color: "white" },
              },
            },
            inputLabel: {
              sx: {
                color: "white",
                "&.Mui-focused": { color: "white" },
              },
            },
          }}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "transparent",
            },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "white",
            },
            "&.Mui-focused .MuiInput-underline:before": {
              borderBottomColor: "transparent",
            },
            "&.Mui-focused": {
              borderColor: "transparent",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>Cancel</Button> */}
        <button
          className="bg-secondaryPurple p-3 text-white font-semibold outline-none"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button
          className="bg-secondaryPurple p-3 text-white font-semibold outline-none"
          type="submit"
        >
          Submit
        </button>
      </DialogActions>
    </Dialog>,
    document.body
  );
}
