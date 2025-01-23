import { forwardRef } from "react";

type InformationInputProps = {
  value: string;
  isEditing: boolean;
};

const InformationInput = forwardRef<HTMLInputElement, InformationInputProps>(
  ({ value, isEditing }, ref) => {
    return (
      <input
        className={`font-medium p-3 bg-secondaryPurple outline-none  ${
          !isEditing && "cursor-not-allowed"
        }`}
        value={value}
        ref={ref}
        disabled={!isEditing}
      />
    );
  }
);

export default InformationInput;
