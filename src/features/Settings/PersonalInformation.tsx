import EditIcon from "@mui/icons-material/Edit";
import { useUser } from "../authentication/useUser";
import Loader from "../../components/Loader";

function PersonalInformation() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loader />;

  return (
    <section className="border border-secondaryPurple rounded-lg p-3 pb-10 pl-7">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl py-7">Personal Information</h2>
        <button className="border border-secondaryPurple px-9 py-3 flex gap-2 rounded-3xl">
          <EditIcon />
          Edit
        </button>
      </div>
      <div className="grid grid-cols-2 gap-y-6">
        <div>
          <p>First Name</p>
          <input
            className="font-medium p-3 bg-secondaryPurple"
            value={user?.firstName}
            disabled
          />
        </div>
        <div>
          <p>Last Name</p>
          <input
            className="font-medium p-3 bg-secondaryPurple"
            value={user?.lastName}
            disabled
          />
        </div>

        <div>
          <p>Email</p>
          <input
            className="font-medium p-3 bg-secondaryPurple"
            type="text"
            value={user?.email}
            disabled
          />
        </div>
        <div>
          <div className="flex gap-5">
            <div>
              <p className="font-medium">Current Password</p>
              <input
                className="font-medium p-3 bg-secondaryPurple"
                value={"**********"}
                disabled
              />
            </div>
            <div>
              <p className="font-medium">New Password</p>
              <input
                className="font-medium p-3 bg-secondaryPurple"
                value={"**********"}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalInformation;
