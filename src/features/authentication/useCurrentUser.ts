import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/authentication";

export const useCurrentUser = () => {
  const queryClient = useQueryClient();
  const auth = getAuth();
  const [userId, setUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserId(firebaseUser.uid);
      } else {
        setUserId(null);
        queryClient.setQueryData(["user"], null); // Set user to null when logged out
      }
    });
    return () => unsubscribe();
  }, [auth, queryClient]);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(userId),
    enabled: !!userId,
  });

  return { user, isLoading: isLoading || userId === undefined };
};
