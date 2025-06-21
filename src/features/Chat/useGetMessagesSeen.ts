import { useMutation } from "@tanstack/react-query";
import { getMessagesSeen as getMessageSeenApi } from "../../services/messages";

export const useGetMessagesSeen = () => {
  const { mutate: getMessageSeen, isPending } = useMutation({
    mutationKey: ["messages"],
    mutationFn: getMessageSeenApi,
  });
  return { getMessageSeen, isPending };
};
