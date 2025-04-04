import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createPortal } from "react-dom";
import { Control, useForm, UseFormHandleSubmit } from "react-hook-form";
import { SignupAndProfileInputs } from "./SignupForm";
import { BaseSyntheticEvent, useState } from "react";
import InformationInput from "../settings/InformationInput";
import { UserInfo } from "../../services/authentication";
import FileInput from "../../components/FileInput";

type PopupProps = {
  isEditing: "saving" | "not-editing" | "editing";
  handleClose: () => void;
  control: Control<SignupAndProfileInputs>;
  handleSubmit: UseFormHandleSubmit<SignupAndProfileInputs>;
  editUser: (data: SignupAndProfileInputs) => void;
  user: UserInfo;
};

const EditUserInformation = function ({
  isEditing,
  handleClose,
  editUser,
  user,
}: PopupProps) {
  const { register, handleSubmit, setValue } = useForm<SignupAndProfileInputs>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      confirmOrNewPassword: "",
      avatar: null,
    },
  });
  const [editingStatus] = useState<"not-editing" | "editing" | "saving">(
    "not-editing"
  );
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
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 500,
          fontSize: "23px",
        }}
      >
        {true ? "Change User Information" : "Enter Current Password"}
      </DialogTitle>

      <DialogContent>
        <div className="grid gap-y-2">
          <div className="flex gap-3">
            <div>
              <p>First Name</p>
              <InformationInput {...register("firstName")} />
            </div>
            <div>
              <p>Last Name</p>
              <InformationInput {...register("lastName")} />
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <p>Email</p>
              <InformationInput {...register("email")} />
            </div>
            <div>
              <p>New Password</p>
              <InformationInput
                {...register("confirmOrNewPassword")}
                placeholder="*********"
                type="password"
              />
            </div>
          </div>

          <div>
            <p>Avatar</p>
            <FileInput
              isFullWidth={true}
              {...register("avatar")}
              setValue={setValue}
              editingStatus={editingStatus}
            />
          </div>
          <div>
            <p>Location</p>
            <button className="border border-secondaryPurple border-dashed py-3 rounded-md w-full">
              Get Location
            </button>
          </div>
        </div>
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

export default EditUserInformation;
