import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupWithEmailPassword } from "../../services/authentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SignupInputs } from "./SignupForm";

export const useSignUp = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: signUp,
    isPending,
    data: user,
  } = useMutation({
    mutationFn: (data: SignupInputs) => signupWithEmailPassword(data),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);

      toast.success("User successfully signed up");
      navigate("/chat", { replace: true });
    },
    onError: (error: Error) => toast.error(error.message),
  });
  return { signUp, isPending, user };
};
