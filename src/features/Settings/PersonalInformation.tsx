import EditIcon from "@mui/icons-material/Edit";

function PersonalInformation() {
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
            value={"John"}
            disabled
          />
        </div>
        <div>
          <p>Last Name</p>
          <input
            className="font-medium p-3 bg-secondaryPurple"
            value={"Smith"}
            disabled
          />
        </div>

        <div>
          <p>Email</p>
          <input
            className="font-medium p-3 bg-secondaryPurple"
            value={"johnsmith@gmail.com"}
            disabled
          />
        </div>
        <div>
          <p className="font-medium">Phone</p>
          <input
            className="font-medium p-3 bg-secondaryPurple"
            value={"+3019301930139"}
            disabled
          />
        </div>
      </div>
    </section>
  );
}

export default PersonalInformation;
