import { BaseSyntheticEvent, useState } from "react";
import Loader from "../../components/Loader";
import LoginInput from "./LoginInput";
import { useSignUp } from "./useSignUp";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginWithGoogle } from "./useLoginWithGoogle";
import FormTitle from "./FormTitle";
import FormFooter from "./FormFooter";
import FileInput from "../../components/FileInput";
import CloseIcon from "@mui/icons-material/Close";
import { getUserLocation } from "../../services/authentication";
import toast from "react-hot-toast";

export type SignupAndProfileInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmOrNewPassword: string;
  avatar: File | null;
  location?: string | null;
};

function SignUpForm() {
  const { signUp, isPending } = useSignUp();
  const { isPendingGoogle } = useLoginWithGoogle();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useForm<SignupAndProfileInputs>({
    defaultValues: {
      avatar: null,
    },
  });

  const submitHandler: SubmitHandler<SignupAndProfileInputs> = (
    data,
    e?: BaseSyntheticEvent
  ) => {
    if (e) e.preventDefault();

    signUp(data);
    reset();
  };

  if (isPending || isPendingGoogle) {
    return <Loader />;
  }
  const handleUserLocation = async (e?: BaseSyntheticEvent) => {
    if (e) e.preventDefault();

    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          setIsLoadingLocation(true);
          const userLocation = await getUserLocation(latitude, longitude);
          setValue("location", userLocation);
          setIsLoadingLocation(false);
          toast.success("User location is fetched");
        },
        () => {
          toast.error("User rejected to share his location");
        }
      );
  };

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
          <div className="grid grid-cols-2 gap-4 place-items-end">
            <div>
              {errors.password && (
                <p className="text-white">{errors.password.message}</p>
              )}
              <LoginInput
                type="password"
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
                    value === getValues("confirmOrNewPassword") ||
                    "Passwords do not match",
                })}
              />
            </div>
            <div>
              {errors.confirmOrNewPassword && (
                <p className="text-white">
                  {errors.confirmOrNewPassword.message}
                </p>
              )}
              <LoginInput
                type="password"
                placeholder="Confirm Password"
                {...register("confirmOrNewPassword", {
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
          <FileInput
            {...register("avatar")}
            setValue={setValue}
            isFullWidth={true}
          />
          <div className="flex">
            <button
              className={`col-span-1 bg-backgroundColor border-2 border-solid  border-secondaryPurple  py-3 w-full text-[#9996a1] rounded-md focus:outline-none`}
              disabled={false}
              onClick={handleUserLocation}
            >
              {isLoadingLocation
                ? "Loading..."
                : !getValues("location")
                ? "Get Your location"
                : getValues("location")}
            </button>

            {getValues("location") && (
              <button onClick={() => setValue("location", "")}>
                <CloseIcon
                  sx={{
                    color: "white",
                    fontSize: "2rem",
                  }}
                />
              </button>
            )}
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
