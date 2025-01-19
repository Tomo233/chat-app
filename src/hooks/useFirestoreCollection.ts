import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useSearchParams } from "react-router-dom";

export const useFirestoreCollection = <T>(
  collectionName: string,
  paramName?: string | null
) => {
  const [data, setData] = useState<T[]>([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Set loading to true when the hook is called
    const sortBy: "asc" | "desc" =
      paramName && searchParams.get(paramName) === "desc" ? "desc" : "asc";

    const collectionRef = collection(db, collectionName);
    let sortedQuery = query(collectionRef);

    if (paramName)
      sortedQuery = query(collectionRef, orderBy("firstName", sortBy));

    const unsubscribe = onSnapshot(sortedQuery, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => doc.data() as T);
      setData(newData);
      setLoading(false); // Data is fetched successfully
    });
    return () => unsubscribe();
  }, [collectionName, searchParams, paramName]);

  return { data, loading };
};
