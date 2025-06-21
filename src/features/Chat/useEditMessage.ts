import { useMutation } from "@tanstack/react-query";
import { editMessage as editMessageApi } from "../../services/messages";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export const useEditMessage = () => {
  const [searchParams] = useSearchParams();
  const messageId = searchParams.get("messageId");
  const { id: receiverId } = useParams();

  const { mutate: editMessage, isPending: isEditingMessage } = useMutation({
    mutationKey: ["messages", messageId],
    mutationFn: (message: string) =>
      editMessageApi(messageId, message, receiverId),
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { editMessage, isEditingMessage };
};
