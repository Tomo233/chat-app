import { forwardRef, ComponentPropsWithoutRef } from "react";

type LoginInputProps = ComponentPropsWithoutRef<"input">;

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
  ({ ...otherProps }, ref) => {
    return (
      <input
        ref={ref}
        {...otherProps}
        className={`bg-[#433e57] placeholder-[#6a6677] h-12 w-full pl-3 rounded-md text-white border-none outline-none`}
      />
    );
  }
);

export default LoginInput;
