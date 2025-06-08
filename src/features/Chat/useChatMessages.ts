import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type ChatDataProps = {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  time: Timestamp;
  fileURL: string | null;
  edited: boolean;
};

export const useChatMessages = () => {
  const [chats, setChats] = useState<ChatDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id: receiverId } = useParams();
  const senderId = auth.currentUser?.uid;

  useEffect(() => {
    setIsLoading(true);
    setChats([]);

    const collectionRef = collection(db, "messages");
    const q = query(collectionRef, orderBy("time"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filteredMessages = snapshot.docs
        .map((doc) => doc.data() as ChatDataProps)
        .filter(
          (m) =>
            (m.senderId === senderId && m.receiverId === receiverId) ||
            (m.senderId === receiverId && m.receiverId === senderId)
        );

      setChats(filteredMessages);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [senderId, receiverId]);

  return { chats, isLoading };
};
