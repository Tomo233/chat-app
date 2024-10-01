import { forwardRef, ComponentPropsWithoutRef } from "react";

type LoginInputProps = {
  pr?: "p-3" | "p-64";
} & ComponentPropsWithoutRef<"input">;

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
  ({ pr = "p-64", ...otherProps }, ref) => {
    return (
      <input
        ref={ref}
        {...otherProps}
        className={`bg-[#433e57] placeholder-[#6a6677] py-3 ${pr} pl-3 rounded-md text-white border-none outline-none`}
      />
    );
  }
);

export default LoginInput;
