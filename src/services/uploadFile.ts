import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getCurrentTime } from "../utils/getCurrentTime";
import { generateRandomId } from "../utils/generateRandomId";

export const uploadFile = async (
  file: File | null,
  receiverId?: string | null
) => {
  if (!file) {
    return null;
  }

  const user = auth.currentUser;
  const randomNumber = Math.random();
  const randomId = generateRandomId();
  const currentTime = getCurrentTime();
  const storageRef = ref(storage, `avatars/${file.name}-${randomNumber}`);

  const fileURL = await new Promise<string>((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.error("Upload error:", error);
        reject(new Error("Failed to upload avatar. Please try again."));
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });

  if (receiverId) {
    await setDoc(doc(db, "messages", randomId), {
      id: randomNumber,
      senderId: user,
      receiverId,
      time: currentTime,
      edited: false,
    });
  }

  return fileURL;
};
