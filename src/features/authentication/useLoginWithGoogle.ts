import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginWithGoogle as loginWithGoogleApi } from "../../services/authentication";

export const useLoginWithGoogle = () => {
  const { mutate: loginWithGoogle, isPending: isPendingGoogle } = useMutation({
    mutationFn: loginWithGoogleApi,
    onSuccess: () => {
      toast.success("Success");
    },
    onError: () => {
      toast.error("Success");
    },
  });

  return { loginWithGoogle, isPendingGoogle };
};
