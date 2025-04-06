import { ComponentPropsWithoutRef, forwardRef } from "react";

type InformationProps = {
  isFullWidth?: boolean;
} & ComponentPropsWithoutRef<"input">;

const InformationInput = forwardRef<HTMLInputElement, InformationProps>(
  ({ isFullWidth, ...otherProps }, ref) => {
    return (
      <input
        className={`font-medium p-3 bg-secondaryPurple outline-none placeholder-white ${
          isFullWidth && "w-full"
        }
          `}
        {...otherProps}
        ref={ref}
      />
    );
  }
);

export default InformationInput;
