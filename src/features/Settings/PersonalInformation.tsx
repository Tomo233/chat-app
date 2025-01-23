import EditIcon from "@mui/icons-material/Edit";
import { UserInfo } from "../../services/authentication";
import InformationInput from "./InformationInput";
import { useState } from "react";
import FileInput from "../../components/FileInput";

function PersonalInformation({ user }: { user: UserInfo }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <section className="border border-secondaryPurple rounded-lg p-3 pb-10 pl-7">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl py-7">Personal Information</h2>
        <button
          className="border border-secondaryPurple px-9 py-3 flex gap-2 rounded-3xl"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <EditIcon />
          {!isEditing ? "Edit" : "Save"}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-y-6 items-end">
        <div>
          <p>First Name</p>
          <InformationInput value={user.firstName} isEditing={isEditing} />
        </div>

        <div>
          <p>Last Name</p>
          <InformationInput value={user.lastName} isEditing={isEditing} />
        </div>

        <div>
          <FileInput isEditing={isEditing} />
        </div>
        <div>
          <p>Email</p>
          <InformationInput value={user.email} isEditing={isEditing} />
        </div>

        <div>
          <p className="font-medium">Current Password</p>
          <InformationInput value={"*********"} isEditing={isEditing} />
        </div>
        <div>
          <p className="font-medium">New Password</p>
          <InformationInput value={"*********"} isEditing={isEditing} />
        </div>
      </div>
    </section>
  );
}

export default PersonalInformation;
