import { ComponentPropsWithoutRef, forwardRef } from "react";

type InformationProps = {
  isEditing: boolean;
} & ComponentPropsWithoutRef<"input">;

const InformationInput = forwardRef<HTMLInputElement, InformationProps>(
  ({ isEditing, ...otherProps }, ref) => {
    return (
      <input
        className={`font-medium p-3 bg-secondaryPurple outline-none  ${
          !isEditing && "cursor-not-allowed"
        }`}
        {...otherProps}
        ref={ref}
        disabled={!isEditing}
      />
    );
  }
);

export default InformationInput;
