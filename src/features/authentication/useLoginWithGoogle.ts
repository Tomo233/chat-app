import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginWithGoogle as loginWithGoogleApi } from "../../services/authentication";
import { useNavigate } from "react-router-dom";

export const useLoginWithGoogle = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: loginWithGoogle,
    isPending: isPendingGoogle,
    data: userData,
  } = useMutation({
    mutationFn: loginWithGoogleApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);

      toast.success("User successfully logged in");

      if (user?.location === "not-allowed")
        toast.error("You have disabled sharing your own location");

      if (user?.location === "error")
        toast.error(
          "Something went wrong while getting user location try again"
        );

      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { loginWithGoogle, isPendingGoogle, userData };
};
