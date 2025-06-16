import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editMessage as editMessageApi } from "../../services/messages";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export const useEditMessage = () => {
  const [searchParams] = useSearchParams();
  const messageId = searchParams.get("messageId");
  const { id: receiverId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: editMessage, isPending: isEditingMessage } = useMutation({
    mutationKey: ["messages", messageId],
    mutationFn: (message: string) =>
      editMessageApi(messageId, message, receiverId),
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

  return { editMessage, isEditingMessage };
};
