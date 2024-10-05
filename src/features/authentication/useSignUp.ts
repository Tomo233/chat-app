import { useMutation } from "@tanstack/react-query";
import { signupWithEmailPassword } from "../../services/authentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export type SignUpProps = {
  email: string;
  password: string;
};

export const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: ({ email, password }: SignUpProps) =>
      signupWithEmailPassword({ email, password }),
    onSuccess: () => {
      toast.success("User successfully signed up");
      navigate("/chat");
    },
    onError: (error: Error) => toast.error(error.message),
  });
  return { signUp, isPending };
};
