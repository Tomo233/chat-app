import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage as deleteMessageApi } from "../../services/messages";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export const useDeleteMessage = () => {
  const { id: receiverId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: deleteMessage, isPending } = useMutation({
    mutationFn: (messageId: string) => deleteMessageApi(messageId, receiverId),
    mutationKey: ["messages"],
    onSuccess: () => {
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
