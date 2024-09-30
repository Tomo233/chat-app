import { useMutation } from "react-query";
import { signupWithEmailPassword } from "../../services/authentication";

export const useSignUp = () => {
  const { mutate: signUp, isLoading } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: () =>
      signupWithEmailPassword(
        "test5@example.com",
        "easuperstrongpassword55555"
      ),
  });
  return { signUp, isLoading };
};
