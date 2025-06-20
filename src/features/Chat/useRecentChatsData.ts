import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { ChatDataProps } from "./useChatMessages";
import { getCurrentUser } from "../../services/authentication";

type RecentChatsType = {
  id: string | undefined;
  senderId: string;
  receiverId: string;
  firstName: string | undefined;
  photoURL: string | null | undefined;
  message: string;
  time: string;
  // isSeen: boolean;
  sortTimestamp: number;
  // notSeenMessagesLength: number;
};

type ChatsDataType = {
  chatId: string;
  messageId: string;
  lastTimeUpdated: number;
  // notSeenMessagesLength: number;
};

export const useRecentChatsData = () => {
  const [recentChatsData, setRecentChatsData] = useState<
    RecentChatsType[] | []
  >([]);
  const [chatsData, setChatsData] = useState<ChatsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const chatsRef = collection(db, "chats");
    const chatsQuery = query(chatsRef, orderBy("lastTimeUpdated", "desc"));

    const unsubscribeChats = onSnapshot(chatsQuery, (snapshot) => {
      const currentUserId = auth.currentUser?.uid;
      if (!currentUserId) return;

      const filteredChatsSnapshot = snapshot.docs.filter((chat) => {
        const [firstId, secondId] = chat.id.split("-");
        return (
          (firstId === currentUserId && secondId !== currentUserId) ||
          (firstId !== currentUserId && secondId === currentUserId)
        );
      });

      const chatData = filteredChatsSnapshot.map((chatDoc) => {
        const chatId = chatDoc.id;

        const data = chatDoc.data();
        const messageId = data.lastMessageId || "";
        const lastTimeUpdated = data.lastTimeUpdated || "";
        // const notSeenMessagesLength = data.notSeenMessagesLength;

        return {
          chatId,
          messageId,
          data,
          lastTimeUpdated,
          // notSeenMessagesLength,
        };
      });

      setChatsData(chatData);
    });

    return () => unsubscribeChats();
  }, []);

  useEffect(() => {
    if (!chatsData.length) {
      setRecentChatsData([]);
      return;
    }

    const unsubscribes: (() => void)[] = [];

    chatsData.forEach((chat) => {
      const messageRef = doc(
        db,
        "chats",
        chat.chatId,
        "messages",
        chat.messageId
      );

      const unsubscribe = onSnapshot(messageRef, async (snapshot) => {
        const message = snapshot.data() as ChatDataProps;
        if (!message) return;

        const otherUserId =
          message.senderId === auth.currentUser?.uid
            ? message.receiverId
            : message.senderId;

        const user = await getCurrentUser(otherUserId);
        if (!user) return;

        const date = new Date(chat.lastTimeUpdated * 1000);
        const time = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const sortTimestamp = date.getTime();

        const chatObj: RecentChatsType = {
          id: user.id,
          senderId: message.senderId,
          receiverId: message.receiverId,
          firstName: user.firstName,
          photoURL: user.photoURL,
          message: message.message,
          time,
          // isSeen: message.isSeen,
          sortTimestamp,
          // notSeenMessagesLength: chat.notSeenMessagesLength,
        };

        // Update state by adding/updating chatObj in the array
        setIsLoading(false);
        setRecentChatsData((prev) => {
          // Remove old chat with same id if exists
          const filtered = prev.filter((c) => c.id !== chatObj.id);
          // Add new chat
          const updated = [...filtered, chatObj];
          // Sort by timestamp descending
          return updated.sort((a, b) => b.sortTimestamp - a.sortTimestamp);
        });
      });

      unsubscribes.push(unsubscribe);
    });

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [chatsData]);

  return { recentChatsData, isLoading };
};
