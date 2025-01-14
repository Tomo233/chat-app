import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { UserInfo } from "../../services/authentication";
import { useParams } from "react-router-dom";

export const useGetUserById = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const collectionRef = collection(db, "users");

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const q = query(collectionRef, where("id", "==", id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.docs.map((doc) => {
          const data = doc.data() as UserInfo;
          setUser(data);
        });
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  return { user, isLoading };
};
