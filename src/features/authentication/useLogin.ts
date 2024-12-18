import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithPassword } from "../../services/authentication";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: loginWithPassword,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/");
      toast.success("User successfully logged in");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { login, isPending };
};
