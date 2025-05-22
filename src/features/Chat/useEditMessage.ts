import { useMutation } from "@tanstack/react-query";
import { editMessage as editMessageApi } from "../../services/messages";
import { useSearchParams } from "react-router-dom";

export const useEditMessage = () => {
  const [searchParams] = useSearchParams();
  const messageId = searchParams.get("messageId");

  const { mutate: editMessage, isPending: isEditingMessage } = useMutation({
    mutationKey: ["messages", messageId],
    mutationFn: (message: string) => editMessageApi(messageId, message),
  });

  return { editMessage, isEditingMessage };
};
