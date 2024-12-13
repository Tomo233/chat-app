import { useForm } from "react-hook-form";
import LoginInput from "./LoginInput";
import { Inputs } from "./SignupForm";
import FormTitle from "./FormTitle";

function LoginForm() {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    defaultValues: {
      avatar: null,
    },
  });

  return (
    <div className="py-16  grid gap-10  border-secondaryPurple border px-20  rounded-lg mt-10">
      <FormTitle
        title="Login"
        linkText="SignUp"
        paragraph="Do not have an Account?"
      />
      <div className="grid gap-5">
        <div>
          {errors.email && <p className="text-white">{errors.email.message}</p>}
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
        <button
          type="submit"
          className="col-span-1 bg-secondaryPurple  text-white py-3 px-36 rounded-md focus:outline-none"
        >
          Login
        </button>
      </div>
      <div>
        <div className="flex justify-center gap-12 pt-5">
          <button
            className="bg-secondaryPurple px-12 py-2 rounded-md"
            // onClick={handleSignUpWithGoogle}
          >
            <span className="text-white">Google</span>
          </button>
          <button className="bg-secondaryPurple text-white  px-12 py-2 rounded-md ">
            <span>Github</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
