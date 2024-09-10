import { ComponentPropsWithoutRef } from "react";

type LoginInputProps = {
  pr?: "p-5" | "p-64";
} & ComponentPropsWithoutRef<"input">;

function LoginInput({ pr = "p-64", ...otherProps }: LoginInputProps) {
  return (
    <input
      {...otherProps}
      className={`bg-[#433e57] placeholder-[#6a6677]   py-3 ${pr}  pl-3 rounded-md text-white border-none outline-none`}
    />
  );
}

export default LoginInput;
