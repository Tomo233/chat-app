import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createPortal } from "react-dom";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import { SignupAndProfileInputs } from "./SignupForm";
import { BaseSyntheticEvent } from "react";

type PopupProps = {
  isEditing: "saving" | "not-editing" | "editing";
  handleClose: () => void;
  control: Control<SignupAndProfileInputs>;
  handleSubmit: UseFormHandleSubmit<SignupAndProfileInputs>;
  editUser: (data: SignupAndProfileInputs) => void;
};

const ConfirmPasswordPopup = function ({
  isEditing,
  handleClose,
  control,
  handleSubmit,
  editUser,
}: PopupProps) {
  const submit = (data: any, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    editUser(data);
    handleClose();
  };

  return createPortal(
    <Dialog
      open={isEditing === "saving" ? true : false}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        sx: { backgroundColor: "#3f3568", color: "white" },
        onSubmit: handleSubmit(submit),
      }}
    >
      <DialogTitle>Enter Your Password</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "white" }}>
          To change personal information, please enter your current password
          here. We will send updates occasionally.
        </DialogContentText>
        <Controller
          name={"password"}
          control={control}
          render={({ field: { onChange } }) => (
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="password"
              onChange={(e) => onChange(e.target.value)}
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
          )}
        />
      </DialogContent>

      <DialogActions>
        <button
          className="bg-secondaryPurple p-3 text-white font-semibold outline-none"
          onClick={(e) => {
            e.preventDefault();
            handleClose();
          }}
          type="button"
        >
          Cancel
        </button>
        <button
          className="bg-secondaryPurple p-3 text-white font-semibold outline-none"
          type="submit"
          // onSubmit={handleSubmit(submit)}
        >
          Submit
        </button>
      </DialogActions>
    </Dialog>,
    document.body
  );
};

export default ConfirmPasswordPopup;
