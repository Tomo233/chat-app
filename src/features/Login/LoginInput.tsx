import { ComponentPropsWithoutRef } from "react";

type LoginInputProps = {
  px?: number;
  py?: number;
} & ComponentPropsWithoutRef<"input">;

function LoginInput({ px = 5, py = 3, ...otherProps }: LoginInputProps) {
  return (
    <input
      {...otherProps}
      className={`bg-[#433e57] placeholder-[#6a6677] py-${py} px-${px}  rounded-md text-white border-none outline-none`}
    />
  );
}

export default LoginInput;
