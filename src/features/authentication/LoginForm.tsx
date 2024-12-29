import { BaseSyntheticEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginInput from "./LoginInput";
import FormTitle from "./FormTitle";
import FormFooter from "./FormFooter";
import Loader from "../../components/Loader";
import { useLogin } from "./useLogin";

export type LoginInputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInputs>();
  const { login, isPending } = useLogin();

  const loginSubmitHandler: SubmitHandler<LoginInputs> = (
    data,
    e?: BaseSyntheticEvent
  ) => {
    if (e) e.preventDefault();
    login(data);
  };

  if (isPending) return <Loader />;

  return (
    <div className="py-16  grid gap-10  border-secondaryPurple border px-20  rounded-lg mt-10">
      <FormTitle
        title="Login"
        linkText="SignUp"
        paragraph="Do not have an Account?"
      />
      <form className="grid gap-5" onSubmit={handleSubmit(loginSubmitHandler)}>
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
            })}
          />
        </div>
        <button
          type="submit"
          className="col-span-1 bg-secondaryPurple  text-white py-3 px-36 rounded-md focus:outline-none"
        >
          Login
        </button>
      </form>
      <FormFooter />
    </div>
  );
}

export default LoginForm;
