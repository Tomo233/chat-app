import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupWithEmailPassword } from "../../services/authentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: signUp,
    isPending,
    data: user,
  } = useMutation({
    mutationFn: signupWithEmailPassword,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);

      toast.success("User successfully signed up");
      navigate("/", { replace: true });
    },
    onError: (error: Error) => toast.error(error.message),
  });
  return { signUp, isPending, user };
};
