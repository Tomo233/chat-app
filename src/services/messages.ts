import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

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
    });
    console.log("Message successfully added to Firestore");
  } catch (error) {
    console.error("Error sending message to Firestore:", error);
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    await deleteDoc(doc(db, "messages", messageId));
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Something went wrong, try again later!");
  }
};
