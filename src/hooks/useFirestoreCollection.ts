import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const useFirestoreCollection = <T>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => doc.data() as T);
        setData(newData);
      }
    );
    return () => unsubscribe();
  }, [collectionName]);

  return data;
};
