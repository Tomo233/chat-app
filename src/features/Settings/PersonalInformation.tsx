import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserInfo } from "../../services/authentication";
import { SignupAndProfileInputs } from "../authentication/SignupForm";
import { useEditUser } from "../authentication/useEditUser";
import Loader from "../../components/Loader";
import ConfirmPasswordPopup from "../authentication/ConfirmPasswordPopup";
import EditIcon from "@mui/icons-material/Edit";

function PersonalInformation({ user }: { user: UserInfo }) {
  const { email, firstName, lastName, location } = user;
  const { isEditingUser, editUser } = useEditUser();
  const [editingStatus, setEditingStatus] = useState<
    "not-editing" | "editing" | "saving"
  >("not-editing");

  const { handleSubmit, control } = useForm<SignupAndProfileInputs>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      confirmOrNewPassword: "",
      avatar: null,
    },
  });

  if (isEditingUser) return <Loader />;

  return (
    <section className="border border-secondaryPurple rounded-lg p-3 pb-10 pl-7">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl py-7">Personal Information</h2>
        <button
          className="border border-secondaryPurple px-12 py-3 flex gap-2 rounded-3xl"
          onClick={() => setEditingStatus("saving")}
        >
          <span>
            <EditIcon />
            Edit
          </span>
        </button>
      </div>
      <form className="grid grid-cols-2 gap-y-6 items-end">
        <div>
          <p className="text-lg text-[#d6d4d4]">First Name</p>
          <p className="text-lg font-semibold">{firstName}</p>
        </div>
        <div>
          <p className="text-lg text-[#d6d4d4]">Email</p>
          <p className="text-lg font-semibold">{email}</p>
        </div>
        <div>
          <p className="text-lg text-[#d6d4d4]">Last Name</p>
          <p className="text-lg font-semibold">{lastName}</p>
        </div>

        <div>
          {location ? (
            <>
              <p className="text-lg text-[#d6d4d4]">Location</p>
              <p className="text-lg font-semibold">{location}</p>
            </>
          ) : (
            <p className="text-lg text-[#e0dede] mb-3 font-medium">
              Location not provided !
            </p>
          )}
        </div>
      </form>
      {editingStatus === "saving" && (
        <ConfirmPasswordPopup
          handleClose={() => setEditingStatus("not-editing")}
          isEditing={editingStatus}
          control={control}
          handleSubmit={handleSubmit}
          editUser={editUser}
        />
      )}
    </section>
  );
}

export default PersonalInformation;
