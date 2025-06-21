import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const { mutate: signOutUser, isPending: isSigningOut } = useMutation({
    mutationKey: ["users"],
    mutationFn: async (userId: string) => {
      try {
        await signOut(auth);
        queryClient.refetchQueries({ queryKey: ["user"] });
        await updateDoc(doc(db, "users", userId), {
          status: "Offline",
        });
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  });

  return { signOutUser, isSigningOut };
};
