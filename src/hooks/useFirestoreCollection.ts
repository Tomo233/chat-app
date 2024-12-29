import { useEffect, useState } from "react";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const useFirestoreCollection = (collectionName: string) => {
  const [data, setData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => doc.data());
        setData(newData);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return data;
};
