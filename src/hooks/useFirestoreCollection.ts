import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const useFirestoreCollection = <T>(
  collectionName: string,
  paramName?: string | null
) => {
  const [searchParams] = useSearchParams();

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: [collectionName],
    queryFn: () => {
      return new Promise<T[]>((resolve, reject) => {
        const sortBy: "asc" | "desc" =
          paramName && searchParams.get(paramName) === "desc" ? "desc" : "asc";

        const collectionRef = collection(db, collectionName);
        let sortedQuery = query(collectionRef);

        if (paramName)
          sortedQuery = query(collectionRef, orderBy("firstName", sortBy));

        const unsubscribe = onSnapshot(
          sortedQuery,
          (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => doc.data() as T);
            resolve(newData); // Resolve the Promise with new data
          },
          (error) => {
            console.error("Error fetching Firestore data:", error);
            reject(error); // Reject the Promise if there's an error
          }
        );
        return () => unsubscribe();
      });
    },
  });

  return { users, isLoadingUsers };
};
