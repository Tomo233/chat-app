import { useState } from "react";
import { UserInfo } from "../../services/authentication";
import EditIcon from "@mui/icons-material/Edit";
import EditUserInformation from "../authentication/EditUserInformation";
import { useEditUser } from "../authentication/useEditUser";
import Loader from "../../components/Loader";

export type EditingStatusType = "saving" | "not-editing" | "editing";

function PersonalInformation({ user }: { user: UserInfo }) {
  const { email, firstName, lastName, location } = user;
  const [editingStatus, setEditingStatus] =
    useState<EditingStatusType>("not-editing");
  const { editUser, isEditingUser } = useEditUser();

  if (isEditingUser) return <Loader />;

  return (
    <section className="border border-secondaryPurple rounded-lg p-3 pb-10 pl-7">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl py-7">Personal Information</h2>
        <button
          className="border border-secondaryPurple px-12 py-3 flex gap-2 rounded-3xl"
          onClick={() => setEditingStatus("editing")}
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
      {editingStatus !== "not-editing" && (
        <EditUserInformation
          editUser={editUser}
          user={user}
          handleChange={(status: EditingStatusType) => setEditingStatus(status)}
          editingStatus={editingStatus}
        />
      )}
    </section>
  );
}

export default PersonalInformation;
