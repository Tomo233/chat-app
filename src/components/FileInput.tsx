import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent, forwardRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { SignupInputs } from "../features/authentication/SignupForm";

type FileInputProps = {
  setValue: UseFormSetValue<SignupInputs>;
  isFullWidth?: boolean;
};

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function (
  { setValue, isFullWidth },
  ref
) {
  const [file, setFile] = useState<string>();

  const handleRemoveAvatar = () => {
    setValue("avatar", null);
    setFile("");
  };

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.files?.[0] || null;
    if (avatar) {
      setValue("avatar", avatar);
      const fileURL = URL.createObjectURL(avatar);
      setFile(fileURL);
    }
  };
  return (
    <div
      className={`${isFullWidth ? "w-full" : "max-w-56"} flex justify-between`}
    >
      <label
        className={`flex gap-3 items-center justify-center ${
          !file && "py-3"
        } border-2 border-dashed border-secondaryPurple rounded-lg cursor-pointer w-full`}
      >
        {file ? (
          <>
            <img src={file} alt="" className="max-h-12" />
          </>
        ) : (
          <span className="text-[#6a6677]">Select File</span>
        )}

        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChangeAvatar}
          ref={ref}
        />
      </label>
      {file && (
        <button onClick={handleRemoveAvatar}>
          <CloseIcon
            sx={{
              color: "white",
              fontSize: "2rem",
            }}
          />
        </button>
      )}
    </div>
  );
});

export default FileInput;
