import { onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { auth } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChatRefs } from "../../utils/chatUtils";

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
  const { messageCollectionRef } = getChatRefs(receiverId);

  useEffect(() => {
    setIsLoading(true);
    setChats([]);
    const q = query(messageCollectionRef, orderBy("time"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => doc.data() as ChatDataProps);
      setChats(messages);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [senderId, receiverId]);

  return { chats, isLoading };
};
