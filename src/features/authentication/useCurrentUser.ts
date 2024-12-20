import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/authentication";

export const useCurrentUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { user, isLoading };
};
