import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { ChatDataProps } from "../features/chat/useChatMessages";

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

export const getLastAndCurrentMessages = async (
  messageCollectionRef: CollectionReference,
  messageRef: DocumentReference | null
) => {
  if (!messageRef) throw new Error("Missing message reference");

  const messagesQuery = query(messageCollectionRef, orderBy("time", "desc"));
  const messagesQuerySnapshot = await getDocs(messagesQuery);

  const currentMessage = (await getDoc(messageRef)).data() as ChatDataProps;

  const allMessages = messagesQuerySnapshot.docs.map(
    (doc) => doc.data() as ChatDataProps
  );

  const filteredMessages = allMessages.filter(
    (msg) => msg.id !== currentMessage.id
  );

  const latestMessage = allMessages.at(0) ?? null;
  const latestMessageExcludingCurrent = filteredMessages.at(0) ?? null;

  return { currentMessage, latestMessage, latestMessageExcludingCurrent };
};
