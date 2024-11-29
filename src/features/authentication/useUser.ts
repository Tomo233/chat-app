import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/authentication";

export const useUser = () => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  console.log(error);
  return { user, isLoading };
};
