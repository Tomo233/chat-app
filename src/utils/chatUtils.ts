import { collection, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export function getChatRefs(
  receiverId: string | undefined,
  messageId?: string
) {
  const senderId = auth.currentUser?.uid;

  if (!senderId || !receiverId) {
    throw new Error("Missing sender or receiver ID");
  }

  const chatId =
    senderId < receiverId
      ? `${senderId}-${receiverId}`
      : `${receiverId}-${senderId}`;

  const chatRef = doc(db, "chats", chatId);
  const messageCollectionRef = collection(chatRef, "messages");

  const messageRef = messageId ? doc(chatRef, "messages", messageId) : null;

  return { chatId, chatRef, messageRef, messageCollectionRef };
}
