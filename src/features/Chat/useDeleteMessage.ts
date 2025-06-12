import { useMutation } from "@tanstack/react-query";
import { deleteMessage as deleteMessageApi } from "../../services/messages";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export const useDeleteMessage = () => {
  const { id: receiverId } = useParams();

  const { mutate: deleteMessage, isPending } = useMutation({
    mutationFn: (messageId: string) => deleteMessageApi(messageId, receiverId),
    mutationKey: ["messages"],

    onError: () => {
      toast.error("Error while deleting the message");
    },
  });

  return { deleteMessage, isPending };
};
