import { useMutation } from "@tanstack/react-query";
import { deleteMessage as deleteMessageApi } from "../../services/messages";
import toast from "react-hot-toast";

export const useDeleteMessage = () => {
  const { mutate: deleteMessage, isPending } = useMutation({
    mutationFn: (messageId: string) => deleteMessageApi(messageId),
    mutationKey: ["messages"],

    onError: () => {
      toast.error("Error while deleting the message");
    },
  });

  return { deleteMessage, isPending };
};
