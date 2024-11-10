import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginWithGoogle as loginWithGoogleApi } from "../../services/authentication";
import { useNavigate } from "react-router-dom";

export const useLoginWithGoogle = () => {
  const navigate = useNavigate();
  const {
    mutate: loginWithGoogle,
    isPending: isPendingGoogle,
    data: userData,
  } = useMutation({
    mutationFn: loginWithGoogleApi,
    onSuccess: () => {
      toast.success("Success");
      navigate("/chat");
    },
    onError: () => {
      toast.error("Success");
    },
  });

  return { loginWithGoogle, isPendingGoogle, userData };
};
