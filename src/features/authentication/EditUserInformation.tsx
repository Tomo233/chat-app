import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { SignupAndProfileInputs } from "./SignupForm";
import { BaseSyntheticEvent } from "react";
import InformationInput from "../settings/InformationInput";
import { UserInfo } from "../../services/authentication";
import FileInput from "../../components/FileInput";
import { EditingStatusType } from "../settings/PersonalInformation";

type PopupProps = {
  editingStatus: EditingStatusType;
  handleChange: (status: EditingStatusType) => void;
  user: UserInfo;
  editUser: (data: SignupAndProfileInputs) => void;
};

const EditUserInformation = function ({
  editingStatus,
  handleChange,
  user,
  editUser,
}: PopupProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<SignupAndProfileInputs>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      confirmOrNewPassword: "",
      avatar: null,
    },
  });

  const submit = (data: any, e?: BaseSyntheticEvent) => {
    e?.preventDefault();
    editUser(data);
    handleChange("not-editing");
  };

  return createPortal(
    <Dialog
      open={editingStatus !== "not-editing"}
      onClose={() => handleChange("not-editing")}
      PaperProps={{
        component: "form",
        sx: { backgroundColor: "#3f3568", color: "white" },
        onSubmit: (e: any) => {
          e.preventDefault();
          if (editingStatus === "saving") handleSubmit(submit)();

          handleChange("saving");
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 500,
          fontSize: "23px",
        }}
      >
        {editingStatus === "editing"
          ? "Change User Information"
          : "Enter Current Password"}
      </DialogTitle>

      <DialogContent>
        {editingStatus === "editing" ? (
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
        ) : (
          <div>
            <p className="mb-3">
              To change personal information, please enter your current password
              here. We will send updates occasionally.
            </p>

            <p className="text-white">{errors?.password?.message}</p>
            <InformationInput
              {...register("password", {
                required: "This field is required",
              })}
              placeholder="Current Password"
              type="password"
              isFullWidth={true}
            />
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <button
          className="bg-secondaryPurple p-3 text-white font-semibold outline-none"
          type="button"
          onClick={() => {
            editingStatus === "editing"
              ? handleChange("not-editing")
              : handleChange("editing");
          }}
        >
          {editingStatus === "editing" ? "Cancel" : "Back"}
        </button>
        <button
          className="bg-secondaryPurple p-3 text-white font-semibold outline-none"
          type="submit"
          disabled={!isDirty}
          onClick={() => {
            if (editingStatus !== "saving") handleChange("saving");
          }}
        >
          {editingStatus === "editing" ? "Next Step" : "Submit"}
        </button>
      </DialogActions>
    </Dialog>,
    document.body
  );
};

export default EditUserInformation;
