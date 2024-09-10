import LoginInput from "./LoginInput";

function LoginForm() {
  return (
    <div className="relative z-10 pt-12">
      <div>
        <h2 className="text-white text-3xl text-center">Create an Account</h2>
        <p className="text-white text-center py-3">
          Already have an Account?
          <span className="text-[#53486a] font-bold underline">Log in</span>
        </p>
        <form className="grid grid-cols-1 gap-4 place-items-center">
          <div className="grid grid-cols-2 gap-4">
            <LoginInput type="text" placeholder="First Name" pr="p-5" />
            <LoginInput type="text" placeholder="Last Name" pr="p-5" />
          </div>
          <LoginInput type="email" className="col-span-1" placeholder="Email" />
          <LoginInput
            type="password"
            className="col-span-1"
            placeholder="Password"
          />
          <LoginInput
            type="password"
            className="col-span-1"
            placeholder="Confirm Password"
          />
          <button
            type="submit"
            className="col-span-1 bg-buttonPurple  text-white py-3 px-36 rounded-md focus:outline-none"
          >
            Create Account
          </button>
        </form>
        <div className="flex justify-center gap-12 pt-5">
          <button className="bg-buttonPurple border border-white border-solid px-12 py-2 rounded-md ">
            <span className="text-white">Google</span>
          </button>
          <button className="bg-buttonPurple border border-white border-solid text-white  px-12 py-2 rounded-md ">
            <span>Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
