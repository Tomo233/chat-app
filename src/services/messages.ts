import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ChatDataProps } from "../features/chat/useChatMessages";
import { generateRandomId } from "../utils/generateRandomId";
import { getCurrentTime } from "../utils/getCurrentTime";
import {
  getChatRefs,
  getLastAndCurrentMessages,
} from "../utils/chatAndMessageUtils";
import { auth, db } from "../firebaseConfig";
import { getCurrentUser } from "./authentication";

export const sendMessage = async (
  receiverId: string,
  senderId: string,
  message: string
) => {
  try {
    const currentTime = getCurrentTime();
    const randomId = generateRandomId();
    const { chatRef, messageRef } = getChatRefs(receiverId, randomId);

    await setDoc(chatRef, {
      lastMessageId: randomId,
      lastTimeUpdated: currentTime,
    });

    await setDoc(messageRef!, {
      id: randomId,
      senderId,
      receiverId,
      message,
      time: currentTime,
      edited: false,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const deleteMessage = async (
  messageId: string,
  receiverId: string | undefined
) => {
  try {
    const { chatRef, messageCollectionRef, messageRef } = getChatRefs(
      receiverId,
      messageId
    );
    const currentTime = getCurrentTime();

    const { currentMessage, latestMessageExcludingCurrent } =
      await getLastAndCurrentMessages(messageCollectionRef, messageRef);

    await deleteDoc(messageRef!);

    if (!latestMessageExcludingCurrent) {
      await deleteDoc(chatRef);
      return true;
    }

    if (
      currentMessage.time.seconds >= latestMessageExcludingCurrent.time.seconds
    ) {
      await updateDoc(chatRef, {
        lastTimeUpdated: currentTime,
        lastMessageId: latestMessageExcludingCurrent.id,
      });
    }
    return false;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getMessageById = async (
  messageId: string | null,
  receiverId: string | undefined
) => {
  try {
    if (!messageId) throw new Error("there is no message selected");

    const { messageRef } = getChatRefs(receiverId, messageId);
    const docSnap = await getDoc(messageRef!);

    return docSnap.data() as ChatDataProps;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const editMessage = async (
  messageId: string | null,
  message: string,
  receiverId: string | undefined
) => {
  try {
    if (!messageId) {
      throw new Error("No messageId provided");
    }

    const { chatRef, messageRef, messageCollectionRef } = getChatRefs(
      receiverId,
      messageId
    );
    const currentTime = getCurrentTime();

    const { currentMessage, latestMessage } = await getLastAndCurrentMessages(
      messageCollectionRef,
      messageRef
    );

    if (latestMessage?.id === currentMessage.id) {
      await updateDoc(chatRef, {
        lastMessageId: messageId,
        lastTimeUpdated: currentTime,
      });
    }

    await updateDoc(messageRef!, {
      message,
      edited: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
export const getRecentChatsData = async () => {
  const chatsRef = collection(db, "chats");
  const chatsQuery = query(chatsRef, orderBy("lastTimeUpdated", "desc"));

  const chatsQuerySnapshot = await getDocs(chatsQuery);

  const filteredChatsSnapshot = chatsQuerySnapshot.docs.filter((chat) => {
    const firstId = chat.id.split("-")[0];
    const secondId = chat.id.split("-")[1];
    const currentUserId = auth.currentUser?.uid;

    return (
      (firstId === currentUserId && secondId !== currentUserId) ||
      (firstId !== currentUserId && secondId === currentUserId)
    );
  });

  const promises = filteredChatsSnapshot.map(async (chat) => {
    const data = chat?.data();

    const messageRef = doc(
      db,
      "chats",
      chat.id,
      "messages",
      data.lastMessageId
    );
    const message = (await getDoc(messageRef)).data() as ChatDataProps;

    const id =
      message.senderId === auth.currentUser?.uid
        ? message.receiverId
        : message.senderId;

    const user = await getCurrentUser(id);

    const date = new Date(data.lastTimeUpdated * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;

    const recentChatsData = {
      id: user?.id,
      firstName: user?.firstName,
      photoURL: user?.photoURL,
      message: message.message,
      time,
    };

    return recentChatsData;
  });

  return await Promise.all(promises);
};
