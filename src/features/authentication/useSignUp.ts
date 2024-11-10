import { useMutation } from "@tanstack/react-query";
import { signupWithEmailPassword } from "../../services/authentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Inputs } from "./SignupForm";

export const useSignUp = () => {
  const navigate = useNavigate();
  const {
    mutate: signUp,
    isPending,
    data: user,
  } = useMutation({
    mutationFn: (data: Inputs) => signupWithEmailPassword(data),
    onSuccess: () => {
      toast.success("User successfully signed up");
      navigate("/chat");
    },
    onError: (error: Error) => toast.error(error.message),
  });
  return { signUp, isPending, user };
};
