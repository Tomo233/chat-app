import EditIcon from "@mui/icons-material/Edit";
import { UserInfo } from "../../services/authentication";
import InformationInput from "./InformationInput";
import { useEffect, useState } from "react";
import FileInput from "../../components/FileInput";
import { useForm } from "react-hook-form";
import PopUp from "../../components/PopUp";
import { SignupAndProfileInputs } from "../authentication/SignupForm";

function PersonalInformation({ user }: { user: UserInfo }) {
  const [editingStatus, setEditingStatus] = useState<
    "not-editing" | "editing" | "saving"
  >("not-editing");
  const { register, handleSubmit, setValue, watch, reset, control } =
    useForm<SignupAndProfileInputs>({
      defaultValues: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: "",
        confirmOrNewPassword: "",
        avatar: null,
      },
    });

  useEffect(() => {
    if (
      user.email != watch("email") ||
      user.firstName != watch("firstName") ||
      user.lastName != watch("lastName") ||
      watch("avatar") !== null ||
      watch("confirmOrNewPassword") !== ""
    ) {
      setEditingStatus("editing");
    } else {
      setEditingStatus("not-editing");
    }
  }, [
    user,
    watch("email"),
    watch("firstName"),
    watch("lastName"),
    watch("avatar"),
    watch("confirmOrNewPassword"),
  ]);

  useEffect(() => {
    if (editingStatus === "not-editing") reset();
  }, [editingStatus]);

  return (
    <section className="border border-secondaryPurple rounded-lg p-3 pb-10 pl-7">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl py-7">Personal Information</h2>
        {editingStatus !== "not-editing" && (
          <button
            className="border border-secondaryPurple px-9 py-3 flex gap-2 rounded-3xl"
            onClick={() => setEditingStatus("saving")}
          >
            <span>
              <EditIcon />
              Save
            </span>
          </button>
        )}
      </div>
      <form className="grid grid-cols-3 gap-y-6 items-end">
        <div>
          <p>First Name</p>
          <InformationInput {...register("firstName")} />
        </div>

        <div>
          <p>Last Name</p>
          <InformationInput {...register("lastName")} />
        </div>

        <div>
          <FileInput {...register("avatar")} setValue={setValue} />
        </div>
        <div>
          <p>Email</p>
          <InformationInput {...register("email")} />
        </div>

        <div>
          <p className="font-medium">New Password</p>
          <InformationInput
            {...register("confirmOrNewPassword")}
            placeholder="*********"
          />
        </div>
      </form>
      {editingStatus === "saving" && (
        <PopUp
          handleClose={() => setEditingStatus("not-editing")}
          isEditing={editingStatus}
          control={control}
          handleSubmit={handleSubmit}
        />
      )}
    </section>
  );
}

export default PersonalInformation;
