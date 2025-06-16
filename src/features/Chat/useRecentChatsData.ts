import { useQuery } from "@tanstack/react-query";
import { getRecentChatsData } from "../../services/messages";

export const useRecentChatsData = () => {
  const { data: recentChatsData, isLoading: isLoadingChatsData } = useQuery({
    queryKey: ["chats"],
    queryFn: getRecentChatsData,
  });

  return { recentChatsData, isLoadingChatsData };
};
