import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage as deleteMessageApi } from "../../services/messages";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const useDeleteMessage = () => {
  const { id: receiverId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteMessage, isPending } = useMutation({
    mutationFn: (messageId: string) => deleteMessageApi(messageId, receiverId),
    mutationKey: ["messages"],
    onSuccess: (data) => {
      if (data) {
        navigate("/chat");
      }

      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteMessage, isPending };
};
