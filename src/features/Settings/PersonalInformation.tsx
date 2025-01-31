import EditIcon from "@mui/icons-material/Edit";
import { UserInfo } from "../../services/authentication";
import InformationInput from "./InformationInput";
import { useState } from "react";
import FileInput from "../../components/FileInput";
import { SignupInputs } from "../authentication/SignupForm";
import { useForm } from "react-hook-form";
import { auth } from "../../firebaseConfig";
import { uploadAvatar } from "../../services/uploadAvatar";

function PersonalInformation({ user }: { user: UserInfo }) {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, setValue } = useForm<SignupInputs>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "*********",
      confirmPassword: "*********",
    },
  });

  const handleSave = async (data: SignupInputs) => {
    if (isEditing) {
      const user = auth.currentUser;
      await uploadAvatar(data?.avatar, user);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <section className="border border-secondaryPurple rounded-lg p-3 pb-10 pl-7">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl py-7">Personal Information</h2>
        <button
          className="border border-secondaryPurple px-9 py-3 flex gap-2 rounded-3xl"
          onClick={handleSubmit(handleSave)}
        >
          <span>
            <EditIcon />
            {!isEditing ? "Edit" : "Save"}
          </span>
        </button>
      </div>
      <form className="grid grid-cols-3 gap-y-6 items-end">
        <div>
          <p>First Name</p>
          <InformationInput isEditing={isEditing} {...register("firstName")} />
        </div>

        <div>
          <p>Last Name</p>
          <InformationInput isEditing={isEditing} {...register("lastName")} />
        </div>

        <div>
          <FileInput
            isEditing={isEditing}
            {...register("avatar")}
            setValue={setValue}
          />
        </div>
        <div>
          <p>Email</p>
          <InformationInput isEditing={isEditing} {...register("email")} />
        </div>

        <div>
          <p className="font-medium">Current Password</p>
          <InformationInput isEditing={isEditing} {...register("password")} />
        </div>
        <div>
          <p className="font-medium">New Password</p>
          <InformationInput
            isEditing={isEditing}
            {...register("confirmPassword")}
          />
        </div>
      </form>
    </section>
  );
}

export default PersonalInformation;
