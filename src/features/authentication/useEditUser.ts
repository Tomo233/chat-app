import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignupAndProfileInputs } from "./SignupForm";
import { editUserInformation } from "../../services/authentication";
import toast from "react-hot-toast";

export const useEditUser = () => {
  const queryClient = useQueryClient();
  const { mutate: editUser, isPending: isEditingUser } = useMutation({
    mutationFn: (data: SignupAndProfileInputs) => editUserInformation(data),
    mutationKey: ["user"],
    onSuccess: () => {
      toast.success("User information updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Profile update failed password is incorrect");
    },
  });

  return { editUser, isEditingUser };
};
