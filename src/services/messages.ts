import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ChatDataProps } from "../features/chat/useChatMessages";

export const sendMessage = async (
  receiverId: string,
  senderId: string,
  message: string
) => {
  try {
    const currentTime = Timestamp.fromDate(new Date());

    const randomId = window.crypto.randomUUID();
    await setDoc(doc(db, "messages", randomId), {
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

export const deleteMessage = async (messageId: string) => {
  try {
    await deleteDoc(doc(db, "messages", messageId));
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getMessageById = async (messageId: string | null) => {
  try {
    if (!messageId) throw new Error("there is no message selected");

    const docRef = doc(db, "messages", messageId);
    const docSnap = await getDoc(docRef);

    return docSnap.data() as ChatDataProps;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const editMessage = async (
  messageId: string | null,
  message: string
) => {
  try {
    if (!messageId) {
      throw new Error("No messageId provided");
    }
    const currentTime = Timestamp.fromDate(new Date());

    const docRef = doc(db, "messages", messageId);

    await updateDoc(docRef, {
      message,
      edited: true,
      time: currentTime,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
