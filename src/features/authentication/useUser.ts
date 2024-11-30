import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/authentication";

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return { user, isLoading };
};
