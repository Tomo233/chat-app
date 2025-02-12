import { ComponentPropsWithoutRef, forwardRef } from "react";

type InformationProps = ComponentPropsWithoutRef<"input">;

const InformationInput = forwardRef<HTMLInputElement, InformationProps>(
  ({ ...otherProps }, ref) => {
    return (
      <input
        className={`font-medium p-3 bg-secondaryPurple outline-none placeholder-white`}
        {...otherProps}
        ref={ref}
      />
    );
  }
);

export default InformationInput;
