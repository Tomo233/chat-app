import { useMutation } from "@tanstack/react-query";
import { SignupAndProfileInputs } from "./SignupForm";
import { editUserInformation } from "../../services/authentication";
import toast from "react-hot-toast";

export const useEditUser = () => {
  const { mutate: editUser, isPending: isEditingUser } = useMutation({
    mutationFn: (data: SignupAndProfileInputs) => editUserInformation(data),
    mutationKey: ["user"],
    onSuccess: () => {
      toast.success("User information updated successfully");
    },
  });

  return { editUser, isEditingUser };
};
