import { BaseSyntheticEvent, ChangeEvent, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../../components/Loader";
import LoginInput from "./LoginInput";
import { useSignUp } from "./useSignUp";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginWithGoogle } from "./useLoginWithGoogle";
import FormTitle from "./FormTitle";
import FormFooter from "./FormFooter";

export type SignupInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: File | null;
};

function SignUpForm() {
  const { signUp, isPending } = useSignUp();
  const { isPendingGoogle } = useLoginWithGoogle();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useForm<SignupInputs>({
    defaultValues: {
      avatar: null,
    },
  });
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

  const submitHandler: SubmitHandler<SignupInputs> = (
    data,
    e?: BaseSyntheticEvent
  ) => {
    if (e) e.preventDefault();
    console.log(data.avatar);
    signUp(data);
    reset();
  };

  if (isPending || isPendingGoogle) {
    return <Loader />;
  }

  return (
    <div className="py-10  border-secondaryPurple border px-24  rounded-lg mt-10">
      <div>
        <FormTitle
          title="Sign Up"
          linkText="Login"
          paragraph="Have an Account?"
        />
        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="grid grid-cols-2 gap-4 place-items-end">
            <div>
              {errors.firstName && (
                <p className="text-white">{errors.firstName.message}</p>
              )}
              <LoginInput
                type="text"
                placeholder="First Name"
                pr="p-3"
                {...register("firstName", {
                  required: "This field is required",
                  minLength: {
                    value: 5,
                    message: "Field value is too short",
                  },
                  maxLength: {
                    value: 20,
                    message: "Field value is too long",
                  },
                })}
              />
            </div>
            <div>
              {errors.lastName && (
                <p className="text-white">{errors.lastName.message}</p>
              )}
              <LoginInput
                type="text"
                placeholder="Last Name"
                pr="p-3"
                {...register("lastName", {
                  required: "This field is required",
                  minLength: {
                    value: 5,
                    message: "Field value is too short",
                  },
                  maxLength: {
                    value: 20,
                    message: "Field value is too long",
                  },
                })}
              />
            </div>
          </div>
          <div>
            {errors.email && (
              <p className="text-white">{errors.email.message}</p>
            )}
            <LoginInput
              type="email"
              className="col-span-1"
              placeholder="Email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
                minLength: {
                  value: 5,
                  message: "Field value is too short",
                },
                maxLength: {
                  value: 30,
                  message: "Field value is too long",
                },
              })}
            />
          </div>
          <div>
            {errors.password && (
              <p className="text-white">{errors.password.message}</p>
            )}
            <LoginInput
              type="password"
              className="col-span-1"
              placeholder="Password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Field value is too short",
                },
                maxLength: {
                  value: 20,
                  message: "Field value is too long",
                },
                validate: (value) =>
                  value === getValues("confirmPassword") ||
                  "Passwords do not match",
              })}
            />
          </div>
          <div>
            {errors.confirmPassword && (
              <p className="text-white">{errors.confirmPassword.message}</p>
            )}
            <LoginInput
              type="password"
              className="col-span-1"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Field value is too short",
                },
                maxLength: {
                  value: 20,
                  message: "Field value is too long",
                },
              })}
            />
          </div>
          <div>
            <div className="flex justify-center gap-3  items-center">
              <label
                className={`flex gap-3 items-center justify-center w-${
                  file ? "4/5" : "full"
                } py-6 border-2 border-dashed border-secondaryPurple rounded-lg cursor-pointer`}
              >
                {file ? (
                  <>
                    <img src={file} alt="" className="max-w-12" />
                  </>
                ) : (
                  <span className="text-[#6a6677]">
                    Drag and drop your profile image here or select file
                  </span>
                )}

                <input
                  type="file"
                  className="hidden"
                  {...register("avatar")}
                  accept="image/*"
                  onChange={handleChangeAvatar}
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
          </div>

          <button
            type="submit"
            className="col-span-1 bg-secondaryPurple  text-white py-3 px-36 rounded-md focus:outline-none"
          >
            Create Account
          </button>
        </form>
        <FormFooter />
      </div>
    </div>
  );
}

export default SignUpForm;
