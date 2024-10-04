import { useMutation } from "@tanstack/react-query";
import { signupWithEmailPassword } from "../../services/authentication";
import toast from "react-hot-toast";

type SignUpProps = {
  email: string;
  password: string;
};

export const useSignUp = () => {
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: ({ email, password }: SignUpProps) =>
      signupWithEmailPassword({ email, password }),
    onSuccess: () => toast.success("User successfully signed up"),
    onError: () => toast.error("Something went wrong while signing up"),
  });
  return { signUp, isPending };
};
