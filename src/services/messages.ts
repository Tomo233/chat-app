import { deleteDoc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ChatDataProps } from "../features/chat/useChatMessages";
import { generateRandomId } from "../utils/generateRandomId";
import { getCurrentTime } from "../utils/getCurrentTime";
import { getChatRefs } from "../utils/chatUtils";

export const sendMessage = async (
  receiverId: string,
  senderId: string,
  message: string
) => {
  try {
    const currentTime = getCurrentTime();
    const randomId = generateRandomId();
    const { chatsRef, messageRef } = getChatRefs(receiverId, randomId);

    await setDoc(chatsRef, {
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
    const { messageRef } = getChatRefs(receiverId, messageId);
    await deleteDoc(messageRef!);
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

    const { messageRef } = getChatRefs(receiverId, messageId);

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
