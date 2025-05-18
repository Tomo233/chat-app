import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getMessageById } from "../../services/messages";

export const useMessageById = () => {
  const [searchParams] = useSearchParams();
  const messageId = searchParams.get("messageId");

  const { data: editingMessage, isLoading } = useQuery({
    queryFn: () => getMessageById(messageId),
    queryKey: ["message", messageId],
    enabled: !!messageId,
  });

  return { editingMessage, isLoading };
};
