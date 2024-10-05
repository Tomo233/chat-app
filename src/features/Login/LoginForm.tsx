import LoginInput from "./LoginInput";
import Logo from "../../assets/logo.png";
import Loader from "../../components/Loader";
import { useSignUp } from "./useSignUp";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseSyntheticEvent } from "react";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function LoginForm() {
  const { signUp, isPending } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Inputs>();

  console.log(errors);
  const submitHandler: SubmitHandler<Inputs> = (
    data,
    e?: BaseSyntheticEvent
  ) => {
    if (e) e.preventDefault();
    const { email, password } = data;
    signUp({ email, password });
    reset();
  };

  if (isPending)
    return (
      <div className="bg-backgroundColor flex justify-center items-center">
        <p className="text-white text-5xl">Loading...</p>
        <Loader />
      </div>
    );

  return (
    <div className="pt-12 border-secondaryPurple border p-24 rounded-lg mt-10">
      <div>
        <h2 className="text-white text-3xl text-center flex items-center justify-center">
          <img src={Logo} alt="Logo" className="h-20" />
          <span> Create an Account</span>
          <img src={Logo} alt="Logo" className="h-20" />
        </h2>
        <p className="text-white text-center py-3">
          Already have an Account?
          <span className="text-[#7b7092] font-bold underline pl-3">
            Log in
          </span>
        </p>
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
                  value: 20,
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

          <button
            type="submit"
            className="col-span-1 bg-secondaryPurple  text-white py-3 px-36 rounded-md focus:outline-none"
          >
            Create Account
          </button>
        </form>
        <div className="flex justify-center gap-12 pt-5">
          <button className="bg-secondaryPurple  px-12 py-2 rounded-md ">
            <span className="text-white">Google</span>
          </button>
          <button className="bg-secondaryPurple text-white  px-12 py-2 rounded-md ">
            <span>Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
