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
  const sortParamValue = paramName ? searchParams.get(paramName) : null;

  useEffect(() => {
    let sortBy: "asc" | "desc" = "asc";
    if (paramName && searchParams.get(paramName) === "desc") {
      sortBy = "desc";
    }

    const collectionRef = collection(db, collectionName);
    let sortedQuery = query(collectionRef);

    if (paramName) {
      sortedQuery = query(collectionRef, orderBy(paramName, sortBy));
    }

    const unsubscribe = onSnapshot(sortedQuery, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => doc.data() as T);
      setData(newData);
    });

    return () => unsubscribe();
  }, [collectionName, sortParamValue, paramName]);

  return { data, isLoading: !data.length };
};
