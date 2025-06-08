import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getCurrentTime } from "../utils/getCurrentTime";
import { generateRandomId } from "../utils/generateRandomId";
import { FileType } from "../features/chat/SendMessage";

export const uploadFile = async (
  files: FileType | File | null,
  receiverId?: string | null
) => {
  if (!files) {
    return null;
  }

  if (files instanceof File) {
    const randomNumber = Math.random();
    const avatarStorageRef = ref(
      storage,
      `avatars/${files.name}-${randomNumber}`
    );
    const snapshot = await uploadBytes(avatarStorageRef, files);
    return await getDownloadURL(snapshot.ref);
  } else {
    const user = auth.currentUser!;

    for (const file of files) {
      const randomId = generateRandomId();
      const currentTime = getCurrentTime();
      const fileStorageRef = ref(
        storage,
        `chatFiles/${file.file.name}-${randomId}`
      );

      const snapshot = await uploadBytes(fileStorageRef, file.file);
      const url = await getDownloadURL(snapshot.ref);

      await setDoc(doc(db, "messages", randomId), {
        id: randomId,
        senderId: user.uid,
        receiverId,
        time: currentTime,
        edited: false,
        fileURL: url,
      });
    }
  }
};
